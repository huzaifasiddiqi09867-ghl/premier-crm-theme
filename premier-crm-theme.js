(() => {
  /* ===============================
     PREMIER CRM – BRAND CONFIG
  ================================ */
  const BRAND = {
    primary: "#7F1DFF",
    hover: "#6D28D9",
    pressed: "#5B21B6",
    disabled: "#B9A7FF",
    tabUnderline: "#7F1DFF"
  };

  /* ===============================
     ACTIVE TAB UNDERLINE
  ================================ */
  function applyTabsBar() {
    document.querySelectorAll(".hr-tabs-bar").forEach(bar => {
      bar.style.setProperty("background-color", BRAND.tabUnderline, "important");
    });
  }

  /* ===============================
     PRIMARY BUTTON OVERRIDE
     (Naive UI / GHL)
  ================================ */
  function applyPrimaryButtons() {
    document
      .querySelectorAll("button.n-button.n-button--primary-type")
      .forEach(btn => {

        // Colors
        btn.style.setProperty("--n-color", BRAND.primary, "important");
        btn.style.setProperty("--n-color-hover", BRAND.hover, "important");
        btn.style.setProperty("--n-color-pressed", BRAND.pressed, "important");
        btn.style.setProperty("--n-color-focus", BRAND.hover, "important");
        btn.style.setProperty("--n-color-disabled", BRAND.disabled, "important");

        // Borders (FIXED – uses backticks)
        btn.style.setProperty("--n-border", `1px solid ${BRAND.primary}`, "important");
btn.style.setProperty("--n-border-hover", `1px solid ${BRAND.hover}`, "important");
btn.style.setProperty("--n-border-pressed", `1px solid ${BRAND.pressed}`, "important");
btn.style.setProperty("--n-border-focus", `1px solid ${BRAND.hover}`, "important");
btn.style.setProperty("--n-border-disabled", `1px solid ${BRAND.disabled}`, "important");


        // Ripple
        btn.style.setProperty("--n-ripple-color", BRAND.primary, "important");

        // Inner border layers (extra safety)
        btn.querySelectorAll(".n-button__border, .n-button__state-border").forEach(el => {
          el.style.setProperty("border-color", BRAND.primary, "important");
        });
      });
  }

  /* ===============================
     RUN + OBSERVE (SPA SAFE)
  ================================ */
  function run() {
    applyTabsBar();
    applyPrimaryButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  new MutationObserver(run).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true
  });
})();
