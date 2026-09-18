"use client";
import { useNews } from "@/hooks";
import { NewsCard } from "./News-card";
import styles from "./HomeNewsGrid.module.css";

export function HomeNewsGrid() {
  const { news } = useNews();
  const stories = [...news]
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 6);
  return (
    <div className={styles.grid}>
      {stories.map((story, index) => (
        <div
          key={story.id}
          className={[styles.item, index === 0 ? styles.lead : ""].join(" ")}
        >
          <NewsCard news={story} home lead={index === 0} />
        </div>
      ))}
    </div>
  );
}
