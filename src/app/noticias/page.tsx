"use client";
import { useI18n } from "@/hooks/useI18n";
import layoutStyles from "@/app/layout.module.css";
import typographyStyles from "@/components/ui/Typography.module.css";
import { NewsFilters } from "@/components/NewsFilters";
import { NewsPagination } from "@/components/NewsPagination";
import { useState } from "react";
import { useNews } from "@/hooks/useNews";
import { NewsCard } from "@/components/News-card";
import { NewsStatus } from "@/components/NewsStatus";
import { NewsManager } from "@/components/News-manager";
export default function Noticias() {
  const { t } = useI18n();

  const { news, loading, error } = useNews();
  const [category, setCategory] = useState("Todas");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const filtered = news
    .filter((n) => category === "Todas" || n.category === category)
    .sort((a, b) => Number(a.featured) - Number(b.featured));
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pages);
  return (
    <main
      id="contenido"
      className={[layoutStyles.listingPage, "px-6 pb-7 pt-6"].join(" ")}
    >
      <div className={typographyStyles.pageIntro}>
        <h1>{t("Últimas noticias")}</h1>
        <p>
          {t("Mantente al día de tecnología, educación, turismo y actualidad.")}
        </p>
      </div>
      <NewsFilters
        category={category}
        pageSize={pageSize}
        onCategoryChange={(value) => {
          setCategory(value);
          setPage(1);
        }}
        onPageSizeChange={(value) => {
          setPageSize(value);
          setPage(1);
        }}
      />
      <NewsStatus />
      <div className="grid gap-5 md:grid-cols-3">
        {filtered
          .slice((currentPage - 1) * pageSize, currentPage * pageSize)
          .map((n) => (
            <NewsCard key={n.id} news={n} />
          ))}
      </div>
      <NewsPagination
        currentPage={currentPage}
        pages={pages}
        onPageChange={setPage}
      />
      {!loading && !error && filtered.length === 0 && (
        <p className="py-10" role="status">
          {t("No hay noticias en esta categoría.")}
        </p>
      )}
      <NewsManager />
    </main>
  );
}
