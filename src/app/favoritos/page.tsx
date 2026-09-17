"use client";
import layoutStyles from "@/app/layout.module.css";
import favoritesStyles from "@/app/favoritos/page.module.css";
import buttonStyles from "@/components/ui/Button.module.css";
import typographyStyles from "@/components/ui/Typography.module.css";
import Link from "next/link";
import { useNews } from "@/components/Providers";
import { NewsCard, NewsStatus } from "@/components/News-card";
export default function Favoritos() {
  const { news, favorites, loading, error } = useNews();
  const saved = news.filter((n) => favorites.includes(n.id));
  return (
    <main
      id="contenido"
      className={[layoutStyles.listingPage, "px-6 pb-7 pt-6"].join(" ")}
    >
      <div className={typographyStyles.pageIntro}>
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
        <section className={favoritesStyles.empty}>
          <h2>Todavía no tienes noticias favoritas.</h2>
          <p>Explora nuestras publicaciones y guarda las que más te gusten.</p>
          <Link href="/noticias" className={buttonStyles.button}>
            Explorar noticias
          </Link>
        </section>
      )}
    </main>
  );
}
