"use client";
import type { Video } from "@/lib";
import { videoDuration } from "@/lib";
import { useI18n } from "@/hooks";
import styles from "@/styles/components/VideoCard.module.css";
export function VideoCard({
  video,
  onPlay,
}: {
  video: Video;
  onPlay: () => void;
}) {
  const { t, locale } = useI18n();
  return (
    <button
      type="button"
      className={styles.card}
      onClick={onPlay}
      aria-label={t("Reproducir: {title}", { title: t(video.titulo) })}
    >
      <img
        className={styles.image}
        src={`https://image.mux.com/${encodeURIComponent(video.mux_playback_id)}/thumbnail.jpg?width=480&height=800&fit_mode=smartcrop`}
        alt=""
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.visibility = "hidden";
        }}
      />
      <div className={styles.body}>
        <span className={styles.category}>{t(video.categoria)}</span>
        <h3>{t(video.titulo)}</h3>
        {video.descripcion && <p>{t(video.descripcion)}</p>}
        <div className={styles.meta}>
          <span className={styles.duration} aria-label={t("Duración")}>
            {videoDuration(video.duracion)}
          </span>
          <time dateTime={video.fecha_creacion}>
            {new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-CO", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(video.fecha_creacion))}
          </time>
        </div>
        <span className={styles.play} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 4v16l13-8z" />
          </svg>
        </span>
      </div>
    </button>
  );
}
