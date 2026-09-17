"use client";
import { useI18n } from "@/hooks/useI18n";
import styles from "./NewsLoader.module.css";

export function NewsLoader() {
  const { t } = useI18n();

  return (
    <div className={styles.container} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>{t("Cargando Noticias…")}</span>
    </div>
  );
}
