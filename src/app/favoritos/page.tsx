"use client";
import Link from "next/link";
import { useNews } from "@/components/providers";
import { NewsCard, NewsStatus } from "@/components/news-card";
export default function Favoritos() {
  const { news, favorites, loading, error } = useNews();
  const saved = news.filter((n) => favorites.includes(n.id));
  return (
    <main id="contenido" className="listing-page px-6 pb-7 pt-6">
      <div className="page-intro">
        <h1>Mis noticias favoritas</h1>
        <p>
          Consulta las noticias que has guardado para leerlas posteriormente.
        </p>
      </div>
      <NewsStatus />
      <div className="grid gap-5 md:grid-cols-2">
        {saved.map((n) => (
          <NewsCard key={n.id} news={n} />
        ))}
      </div>
      {!loading && !error && saved.length === 0 && (
        <section className="empty">
          <h2>Todavía no tienes noticias favoritas.</h2>
          <p>Explora nuestras publicaciones y guarda las que más te gusten.</p>
          <Link href="/noticias" className="button">
            Explorar noticias
          </Link>
        </section>
      )}
    </main>
  );
}
