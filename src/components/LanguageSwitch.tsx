"use client";
import { useI18n } from "@/hooks";
import styles from "@/styles/components/LanguageSwitch.module.css";
export function LanguageSwitch() {
  const { locale, setLocale, t } = useI18n();
  return (
    <div
      className={styles.switch}
      role="group"
      aria-label={t("Cambiar idioma")}
    >
      <button
        type="button"
        lang="es"
        aria-label="Español"
        title="Español"
        aria-pressed={locale === "es"}
        onClick={() => setLocale("es")}
      >
        ES
      </button>
      <button
        type="button"
        lang="en"
        aria-label="English"
        title="English"
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        EN
      </button>
    </div>
  );
}
