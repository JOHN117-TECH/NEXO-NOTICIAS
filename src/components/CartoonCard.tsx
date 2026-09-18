"use client";

import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import type { Cartoon } from "@/lib/cartoons";
import styles from "./CartoonCard.module.css";

export function CartoonCard({ cartoon }: { cartoon: Cartoon }) {
  const { t } = useI18n();
  const [failedImage, setFailedImage] = useState<string | null>(null);

  return (
    <article className={styles.card}>
      <div className={styles.imageFrame}>
        {cartoon.image && cartoon.image !== failedImage ? (
          <img
            className={styles.image}
            src={cartoon.image}
            alt={t("Caricatura: {title}", { title: t(cartoon.title) })}
            loading="lazy"
            onError={() => setFailedImage(cartoon.image)}
          />
        ) : (
          <div className={styles.placeholder}>
            <svg width="52" height="52" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <rect x="5" y="7" width="38" height="34" rx="4" stroke="currentColor" strokeWidth="2" />
              <circle cx="16" cy="18" r="4" stroke="currentColor" strokeWidth="2" />
              <path d="m6 35 11-10 8 7 7-6 10 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>{t("Imagen de la caricatura próximamente")}</p>
          </div>
        )}
      </div>
      <h3 className={styles.title}>{t(cartoon.title)}</h3>
      <p className={styles.author}>{cartoon.author}</p>
    </article>
  );
}
