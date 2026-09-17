"use client";
import { useState } from "react";
import { categories } from "@/lib/types";
import { useNews } from "@/components/Providers";
import { NewsCard, NewsStatus } from "@/components/News-card";
import { NewsManager } from "@/components/News-manager";
export default function Noticias() {
  const { news, loading, error } = useNews();
  const [category, setCategory] = useState("Todas");
  const [page, setPage] = useState(1);
  const filtered = news
    .filter((n) => category === "Todas" || n.category === category)
    .sort((a, b) => Number(a.featured) - Number(b.featured));
  const pages = Math.max(1, Math.ceil(filtered.length / 3));
  const currentPage = Math.min(page, pages);
  return (
    <main id="contenido" className="listing-page px-6 pb-7 pt-6">
      <div className="page-intro">
        <h1>Últimas noticias</h1>
        <p>Mantente al día de tecnología, educación, turismo y actualidad.</p>
      </div>
      <div
        id="categorias"
        aria-label="Filtrar noticias por categoría"
        className="mb-5 flex flex-wrap gap-2"
      >
        {["Todas", ...categories].map((c) => (
          <button
            className="filter"
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
      <NewsStatus />
      <div className="grid gap-5 md:grid-cols-3">
        {filtered.slice((currentPage - 1) * 3, currentPage * 3).map((n) => (
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
            className="text-link disabled:opacity-40"
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {pages}
          </span>
          <button
            disabled={currentPage === pages}
            onClick={() => setPage(currentPage + 1)}
            className="text-link disabled:opacity-40"
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
