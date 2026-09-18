"use client";
import { useI18n } from "@/hooks";
import styles from "./NewsLoader.module.css";

export function NewsLoader({
  label = "Cargando Noticias…",
}: {
  label?: string;
}) {
  const { t } = useI18n();

  return (
    <div className={styles.container} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>{t(label)}</span>
    </div>
  );
}
