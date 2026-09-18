"use client";

import { useI18n } from "@/hooks/useI18n";
import { indicators, interestRate, stockIndex } from "@/lib/indicators";
import { IndicatorCard } from "./IndicatorCard";
import styles from "./IndicatorsSection.module.css";

export function IndicatorsSection() {
  const { t } = useI18n();

  return (
    <section className={styles.section} aria-labelledby="home-indicators">
      <h2 className={styles.heading} id="home-indicators">{t("Indicadores")}</h2>
      <ul className={styles.grid}>
        {indicators.map((indicator) => (
          <li className={styles.cell} key={indicator.id}>
            <IndicatorCard indicator={indicator} />
          </li>
        ))}
        <li className={[styles.cell, styles.stacked].join(" ")}>
          <IndicatorCard indicator={interestRate} compact />
          <IndicatorCard indicator={stockIndex} compact />
        </li>
      </ul>
    </section>
  );
}
