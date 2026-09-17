"use client";
import { useContext, useCallback } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { localizedPath } from "@/lib/localizedRoutes";
import { translate } from "@/lib/i18n";
export function useI18n() {
  const { locale, setLocale } = useContext(LanguageContext);
  const t = useCallback(
    (text: string, values?: Record<string, string | number>) =>
      translate(text, locale, values),
    [locale],
  );
  const href = useCallback(
    (path: string) => localizedPath(path, locale),
    [locale],
  );
  return { locale, setLocale, t, href };
}
