"use client";
import { createContext } from "react";
import type { Locale } from "@/lib";
export const LanguageContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
}>({ locale: "es", setLocale: () => {} });
