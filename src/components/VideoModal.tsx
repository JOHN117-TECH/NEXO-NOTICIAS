"use client";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/hooks";
import type { Video } from "@/lib";
import styles from "./VideoModal.module.css";
export function VideoModal({
  video,
  onClose,
}: {
  video: Video;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const titleId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);
  return createPortal(
    <dialog
      ref={dialog}
      className={styles.modal}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.panel}>
        <header className={styles.header}>
          <h2 id={titleId}>{t(video.titulo)}</h2>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label={t("Cerrar video")}
            autoFocus
          >
            ×
          </button>
        </header>
        <iframe
          className={styles.player}
          src={`https://player.mux.com/${encodeURIComponent(video.mux_playback_id)}?accent-color=%232563eb`}
          title={t(video.titulo)}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; gyroscope"
          allowFullScreen
        />
        {video.descripcion && (
          <p className={styles.description}>{t(video.descripcion)}</p>
        )}
      </div>
    </dialog>,
    document.body,
  );
}
