"use client";
import { useState } from "react";
import { useI18n } from "@/hooks";
import type { Opinion } from "@/lib";
import styles from "@/styles/components/OpinionCard.module.css";
export function OpinionCard({ opinion }: { opinion: Opinion }) {
  const { t } = useI18n();
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const initials = opinion.name.trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join("");
  return (
    <article className={styles.card}>
      {opinion.image && failedImage !== opinion.image ? (
        <img className={styles.portrait} src={opinion.image} alt={opinion.name} loading="lazy" onError={() => setFailedImage(opinion.image)} />
      ) : (
        <div className={styles.placeholder} aria-hidden="true">{initials}</div>
      )}
      <p className={styles.name}>{opinion.name}</p>
      <h3 className={styles.phrase}><i><b>{t(opinion.phrase)}</b></i></h3>
    </article>
  );
}
