/* @ds-bundle: {"format":3,"namespace":"BrewInsightDesignSystem_a940df","components":[{"name":"DonutGauge","sourcePath":"components/charts/DonutGauge.jsx"},{"name":"HudPanel","sourcePath":"components/charts/HudPanel.jsx"},{"name":"Pictograph","sourcePath":"components/charts/Pictograph.jsx"},{"name":"RangeBar","sourcePath":"components/charts/RangeBar.jsx"},{"name":"TrendChart","sourcePath":"components/charts/TrendChart.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"CornerFrame","sourcePath":"components/core/CornerFrame.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"SourceBadge","sourcePath":"components/core/SourceBadge.jsx"},{"name":"StatCard","sourcePath":"components/core/StatCard.jsx"}],"sourceHashes":{"components/charts/DonutGauge.jsx":"a32499449b65","components/charts/HudPanel.jsx":"d32cf7289756","components/charts/Pictograph.jsx":"89511da4c28e","components/charts/RangeBar.jsx":"4b40648dd6aa","components/charts/TrendChart.jsx":"dd02daeb09ae","components/core/Badge.jsx":"c9ea25947513","components/core/Button.jsx":"7942d8b59d29","components/core/CornerFrame.jsx":"b4c5887159c6","components/core/Eyebrow.jsx":"9308eea57312","components/core/Logo.jsx":"f571635ce75e","components/core/SourceBadge.jsx":"8be291181dfd","components/core/StatCard.jsx":"48ae45d120b7","ui_kits/instagram/Illustrations.jsx":"d0ed0cfe414c","ui_kits/instagram/PostShell.jsx":"337229896f58","ui_kits/instagram/Posts.jsx":"3b43e2806482"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BrewInsightDesignSystem_a940df = window.BrewInsightDesignSystem_a940df || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/charts/DonutGauge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Donut / arc gauge for a single percentage. Hand-inked ring, value as HTML
 * text in the center (guarantees Inter renders). Use for true shares (%),
 * never for dollar amounts.
 */
function DonutGauge({
  value = 40,
  size = 240,
  thickness = 22,
  color = 'var(--forest)',
  trackColor = 'var(--track-grey)',
  label,
  showValue = true,
  className = '',
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value));
  const r = (size - thickness) / 2;
  const cx = size / 2,
    cy = size / 2;
  const circ = 2 * Math.PI * r;
  const dash = pct / 100 * circ;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      position: 'relative',
      width: size,
      height: size,
      fontFamily: 'var(--font-structure)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    role: "img",
    "aria-label": `${pct}%`
  }, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: r,
    fill: "none",
    stroke: trackColor,
    strokeWidth: thickness
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: thickness,
    strokeLinecap: "round",
    strokeDasharray: `${dash} ${circ - dash}`,
    transform: `rotate(-90 ${cx} ${cy})`
  })), showValue && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size * 0.26,
      fontWeight: 'var(--fw-extrabold)',
      lineHeight: 1,
      color: 'var(--ink)',
      letterSpacing: 'var(--track-tight)'
    }
  }, pct, "%"), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size * 0.072,
      color: 'var(--body-grey)',
      textAlign: 'center',
      maxWidth: size * 0.7,
      lineHeight: 1.2
    }
  }, label)));
}
Object.assign(__ds_scope, { DonutGauge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/DonutGauge.jsx", error: String((e && e.message) || e) }); }

// components/charts/HudPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Bracketed HUD stat panel — a key stat framed in a thin technical bracket with
 * small tick details. The "futuristic" accent layer; use sparingly (~one per post).
 * Renders on cream (default) or dark surfaces (tone="dark").
 */
function HudPanel({
  figure,
  caption,
  tag,
  tone = 'light',
  accent = 'var(--forest)',
  className = '',
  style = {},
  ...rest
}) {
  const dark = tone === 'dark';
  const line = dark ? 'var(--dark-3)' : 'var(--body-grey)';
  const fg = dark ? 'var(--paper)' : 'var(--ink)';
  const muted = dark ? 'var(--dark-text)' : 'var(--body-grey)';
  const bracket = corner => {
    const [v, hh] = corner;
    return /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: 'absolute',
        [v]: -1,
        [hh]: -1,
        width: 18,
        height: 18,
        [`border${v === 'top' ? 'Top' : 'Bottom'}`]: `2px solid ${accent}`,
        [`border${hh === 'left' ? 'Left' : 'Right'}`]: `2px solid ${accent}`
      }
    });
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      position: 'relative',
      display: 'inline-flex',
      flexDirection: 'column',
      gap: 6,
      padding: '22px 26px',
      fontFamily: 'var(--font-structure)',
      border: `1px solid ${line}`,
      borderRadius: 'var(--radius-sm)',
      background: dark ? 'rgba(255,255,255,0.03)' : 'transparent',
      ...style
    }
  }, rest), bracket(['top', 'left']), bracket(['top', 'right']), bracket(['bottom', 'left']), bracket(['bottom', 'right']), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      marginBottom: 2
    }
  }, Array.from({
    length: 5
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 'var(--hud-tick)',
      height: i === 2 ? 10 : 6,
      background: line,
      opacity: 0.6
    }
  }))), tag && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--ui-xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: accent
    }
  }, tag), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-hero)',
      fontWeight: 'var(--fw-black)',
      lineHeight: 0.95,
      color: fg,
      letterSpacing: 'var(--track-tight)'
    }
  }, figure), caption && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--ui-lg)',
      lineHeight: 'var(--leading-snug)',
      color: muted,
      maxWidth: 360
    }
  }, caption));
}
Object.assign(__ds_scope, { HudPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/HudPanel.jsx", error: String((e && e.message) || e) }); }

// components/charts/Pictograph.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Pictograph / isotype — the signature data device. A row (or grid) of units,
 * a portion filled to show a proportion (e.g. 4 of 10 cups = 40%).
 * Filled units in Forest with a hatch; empty units in soft-sage outline.
 * shape: "cup" | "bean" | "dot" | "square".  Self-label it (brace + caption).
 */
function Pictograph({
  total = 10,
  filled = 4,
  shape = 'cup',
  fillColor = 'var(--forest)',
  emptyColor = 'var(--soft-sage)',
  size = 56,
  gap = 10,
  columns,
  braceLabel,
  emptyBraceLabel,
  className = '',
  style = {},
  ...rest
}) {
  const units = Array.from({
    length: total
  }, (_, i) => i < filled);
  const cols = columns || total;
  const Unit = ({
    on
  }) => {
    const stroke = on ? fillColor : emptyColor;
    const fill = on ? fillColor : 'none';
    const op = on ? 1 : 1;
    if (shape === 'dot' || shape === 'square') {
      return /*#__PURE__*/React.createElement("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, shape === 'dot' ? /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "9",
        fill: fill,
        stroke: stroke,
        strokeWidth: "2",
        opacity: op
      }) : /*#__PURE__*/React.createElement("rect", {
        x: "3",
        y: "3",
        width: "18",
        height: "18",
        rx: "3",
        fill: fill,
        stroke: stroke,
        strokeWidth: "2",
        opacity: op
      }));
    }
    if (shape === 'bean') {
      // coffee bean: oval with a center seam
      return /*#__PURE__*/React.createElement("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, /*#__PURE__*/React.createElement("ellipse", {
        cx: "12",
        cy: "12",
        rx: "7",
        ry: "9.5",
        transform: "rotate(-18 12 12)",
        fill: fill,
        stroke: stroke,
        strokeWidth: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M9 5 C 14 9, 10 15, 15 19",
        fill: "none",
        stroke: on ? 'var(--paper)' : stroke,
        strokeWidth: "1.6",
        strokeLinecap: "round"
      }));
    }
    // cup (default): mug with handle
    return /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M5 7 H17 L15.8 18 C15.6 19.4 14.5 20.4 13.1 20.4 H8.9 C7.5 20.4 6.4 19.4 6.2 18 Z",
      fill: fill,
      stroke: stroke,
      strokeWidth: "2",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M17 9 C 21 9, 21.5 14.5, 17 15",
      fill: "none",
      stroke: stroke,
      strokeWidth: "2",
      strokeLinecap: "round"
    }));
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: 8,
      fontFamily: 'var(--font-structure)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, ${size}px)`,
      gap
    }
  }, units.map((on, i) => /*#__PURE__*/React.createElement(Unit, {
    key: i,
    on: on
  }))), (braceLabel || emptyBraceLabel) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-annotation)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--text-annotation)',
      color: 'var(--ink)',
      lineHeight: 1
    }
  }, braceLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      color: fillColor
    }
  }, braceLabel), emptyBraceLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--body-grey)'
    }
  }, emptyBraceLabel)));
}
Object.assign(__ds_scope, { Pictograph });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/Pictograph.jsx", error: String((e && e.message) || e) }); }

// components/charts/RangeBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Horizontal range bar with ruler-style ticks (the HUD touch). For $ ranges
 * and spans (e.g. $80K-$400K to open a café). Amber only when money is the hero.
 */
function RangeBar({
  lowLabel = '$80K',
  highLabel = '$400K',
  lowCaption,
  highCaption,
  fillStart = 0.12,
  fillEnd = 0.86,
  color = 'var(--forest)',
  trackColor = 'var(--track-grey)',
  ticks = 9,
  height = 18,
  className = '',
  style = {},
  ...rest
}) {
  const tickEls = Array.from({
    length: ticks
  }, (_, i) => {
    const major = i === 0 || i === ticks - 1 || i === Math.floor((ticks - 1) / 2);
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        width: 'var(--hud-tick)',
        height: major ? 14 : 8,
        background: 'var(--body-grey)',
        opacity: major ? 0.8 : 0.45,
        alignSelf: 'flex-start'
      }
    });
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      fontFamily: 'var(--font-structure)',
      width: '100%',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 6,
      paddingInline: 2
    }
  }, tickEls), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height,
      borderRadius: 'var(--radius-bar)',
      background: trackColor
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: `${fillStart * 100}%`,
      right: `${(1 - fillEnd) * 100}%`,
      borderRadius: 'var(--radius-bar)',
      background: color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '50%',
      left: `${fillStart * 100}%`,
      transform: 'translate(-50%,-50%)',
      width: height + 6,
      height: height + 6,
      borderRadius: '50%',
      border: `var(--frame-weight) solid ${color}`,
      background: 'var(--paper)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '50%',
      left: `${fillEnd * 100}%`,
      transform: 'translate(-50%,-50%)',
      width: height + 6,
      height: height + 6,
      borderRadius: '50%',
      background: color
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-figure)',
      fontWeight: 'var(--fw-extrabold)',
      lineHeight: 1,
      color: 'var(--ink)'
    }
  }, lowLabel), lowCaption && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--ui-base)',
      color: 'var(--body-grey)',
      marginTop: 4
    }
  }, lowCaption)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-figure)',
      fontWeight: 'var(--fw-extrabold)',
      lineHeight: 1,
      color
    }
  }, highLabel), highCaption && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--ui-base)',
      color: 'var(--body-grey)',
      marginTop: 4
    }
  }, highCaption))));
}
Object.assign(__ds_scope, { RangeBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/RangeBar.jsx", error: String((e && e.message) || e) }); }

// components/charts/TrendChart.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Area/line trend curve with a pencil-hatched fill that fades downward and
 * hand-drawn dotted gridlines. For time series (search interest, growth).
 * Index charts: yMax=100 and no point dips below 0 (impossible values fail QA).
 * A peak can carry a Caveat annotation ("ALL-TIME HIGH") clear of the data.
 */
function TrendChart({
  values = [8, 14, 12, 22, 30, 28, 46, 58, 74, 96],
  labels,
  yMax = 100,
  color = 'var(--forest)',
  width = 640,
  height = 320,
  annotation,
  // { text, index, align? } OR an array of them -> Caveat callouts
  valueSuffix = '',
  // e.g. "/100" to keep the scale on the figure
  showGrid = true,
  fillOpacity = 0.16,
  className = '',
  style = {},
  ...rest
}) {
  const padL = 8,
    padR = 8,
    padT = 28,
    padB = 26;
  const w = width,
    h = height;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;
  const n = values.length;
  const uid = React.useId ? React.useId().replace(/:/g, '') : 'tc' + Math.round(Math.random() * 1e6);
  const x = i => padL + innerW * i / (n - 1);
  const y = v => padT + innerH * (1 - Math.max(0, Math.min(yMax, v)) / yMax);
  const linePts = values.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  const areaPath = `M ${x(0)},${y(values[0])} ` + values.map((v, i) => `L ${x(i)},${y(v)}`).join(' ') + ` L ${x(n - 1)},${padT + innerH} L ${x(0)},${padT + innerH} Z`;
  const gridY = [0, 0.25, 0.5, 0.75, 1].map(f => padT + innerH * f);

  // one or many Caveat callouts; right-anchor any that sit near the right edge
  const anns = (annotation ? Array.isArray(annotation) ? annotation : [annotation] : []).map(a => {
    const px = x(a.index),
      py = y(values[a.index]);
    return {
      ...a,
      px,
      py,
      right: a.align ? a.align === 'right' : px > w * 0.62
    };
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      fontFamily: 'var(--font-structure)',
      width,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-label": "trend chart"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: `fade-${uid}`,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: color,
    stopOpacity: fillOpacity
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: color,
    stopOpacity: "0"
  })), /*#__PURE__*/React.createElement("pattern", {
    id: `hatch-${uid}`,
    width: "7",
    height: "7",
    patternTransform: "rotate(45)",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "7",
    stroke: color,
    strokeWidth: "1",
    strokeOpacity: "0.22"
  }))), showGrid && gridY.map((gy, i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: padL,
    y1: gy,
    x2: w - padR,
    y2: gy,
    stroke: "var(--body-grey)",
    strokeOpacity: "0.25",
    strokeWidth: "1",
    strokeDasharray: "2 5"
  })), /*#__PURE__*/React.createElement("path", {
    d: areaPath,
    fill: `url(#hatch-${uid})`
  }), /*#__PURE__*/React.createElement("path", {
    d: areaPath,
    fill: `url(#fade-${uid})`
  }), /*#__PURE__*/React.createElement("polyline", {
    points: linePts,
    fill: "none",
    stroke: color,
    strokeWidth: "var(--stroke-data)",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), values.map((v, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: x(i),
    cy: y(v),
    r: i === n - 1 ? 5 : 3,
    fill: color
  })), anns.map((a, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("circle", {
    cx: a.px,
    cy: a.py,
    r: "9",
    fill: "none",
    stroke: color,
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: a.right ? a.px - 16 : a.px + 16,
    y: Math.max(padT + 4, a.py - 18),
    textAnchor: a.right ? 'end' : 'start',
    fontFamily: "var(--font-annotation)",
    fontWeight: "700",
    fontSize: "30",
    fill: a.color || color
  }, a.text)))), labels && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 2,
      fontSize: 'var(--ui-sm)',
      color: 'var(--body-grey)'
    }
  }, labels.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, l))), valueSuffix && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 'var(--ui-xs)',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--body-grey)'
    }
  }, "Scale 0", valueSuffix));
}
Object.assign(__ds_scope, { TrendChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/TrendChart.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  forest: {
    bg: 'rgba(56,104,48,0.10)',
    fg: 'var(--forest)'
  },
  amber: {
    bg: 'rgba(200,128,56,0.12)',
    fg: 'var(--amber)'
  },
  sage: {
    bg: 'rgba(107,131,96,0.14)',
    fg: 'var(--forest)'
  },
  neutral: {
    bg: 'var(--surface-sunken)',
    fg: 'var(--body-grey)'
  },
  ink: {
    bg: 'var(--ink)',
    fg: 'var(--paper)'
  },
  lime: {
    bg: 'rgba(136,192,72,0.18)',
    fg: 'var(--lime)'
  } // dark surfaces
};

/**
 * Badge / Tag — a small label pill. solid=false (default) is a soft tinted chip;
 * solid=true is a filled block. Use forest for trend/community, amber for money.
 */
function Badge({
  children,
  tone = 'forest',
  solid = false,
  icon = null,
  className = '',
  style = {},
  ...rest
}) {
  const t = TONES[tone] || TONES.forest;
  const filled = solid ? {
    background: t.fg,
    color: tone === 'lime' ? 'var(--deep-green)' : 'var(--paper)'
  } : {
    background: t.bg,
    color: t.fg
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4em',
      fontFamily: 'var(--font-structure)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--ui-xs)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      lineHeight: 1,
      padding: '0.5em 0.75em',
      borderRadius: 'var(--radius-pill)',
      ...filled,
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, icon), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  forest: {
    background: 'var(--forest)',
    color: 'var(--paper)',
    border: '2px solid var(--forest)'
  },
  ink: {
    background: 'var(--ink)',
    color: 'var(--paper)',
    border: '2px solid var(--ink)'
  },
  deepGreen: {
    background: 'var(--deep-green)',
    color: 'var(--paper)',
    border: '2px solid var(--deep-green)'
  },
  outline: {
    background: 'transparent',
    color: 'var(--forest)',
    border: '2px solid var(--forest)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--forest)',
    border: '2px solid transparent'
  },
  // dark-surface emphasis — lime pop, dark surfaces only
  lime: {
    background: 'var(--lime)',
    color: 'var(--deep-green)',
    border: '2px solid var(--lime)'
  }
};
const SIZES = {
  sm: {
    fontSize: 'var(--ui-sm)',
    padding: '8px 16px',
    radius: 'var(--radius-md)'
  },
  md: {
    fontSize: 'var(--ui-base)',
    padding: '12px 22px',
    radius: 'var(--radius-md)'
  },
  lg: {
    fontSize: 'var(--ui-lg)',
    padding: '16px 30px',
    radius: 'var(--radius-md)'
  }
};

/**
 * Button / CTA — also the brand's "emphasis block" when filled (forest/ink/deepGreen).
 * Holds the bottom-line takeaway or call to action.
 */
function Button({
  children,
  variant = 'forest',
  size = 'md',
  icon = null,
  iconRight = false,
  fullWidth = false,
  className = '',
  style = {},
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.forest;
  const s = SIZES[size] || SIZES.md;
  return /*#__PURE__*/React.createElement("button", _extends({
    className: className,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.55em',
      width: fullWidth ? '100%' : 'auto',
      fontFamily: 'var(--font-structure)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '0.01em',
      lineHeight: 1,
      cursor: 'pointer',
      fontSize: s.fontSize,
      padding: s.padding,
      borderRadius: s.radius,
      background: v.background,
      color: v.color,
      border: v.border,
      transition: 'filter var(--dur-fast) var(--ease-standard), opacity var(--dur-fast) var(--ease-standard)',
      ...style
    },
    onMouseDown: e => {
      e.currentTarget.style.filter = 'brightness(0.92)';
    },
    onMouseUp: e => {
      e.currentTarget.style.filter = '';
    },
    onMouseLeave: e => {
      e.currentTarget.style.filter = '';
    }
  }, rest), icon && !iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, icon), children, icon && iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, icon));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/CornerFrame.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Corner-bracket frame — the brand's single most distinctive device.
 * Thin L-shaped crop marks inset at all four corners ("report / dossier").
 * variant "hud" adds small registration crosshairs for feature/dark posts.
 */
function CornerFrame({
  children,
  variant = 'clean',
  color = 'var(--frame-line)',
  inset = 'var(--frame-inset)',
  legLength = 'var(--frame-len)',
  weight = 'var(--frame-weight)',
  className = '',
  style = {},
  ...rest
}) {
  const corner = (vAlign, hAlign) => {
    const pos = {
      position: 'absolute',
      [vAlign]: inset,
      [hAlign]: inset,
      width: legLength,
      height: legLength
    };
    const vBorder = `${weight} solid ${color}`;
    const edges = {
      [`border${vAlign === 'top' ? 'Top' : 'Bottom'}`]: vBorder,
      [`border${hAlign === 'left' ? 'Left' : 'Right'}`]: vBorder
    };
    return /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        ...pos,
        ...edges,
        pointerEvents: 'none'
      }
    });
  };
  const crosshair = (vAlign, hAlign) => /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      [vAlign]: `calc(${inset} + 14px)`,
      [hAlign]: `calc(${inset} + 14px)`,
      width: 12,
      height: 12,
      opacity: 0.7,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 5,
      left: 0,
      width: 12,
      height: 1.5,
      background: color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 5,
      top: 0,
      height: 12,
      width: 1.5,
      background: color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 1,
      border: `1px solid ${color}`,
      borderRadius: '50%'
    }
  }));
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      position: 'relative',
      ...style
    }
  }, rest), corner('top', 'left'), corner('top', 'right'), corner('bottom', 'left'), corner('bottom', 'right'), variant === 'hud' && /*#__PURE__*/React.createElement(React.Fragment, null, crosshair('top', 'right'), crosshair('bottom', 'left')), children);
}
Object.assign(__ds_scope, { CornerFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CornerFrame.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Top-left eyebrow: letter-spaced grey caps with a separator. One of the
 * brand's signature devices. Optionally pairs a section label with the handle.
 */
function Eyebrow({
  children,
  handle,
  separator = '·',
  color = 'var(--body-grey)',
  className = '',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.6em',
      fontFamily: 'var(--font-structure)',
      fontWeight: 'var(--fw-semibold)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--track-eyebrow)',
      fontSize: 'var(--text-eyebrow)',
      color,
      lineHeight: 1,
      ...style
    }
  }, rest), children && /*#__PURE__*/React.createElement("span", null, children), children && handle && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      opacity: 0.6
    }
  }, separator), handle && /*#__PURE__*/React.createElement("span", null, handle));
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const MARK_PATHS = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M42 30 C 38 24, 46 20, 42 14",
  strokeWidth: "2.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M52 30 C 48 24, 56 20, 52 14",
  strokeWidth: "2.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M62 30 C 58 24, 66 20, 62 14",
  strokeWidth: "2.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M30 40 L70 40 L66 76 C 65.4 80.4, 61.6 83.5, 57 83.5 L43 83.5 C 38.4 83.5, 34.6 80.4, 34 76 Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M70 46 C 82 46, 84 64, 70 66"
}), /*#__PURE__*/React.createElement("path", {
  d: "M36 60 L45 60 L49 50 L53 70 L57 60 L64 60",
  strokeWidth: "2.6"
}));

/**
 * BrewInsight logo. Reconstruction of the monoline mug + pulse mark.
 * Inherits color via currentColor so it reverses cleanly on dark surfaces.
 * variant: "mark" | "lockup" | "wordmark" | "footer"
 */
function Logo({
  variant = 'lockup',
  size,
  color = 'var(--ink)',
  className = '',
  style = {},
  ...rest
}) {
  const Mark = ({
    px
  }) => /*#__PURE__*/React.createElement("svg", {
    width: px,
    height: px,
    viewBox: "0 0 100 100",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    role: "img",
    "aria-label": "BrewInsight"
  }, MARK_PATHS);
  const base = {
    color,
    fontFamily: 'var(--font-structure)',
    ...style
  };
  if (variant === 'mark') {
    return /*#__PURE__*/React.createElement("span", _extends({
      className: className,
      style: {
        display: 'inline-flex',
        ...base
      }
    }, rest), /*#__PURE__*/React.createElement(Mark, {
      px: size || 48
    }));
  }
  if (variant === 'wordmark') {
    // single-line letter-spaced wordmark (in-line / footer use)
    return /*#__PURE__*/React.createElement("span", _extends({
      className: className,
      style: {
        display: 'inline-block',
        fontWeight: 'var(--fw-semibold)',
        letterSpacing: 'var(--track-wordmark)',
        textTransform: 'uppercase',
        fontSize: size || 'var(--ui-sm)',
        paddingLeft: '0.34em',
        ...base
      }
    }, rest), "BREWINSIGHT");
  }
  if (variant === 'footer') {
    // hairline rule above a tracked wordmark — the post footer signature
    return /*#__PURE__*/React.createElement("span", _extends({
      className: className,
      style: {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
        ...base
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'var(--fw-semibold)',
        letterSpacing: 'var(--track-wordmark)',
        textTransform: 'uppercase',
        fontSize: size || 'var(--text-footer)',
        paddingLeft: '0.34em'
      }
    }, "BREWINSIGHT"));
  }

  // lockup: mark above stacked BREW / rule / INSIGHT
  const px = size || 64;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className,
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: px * 0.18,
      ...base
    }
  }, rest), /*#__PURE__*/React.createElement(Mark, {
    px: px
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-regular)',
      letterSpacing: '0.34em',
      fontSize: px * 0.28,
      paddingLeft: '0.34em'
    }
  }, "BREW"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: px * 1.05,
      height: 1,
      background: 'currentColor',
      margin: `${px * 0.07}px 0`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-extrabold)',
      letterSpacing: '0.18em',
      fontSize: px * 0.33,
      paddingLeft: '0.18em'
    }
  }, "INSIGHT")));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/SourceBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ARROW = /*#__PURE__*/React.createElement("svg", {
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.4",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("line", {
  x1: "7",
  y1: "17",
  x2: "17",
  y2: "7"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "8 7 17 7 17 16"
}));
const STATES = {
  // lime on Deep Green — for dark surfaces
  dark: {
    background: 'var(--deep-green)',
    color: 'var(--lime)',
    border: 'none'
  },
  // forest on cream — the default for light layouts
  light: {
    background: 'transparent',
    color: 'var(--forest)',
    border: '2px solid var(--forest)'
  },
  // amber on cream — money/cost/premium posts only
  amber: {
    background: 'transparent',
    color: 'var(--amber)',
    border: '2px solid var(--amber)'
  }
};

/**
 * Source badge — the loud-sourcing pill. Three production states:
 * "dark" (lime on Deep Green), "light" (forest on cream), "amber" (cream, money posts).
 * Sourcing is the brand's credibility; keep it visible, never buried.
 */
function SourceBadge({
  children,
  state = 'light',
  icon = ARROW,
  label = 'SOURCE',
  className = '',
  style = {},
  ...rest
}) {
  const s = STATES[state] || STATES.light;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5em',
      fontFamily: 'var(--font-structure)',
      fontWeight: 'var(--fw-semibold)',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      fontSize: 'var(--text-footer)',
      lineHeight: 1,
      padding: '0.6em 0.95em',
      borderRadius: 'var(--radius-pill)',
      background: s.background,
      color: s.color,
      border: s.border,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      fontSize: '1.15em'
    }
  }, icon), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-extrabold)'
    }
  }, label, ":"), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { SourceBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SourceBadge.jsx", error: String((e && e.message) || e) }); }

// components/core/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * White stat card — a soft-shadowed figure + self-explanatory caption.
 * The figure is the focal point; the caption must say what it measures on its own.
 * accent recolors only the figure (the single key figure may take the lead accent).
 */
function StatCard({
  figure,
  caption,
  sub,
  accent = 'var(--ink)',
  align = 'left',
  className = '',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-card)',
      padding: '20px 24px',
      textAlign: align,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      fontFamily: 'var(--font-structure)',
      ...style
    }
  }, rest), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--ui-xs)',
      fontWeight: 'var(--fw-semibold)',
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: 'var(--body-grey)'
    }
  }, sub), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-figure)',
      fontWeight: 'var(--fw-extrabold)',
      lineHeight: 1,
      color: accent,
      letterSpacing: 'var(--track-tight)'
    }
  }, figure), caption && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--ui-base)',
      lineHeight: 'var(--leading-snug)',
      color: 'var(--text-muted)'
    }
  }, caption));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/instagram/Illustrations.jsx
try { (() => {
// Illustrations — the hand-drawn / monoline line art that appears in the
// published BrewInsight posts. Palette-bound (forest / sage / amber), single
// ~2.5px stroke matched to the logo. Lightly hatched fills, never flat blocks.
// Exported to window for the sibling babel post scripts.

function hatchId(prefix) {
  const id = (React.useId ? React.useId() : 'x' + Math.random()).replace(/:/g, '');
  return prefix + id;
}

// ---- Coffee-cup pictograph (to-go tumblers) · p2 ---------------------------
function Tumbler({
  filled,
  w = 62
}) {
  const stroke = filled ? 'var(--forest)' : 'var(--sketch-detail)';
  const hid = hatchId('cup');
  return /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: w * 1.62,
    viewBox: "0 0 62 100",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: hid,
    width: "6",
    height: "6",
    patternTransform: "rotate(45)",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "6",
    stroke: "var(--forest)",
    strokeWidth: "1.5",
    strokeOpacity: "0.4"
  }))), filled ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 24 L50 24 L45 90 C 44.6 94 41.6 96.5 38 96.5 L24 96.5 C 20.4 96.5 17.4 94 17 90 Z",
    fill: `url(#${hid})`,
    stroke: stroke,
    strokeWidth: "2.8",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 24 Q 31 18 53 24",
    stroke: stroke,
    strokeWidth: "2.8",
    fill: "none",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 33 Q 31 30 48 33",
    stroke: stroke,
    strokeWidth: "2",
    fill: "none",
    opacity: "0.7"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M15 32 L47 32 L43 90 C 42.6 94 39.6 96.5 36 96.5 L26 96.5 C 22.4 96.5 19.4 94 19 90 Z",
    fill: "none",
    stroke: stroke,
    strokeWidth: "2.4",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "19",
    width: "40",
    height: "15",
    rx: "6",
    fill: "none",
    stroke: stroke,
    strokeWidth: "2.4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 26.5 Q 31 24 51 26.5",
    stroke: stroke,
    strokeWidth: "1.6",
    fill: "none",
    opacity: "0.6"
  })));
}
function CupRow({
  total = 10,
  filled = 4,
  columns = 5
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '14px 22px',
      width: 'fit-content'
    }
  }, Array.from({
    length: total
  }).map((_, i) => /*#__PURE__*/React.createElement(Tumbler, {
    key: i,
    filled: i < filled
  })));
}

// ---- Bean pictograph · p3 --------------------------------------------------
function Bean({
  filled,
  w = 150
}) {
  const stroke = filled ? 'var(--forest)' : 'var(--sketch-detail)';
  const hid = hatchId('bean');
  return /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: w * 1.28,
    viewBox: "0 0 100 128",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: hid,
    width: "7",
    height: "7",
    patternTransform: "rotate(45)",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "7",
    stroke: "var(--forest)",
    strokeWidth: "1.5",
    strokeOpacity: "0.38"
  }))), /*#__PURE__*/React.createElement("g", {
    transform: "rotate(-5 50 64)"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "50",
    cy: "64",
    rx: "40",
    ry: "58",
    fill: filled ? `url(#${hid})` : 'none',
    stroke: stroke,
    strokeWidth: "3.2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50 10 C 62 42, 40 84, 53 118",
    stroke: stroke,
    strokeWidth: "3",
    fill: "none",
    strokeLinecap: "round"
  })));
}
function BeanRow() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 70
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 36
    }
  }, /*#__PURE__*/React.createElement(Bean, {
    filled: true
  }), /*#__PURE__*/React.createElement(Bean, {
    filled: true
  }), /*#__PURE__*/React.createElement(Bean, {
    filled: true
  })), /*#__PURE__*/React.createElement("svg", {
    width: "560",
    height: "22",
    viewBox: "0 0 560 22",
    fill: "none",
    style: {
      display: 'block',
      marginTop: 4
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 12 C 160 4, 400 4, 554 12",
    stroke: "var(--forest)",
    strokeWidth: "3",
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontFamily: 'var(--font-annotation)',
      fontWeight: 700,
      fontSize: 38,
      color: 'var(--forest)',
      marginTop: 10
    }
  }, "Arabica")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Bean, {
    filled: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontFamily: 'var(--font-annotation)',
      fontWeight: 700,
      fontSize: 34,
      color: 'var(--body-grey)',
      marginTop: 36,
      opacity: 0.7
    }
  }, "the rest")));
}

// ---- Boomer face · p2 callout ----------------------------------------------
function BoomerFace({
  w = 150
}) {
  const hid = hatchId('mug');
  return /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: w * 1.04,
    viewBox: "0 0 150 156",
    fill: "none",
    "aria-hidden": "true",
    stroke: "var(--forest)",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: hid,
    width: "6",
    height: "6",
    patternTransform: "rotate(45)",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "6",
    stroke: "var(--amber)",
    strokeWidth: "1.5",
    strokeOpacity: "0.5"
  }))), /*#__PURE__*/React.createElement("path", {
    d: "M40 56 C 38 30, 62 18, 75 18 C 88 18, 112 30, 110 56 C 109 76, 98 92, 75 92 C 52 92, 41 76, 40 56 Z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M40 52 C 32 50, 30 60, 36 66"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M110 52 C 118 50, 120 60, 114 66"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M56 24 C 64 20, 86 20, 94 24",
    strokeWidth: "2",
    opacity: "0.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "54",
    r: "12"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "90",
    cy: "54",
    r: "12"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M72 54 C 75 51, 75 51, 78 54"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M48 52 L40 50"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M102 52 L110 50"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "54",
    r: "1.6",
    fill: "var(--forest)",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "90",
    cy: "54",
    r: "1.6",
    fill: "var(--forest)",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M62 74 C 70 82, 80 82, 88 74"
  }), /*#__PURE__*/React.createElement("g", {
    stroke: "var(--amber)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M52 110 L98 110 L93 140 C 92.4 145 88 148 82 148 L68 148 C 62 148 57.6 145 57 140 Z",
    fill: `url(#${hid})`
  }), /*#__PURE__*/React.createElement("path", {
    d: "M98 116 C 114 116, 116 136, 98 138",
    fill: "none"
  })));
}
function CalloutCard({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#ECF0E6',
      borderRadius: 'var(--radius-md)',
      padding: '30px 32px',
      boxShadow: 'var(--shadow-card)',
      ...style
    }
  }, children);
}

// ---- Café counter blueprint · p4 -------------------------------------------
function CafeCounter({
  w = 320
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: w * 0.74,
    viewBox: "0 0 320 236",
    fill: "none",
    "aria-hidden": "true",
    stroke: "var(--forest)",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M250 14 L250 70"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M240 70 L260 70 L256 84 C 256 90 244 90 244 84 Z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "250",
    cy: "92",
    r: "3",
    fill: "var(--forest)",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 150 L210 150 L270 178 L120 178 Z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M120 178 L120 220 L60 192 L60 150",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M120 178 L270 178 L270 196 L120 220 Z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M150 122 L196 122 L214 150 L168 150 Z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M168 150 L168 134 L150 122",
    fill: "none",
    opacity: "0.85"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M180 150 L188 158"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M82 150 L112 150 L108 128 L86 128 Z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M97 128 C 90 108, 78 104, 74 92"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M97 128 C 104 110, 116 108, 122 98"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M97 128 C 97 110, 97 104, 97 94"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M74 92 C 70 96, 70 100, 76 100 C 80 98, 80 94, 74 92 Z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M122 98 C 126 102, 124 106, 118 104 C 116 100, 118 97, 122 98 Z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M97 94 C 101 96, 101 100, 95 100 C 92 97, 93 94, 97 94 Z",
    fill: "none"
  }));
}

// ---- Category span bars · p4 -----------------------------------------------
function SpanRow({
  icon,
  label,
  lo,
  hi,
  range
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      display: 'inline-flex',
      color: 'var(--forest)',
      flex: 'none'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 210,
      fontSize: 22,
      color: 'var(--ink)',
      flex: 'none'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      position: 'relative',
      height: 13,
      background: 'var(--track-grey)',
      borderRadius: 999
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: `${lo * 100}%`,
      width: `${(hi - lo) * 100}%`,
      background: 'var(--forest)',
      borderRadius: 999
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 132,
      textAlign: 'right',
      fontSize: 23,
      fontWeight: 800,
      color: 'var(--forest)',
      flex: 'none'
    }
  }, range));
}

// ---- Big startup-cost range bar (hatched amber pill) · p4 -------------------
function BigRange({
  lo = 0.16,
  hi = 0.9
}) {
  const hid = hatchId('rng');
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 30,
      background: 'var(--track-grey)',
      borderRadius: 999
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "0",
    height: "0"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: hid,
    width: "7",
    height: "7",
    patternTransform: "rotate(45)",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "7",
    stroke: "var(--amber)",
    strokeWidth: "2",
    strokeOpacity: "0.55"
  })))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -2,
      bottom: -2,
      left: `${lo * 100}%`,
      width: `${(hi - lo) * 100}%`,
      border: '2.5px solid var(--amber)',
      borderRadius: 999,
      background: `url(#${hid})`,
      backgroundColor: 'rgba(200,128,56,0.06)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
      fontSize: 20,
      color: 'var(--body-grey)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "$0"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, "total startup cost"), /*#__PURE__*/React.createElement("span", null, "$450K")));
}

// ---- Lucide-style monoline icons -------------------------------------------
function Ico({
  d,
  size = 26,
  sw = 2,
  children,
  vb = 24
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${vb} ${vb}`,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, children || /*#__PURE__*/React.createElement("path", {
    d: d
  }));
}
const IconTrend = p => /*#__PURE__*/React.createElement(Ico, p, /*#__PURE__*/React.createElement("polyline", {
  points: "3 17 9 11 13 15 21 7"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "15 7 21 7 21 13"
}));
const IconBars = p => /*#__PURE__*/React.createElement(Ico, p, /*#__PURE__*/React.createElement("line", {
  x1: "6",
  y1: "20",
  x2: "6",
  y2: "14"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "20",
  x2: "12",
  y2: "9"
}), /*#__PURE__*/React.createElement("line", {
  x1: "18",
  y1: "20",
  x2: "18",
  y2: "5"
}));
const IconClock = p => /*#__PURE__*/React.createElement(Ico, p, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "8"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "12 8 12 12 15 14"
}));
const IconHome = p => /*#__PURE__*/React.createElement(Ico, p, /*#__PURE__*/React.createElement("path", {
  d: "M4 11 L12 4 L20 11"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6 10 V20 H18 V10"
}));
const IconCup = p => /*#__PURE__*/React.createElement(Ico, p, /*#__PURE__*/React.createElement("path", {
  d: "M5 8 H16 V14 C16 16.2 14.2 18 12 18 H9 C6.8 18 5 16.2 5 14 Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 9 C19 9 19.5 13 16 13.5"
}), /*#__PURE__*/React.createElement("line", {
  x1: "6",
  y1: "3.5",
  x2: "6",
  y2: "5.5"
}), /*#__PURE__*/React.createElement("line", {
  x1: "10",
  y1: "3.5",
  x2: "10",
  y2: "5.5"
}));
const IconUsers = p => /*#__PURE__*/React.createElement(Ico, p, /*#__PURE__*/React.createElement("circle", {
  cx: "9",
  cy: "8",
  r: "3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3.5 19 C3.5 15 6 13.5 9 13.5 C12 13.5 14.5 15 14.5 19"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 6.5 C18 6.5 19 8 19 9.5 C19 11 18 12.5 16 12.5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M17 13.7 C19.5 14.2 20.8 15.8 20.8 18.5"
}));
const IconBox = p => /*#__PURE__*/React.createElement(Ico, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 3 L20 7 V16 L12 20 L4 16 V7 Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 7 L12 11 L20 7"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 11 V20"
}));
const IconMega = p => /*#__PURE__*/React.createElement(Ico, p, /*#__PURE__*/React.createElement("path", {
  d: "M4 10 V14 H7 L14 18 V6 L7 10 Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M17 9 C19 11 19 13 17 15"
}));
const IconDoc = p => /*#__PURE__*/React.createElement(Ico, p, /*#__PURE__*/React.createElement("path", {
  d: "M7 3 H14 L18 7 V21 H7 Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M14 3 V7 H18"
}), /*#__PURE__*/React.createElement("line", {
  x1: "9.5",
  y1: "12",
  x2: "15",
  y2: "12"
}), /*#__PURE__*/React.createElement("line", {
  x1: "9.5",
  y1: "16",
  x2: "15",
  y2: "16"
}));
const IconPin = p => /*#__PURE__*/React.createElement(Ico, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 21 C 12 21 5 14.5 5 9.5 C 5 5.9 8.1 3 12 3 C 15.9 3 19 5.9 19 9.5 C 19 14.5 12 21 12 21 Z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "9.5",
  r: "2.4"
}));
const IconCupSmall = p => /*#__PURE__*/React.createElement(Ico, p, /*#__PURE__*/React.createElement("path", {
  d: "M6 9 H16 V13 C16 15.2 14.2 17 12 17 H10 C7.8 17 6 15.2 6 13 Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 10 C18.5 10 18.5 13.5 16 13.5"
}), /*#__PURE__*/React.createElement("line", {
  x1: "8",
  y1: "5",
  x2: "8",
  y2: "7"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "5",
  x2: "12",
  y2: "7"
}));

// ---- Sample trend line · p6 (forest line, amber end, 'growing') ------------
function SampleTrend({
  w = 920,
  h = 220
}) {
  const hid = hatchId('st');
  const vals = [16, 18, 16, 26, 28, 22, 40, 44, 38, 58, 76, 100];
  const n = vals.length,
    pad = 6;
  const X = i => pad + (w - 2 * pad) * i / (n - 1);
  const Y = v => h - 24 - (h - 44) * v / 100;
  const line = vals.map((v, i) => `${X(i)},${Y(v)}`).join(' ');
  const area = `M ${X(0)},${Y(vals[0])} ` + vals.map((v, i) => `L ${X(i)},${Y(v)}`).join(' ') + ` L ${X(n - 1)},${h - 24} L ${X(0)},${h - 24} Z`;
  return /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: h,
    viewBox: `0 0 ${w} ${h}`,
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: hid,
    width: "7",
    height: "7",
    patternTransform: "rotate(45)",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "7",
    stroke: "var(--forest)",
    strokeWidth: "1.2",
    strokeOpacity: "0.2"
  }))), /*#__PURE__*/React.createElement("line", {
    x1: pad,
    y1: h - 24,
    x2: w - pad,
    y2: h - 24,
    stroke: "var(--track-grey)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: `url(#${hid})`
  }), /*#__PURE__*/React.createElement("polyline", {
    points: line,
    fill: "none",
    stroke: "var(--forest)",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: X(0),
    cy: Y(vals[0]),
    r: "6",
    fill: "var(--paper)",
    stroke: "var(--forest)",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: X(n - 1),
    cy: Y(vals[n - 1]),
    r: "8",
    fill: "var(--amber)"
  }), /*#__PURE__*/React.createElement("text", {
    x: w - pad,
    y: Y(vals[n - 1]) - 22,
    textAnchor: "end",
    fontFamily: "var(--font-annotation)",
    fontWeight: "700",
    fontSize: "26",
    fill: "var(--amber)"
  }, '\u2191 growing'));
}

// ---- Mini traffic chart · p7 (lime on deep green) --------------------------
function MiniTraffic({
  w = 230,
  h = 120
}) {
  const vals = [70, 84, 88, 86, 30];
  const xs = [10, 70, 120, 150, 215];
  const Y = v => 80 - v / 100 * 56;
  const line = vals.map((v, i) => `${xs[i]},${Y(v)}`).join(' ');
  return /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: h,
    viewBox: `0 0 ${w} ${h}`,
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "150",
    y1: "14",
    x2: "150",
    y2: "86",
    stroke: "var(--dark-3)",
    strokeWidth: "1.5",
    strokeDasharray: "3 4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: line,
    fill: "none",
    stroke: "var(--lime)",
    strokeWidth: "2.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), xs.map((x, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: x,
    cy: Y(vals[i]),
    r: "3.2",
    fill: "var(--lime)"
  })), /*#__PURE__*/React.createElement("text", {
    x: "10",
    y: "104",
    fontFamily: "var(--font-structure)",
    fontWeight: "600",
    fontSize: "14",
    letterSpacing: "0.08em",
    fill: "var(--dark-text)"
  }, "6 AM"), /*#__PURE__*/React.createElement("text", {
    x: "124",
    y: "104",
    fontFamily: "var(--font-structure)",
    fontWeight: "600",
    fontSize: "14",
    letterSpacing: "0.08em",
    fill: "var(--dark-text)"
  }, "2 PM"), /*#__PURE__*/React.createElement("text", {
    x: "186",
    y: "104",
    fontFamily: "var(--font-structure)",
    fontWeight: "600",
    fontSize: "14",
    letterSpacing: "0.08em",
    fill: "var(--dark-text)"
  }, "close"));
}
Object.assign(window, {
  CupRow,
  BeanRow,
  BoomerFace,
  CalloutCard,
  CafeCounter,
  SpanRow,
  BigRange,
  IconTrend,
  IconBars,
  IconClock,
  IconHome,
  IconCup,
  IconUsers,
  IconBox,
  IconMega,
  IconDoc,
  IconPin,
  IconCupSmall,
  SampleTrend,
  MiniTraffic
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/instagram/Illustrations.jsx", error: String((e && e.message) || e) }); }

// ui_kits/instagram/PostShell.jsx
try { (() => {
// PostShell — the 1080x1350 canvas every BrewInsight post shares:
// corner-bracket frame, eyebrow + trailing rule, content, footer (meta · wordmark).
// Matches the published artwork: no top-right mark, body top-aligned, no footer divider.
const {
  Logo,
  Eyebrow,
  CornerFrame
} = window.BrewInsightDesignSystem_a940df;
function PostShell({
  tone = 'cream',
  eyebrow,
  eyebrowIcon = null,
  handle = '@BREWINSIGHT',
  footerMeta = '@BrewInsight',
  children,
  align = 'start',
  // 'start' (default) | 'center'
  pad = '84px 76px'
}) {
  const dark = tone === 'dark';
  const bg = dark ? 'var(--deep-green)' : 'var(--paper)';
  const fg = dark ? 'var(--paper)' : 'var(--ink)';
  const frameColor = dark ? 'var(--paper)' : 'var(--ink)';
  const eyeColor = dark ? 'var(--dark-text)' : 'var(--body-grey)';
  const ruleColor = dark ? 'var(--dark-3)' : 'var(--track-grey)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1080,
      height: 1350,
      background: bg,
      color: fg,
      fontFamily: 'var(--font-structure)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bi-graph-paper",
    style: {
      position: 'absolute',
      inset: 0,
      opacity: dark ? 0.5 : 1,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement(CornerFrame, {
    variant: dark ? 'hud' : 'clean',
    color: frameColor,
    style: {
      position: 'absolute',
      inset: 0,
      padding: pad,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18
    }
  }, eyebrowIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: eyeColor
    }
  }, eyebrowIcon), /*#__PURE__*/React.createElement(Eyebrow, {
    handle: handle,
    color: eyeColor
  }, eyebrow), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      flex: 1,
      height: 1.5,
      background: ruleColor
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      paddingTop: 30,
      minHeight: 0
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      color: dark ? 'var(--dark-text)' : 'var(--body-grey)',
      fontWeight: 400
    }
  }, footerMeta), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      letterSpacing: '0.28em',
      fontSize: 17,
      color: dark ? 'var(--dark-text)' : 'var(--sketch-detail)',
      paddingLeft: '0.28em'
    }
  }, "BREWINSIGHT"))));
}
Object.assign(window, {
  PostShell
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/instagram/PostShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/instagram/Posts.jsx
try { (() => {
// The seven canonical BrewInsight posts (data-viz direction), reverse-built to
// match the published artwork in _ref/. Each composes the design-system kit
// inside PostShell. 1080x1350 artifacts. Exported to window for the feed.
const {
  SourceBadge,
  Button,
  TrendChart
} = window.BrewInsightDesignSystem_a940df;
const {
  PostShell,
  CupRow,
  BeanRow,
  BoomerFace,
  CalloutCard,
  CafeCounter,
  SpanRow,
  BigRange,
  IconTrend,
  IconBars,
  IconClock,
  IconHome,
  IconCup,
  IconUsers,
  IconBox,
  IconMega,
  IconDoc,
  IconPin,
  IconCupSmall,
  SampleTrend,
  MiniTraffic
} = window;
function Headline({
  children,
  size = 78,
  color = 'var(--ink)',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: size,
      fontWeight: 900,
      lineHeight: 0.99,
      letterSpacing: '-0.015em',
      margin: 0,
      color,
      textWrap: 'balance',
      ...style
    }
  }, children);
}
function Sub({
  children,
  color = 'var(--body-grey)',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 30,
      lineHeight: 1.32,
      color,
      margin: '22px 0 0',
      maxWidth: 880,
      fontWeight: 500,
      ...style
    }
  }, children);
}
function StatFig({
  figure,
  caption,
  color = 'var(--ink)',
  capColor = 'var(--body-grey)'
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 60,
      fontWeight: 800,
      color,
      lineHeight: 1,
      letterSpacing: '-0.01em'
    }
  }, figure), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 21,
      lineHeight: 1.28,
      color: capColor,
      marginTop: 10
    }
  }, caption));
}
const Dotted = ({
  dark
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    borderTop: `2px dotted ${dark ? 'var(--dark-3)' : 'var(--track-grey)'}`
  }
});
const Label = ({
  children,
  color = 'var(--forest)'
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 18,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color,
    fontWeight: 700
  }
}, children);

// ---- P1 · Matcha LA · all-time high (dark, lime) ---------------------------
function MatchaTrendPost() {
  return /*#__PURE__*/React.createElement(PostShell, {
    tone: "dark",
    eyebrow: "Trend Report",
    footerMeta: "@BrewInsight \xB7 insights for caf\xE9 owners"
  }, /*#__PURE__*/React.createElement(Headline, {
    size: 88,
    color: "var(--paper)"
  }, "Matcha in LA just hit an ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--lime)'
    }
  }, "all-time high.")), /*#__PURE__*/React.createElement(Sub, {
    color: "var(--dark-text)"
  }, "Search interest for \"matcha\" in Los Angeles, 2021 to today. Indexed 0\u2013100."), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '34px 0 6px'
    }
  }, /*#__PURE__*/React.createElement(TrendChart, {
    width: 924,
    height: 300,
    color: "var(--lime)",
    values: [12, 14, 13, 15, 18, 17, 20, 30, 46, 64, 84, 100],
    labels: ['2021', '', '', '', '', '2024', '', '', '', '', '', 'TODAY'],
    annotation: {
      text: 'ALL-TIME HIGH',
      index: 11,
      align: 'right'
    }
  })), /*#__PURE__*/React.createElement(SourceBadge, {
    state: "dark",
    label: "DATA"
  }, "GOOGLE TRENDS \xB7 LOS ANGELES"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 30
    }
  }, /*#__PURE__*/React.createElement(Headline, {
    size: 62,
    color: "var(--paper)"
  }, "So, what's your favorite ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--lime)'
    }
  }, "matcha spot?")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "lime",
    size: "lg",
    style: {
      fontSize: 30,
      padding: '20px 36px',
      fontWeight: 800
    }
  }, "Drop it in the comments \u2193"))));
}

// ---- P2 · Demographics · Millennials (cream) -------------------------------
function DemographicsPost() {
  return /*#__PURE__*/React.createElement(PostShell, {
    tone: "cream",
    eyebrow: "Demographics",
    footerMeta: "@BrewInsight"
  }, /*#__PURE__*/React.createElement(Headline, {
    size: 82
  }, "Millennials drink ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--forest)'
    }
  }, "40% of all coffee.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 40,
      alignItems: 'flex-start',
      margin: '40px 0 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(CupRow, {
    total: 10,
    filled: 4,
    columns: 5
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 24,
      lineHeight: 1.32,
      color: 'var(--ink)',
      margin: '28px 0 0',
      maxWidth: 440
    }
  }, "4 of every 10 cups sold go to Millennials (ages 27\u201342).")), /*#__PURE__*/React.createElement(CalloutCard, {
    style: {
      width: 360,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: 800,
      color: 'var(--forest)',
      letterSpacing: '0.01em'
    }
  }, "BOOMERS"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 22,
      lineHeight: 1.34,
      color: 'var(--ink)',
      margin: '12px 0 0'
    }
  }, "buy fewer cups overall, but ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--forest)'
    }
  }, "drink the most per day"), " of any generation."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(BoomerFace, {
    w: 150
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 30,
      display: 'flex',
      flexDirection: 'column',
      gap: 26
    }
  }, /*#__PURE__*/React.createElement(Dotted, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 30
    }
  }, /*#__PURE__*/React.createElement(StatFig, {
    figure: "75%",
    color: "var(--forest)",
    caption: "of 25\u201339 year-olds drink coffee daily"
  }), /*#__PURE__*/React.createElement(StatFig, {
    figure: "51%",
    color: "var(--forest)",
    caption: "of Gen Z buy it as a treat, not for energy"
  }), /*#__PURE__*/React.createElement(StatFig, {
    figure: "$2K",
    color: "var(--amber)",
    caption: "the average Millennial spends on coffee a year"
  })), /*#__PURE__*/React.createElement(SourceBadge, {
    state: "light",
    label: "SOURCE"
  }, "NCA \xB7 STATISTA \xB7 US DATA")));
}

// ---- P3 · Beans · Arabica (cream) ------------------------------------------
function BeansPost() {
  return /*#__PURE__*/React.createElement(PostShell, {
    tone: "cream",
    eyebrow: "Beans",
    footerMeta: "@BrewInsight"
  }, /*#__PURE__*/React.createElement(Headline, {
    size: 84
  }, "3 in 4 cups are ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--forest)'
    }
  }, "Arabica.")), /*#__PURE__*/React.createElement(Sub, null, "Arabica is 75% of the beans people actually buy."), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '44px 0 0',
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(BeanRow, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 26,
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(Label, null, "The rest of the shelf"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 30
    }
  }, /*#__PURE__*/React.createElement(StatFig, {
    figure: /*#__PURE__*/React.createElement(React.Fragment, null, "96", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 30,
        color: 'var(--body-grey)'
      }
    }, "/100")),
    color: "var(--forest)",
    caption: "Single-origin search interest (0\u2013100), now the fastest-growing bean"
  }), /*#__PURE__*/React.createElement(StatFig, {
    figure: "25%",
    color: "var(--forest)",
    caption: "Robusta, steady and mostly in espresso blends"
  }), /*#__PURE__*/React.createElement(StatFig, {
    figure: "$10K",
    color: "var(--amber)",
    caption: "Panama Geisha per kg, the rarest and priciest bean"
  })), /*#__PURE__*/React.createElement(SourceBadge, {
    state: "light",
    label: "SOURCE"
  }, "USDA \xB7 PERFECT DAILY GRIND")));
}

// ---- P4 · Finance · café startup cost (cream, amber lead) -------------------
function CafeCostPost() {
  const cats = [[/*#__PURE__*/React.createElement(IconHome, {
    size: 26
  }), 'Rent & build-out', 0.19, 0.94, '$30–150K'], [/*#__PURE__*/React.createElement(IconCup, {
    size: 26
  }), 'Equipment', 0.125, 0.25, '$20–40K'], [/*#__PURE__*/React.createElement(IconUsers, {
    size: 26
  }), 'Staffing · 3 mo', 0.094, 0.25, '$15–40K'], [/*#__PURE__*/React.createElement(IconBox, {
    size: 26
  }), 'Opening inventory', 0.031, 0.156, '$5–25K'], [/*#__PURE__*/React.createElement(IconMega, {
    size: 26
  }), 'Marketing & launch', 0.0125, 0.0625, '$2–10K'], [/*#__PURE__*/React.createElement(IconDoc, {
    size: 26
  }), 'Licenses & permits', 0.003, 0.031, '$0.5–5K']];
  return /*#__PURE__*/React.createElement(PostShell, {
    tone: "cream",
    eyebrow: "Finance",
    footerMeta: "Per-category scale: $0\u2013$160K \xB7 @BrewInsight",
    pad: "76px 76px"
  }, /*#__PURE__*/React.createElement(Headline, {
    size: 64
  }, "Opening a caf\xE9 costs"), /*#__PURE__*/React.createElement(Headline, {
    size: 96,
    color: "var(--amber)",
    style: {
      marginTop: 2
    }
  }, "$80K\u2013$400K."), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '26px 0 0'
    }
  }, /*#__PURE__*/React.createElement(BigRange, {
    lo: 0.16,
    hi: 0.9
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 30,
      lineHeight: 1.3,
      color: 'var(--ink)',
      margin: '24px 0 0',
      fontWeight: 600
    }
  }, "That's a ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--amber)'
    }
  }, "5\xD7 swing"), ", and rent decides most of where you land."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '14px 0 6px'
    }
  }, /*#__PURE__*/React.createElement(CafeCounter, {
    w: 300
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-annotation)',
      fontWeight: 600,
      fontSize: 24,
      color: 'var(--body-grey)',
      marginTop: 2
    }
  }, "most of it lives behind the counter")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Label, null, "Where the money goes"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      color: 'var(--body-grey)'
    }
  }, "\xB7 low \u2192 high")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13
    }
  }, cats.map((c, i) => /*#__PURE__*/React.createElement(SpanRow, {
    key: i,
    icon: c[0],
    label: c[1],
    lo: c[2],
    hi: c[3],
    range: c[4]
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 0,
      margin: '8px 132px 0 242px',
      fontSize: 17,
      color: 'var(--body-grey)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, "$0"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      textAlign: 'center'
    }
  }, "$80K"), /*#__PURE__*/React.createElement("span", null, "$160K")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(SourceBadge, {
    state: "amber",
    label: "SOURCE"
  }, "TOAST \xB7 CRIMSON CUP 2025"))));
}

// ---- P5 · Trend deep dive · +350% (cream) ----------------------------------
function MatchaDeepDivePost() {
  return /*#__PURE__*/React.createElement(PostShell, {
    tone: "cream",
    eyebrow: "Trend Deep Dive",
    footerMeta: "@BrewInsight"
  }, /*#__PURE__*/React.createElement(Headline, {
    size: 66
  }, "Matcha searches are"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 168,
      fontWeight: 900,
      color: 'var(--forest)',
      lineHeight: 0.86,
      letterSpacing: '-0.02em',
      margin: '4px 0'
    }
  }, "+350%"), /*#__PURE__*/React.createElement(Headline, {
    size: 66
  }, "since 2021."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 924,
      margin: '40px 0 0'
    }
  }, /*#__PURE__*/React.createElement(TrendChart, {
    width: 924,
    height: 300,
    color: "var(--forest)",
    values: [22, 23, 22, 24, 28, 40, 60, 82, 100],
    labels: ['2021', '', '', '', '2024', '', '', '', '2026'],
    annotation: {
      text: 'ALL-TIME HIGH',
      index: 8,
      align: 'right'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 474,
      top: 156,
      fontFamily: 'var(--font-annotation)',
      fontWeight: 700,
      fontSize: 30,
      color: 'var(--forest)'
    }
  }, "Took off \xB7 Sep '24"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 453,
      top: 196,
      width: 18,
      height: 18,
      borderRadius: '50%',
      border: '2px solid var(--forest)',
      background: 'var(--paper)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(SourceBadge, {
    state: "amber",
    label: "DATA"
  }, "GOOGLE TRENDS \xB7 UNITED STATES")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 30
    }
  }, /*#__PURE__*/React.createElement(StatFig, {
    figure: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-annotation)',
        fontSize: 64
      }
    }, "Sep '24"),
    color: "var(--forest)",
    caption: "when matcha searches took off"
  }), /*#__PURE__*/React.createElement(StatFig, {
    figure: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-annotation)',
        fontSize: 64
      }
    }, "May '26"),
    color: "var(--forest)",
    caption: "all-time high, still climbing"
  }), /*#__PURE__*/React.createElement(StatFig, {
    figure: /*#__PURE__*/React.createElement(React.Fragment, null, "100", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 30,
        color: 'var(--body-grey)'
      }
    }, "/100")),
    caption: "peak search interest on the index"
  })), /*#__PURE__*/React.createElement(Headline, {
    size: 42,
    style: {
      marginTop: 26
    }
  }, "Matcha didn't just trend. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--forest)'
    }
  }, "It became a staple."))));
}

// ---- P6 · Start here · intro (cream) ---------------------------------------
function IntroPost() {
  const feats = [[/*#__PURE__*/React.createElement(IconTrend, {
    size: 34
  }), 'Weekly Café Trends', 'What drinks, vibes, and experiences are blowing up, so you stay ahead of the curve.'], [/*#__PURE__*/React.createElement(IconBars, {
    size: 34
  }), 'Review Breakdowns', 'We dig into real Google and Yelp reviews: what customers love, and what keeps them coming back.'], [/*#__PURE__*/React.createElement(IconClock, {
    size: 34
  }), 'Actionable Insights', 'No jargon, no fluff. Just clear takeaways you can bring to your café this week.']];
  return /*#__PURE__*/React.createElement(PostShell, {
    tone: "cream",
    eyebrow: "Start Here",
    eyebrowIcon: /*#__PURE__*/React.createElement(IconPin, {
      size: 22
    }),
    footerMeta: "Follow for weekly insights."
  }, /*#__PURE__*/React.createElement(Headline, {
    size: 104
  }, "Own a caf\xE9?", /*#__PURE__*/React.createElement("br", null), "We got ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--forest)'
    }
  }, "you.")), /*#__PURE__*/React.createElement(Sub, {
    style: {
      fontSize: 31,
      marginTop: 26
    }
  }, "Your customers are leaving clues in their reviews. We turn that data into something you can actually use."), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '40px 0 0',
      display: 'flex',
      flexDirection: 'column'
    }
  }, feats.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 26,
      alignItems: 'flex-start',
      padding: '24px 0',
      borderTop: i ? '2px dotted var(--track-grey)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--forest)',
      flex: 'none',
      marginTop: 4
    }
  }, f[0]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 800,
      color: 'var(--ink)'
    }
  }, f[1]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 23,
      lineHeight: 1.34,
      color: 'var(--body-grey)',
      marginTop: 6,
      maxWidth: 760
    }
  }, f[2]))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 18
    }
  }, /*#__PURE__*/React.createElement(SampleTrend, {
    w: 924,
    height: 200
  }), /*#__PURE__*/React.createElement(Label, {
    color: "var(--sketch-detail)"
  }, "Sample trend data")));
}

// ---- P7 · Café insight · golden window (dark) ------------------------------
function GoldenWindowPost() {
  return /*#__PURE__*/React.createElement(PostShell, {
    tone: "dark",
    eyebrow: "Caf\xE9 Insight",
    eyebrowIcon: /*#__PURE__*/React.createElement(IconCupSmall, {
      size: 22
    }),
    footerMeta: "@BrewInsight"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--dark-3)',
      fontWeight: 600,
      marginBottom: 14
    }
  }, "Did you know?"), /*#__PURE__*/React.createElement(Headline, {
    size: 92,
    color: "var(--paper)"
  }, "6\u20139 AM is your ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--amber)'
    }
  }, "golden"), " window."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 31,
      lineHeight: 1.4,
      margin: '36px 0 0',
      maxWidth: 900,
      color: 'var(--dark-text)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--lime)',
      fontWeight: 600
    }
  }, "83% of coffee drinkers"), " have their first cup before noon. If you're not ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--paper)'
    }
  }, "fully ready, fully staffed, and fully stocked"), " by 6 AM, you're leaving money on the table."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      margin: '40px 0 0',
      padding: '34px 30px',
      border: '1px solid var(--dark-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -1,
      left: -1,
      width: 20,
      height: 20,
      borderTop: '2px solid var(--lime)',
      borderLeft: '2px solid var(--lime)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -1,
      right: -1,
      width: 20,
      height: 20,
      borderTop: '2px solid var(--lime)',
      borderRight: '2px solid var(--lime)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: -1,
      left: -1,
      width: 20,
      height: 20,
      borderBottom: '2px solid var(--lime)',
      borderLeft: '2px solid var(--lime)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: -1,
      right: -1,
      width: 20,
      height: 20,
      borderBottom: '2px solid var(--lime)',
      borderRight: '2px solid var(--lime)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 30,
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 76,
      fontWeight: 800,
      color: 'var(--lime)',
      lineHeight: 1
    }
  }, "66%"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      lineHeight: 1.34,
      color: 'var(--dark-text)',
      maxWidth: 320
    }
  }, "drop in caf\xE9 traffic after 2 PM. ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--paper)'
    }
  }, "The afternoon won't make it up."))), /*#__PURE__*/React.createElement(MiniTraffic, {
    w: 230,
    height: 120
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 30
    }
  }, /*#__PURE__*/React.createElement(Headline, {
    size: 56,
    color: "var(--paper)"
  }, "Not winning the morning?", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--lime)'
    }
  }, "You're not winning.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement(SourceBadge, {
    state: "dark",
    label: "SOURCE"
  }, "NCA \xB7 DRIVE RESEARCH \xB7 EUROPEAN HEART JOURNAL"))));
}
Object.assign(window, {
  MatchaTrendPost,
  DemographicsPost,
  BeansPost,
  CafeCostPost,
  MatchaDeepDivePost,
  IntroPost,
  GoldenWindowPost
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/instagram/Posts.jsx", error: String((e && e.message) || e) }); }

__ds_ns.DonutGauge = __ds_scope.DonutGauge;

__ds_ns.HudPanel = __ds_scope.HudPanel;

__ds_ns.Pictograph = __ds_scope.Pictograph;

__ds_ns.RangeBar = __ds_scope.RangeBar;

__ds_ns.TrendChart = __ds_scope.TrendChart;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.CornerFrame = __ds_scope.CornerFrame;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.SourceBadge = __ds_scope.SourceBadge;

__ds_ns.StatCard = __ds_scope.StatCard;

})();
