"use client";
import { useI18n } from "@/hooks";
import styles from "@/styles/components/OpinionEditorial.module.css";
export function OpinionEditorial() {
  const { t } = useI18n();
  return (
    <div className={styles.editorial}>
      <p className={styles.title}><em>{t("Editorial")}: </em><strong>{t("Ideas que conectan a nuestra comunidad")}</strong></p>
      <p>{t("La tecnología, la educación y el turismo abren nuevas conversaciones. Escuchar distintas miradas nos ayuda a construir un futuro compartido.")}</p>
    </div>
  );
}
