"use client";
import { createContext } from "react";
import type { Locale } from "@/lib/i18n";
export const LanguageContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
}>({ locale: "es", setLocale: () => {} });
