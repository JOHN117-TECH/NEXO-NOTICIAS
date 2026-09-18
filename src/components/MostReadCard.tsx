"use client";

import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import type { MostReadStory } from "@/lib/most-read";
import styles from "./MostReadCard.module.css";

export function MostReadCard({ story, rank }: { story: MostReadStory; rank: number }) {
  const { t } = useI18n();
  const [failedImage, setFailedImage] = useState<string | null>(null);

  return (
    <article className={styles.card}>
      <span className={styles.rank}>{rank}</span>
      <div className={styles.imageFrame}>
        {story.image && story.image !== failedImage ? (
          <img
            className={styles.image}
            src={story.image}
            alt={t(story.title)}
            loading="lazy"
            onError={() => setFailedImage(story.image)}
          />
        ) : (
          <div className={styles.placeholder} role="img" aria-label={t("Imagen próximamente")}>
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <rect x="5" y="7" width="38" height="34" rx="4" stroke="currentColor" strokeWidth="2" />
              <circle cx="16" cy="18" r="4" stroke="currentColor" strokeWidth="2" />
              <path d="m6 35 11-10 8 7 7-6 10 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
      <div className={styles.copy}>
        <h3 className={styles.title}>{t(story.title)}</h3>
        <p className={styles.author}>{story.author}</p>
      </div>
    </article>
  );
}
