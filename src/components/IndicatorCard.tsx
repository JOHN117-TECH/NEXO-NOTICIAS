"use client";

import { useI18n } from "@/hooks/useI18n";
import type { Indicator } from "@/lib/indicators";
import styles from "./IndicatorCard.module.css";

export function IndicatorCard({ indicator, compact = false }: { indicator: Indicator; compact?: boolean }) {
  const { t, locale } = useI18n();
  const numberLocale = locale === "en" ? "en-US" : "es-CO";
  const number = new Intl.NumberFormat(numberLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const signedNumber = new Intl.NumberFormat(numberLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: "always" });
  const prefix = indicator.format === "COP" ? "$ " : indicator.format === "USD" ? "US$ " : "";
  const suffix = indicator.format === "percent" ? " %" : "";
  const trendClass = indicator.direction === "up" ? styles.up : styles.down;

  return (
    <article className={[styles.card, compact ? styles.compact : ""].join(" ")}>
      <h3 className={styles.name}>{t(indicator.name)}</h3>
      <div className={styles.body}>
        <div className={styles.quote}>
          <span className={trendClass}>
            <svg className={styles.arrow} viewBox="0 0 24 14" fill="none" aria-hidden="true">
              <path d={indicator.direction === "up" ? "M2 12 12 2 22 12" : "M2 2 12 12 22 2"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={styles.srOnly}>{t(indicator.direction === "up" ? "Sube" : "Baja")}: </span>
          </span>
          <p className={styles.value}>{prefix}{number.format(indicator.value)}{suffix}</p>
        </div>
        {indicator.change !== undefined && (
          <p className={[styles.change, trendClass].join(" ")}>
            <span className={styles.srOnly}>{t("Variación diaria")}: </span>
            {prefix}{signedNumber.format(indicator.change)}
          </p>
        )}
        {indicator.changePercent !== undefined && (
          <p className={styles.changePercent}>{signedNumber.format(indicator.changePercent)} %</p>
        )}
      </div>
    </article>
  );
}
