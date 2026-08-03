/**
 * BrewInsight splash — 3D mug + terminal.
 *
 * Loads brewinsight-calc.glb (geometry/materials only) and drives everything
 * the .glb cannot carry, per assets/3d/HANDOFF.md:
 *   1. mug spin      — one revolution per 15 s about world up
 *   2. steam         — six wisps, 5.5 s lifecycle staggered 22 frames apart;
 *                      glTF can't animate material opacity, so we drive it here
 *   3. terminal LCD  — a live canvas texture from brewinsight-lcd.js, because
 *                      glTF has no image-sequence support
 *
 * The luminous parts (screen, pulse line, indicator lights) are made emissive
 * so they read as lit; the outward halo is a CSS drop-shadow on the canvas
 * (see splash.html), which keeps the background transparent. Postprocessing
 * bloom was tried and rejected — it forces canvas alpha to 1.
 *
 * init() rejects if WebGL or the model is unavailable; the caller collapses
 * the stage rather than showing an empty box.
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createLCD, LCD } from './brewinsight-lcd.js';

/* Steam lifecycle, from HANDOFF.md. Rise is in metres along the mug's local up;
 * the per-wisp spin about that axis is already baked into each node's quaternion. */
const LIFE_SECONDS = 5.5;
const LIFE_FRAMES = 132;
const WISPS = [
  { name: 'steam_1', phase: 0, base: 1.0 },
  { name: 'steam_2', phase: 22, base: 1.0 },
  { name: 'steam_3', phase: 44, base: 1.0 },
  { name: 'steam_4', phase: 66, base: 0.85 },
  { name: 'steam_5', phase: 88, base: 1.1 },
  { name: 'steam_6', phase: 110, base: 0.95 },
];
const KEYS = [
  { t: 0.0, rise: 0.0, scale: 0.35, opacity: 0.0 },
  { t: 0.15, rise: 0.011, scale: 1.0, opacity: 0.9 },
  { t: 0.75, rise: 0.056, scale: 1.15, opacity: 0.55 },
  { t: 1.0, rise: 0.075, scale: 1.35, opacity: 0.0 },
];

/* The wisps read heavier on screen than they did in Blender, so the whole
 * opacity curve is scaled down. Kept as a multiplier rather than edited into
 * KEYS above, so those stay the handoff's own numbers. */
const STEAM_OPACITY = 0.5;

/* Which materials read as light sources. Values are the .blend's own colours. */
const EMISSIVE = {
  forest_green: { color: 0x88c048, intensity: 1.1 }, // pulse line + green light
  amber_signal: { color: 0xc77f3b, intensity: 1.0 },
  red_signal: { color: 0xa51404, intensity: 1.0 },
};

/* Blender eased these with Bézier; smoothstep is close enough (HANDOFF.md). */
function sampleWisp(t) {
  for (let i = 0; i < KEYS.length - 1; i++) {
    const a = KEYS[i];
    const b = KEYS[i + 1];
    if (t >= a.t && t <= b.t) {
      const raw = (t - a.t) / (b.t - a.t);
      const u = raw * raw * (3 - 2 * raw);
      return {
        rise: a.rise + (b.rise - a.rise) * u,
        scale: a.scale + (b.scale - a.scale) * u,
        opacity: a.opacity + (b.opacity - a.opacity) * u,
      };
    }
  }
  return KEYS[KEYS.length - 1];
}

const MUG_REVOLUTION_SECONDS = 15;

export async function init(container, opts = {}) {
  const animate = opts.animate !== false;
  const modelUrl = opts.modelUrl || new URL('./brewinsight-calc.glb', import.meta.url).href;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.setClearColor(0x000000, 0); // the page's grid shows through

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 100);

  /* The ceramic is metallic 0.35 — without an environment it renders near-black,
   * so image-based lighting is required, not optional. */
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const key = new THREE.DirectionalLight(0xffffff, 1.7);
  key.position.set(0.4, 0.9, 0.8);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.45);
  fill.position.set(-0.6, 0.2, 0.4);
  scene.add(fill);

  const gltf = await new GLTFLoader().loadAsync(modelUrl);
  const model = gltf.scene;
  scene.add(model);

  /* --- terminal screen: swap the baked still for the live LCD canvas --- */
  const lcd = createLCD();
  const lcdTexture = new THREE.CanvasTexture(lcd.canvas);
  lcdTexture.colorSpace = THREE.SRGBColorSpace;
  lcdTexture.magFilter = THREE.NearestFilter; // keep the hard LCD pixels
  /* No mipmaps. The screen draws at roughly a third of the texture's 960x640,
   * and mipmapping averages the 1px LCD strokes away to near-white — the text
   * disappears. Sampling full-res keeps it legible. */
  lcdTexture.minFilter = THREE.LinearFilter;
  lcdTexture.generateMipmaps = false;
  // The screen's UVs want the canvas the right way up; verified on-model.
  lcdTexture.flipY = true;
  lcdTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

  let screenFace = null;
  const screenNode = model.getObjectByName('terminal_screen');
  if (screenNode) {
    // Loads as a Group: two primitives, the LCD face is the lime_screen_display one.
    screenNode.traverse((o) => {
      if (o.material && o.material.name === 'lime_screen_display') screenFace = o;
    });
  }
  if (screenFace) {
    const m = screenFace.material;
    m.map = lcdTexture;
    m.color.set(LCD.TINT); // base colour multiplies the texture
    /* Backlight: the same canvas drives emission, so the lit background glows
     * and the black text stays dark, the way a real LCD reads. */
    m.emissive = new THREE.Color(LCD.TINT);
    m.emissiveMap = lcdTexture;
    m.emissiveIntensity = 0.3;
    m.needsUpdate = true;
  }

  /* --- make the light sources actually emit --- */
  model.traverse((o) => {
    const m = o.material;
    if (!m || !EMISSIVE[m.name]) return;
    const g = EMISSIVE[m.name];
    m.emissive = new THREE.Color(g.color);
    m.emissiveIntensity = g.intensity;
    m.needsUpdate = true;
  });

  /* --- steam: glTF exports these opaque at alpha 1, so make them blendable --- */
  const wisps = [];
  for (const w of WISPS) {
    const node = model.getObjectByName(w.name);
    if (!node) continue;
    const mesh = node.isMesh ? node : node.children.find((c) => c.isMesh);
    const material = mesh && mesh.material;
    if (material) {
      material.transparent = true;
      material.depthWrite = false; // overlapping wisps blend instead of z-fighting
      material.opacity = 0;
    }
    wisps.push({ node, material, phase: w.phase, base: w.base });
  }

  const mugSpin = model.getObjectByName('mug_spin');

  /* Measure with the wisps at their FULL extent (end of the lifecycle: highest
   * rise, largest scale), not wherever they sat on the export frame. Measuring
   * at lifecycle start yields a box that is too short and the risen steam gets
   * cropped off the top of frame. */
  const peak = KEYS[KEYS.length - 1];
  for (const w of wisps) {
    w.node.position.y = peak.rise;
    w.node.scale.setScalar(w.base * peak.scale);
  }

  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const viewDir = new THREE.Vector3(0.26, 0.14, 1).normalize();

  /* --- on the glow ---
   * No EffectComposer/UnrealBloomPass here, deliberately. Its final composite
   * blends additively onto the read buffer and drives alpha to 1 across the
   * whole frame, so the canvas came back opaque black and buried the page's
   * grid behind a rectangle. Instead the luminous materials emit (above), and
   * the outward halo is a CSS drop-shadow on the canvas, which keeps the
   * background genuinely transparent. See .stage canvas in splash.html. */

  function frameCamera() {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    camera.aspect = w / h;
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    /* The box already includes fully risen steam, so this only needs a hair of
     * breathing room rather than a fudge factor. */
    const fitH = size.y / (2 * Math.tan(vFov / 2));
    const fitW = size.x / (2 * Math.tan(vFov / 2) * camera.aspect);
    const dist = Math.max(fitH, fitW) * 1.03;
    camera.position.copy(center).addScaledVector(viewDir, dist);
    camera.lookAt(center);
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  container.appendChild(renderer.domElement);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
  frameCamera();

  const ro = new ResizeObserver(frameCamera);
  ro.observe(container);

  const clock = new THREE.Clock();
  let elapsed = 0;
  let running = true;
  let lcdFrame = 1;

  /** Advance the scene by dt seconds and draw. Split out from the rAF loop so
   *  it can also be stepped deterministically. */
  function advance(dt) {
    elapsed += dt;

    if (mugSpin) mugSpin.rotation.y += ((Math.PI * 2) / MUG_REVOLUTION_SECONDS) * dt;

    for (const w of wisps) {
      const t = ((elapsed / LIFE_SECONDS) + w.phase / LIFE_FRAMES) % 1;
      const s = sampleWisp(t);
      w.node.position.y = s.rise;
      w.node.scale.setScalar(w.base * s.scale);
      if (w.material) w.material.opacity = s.opacity * STEAM_OPACITY;
    }

    lcdFrame = (Math.floor(elapsed * LCD.FPS) % LCD.TOTAL_FRAMES) + 1;
    if (lcd.draw(lcdFrame)) lcdTexture.needsUpdate = true;

    renderer.render(scene, camera);
  }

  function tick() {
    if (!running) return;
    requestAnimationFrame(tick);
    /* No document.hidden guard: browsers already stop firing rAF for background
     * tabs, and some embedded webviews report hidden:true while plainly visible,
     * which would freeze the scene for those users. */
    advance(Math.min(clock.getDelta(), 0.1));
  }

  /* Draw a first frame before handing back so the fade-in never shows an empty
   * canvas. With reduced motion that single frame is all there is. */
  advance(animate ? 0 : 6);

  if (animate) requestAnimationFrame(tick);

  return {
    /* Small introspection hook, handy for verifying the scene is actually live. */
    state: () => ({
      elapsed: +elapsed.toFixed(2),
      mugRotationY: mugSpin ? +mugSpin.rotation.y.toFixed(3) : null,
      lcdFrame,
      wispOpacities: wisps.map((w) => (w.material ? +w.material.opacity.toFixed(2) : null)),
      screenTextureBound: !!(screenFace && screenFace.material.map === lcdTexture),
      animating: animate,
    }),
    /* Step the scene by hand (seconds). Used to verify the animation without
     * depending on rAF, which browsers suspend for hidden documents. */
    step: (dt) => advance(dt),
    dispose() {
      running = false;
      ro.disconnect();
      renderer.dispose();
      pmrem.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.remove();
    },
  };
}
