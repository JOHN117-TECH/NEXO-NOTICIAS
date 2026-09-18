"use client";
import { useI18n } from "@/hooks/useI18n";
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
  const { t } = useI18n();

  return news.image ? (
    <img
      src={news.image}
      alt={t(news.title)}
      loading="lazy"
      className={[
        cardStyles.newsImage,
        large ? cardStyles.largeImage : "",
        home ? cardStyles.homeImage : "",
      ].join(" ")}
    />
  ) : (
    <div
      role="img"
      aria-label={t("Imagen de referencia: {title}", { title: t(news.title) })}
      className={[
        cardStyles.newsImage,
        large ? cardStyles.largeImage : "",
        home ? cardStyles.homeImage : "",
      ].join(" ")}
    >
      [ {t(large ? "imagen principal" : "imagen")} ]
    </div>
  );
}
