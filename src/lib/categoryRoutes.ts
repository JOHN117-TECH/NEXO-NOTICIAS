import type { Locale } from "./i18n";
import { categories } from "./types";

const englishCategories: Record<(typeof categories)[number], string> = {
  Tecnología: "Technology",
  Educación: "Education",
  Turismo: "Travel",
  Actualidad: "Current affairs",
};

// Accept both languages so existing shared links keep the same filter.
export function categoryFromQuery(value: string | null) {
  return categories.find(
    (category) => category === value || englishCategories[category] === value,
  );
}

export function localizedCategory(value: string, locale: Locale) {
  const category = categoryFromQuery(value);
  if (!category) return value;
  return locale === "en" ? englishCategories[category] : category;
}
