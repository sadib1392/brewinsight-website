# BrewInsight — Website

> ## ⚠️ The site is in pre-launch lockdown
>
> Every real page loads `gate.js` first, which sends visitors to `splash.html`
> (the animated "brewing something up" holding page) unless this browser has
> been unlocked once with the access link.
>
> - **Unlock a device:** `https://brewinsight.io/?access=<TOKEN>` (token is in `gate.js`)
> - **Re-lock a device:** `https://brewinsight.io/?access=out`
>
> The unlock is stored in that browser's `localStorage`, so it is per browser,
> per device. Safari on iOS can clear script-set storage after ~7 days of not
> visiting, so keep the unlock link bookmarked.
>
> **To go live:** delete the `<script src="gate.js">` line and the `noindex`
> meta tag from the five page files, then delete `gate.js` and `splash.html`
> (keep `404.html` if you still want a branded 404). Nothing else depends on them.
>
> **Before you delete `splash.html`, export the launch list** — the addresses
> only exist in the brewinsight@gmail.com inbox, not in this repo. See below.
>
> **This is a curtain, not a vault.** GitHub Pages is a static host with no
> server-side auth, so the page source is still served to anyone who asks for
> it — a determined person can read it with JavaScript disabled. For a real
> lock, put Cloudflare Access in front of the domain or move the pages to an
> unguessable path.

## Launch-list signup (splash page)

`splash.html` (and its byte-identical twin `404.html`) carries an email field so
visitors can be told when the product opens. GitHub Pages is a static host with
no server, so the form posts to **[FormSubmit](https://formsubmit.co)**, a free
relay that forwards each submission as an email to **brewinsight@gmail.com**.

There is no account and no API key. The destination is just the address in the
form's `action`:

```html
<form action="https://formsubmit.co/brewinsight@gmail.com" method="POST">
```

### ⚠️ Activate it once, on the first submission

FormSubmit emails brewinsight@gmail.com a confirmation link the first time the
form is used. **Click it once and the form is live permanently.** Until that
click, submissions bounce and the visitor sees the error state.

So after this deploys: open the splash page, submit your own address, then open
brewinsight@gmail.com and click the link. Every form-to-email relay does this —
it is what stops the service being an open relay that lets anyone mail anyone.

### Hiding the inbox from scrapers

The address sits in the page source, where address-harvesting bots can read it.
Once activated, the FormSubmit dashboard shows a **hashed alias** pointing at the
same inbox. Swap it into the `action`:

```html
<form action="https://formsubmit.co/a1b2c3d4e5f6..." method="POST">
```

That attribute is the only place the endpoint lives — the AJAX URL is derived
from it in the script — so one edit moves both the JS and no-JS paths. Copy
`splash.html` over `404.html` afterward to keep the two in sync.

### How it behaves

- Submits over `fetch` to FormSubmit's JSON API and swaps in an inline "You're on
  the list" confirmation without leaving the page. A failed send re-enables the
  button and points the visitor at the email address.
- The `action`/`method` attributes on the `<form>` are the no-JavaScript path —
  it still submits, it just lands on the FormSubmit confirmation page.
- A visually-hidden `_honey` honeypot drops bot submissions.
- Fires a `launch_list_signup` GA event on success (the page already loads gtag).

**There is no list in this repo.** Every address lives in the
brewinsight@gmail.com inbox — the signups *are* the emails, so archive them into
a label rather than deleting them, and export before retiring the splash page.

---

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
