"use client";
import { useRef, useState } from "react";
import { useVideos, useI18n } from "@/hooks";

import type { Video } from "@/lib";
import { NewsLoader } from "./NewsLoader";
import { VideoCard } from "./VideoCard";
import { VideoModal } from "./VideoModal";
import styles from "./VideoSlider.module.css";
import buttonStyles from "./ui/Button.module.css";
export function VideoSlider() {
  const { videos, loading, error, retry } = useVideos();
  const { t } = useI18n();
  const track = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Video | null>(null);
  const scroll = (direction: number) => {
    const element = track.current;
    if (element)
      element.scrollBy({
        left: direction * element.clientWidth,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  };
  return (
    <section className={styles.section} aria-labelledby="home-videos">
      <div className={styles.header}>
        <h2 id="home-videos">{t("Videos")}</h2>
        {videos.length > 0 && !loading && !error && (
          <div className={styles.controls}>
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label={t("Videos anteriores")}
              aria-controls="video-track"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                id="Left--Streamline-Block-Free"
                height="16"
                width="16"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="m11.9198 0.16 0.0002 15.68 -7.84 -7.8401L11.9198 0.16Z"
                  clipRule="evenodd"
                  strokeWidth="1"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label={t("Videos siguientes")}
              aria-controls="video-track"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 16"
                id="Right--Streamline-Block-Free"
                height="16"
                width="16"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M4.0802 0.16 4.08 15.84l7.84 -7.8401L4.0802 0.16Z"
                  clipRule="evenodd"
                  strokeWidth="1"
                ></path>
              </svg>
            </button>
          </div>
        )}
      </div>
      {loading ? (
        <NewsLoader label="Cargando videos…" />
      ) : error ? (
        <div role="alert">
          <p>{t("No pudimos cargar los videos.")}</p>
          <button className={`${buttonStyles.button} mt-3`} onClick={retry}>
            {t("Reintentar")}
          </button>
        </div>
      ) : videos.length === 0 ? (
        <p>{t("Próximamente encontrarás nuestros videos aquí.")}</p>
      ) : (
        <div id="video-track" className={styles.track} ref={track}>
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={() => setSelected(video)}
            />
          ))}
        </div>
      )}
      {selected && (
        <VideoModal video={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
