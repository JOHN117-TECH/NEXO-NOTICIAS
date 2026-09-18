"use client";

import { useI18n } from "@/hooks/useI18n";
import { cartoons } from "@/lib/cartoons";
import { CartoonCard } from "./CartoonCard";
import styles from "./CartoonsSection.module.css";

export function CartoonsSection() {
  const { t } = useI18n();

  return (
    <section className={styles.section} aria-labelledby="home-cartoons">
      <h2 className={styles.heading} id="home-cartoons">{t("Caricaturas")}</h2>
      <div className={styles.grid}>
        {cartoons.map((cartoon) => <CartoonCard key={cartoon.id} cartoon={cartoon} />)}
      </div>
    </section>
  );
}
