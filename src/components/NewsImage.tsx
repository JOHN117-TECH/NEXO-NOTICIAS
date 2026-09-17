"use client";
import cardStyles from "./NewsImage.module.css";
import type { News } from "@/lib/types";
export function NewsImage({
  news,
  large = false,
  home = false,
}: {
  news: News;
  large?: boolean;
  home?: boolean;
}) {
  return news.image ? (
    <img
      src={news.image}
      alt={news.title}
      className={[
        cardStyles.newsImage,
        large ? cardStyles.largeImage : "",
        home ? cardStyles.homeImage : "",
      ].join(" ")}
    />
  ) : (
    <div
      role="img"
      aria-label={`Imagen de referencia: ${news.title}`}
      className={[
        cardStyles.newsImage,
        large ? cardStyles.largeImage : "",
        home ? cardStyles.homeImage : "",
      ].join(" ")}
    >
      [ {large ? "imagen principal" : "imagen"} ]
    </div>
  );
}
