"use client";
import styles from "@/app/layout.module.css";
import { useI18n } from "@/hooks/useI18n";
export function SkipLink() {
  const { t } = useI18n();
  return (
    <a className={styles.skipLink} href="#contenido">
      {t("Saltar al contenido")}
    </a>
  );
}
