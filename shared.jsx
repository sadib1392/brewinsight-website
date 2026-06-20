/* Shared site chrome for BrewInsight — header, footer, small helpers.
 * Exports to window so each page's inline babel script can use them. */

const { useEffect } = React;
const _DS = window.BrewInsightDesignSystem_a940df;

/* Re-render Lucide icons after React paints. Lucide replaces [data-lucide]
 * <i> placeholders with inline SVG. */
function useLucide(deps = []) {
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, deps);
}

function Ico({ name, className = "ico" }) {
  return React.createElement("i", { "data-lucide": name, className });
}

/* The monoline mug + pulse mark, reused from the DS Logo. */
function BrandLink() {
  const { Logo } = _DS;
  return (
    React.createElement("a", { className: "brand-link", href: "index.html", "aria-label": "BrewInsight home" },
      React.createElement("span", { className: "mark" }, React.createElement(Logo, { variant: "mark", size: 34, color: "var(--forest)" })),
      React.createElement("span", { className: "word" }, "BrewInsight")
    )
  );
}

function SiteHeader({ active }) {
  const { useState, useEffect } = React;
  const [open, setOpen] = useState(false);
  const links = [
    { href: "index.html", label: "About", key: "about" },
    { href: "product.html", label: "Product", key: "product" },
    { href: "methodology.html", label: "Methodology", key: "methodology" },
    { href: "resources.html", label: "Resources", key: "resources" },
    { href: "contact.html", label: "Contact", key: "contact" },
  ];
  // re-render Lucide after the hamburger icon toggles (menu <-> x)
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [open]);
  const linkEls = (cls) => links.map(l =>
    React.createElement("a", {
      key: l.key,
      href: l.href,
      className: cls,
      "aria-current": active === l.key ? "page" : undefined,
      onClick: () => setOpen(false),
    }, l.label)
  );
  return (
    React.createElement("header", { className: "site-header" },
      React.createElement("div", { className: "container site-header__inner" },
        React.createElement(BrandLink, null),
        React.createElement("nav", { className: "nav", "aria-label": "Primary" },
          React.createElement("div", { className: "nav__links" }, linkEls("nav__link")),
          React.createElement("a", { className: "btn btn--forest nav__cta", href: "contact.html" },
            "Start free trial",
            React.createElement(Ico, { name: "arrow-right" })
          ),
          React.createElement("button", {
            className: "nav__toggle",
            type: "button",
            "aria-label": open ? "Close menu" : "Open menu",
            "aria-expanded": open ? "true" : "false",
            "aria-controls": "mobile-menu",
            onClick: () => setOpen(o => !o),
          }, React.createElement(Ico, { name: open ? "x" : "menu" }))
        )
      ),
      React.createElement("div", { id: "mobile-menu", className: "nav__mobile" + (open ? " is-open" : "") },
        React.createElement("div", { className: "container" },
          ...linkEls("nav__mobile-link"),
          React.createElement("a", { key: "cta", className: "btn btn--forest btn--lg nav__mobile-cta", href: "contact.html" },
            "Start free trial",
            React.createElement(Ico, { name: "arrow-right" })
          )
        )
      )
    )
  );
}

function SiteFooter() {
  return (
    React.createElement("footer", { className: "site-footer" },
      React.createElement("div", { className: "container site-footer__inner" },
        React.createElement("div", { className: "stack gap-3" },
          React.createElement("div", { className: "row gap-3" },
            React.createElement("span", { className: "mark", style: { color: "var(--forest)", display: "inline-flex" } },
              React.createElement(_DS.Logo, { variant: "mark", size: 30, color: "var(--forest)" })
            ),
            React.createElement("span", { className: "word", style: { fontWeight: "var(--fw-semibold)", letterSpacing: "var(--track-wordmark)", textTransform: "uppercase", fontSize: "var(--ui-base)" } }, "BrewInsight")
          ),
          React.createElement("span", { className: "meta" }, "Insights for café owners. ☕"),
          React.createElement("nav", { className: "footer-nav", "aria-label": "Footer" },
            React.createElement("a", { href: "index.html" }, "About"),
            React.createElement("a", { href: "product.html" }, "Product"),
            React.createElement("a", { href: "methodology.html" }, "Methodology"),
            React.createElement("a", { href: "resources.html" }, "Resources"),
            React.createElement("a", { href: "contact.html" }, "Contact"),
            React.createElement("a", { href: "https://instagram.com/brewinsight", target: "_blank", rel: "noopener" }, "@brewinsight")
          )
        ),
        React.createElement("div", { className: "stack", style: { alignItems: "flex-end", gap: "8px" } },
          React.createElement("span", { className: "word" }, "BREWINSIGHT"),
          React.createElement("span", { className: "meta" }, "© 2026 BrewInsight")
        )
      )
    )
  );
}

/* Corner-bracket frame wrapper (the signature device). */
function Framed({ children, style, className = "" }) {
  return (
    React.createElement("div", { className: "framed " + className, style },
      React.createElement("span", { className: "corner tl", "aria-hidden": "true" }),
      React.createElement("span", { className: "corner tr", "aria-hidden": "true" }),
      React.createElement("span", { className: "corner bl", "aria-hidden": "true" }),
      React.createElement("span", { className: "corner br", "aria-hidden": "true" }),
      children
    )
  );
}

Object.assign(window, { useLucide, Ico, BrandLink, SiteHeader, SiteFooter, Framed });
