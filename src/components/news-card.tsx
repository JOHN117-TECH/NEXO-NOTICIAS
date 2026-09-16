"use client";
import Link from "next/link";
import type { News } from "@/lib/types";
import { useNews } from "./providers";
export function NewsImage({
  news,
  large = false,
}: {
  news: News;
  large?: boolean;
}) {
  return news.image ? (
    <img
      src={news.image}
      alt={news.title}
      className={`news-image ${large ? "large-image" : ""}`}
    />
  ) : (
    <div
      role="img"
      aria-label={`Imagen de referencia: ${news.title}`}
      className={`news-image ${large ? "large-image" : ""}`}
    >
      [ {large ? "imagen principal" : "imagen"} ]
    </div>
  );
}
export function FavoriteButton({
  id,
  full = false,
}: {
  id: string;
  full?: boolean;
}) {
  const { favorites, toggle } = useNews();
  const saved = favorites.includes(id);
  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={saved}
      aria-label={`${saved ? "Quitar de" : "Añadir a"} favoritos`}
      className={`favorite ${full ? "favorite-full" : ""}`}
    >
      {saved ? "♥" : "♡"}{" "}
      {saved
        ? full
          ? "Quitar de favoritos"
          : "Quitar"
        : full
          ? "Añadir a favoritos"
          : "Añadir a favoritos"}
    </button>
  );
}
export function NewsCard({
  news,
  home = false,
}: {
  news: News;
  home?: boolean;
}) {
  return (
    <article className={`news-card ${home ? "home-card" : ""}`}>
      <NewsImage news={news} />
      <div className="card-body">
        <p className="category">{news.category}</p>
        <h3>{news.title}</h3>
        <p className="summary">{news.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <Link className="text-link" href={`/noticias/${news.id}`}>
            Ver más<span className="sr-only">: {news.title}</span>
          </Link>
          {!home && <FavoriteButton id={news.id} />}
        </div>
      </div>
    </article>
  );
}
export function NewsStatus() {
  const { loading, error, reload } = useNews();
  return loading ? (
    <p role="status" className="py-8">
      Cargando noticias…
    </p>
  ) : error ? (
    <div role="alert" className="py-8">
      <p>{error}</p>
      <button className="button mt-3" onClick={() => void reload()}>
        Reintentar
      </button>
    </div>
  ) : null;
}
