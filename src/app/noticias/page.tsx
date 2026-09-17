"use client";
import layoutStyles from "@/app/layout.module.css";
import newsStyles from "@/app/noticias/page.module.css";
import buttonStyles from "@/components/ui/Button.module.css";
import typographyStyles from "@/components/ui/Typography.module.css";
import { useState } from "react";
import { categories } from "@/lib/types";
import { useNews } from "@/components/Providers";
import { NewsCard, NewsStatus } from "@/components/News-card";
import { NewsManager } from "@/components/News-manager";
const pageSizes = [2, 3, 4, 6, 8, 10];
export default function Noticias() {
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
        <h1>Últimas noticias</h1>
        <p>Mantente al día de tecnología, educación, turismo y actualidad.</p>
      </div>
      <div className={newsStyles.toolbar}>
        <div
          id="categorias"
          aria-label="Filtrar noticias por categoría"
          className="flex flex-wrap gap-2"
        >
          {["Todas", ...categories].map((c) => (
            <button
              className={newsStyles.filter}
              key={c}
              aria-pressed={category === c}
              onClick={() => {
                setCategory(c);
                setPage(1);
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <label className={newsStyles.pageSize}>
          Noticias por página
          <select
            value={pageSize}
            onChange={(event) => {
              const size = Number(event.target.value);
              if (pageSizes.includes(size)) {
                setPageSize(size);
                setPage(1);
              }
            }}
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>
      <NewsStatus />
      <div className="grid gap-5 md:grid-cols-3">
        {filtered
          .slice((currentPage - 1) * pageSize, currentPage * pageSize)
          .map((n) => (
            <NewsCard key={n.id} news={n} />
          ))}
      </div>
      {pages > 1 && (
        <nav
          aria-label="Páginas de noticias"
          className="mt-5 flex items-center justify-center gap-5 text-sm"
        >
          <button
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            className={[buttonStyles.textLink, "disabled:opacity-40"].join(" ")}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {pages}
          </span>
          <button
            disabled={currentPage === pages}
            onClick={() => setPage(currentPage + 1)}
            className={[buttonStyles.textLink, "disabled:opacity-40"].join(" ")}
          >
            Siguiente
          </button>
        </nav>
      )}
      {!loading && !error && filtered.length === 0 && (
        <p className="py-10" role="status">
          No hay noticias en esta categoría.
        </p>
      )}
      <NewsManager />
    </main>
  );
}
