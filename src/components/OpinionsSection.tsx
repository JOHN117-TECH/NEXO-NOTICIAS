"use client";
import { useOpinions, useI18n } from "@/hooks";

import { OpinionCard } from "./OpinionCard";
import { OpinionEditorial } from "./OpinionEditorial";
import { NewsLoader } from "./NewsLoader";
import styles from "@/styles/components/OpinionsSection.module.css";
import buttonStyles from "@/styles/components/ui/Button.module.css";
export function OpinionsSection() {
  const { opinions, loading, error, retry } = useOpinions();
  const { t } = useI18n();
  return (
    <section className={styles.section} aria-labelledby="home-opinions">
      <h2 className={styles.heading} id="home-opinions">{t("Opinión")}</h2>
      <OpinionEditorial />
      {loading ? <NewsLoader label="Cargando Opiniones…" /> : error ? (
        <div role="alert"><p>{t("No pudimos cargar las opiniones.")}</p><button className={`${buttonStyles.button} mt-3`} onClick={retry}>{t("Reintentar")}</button></div>
      ) : opinions.length === 0 ? (
        <p className={styles.empty}>{t("Próximamente encontrarás nuestras opiniones aquí.")}</p>
      ) : (
        <div className={styles.grid}>{opinions.map((opinion) => <OpinionCard key={opinion.id} opinion={opinion} />)}</div>
      )}
    </section>
  );
}
