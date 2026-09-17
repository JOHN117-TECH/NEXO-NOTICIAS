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
          <Link className={buttonStyles.textLink} href={`/noticias/${news.id}`}>
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
      <button
        className={[buttonStyles.button, "mt-3"].join(" ")}
        onClick={() => void reload()}
      >
        Reintentar
      </button>
    </div>
  ) : null;
}
