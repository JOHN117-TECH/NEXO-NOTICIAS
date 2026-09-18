"use client";

import { useI18n } from "@/hooks";
import { cartoons } from "@/lib";
import { CartoonCard } from "./CartoonCard";
import styles from "@/styles/components/CartoonsSection.module.css";

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
