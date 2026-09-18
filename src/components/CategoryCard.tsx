"use client";

import Link from "next/link";
import { useI18n } from "@/hooks";
import type { CategoryCardData } from "@/lib/categoryCards";
import styles from "@/styles/components/Categories.module.css";

const paths = {
  technology:
    "M7 7h10v10H7z M9 10h6v4H9z M9 3v4m6-4v4M9 17v4m6-4v4M3 9h4m-4 6h4m10-6h4m-4 6h4",
  education: "m2 8 10-5 10 5-10 5L2 8z M6 10v7c4 3 8 3 12 0v-7 M22 8v8",
  travel: "m3 20 6-2 6 2 6-2V4l-6 2-6-2-6 2v14z M9 4v14M15 6v14",
  news: "M4 3h13v17H4z M17 7h4v11a2 2 0 0 1-4 0 M7 7h7M7 11h7M7 15h3M12 15h2",
};

export function CategoryCard({ category }: { category: CategoryCardData }) {
  const { t, href } = useI18n();
  return (
    <li>
      <Link
        className={styles.card}
        href={href(
          `/noticias-y-eventos?category=${encodeURIComponent(category.name)}`,
        )}
      >
        <div className={styles.visual}>
          {category.image ? (
            <img
              src={category.image}
              alt=""
              width={112}
              height={112}
              className={styles.icon}
            />
          ) : (
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={paths[category.icon]} />
            </svg>
          )}
        </div>
        <div className={styles.content}>
          <h2>{t(category.name)}</h2>
          <p>{t(category.description)}</p>
          <span className={styles.action}>
            {t("Explorar noticias")} <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </li>
  );
}
