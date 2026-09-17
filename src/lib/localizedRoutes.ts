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
  for (const [es, en] of Object.entries(routes)) {
    if (pathname === es || pathname === en) {
      pathname = locale === "es" ? es : en;
      break;
    }
    if (
      es === "/noticias" &&
      (pathname.startsWith(es + "/") || pathname.startsWith(en + "/"))
    ) {
      pathname =
        (locale === "es" ? es : en) + pathname.slice(pathname.indexOf("/", 1));
      break;
    }
  }
  if (hash === "#categorias" || hash === "#categories")
    hash = locale === "es" ? "#categorias" : "#categories";
  return pathname + query + hash;
}
