"use client";
import { useI18n } from "@/hooks/useI18n";
import cardStyles from "./News-card.module.css";
import buttonStyles from "./ui/Button.module.css";
import typographyStyles from "./ui/Typography.module.css";
import Link from "next/link";
import type { News } from "@/lib/types";
import { NewsImage } from "./NewsImage";
import { FavoriteButton } from "./FavoriteButton";
export function NewsCard({
  news,
  home = false,
}: {
  news: News;
  home?: boolean;
}) {

  const { t, href: localizedHref } = useI18n();

  return (
    <article
      className={[cardStyles.newsCard, home ? cardStyles.homeCard : ""].join(
        " ",
      )}
    >
      <NewsImage news={news} home={home} />
      <div className={cardStyles.cardBody}>
        <p className={typographyStyles.category}>{t(news.category)}</p>
        <h3>{t(news.title)}</h3>
        <p className={cardStyles.summary}>{t(news.summary)}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <Link
            className={`no-underline! ${[buttonStyles.textLink, cardStyles.readMore].join(" ")}`}
            href={localizedHref(`/noticias/${news.id}`)}
          >
            {t("Ver más")}
            <span className="sr-only">: {t(news.title)}</span>
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
