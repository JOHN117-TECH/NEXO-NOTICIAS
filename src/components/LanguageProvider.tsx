"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LanguageContext } from "@/contexts";
import { LANGUAGE_KEY, type Locale, localeFromPath, localizedPath } from "@/lib";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const locale = localeFromPath(pathname);
  const initialized = useRef(false);
  useEffect(() => {
    document.documentElement.lang = locale;
    if (!initialized.current) {
      initialized.current = true;
      try {
        if (pathname === "/" && localStorage.getItem(LANGUAGE_KEY) === "en") {
          router.replace(
            localizedPath(
              pathname + window.location.search + window.location.hash,
              "en",
            ),
            { scroll: false },
          );
          return;
        }
      } catch {}
    }
    try {
      localStorage.setItem(LANGUAGE_KEY, locale);
    } catch {}
  }, [locale, pathname, router]);
  function setLocale(next: Locale) {
    try {
      localStorage.setItem(LANGUAGE_KEY, next);
    } catch {}
    router.replace(
      localizedPath(
        pathname + window.location.search + window.location.hash,
        next,
      ),
      { scroll: false },
    );
  }
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (
        event.key === LANGUAGE_KEY &&
        (event.newValue === "es" || event.newValue === "en")
      ) {
        router.replace(
          localizedPath(
            pathname + window.location.search + window.location.hash,
            event.newValue,
          ),
          { scroll: false },
        );
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [pathname, router]);
  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}
