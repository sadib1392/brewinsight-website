# BrewInsight 3D — web handoff

Export of the Blender scene (`brewinsight-3d.blend`) for implementation on the BrewInsight site.

## Files

| File | What it is |
|---|---|
| `brewinsight-calc.glb` | **Use this.** Geometry + materials, no animation. 0.44 MB. |
| `brewinsight-calc-animated.glb` | Same, plus baked TRS animation clips. 0.53 MB. Reference/fallback — see caveats. |
| `brewinsight-lcd.js` | The terminal/graph screen, ported to a canvas texture. **Required** — this cannot live in a .glb. |

Model is in **metres**, Y-up (glTF convention), origin at the base of the composition.
Bounding size as exported: **0.303 × 0.605 × 0.127 m** (the tall Y includes steam risen at the
export frame). 22 meshes, 15 materials.

## Scene graph

```
BrewInsight_Brewing            root
├── mug_spin                   empty — world-Y spin pivot (glTF Y-up), sits on the mug's origin
│   └── mug                    empty — holds the mug's tilt
│       ├── mug_body, mug_handle, pulse_line, coffee_surface
│       └── steam_1 … steam_6  the six rising wisps
└── terminal_window            empty
    ├── window_shell           bulky body (75 mm deep)
    ├── bezel_top/bottom/left/right   faceplate rails around the screen
    ├── terminal_screen        216 × 144 mm, 3:2 — this is the LCD
    ├── light_green / light_yellow / light_red
    └── window_foot_1, window_foot_2
```

> `terminal_screen` loads as a **Group**, not a Mesh — the slab has two material slots, so it
> arrives as two primitives. The LCD face is the child using `lime_screen_display`; the other
> child (`lime_screen`) is the slab's edges. Resolve it like this:
>
> ```js
> let screenFace;
> gltf.scene.getObjectByName('terminal_screen')
>   .traverse(o => { if (o.material?.name === 'lime_screen_display') screenFace = o; });
> ```
>
> There is no `~ zsh` title-bar label in this export — that object was deleted in the .blend.

## Materials

| Material | Hex | Notes |
|---|---|---|
| `lime_screen_display` | tint `#98A48E` | LCD face. Base colour **multiplies** the screen texture — this is the screen-colour knob. |
| `lime_screen` | `#98A48E` | screen slab edges |
| `calc_faceplate` | `#C9D2BE` | bezel rails |
| `deep_green_shell` | `#1B2E1A` | terminal body + feet |
| `ceramic_cream` | `#F7F4EF` | mug — roughness 0.20, metallic 0.355 |
| `steam_vapor_01…06` | `#6B6B6B` | one per wisp, so each fades independently |
| `ink_charcoal` | `#6B6B6B`, alpha 0.25 | coffee surface only |
| `forest_green` | `#88C048` | pulse line + green light |
| `amber_signal` / `red_signal` | `#C88038` / `#A60C00` | traffic lights |

> **Heads-up on colours.** `forest_green`, `red_signal`, `ink_charcoal` and `ceramic_cream`'s
> metallic differ from the original `brewinsight-model.js` palette (`FOREST 0x386830`,
> `SIGNAL_RED 0xA6382B`, `INK 0x1A1A1A`, metallic 0). Those edits were already in the .blend.
> If the site should match the original brand palette, override them after load.

## Animation

Total show is **120 s @ 24 fps = 2880 frames**. All three animations are cheap to drive in JS —
that is the recommended route (see caveats).

### 1. Mug spin
Constant rotation about **world up**, through the mug's own origin — one revolution per **15 s**
(24°/s). Pivot is the `mug_spin` node; rotating it preserves the mug's forward tilt.

```js
mugSpin.rotation.y += (Math.PI * 2 / 15) * dt;   // glTF is Y-up
```

### 2. Steam — six wisps, infinite spawn
Each wisp runs a **5.5 s** lifecycle (132 frames @ 24 fps), staggered **22 frames apart**, so a new
one starts every 0.92 s and 5–6 are always in flight. Motion is along the **mug's local up** axis.

Keys, as fractions of the lifecycle (Blender used Bézier ease; `smoothstep` is close enough):

| t | rise (m) | scale × | opacity |
|---|---|---|---|
| 0.00 | 0.000 | 0.35 | 0.00 |
| 0.15 | 0.011 | 1.00 | 0.90 |
| 0.75 | 0.056 | 1.15 | 0.55 |
| 1.00 | 0.075 | 1.35 | 0.00 |

Opacity is 0 at both ends, which is what hides the reset — the wisp teleports back to the rim while
invisible. Per-wisp constants:

| wisp | phase (frames) | base scale | spin about mug up |
|---|---|---|---|
| steam_1 | 0 | 1.00 | 0° |
| steam_2 | 22 | 1.00 | 0° |
| steam_3 | 44 | 1.00 | 0° |
| steam_4 | 66 | 0.85 | 60° |
| steam_5 | 88 | 1.10 | 180° |
| steam_6 | 110 | 0.95 | 300° |

`steam_4/5/6` reuse the meshes of `steam_1/2/3` — they are the same three ribbon shapes, rotated
and rescaled.

### 3. Screen
See `brewinsight-lcd.js`. Timeline in frames:

- **1–264** — terminal types out, 180 chars, ending on `peak foot traffic`
- **265–384** — full text holds, cursor blinks (0.5 s on / off)
- **385–2880** — four polygons, **624 frames (26 s) each**: TRIANGLE → QUAD → PENTAGON → HEXAGON

Within each 624-frame segment: axes/grid draw over frames 12–60, polygon edges draw 60–252,
`AREA / PERIM` readout appears at 264, and a TRACE cross runs the perimeter from 288 to the end.

## Caveats — what the .glb cannot carry

1. **The screen is not animated in the .glb.** glTF has no image-sequence support, so a single
   still (`lcd_0700`, showing the triangle) is baked onto `terminal_screen`. Replace that map with
   the canvas texture from `brewinsight-lcd.js`. Do **not** ship the `lcd_frames/` PNG sequence —
   it is 2880 files / 56 MB.
2. **Steam opacity is not animated in the .glb.** glTF animation covers translation/rotation/scale
   only, not material properties. All six `steam_vapor_*` materials export at **alpha 1.0**
   (deliberately — a baked 0 would ship a permanently invisible wisp), so they load as
   `transparent: false, opacity: 1`. You must set `material.transparent = true` and drive
   `material.opacity` from the table above. Verified: each wisp loads its **own** material
   instance (`steam_1.material !== steam_4.material`), so no cloning is needed.
3. **The baked clips are inefficient.** `mug_spinAction` is 2880 sampled keys for what is one line
   of JS. The six `steam_*Action` clips are each 5.5 s starting at 0, so if you do use them, offset
   playback per wisp by its phase (0, 0.92, 1.83, 2.75, 3.67, 4.58 s) and loop.

## Suggested integration

Load `brewinsight-calc.glb`, then drive everything from one `requestAnimationFrame` loop:

```js
const lcd = createLCD();
const tex = new THREE.CanvasTexture(lcd.canvas);
tex.colorSpace = THREE.SRGBColorSpace;
tex.magFilter = THREE.NearestFilter;
screenMesh.material.map = tex;
screenMesh.material.color.set(LCD.TINT);

const frame = Math.floor(t * LCD.FPS) % LCD.TOTAL_FRAMES + 1;
if (lcd.draw(frame)) tex.needsUpdate = true;
```

The original `brewinsight-model.js` already built its screen as a live canvas texture, so this
matches the pattern the site was written around.
