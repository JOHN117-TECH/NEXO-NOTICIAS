import type { Locale } from "./i18n";
const routes: Record<string, string> = {
  "/": "/en",
  "/noticias": "/news",
  "/favoritos": "/favorites",
  "/contacto": "/contact",
};
export function localeFromPath(pathname: string): Locale {
  return /^\/(en|news|favorites|contact)(\/|$)/.test(pathname) ? "en" : "es";
}
export function localizedPath(href: string, locale: Locale): string {
  if (
    !href.startsWith("/") ||
    href.startsWith("//") ||
    href.startsWith("/api/")
  )
    return href;
  const match = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  if (!match) return href;
  let [, pathname, query = "", hash = ""] = match;
  pathname = pathname.replace(/\/$/, "") || "/";
  let matched = false;
  for (const [es, en] of Object.entries(routes)) {
    if (pathname === es || pathname === en) {
      pathname = locale === "es" ? es : en;
      matched = true;
      break;
    }
    if (
      es !== "/" &&
      (pathname.startsWith(es + "/") || pathname.startsWith(en + "/"))
    ) {
      pathname =
        (locale === "es" ? es : en) + pathname.slice(pathname.indexOf("/", 1));
      matched = true;
      break;
    }
  }
  // Preserve an unknown URL when switching languages on the 404 page.
  if (!matched) {
    if (pathname.startsWith("/en/")) {
      if (locale === "es") pathname = pathname.slice(3);
    } else if (locale === "en") {
      pathname = "/en" + pathname;
    }
  }
  if (hash === "#categorias" || hash === "#categories")
    hash = locale === "es" ? "#categorias" : "#categories";
  return pathname + query + hash;
}
