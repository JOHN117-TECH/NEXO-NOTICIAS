import english from "@/locales/en.json";
import articles from "@/locales/articles.en.json";
import videos from "@/locales/videos.en.json";
import opinions from "@/locales/opinions.en.json";
export type Locale = "es" | "en";
export const LANGUAGE_KEY = "nexo-language";
const catalog: Record<string, string> = { ...english, ...articles, ...videos, ...opinions };
function lookup(text: string, locale: Locale): string {
  if (locale === "es") return text;
  const key = text.replace(/\s+/g, " ").trim();
  if (catalog[key]) return catalog[key];
  const deleted = text.match(/^(\d+) noticias eliminadas\.$/);
  if (deleted) return `${deleted[1]} articles deleted.`;
  return text;
}

export function translate(
  text: string,
  locale: Locale,
  values: Record<string, string | number> = {},
): string {
  return lookup(text, locale).replace(/\{(\w+)\}/g, (match, key) =>
    values[key] === undefined ? match : String(values[key]),
  );
}
