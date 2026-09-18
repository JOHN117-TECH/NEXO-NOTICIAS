"use client";

import { useI18n } from "@/hooks/useI18n";
import { mostReadStories } from "@/lib/most-read";
import { MostReadCard } from "./MostReadCard";
import styles from "./MostReadSection.module.css";

export function MostReadSection() {
  const { t } = useI18n();

  return (
    <section className={styles.section} aria-labelledby="home-most-read">
      <h2 className={styles.heading} id="home-most-read">{t("Lo más leído")}</h2>
      <ol className={styles.grid} role="list">
        {mostReadStories.map((story, index) => (
          <li className={styles.item} key={story.id}>
            <MostReadCard story={story} rank={index + 1} />
          </li>
        ))}
      </ol>
    </section>
  );
}
