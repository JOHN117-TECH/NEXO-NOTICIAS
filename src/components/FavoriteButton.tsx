"use client";
import { useI18n, useNews } from "@/hooks";
import favoriteStyles from "./FavoriteButton.module.css";

export function FavoriteButton({
  id,
  full = false,
}: {
  id: string;
  full?: boolean;
}) {
  const { t } = useI18n();

  const { favorites, toggle } = useNews();
  const saved = favorites.includes(id);
  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={saved}
      aria-label={t(saved ? "Quitar de favoritos" : "Añadir a favoritos")}
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
        {t(
          saved
            ? full
              ? "Quitar de favoritos"
              : "Quitar"
            : full
              ? "Añadir a favoritos"
              : "Añadir a favoritos",
        )}
      </span>
    </button>
  );
}
