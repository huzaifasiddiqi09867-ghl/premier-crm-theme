(() => {
  /* =========================================================
     PREMIER CRM THEME CONFIG (EDIT COLORS HERE)
  ========================================================== */
  const PREMIER_THEME = {
    // Brand colors
    primary: "#7F1DFF",
    primaryHover: "#6D28D9",
    primaryActive: "#5B21B6",
    primaryDisabled: "#B9A7FF",

    accent: "#F05C2A",        // optional
    accentSoft: "#FFF1ED",    // optional

    // UI accents
    tabUnderline: "#7F1DFF",
    link: "#7F1DFF",
    linkHover: "#6D28D9",

    // Typography
    fontFamily: "'Plus Jakarta Sans', sans-serif",

    // Optional: underline thickness
    tabUnderlineHeight: "3px"
  };

  /* =========================================================
     Helpers
  ========================================================== */
  const once = (id, createFn) => {
    if (document.getElementById(id)) return;
    createFn();
  };

  /* =========================================================
     1) Load Google Font
  ========================================================== */
  function ensureFontLoaded() {
    once("premier-font-plus-jakarta", () => {
      const fontLink = document.createElement("link");
      fontLink.id = "premier-font-plus-jakarta";
      fontLink.rel = "stylesheet";
      fontLink.href =
        "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap";
      document.head.appendChild(fontLink);
    });
  }

  /* =========================================================
     2) Apply global CSS (safe + fast)
  ========================================================== */
  function injectGlobalCSS() {
    once("premier-theme-style", () => {
      const style = document.createElement("style");
      style.id = "premier-theme-style";
      style.textContent = `
        :root, body, #app, input, button, textarea, select {
          font-family: ${PREMIER_THEME.fontFamily} !important;
        }

        /* Optional link theming */
        a, .hl-link, .text-primary, [class*="text-primary"] {
          color: ${PREMIER_THEME.link} !important;
        }
        a:hover, .hl-link:hover {
          color: ${PREMIER_THEME.linkHover} !important;
        }

        /* Optional tag styling (if you use tags section) */
        .tags-section { display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; }
        .tags-section .tag {
          background: rgba(127, 29, 255, 0.08);
          border: 1px solid rgba(127, 29, 255, 0.18);
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }
      `;
      document.head.appendChild(style);
    });
  }

  /* =========================================================
     3) Active tab underline bar color
  ========================================================== */
  function applyTabsBar() {
    document.querySelectorAll(".hr-tabs-bar").forEach((bar) => {
      bar.style.setProperty("background-color", PREMIER_THEME.tabUnderline, "important");
      bar.style.setProperty("height", PREMIER_THEME.tabUnderlineHeight, "important");
    });
  }

  /* =========================================================
     4) Primary buttons (Naive UI / GHL)
     Targets: button.n-button.n-button--primary-type
  ========================================================== */
  function applyPrimaryButtons() {
    const buttons = document.querySelectorAll("button.n-button.n-button--primary-type");
    buttons.forEach((btn) => {
      // Colors
      btn.style.setProperty("--n-color", PREMIER_THEME.primary, "important");
      btn.style.setProperty("--n-color-hover", PREMIER_THEME.primaryHover, "important");
      btn.style.setProperty("--n-color-pressed", PREMIER_THEME.primaryActive, "important");
      btn.style.setProperty("--n-color-focus", PREMIER_THEME.primaryHover, "important");
      btn.style.setProperty("--n-color-disabled", PREMIER_THEME.primaryDisabled, "important");

      // Borders
      btn.style.setProperty("--n-border", `1px solid ${PREMIER_THEME.primary}`, "important");
      btn.style.setProperty("--n-border-hover", `1px solid ${PREMIER_THEME.primaryHover}`, "important");
      btn.style.setProperty("--n-border-pressed", `1px solid ${PREMIER_THEME.primaryActive}`, "important");
      btn.style.setProperty("--n-border-focus", `1px solid ${PREMIER_THEME.primaryHover}`, "important");
      btn.style.setProperty("--n-border-disabled", `1px solid ${PREMIER_THEME.primaryDisabled}`, "important");

      // Ripple
      btn.style.setProperty("--n-ripple-color", PREMIER_THEME.primary, "important");

      // Extra: inner border layers Naive UI uses
      btn.querySelectorAll(".n-button__border, .n-button__state-border").forEach((el) => {
        el.style.setProperty("border-color", PREMIER_THEME.primary, "important");
      });
    });
  }

  /* =========================================================
     5) Remove inline style from help icon and keep it removed
  ========================================================== */
  function removeAndObserveInlineStyle(elementId) {
    const targetNode = document.getElementById(elementId);
    if (!targetNode) return;

    const removeStyle = () => {
      if (targetNode.hasAttribute("style")) {
        targetNode.removeAttribute("style");
      }
    };

    removeStyle();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "style") {
          removeStyle();
        }
      }
    });

    observer.observe(targetNode, { attributes: true, attributeFilter: ["style"] });
  }

  function applyHelpIconFix() {
    removeAndObserveInlineStyle("hl_header--help-icon");
  }

  /* =========================================================
     RUN ALL (SPA SAFE)
  ========================================================== */
  function runAll() {
    ensureFontLoaded();
    injectGlobalCSS();

    applyTabsBar();
    applyPrimaryButtons();
    applyHelpIconFix();
  }

  // Initial run
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runAll);
  } else {
    runAll();
  }

  // Keep applying on SPA rerenders
  const obs = new MutationObserver(() => runAll());
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
