# BrewInsight — Website

Marketing site for BrewInsight ("Insights for café owners"). Three pages — **About** (home), **Product & Pricing**, and **Contact** — built on the BrewInsight design system.

Imported from a [Claude Design](https://claude.ai/design) handoff bundle on **2026-06-19**
(project `d441e059-eadc-452b-b1eb-015a0af56d05`). The original prototypes are preserved verbatim so the rendered result stays pixel-identical to the design.

## Pages

| File | Page | Sections |
|---|---|---|
| `index.html` | About / home | Hero · What you get · Proof stats · Manifesto · CTA |
| `product.html` | Product & Pricing | Hero · Features · How it works · Pricing · FAQ |
| `contact.html` | Contact | Contact methods · message form (client-side only) |

## How it's built

These are **design prototypes**, not a build-tooled app. Each page renders client-side with no bundler:

- **React 18.3.1 (UMD)** + **`@babel/standalone`** transpile the inline `text/babel` scripts in the browser.
- **`shared.jsx`** holds the shared chrome (`SiteHeader`, `SiteFooter`, `Framed`, `Ico`, `useLucide`) and attaches it to `window`.
- **`_ds/brewinsight-design-system-a940dfe7-.../`** is the bundled design system. `_ds_bundle.js` exposes the components on `window.BrewInsightDesignSystem_a940df` (`Logo`, `Eyebrow`, `SourceBadge`, `StatCard`, `Button`, `Badge`, `TrendChart`, …); `styles.css` + `tokens/` carry the colors, type, spacing, and effects.
- **`site.css`** is the page-level chrome (layout, header/footer, buttons, cards, the corner-bracket frame) — all driven by design-system tokens.

The site is **self-contained**: it carries its own copy of the design system under `_ds/` and does not depend on the repo's root `BrewInsight Design System/` folder.

### External dependencies (loaded at runtime, need network)

- unpkg: `react`, `react-dom`, `@babel/standalone@7.29.0`, `lucide@latest`
- Google Fonts: **Inter** (400/500/600/700/800/900) + **Caveat** (600/700)

## Running it locally

Because `@babel/standalone` fetches `shared.jsx` over the network, opening the files directly via `file://` is blocked by the browser. Serve the folder over HTTP instead:

```bash
cd website
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

Any static server works (`npx serve`, etc.).

## Notes for a production build

The Claude Design handoff frames these as prototypes to be reimplemented in whatever fits the target stack. If/when this becomes a real site, the natural next step is to compile the JSX ahead of time (drop in-browser Babel), inline the Lucide icons, and pre-render the pages to static HTML — the visual target is exactly what's here.
