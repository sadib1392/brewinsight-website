/**
 * BrewInsight — TI-84-style LCD screen renderer.
 *
 * glTF cannot carry an image sequence, so the terminal screen is NOT in the .glb.
 * This module reproduces it exactly as authored in Blender: the same logical grid,
 * timings, copy and polygons that generated the 2880-frame texture sequence.
 *
 * Usage with three.js:
 *
 *   import { createLCD, LCD } from './brewinsight-lcd.js';
 *   const lcd = createLCD();
 *   const tex = new THREE.CanvasTexture(lcd.canvas);
 *   tex.colorSpace = THREE.SRGBColorSpace;
 *   tex.magFilter = THREE.NearestFilter;   // keep the hard LCD pixels
 *   tex.minFilter = THREE.LinearMipmapLinearFilter;
 *   screenMaterial.map = tex;
 *   screenMaterial.color.set(LCD.TINT);    // multiplies the white/black texture
 *
 *   // per frame:
 *   const frame = Math.floor(clock.getElapsedTime() * LCD.FPS) % LCD.TOTAL_FRAMES + 1;
 *   if (lcd.draw(frame)) tex.needsUpdate = true;   // returns false if unchanged
 *
 * The texture is pure white background / black ink. The LCD colour comes from
 * multiplying by LCD.TINT, so changing the screen colour is a one-line change.
 */

export const LCD = {
  W: 240,            // logical pixel grid (what gets thresholded)
  H: 160,
  SCALE: 4,          // nearest-neighbour upscale -> 960x640 output, 3:2
  FPS: 24,
  TOTAL_FRAMES: 2880,   // 120 s
  TYPE_END: 264,        // typing finishes (11 s)
  HOLD_END: 384,        // text holds w/ blinking cursor until 16 s
  SEG_LEN: 624,         // 26 s per polygon
  N_SEG: 4,
  BLINK: 12,            // 0.5 s on / 0.5 s off
  THRESHOLD: 178,       // luminance cut for the 1-bit look
  TINT: '#98A48E',      // LCD green, sampled from the TI-84 reference
  INK: '#000000',
};

const LINES = [
  'jhksa ~% brewinsight brewing...',
  '',
  '> pulling google reviews .......... ok',
  '> pulling search trends ........... ok',
  '> matcha searches   +350% since 2021',
  '> weekday 8-10am    peak foot traffic',
];
const TOTAL_CHARS = LINES.reduce((a, l) => a + l.length, 0);
const FS = 10, LHGT = 13, TX = 4, TY = 5;
const FONT = (px) => `${px}px ui-monospace, "SF Mono", Menlo, monospace`;

/* Polygons in graph units; 1 unit = GU logical pixels. */
const GU = 15;
const regular = (n, r, phase) =>
  Array.from({ length: n }, (_, i) => {
    const a = phase + (i * 2 * Math.PI) / n;
    return [+(r * Math.cos(a)).toFixed(3), +(r * Math.sin(a)).toFixed(3)];
  });

const POLYS = [
  { name: 'TRIANGLE', pts: [[-3.2, -2.0], [0.2, 2.6], [3.4, -1.4]] },
  { name: 'QUAD', pts: [[-3.6, -2.0], [-1.4, 2.4], [3.4, 2.0], [2.2, -2.2]] },
  { name: 'PENTAGON', pts: regular(5, 3.0, -Math.PI / 2) },
  { name: 'HEXAGON', pts: regular(6, 3.0, 0) },
];

/* Sub-timeline within one polygon segment, in frames. */
const AX_A = 12, AX_B = 60, PO_A = 60, PO_B = 252, STATS = 264, TR_A = 288;

const OX = Math.round(LCD.W / 2);
const OY = Math.round(LCD.H / 2) - 6;
const gx = (u) => OX + u * GU;
const gy = (v) => OY - v * GU;

const shoelace = (pts) => {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length];
    a += x1 * y2 - x2 * y1;
  }
  return Math.abs(a) / 2;
};
const perimeter = (pts) => {
  let p = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length];
    p += Math.hypot(x2 - x1, y2 - y1);
  }
  return p;
};

export function createLCD() {
  const canvas = document.createElement('canvas');
  canvas.width = LCD.W * LCD.SCALE;
  canvas.height = LCD.H * LCD.SCALE;
  const octx = canvas.getContext('2d');

  const lc = document.createElement('canvas');
  lc.width = LCD.W;
  lc.height = LCD.H;
  const ctx = lc.getContext('2d', { willReadFrequently: true });

  let lastFrame = -1;

  const px = (x, y) => ctx.fillRect(Math.round(x), Math.round(y), 1, 1);

  function line(x1, y1, x2, y2) {           // 1px Bresenham keeps edges crisp
    x1 = Math.round(x1); y1 = Math.round(y1);
    x2 = Math.round(x2); y2 = Math.round(y2);
    const dx = Math.abs(x2 - x1), dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1, sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;
    for (;;) {
      px(x1, y1);
      if (x1 === x2 && y1 === y2) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x1 += sx; }
      if (e2 < dx) { err += dx; y1 += sy; }
    }
  }

  function drawTerminal(f) {
    const typed = f <= 1 ? 0
      : f >= LCD.TYPE_END ? TOTAL_CHARS
        : Math.round((TOTAL_CHARS * (f - 1)) / (LCD.TYPE_END - 1));
    const blink = Math.floor((f - 1) / LCD.BLINK) % 2 === 0;
    ctx.fillStyle = LCD.INK;
    ctx.font = FONT(FS);
    ctx.textBaseline = 'top';

    let shown = typed;
    const takes = LINES.map((t) => {
      const k = Math.max(0, Math.min(t.length, shown));
      shown -= t.length;
      return k;
    });
    LINES.forEach((t, i) => {
      if (takes[i]) ctx.fillText(t.slice(0, takes[i]), TX, TY + i * LHGT);
    });

    let ci = LINES.length - 1, rem = typed;
    for (let i = 0; i < LINES.length; i++) {
      if (rem < LINES[i].length) { ci = i; break; }
      rem -= LINES[i].length;
    }
    if (blink) {
      const w = ctx.measureText(LINES[ci].slice(0, takes[ci])).width;
      ctx.fillRect(TX + w + 1, TY + ci * LHGT + 1, 4, FS - 1);
    }
  }

  function drawPlane(prog) {                // reveals left-to-right
    ctx.fillStyle = LCD.INK;
    const maxX = 4 + (LCD.W - 8) * prog;
    for (let ux = -7; ux <= 7; ux++) {
      for (let vy = -4; vy <= 4; vy++) {
        const X = gx(ux), Y = gy(vy);
        if (X <= maxX && X > 2 && Y > 2 && Y < LCD.H - 12) px(X, Y);
      }
    }
    line(4, OY, Math.min(LCD.W - 4, maxX), OY);
    if (maxX >= OX) line(OX, 6, OX, LCD.H - 14);
    for (let ux = -7; ux <= 7; ux++) {
      const X = gx(ux);
      if (X <= maxX && X > 2 && X < LCD.W - 2 && ux !== 0) line(X, OY - 1, X, OY + 1);
    }
    if (maxX >= OX) {
      for (let vy = -4; vy <= 4; vy++) {
        const Y = gy(vy);
        if (Y > 6 && Y < LCD.H - 14 && vy !== 0) line(OX - 1, Y, OX + 1, Y);
      }
    }
  }

  function drawPolygon(poly, prog, traceT) {
    const pts = poly.pts, n = pts.length;
    ctx.fillStyle = LCD.INK;
    ctx.font = FONT(8);
    ctx.textBaseline = 'top';

    const edgeF = prog * n;
    for (let i = 0; i < n; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % n];
      const t = Math.max(0, Math.min(1, edgeF - i));
      if (t <= 0) break;
      line(gx(x1), gy(y1), gx(x1 + (x2 - x1) * t), gy(y1 + (y2 - y1) * t));
    }
    const shownV = Math.min(n, Math.floor(edgeF) + 1);
    for (let i = 0; i < shownV; i++) {
      const [x, y] = pts[i], X = gx(x), Y = gy(y);
      ctx.fillRect(X - 1, Y - 1, 3, 3);
      ctx.fillText(String.fromCharCode(65 + i), X + 3, Y - 9);
    }
    if (traceT !== null) {                  // TRACE cross running the perimeter
      const segs = [];
      let total = 0;
      for (let i = 0; i < n; i++) {
        const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % n];
        const L = Math.hypot(x2 - x1, y2 - y1);
        segs.push(L);
        total += L;
      }
      let d = traceT * total, i = 0;
      while (d > segs[i]) { d -= segs[i]; i++; }
      const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % n];
      const u = d / segs[i];
      const X = gx(x1 + (x2 - x1) * u), Y = gy(y1 + (y2 - y1) * u);
      ctx.fillRect(X - 2, Y, 5, 1);
      ctx.fillRect(X, Y - 2, 1, 5);
    }
  }

  function drawReadout(poly, showStats) {
    ctx.fillStyle = LCD.INK;
    ctx.font = FONT(8);
    ctx.textBaseline = 'top';
    ctx.fillText(poly.name, 4, 2);
    if (showStats) {
      ctx.fillText(
        `AREA ${shoelace(poly.pts).toFixed(1)}  PERIM ${perimeter(poly.pts).toFixed(1)}`,
        4, LCD.H - 10);
    }
  }

  /** Draw one frame (1..TOTAL_FRAMES). Returns true if the canvas changed. */
  function draw(frame) {
    const f = ((Math.floor(frame) - 1 + LCD.TOTAL_FRAMES) % LCD.TOTAL_FRAMES) + 1;
    if (f === lastFrame) return false;
    lastFrame = f;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, LCD.W, LCD.H);

    if (f <= LCD.HOLD_END) {
      drawTerminal(f);
    } else {
      const idx = Math.min(LCD.N_SEG - 1, Math.floor((f - LCD.HOLD_END - 1) / LCD.SEG_LEN));
      const lf = f - LCD.HOLD_END - 1 - idx * LCD.SEG_LEN;
      const poly = POLYS[idx];
      if (lf >= AX_A) drawPlane(Math.min(1, (lf - AX_A) / (AX_B - AX_A)));
      if (lf >= PO_A) {
        const prog = Math.min(1, (lf - PO_A) / (PO_B - PO_A));
        const traceT = lf >= TR_A ? ((lf - TR_A) / (LCD.SEG_LEN - TR_A)) % 1 : null;
        drawPolygon(poly, prog, traceT);
      }
      if (lf >= AX_A) drawReadout(poly, lf >= STATS);
    }

    // Threshold to 1-bit, then upscale with no smoothing -> hard LCD pixels.
    const img = ctx.getImageData(0, 0, LCD.W, LCD.H);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      const v = lum < LCD.THRESHOLD ? 0 : 255;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);

    octx.imageSmoothingEnabled = false;
    octx.drawImage(lc, 0, 0, LCD.W, LCD.H, 0, 0, canvas.width, canvas.height);
    return true;
  }

  return { canvas, draw, POLYS, LINES };
}
