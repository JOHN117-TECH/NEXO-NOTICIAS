"use client";
import cardStyles from "@/components/News-card.module.css";
import favoriteStyles from "@/components/FavoriteButton.module.css";
import buttonStyles from "@/components/ui/Button.module.css";
import typographyStyles from "@/components/ui/Typography.module.css";
import Link from "next/link";
import type { News } from "@/lib/types";
import { useNews } from "./Providers";
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
      className={[
        cardStyles.newsImage,
        large ? cardStyles.largeImage : "",
      ].join(" ")}
    />
  ) : (
    <div
      role="img"
      aria-label={`Imagen de referencia: ${news.title}`}
      className={[
        cardStyles.newsImage,
        large ? cardStyles.largeImage : "",
      ].join(" ")}
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
      className={[
        favoriteStyles.favorite,
        full ? favoriteStyles.favoriteFull : "",
      ].join(" ")}
    >
      <svg
        className={favoriteStyles.icon}
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
      <span>
        {saved
          ? full
            ? "Quitar de favoritos"
            : "Quitar"
          : full
            ? "Añadir a favoritos"
            : "Añadir a favoritos"}
      </span>
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
    <article
      className={[cardStyles.newsCard, home ? cardStyles.homeCard : ""].join(
        " ",
      )}
    >
      <NewsImage news={news} />
      <div className={cardStyles.cardBody}>
        <p className={typographyStyles.category}>{news.category}</p>
        <h3>{news.title}</h3>
        <p className={cardStyles.summary}>{news.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <Link
            className={`no-underline! ${[buttonStyles.textLink, cardStyles.readMore].join(" ")}`}
            href={`/noticias/${news.id}`}
          >
            Ver más<span className="sr-only">: {news.title}</span>
            <svg
              className={cardStyles.readMoreIcon}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v8M8 12h8" />
            </svg>
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
      <button
        className={[buttonStyles.button, "mt-3"].join(" ")}
        onClick={() => void reload()}
      >
        Reintentar
      </button>
    </div>
  ) : null;
}
