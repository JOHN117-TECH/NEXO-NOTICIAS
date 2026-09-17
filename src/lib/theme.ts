export const THEME_STORAGE_KEY = "nexo-theme";
export type Theme = "light" | "dark";

// Runs before the page paints so a saved dark theme does not flash white.
export const themeInitializationScript = `(() => {
  let theme;
  try { theme = localStorage.getItem("${THEME_STORAGE_KEY}"); } catch {}
  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.dataset.theme = theme;
})();`;
