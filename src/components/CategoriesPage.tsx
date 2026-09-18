"use client";

import { useI18n } from "@/hooks";
import { categoryCards } from "@/lib/categoryCards";
import { CategoryCard } from "./CategoryCard";
import layoutStyles from "@/app/layout.module.css";
import typographyStyles from "@/styles/components/ui/Typography.module.css";
import styles from "@/styles/components/Categories.module.css";

export function CategoriesPage() {
  const { t } = useI18n();
  return (
    <main
      id="contenido"
      className={[layoutStyles.listingPage, styles.page].join(" ")}
    >
      <header className={typographyStyles.pageIntro}>
        <h1>{t("Categorías")}</h1>
        <p>
          {t(
            "Explora los temas que te interesan y descubre sus últimas noticias.",
          )}
        </p>
      </header>
      <ul className={styles.grid}>
        {categoryCards.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </ul>
    </main>
  );
}
