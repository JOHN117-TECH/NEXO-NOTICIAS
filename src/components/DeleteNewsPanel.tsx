"use client";
import { useI18n, useNews } from "@/hooks";
import noticeStyles from "@/components/ui/Notice.module.css";
import typographyStyles from "@/components/ui/Typography.module.css";

import type { NewsManagementState } from "@/lib";

import managerStyles from "./DeleteNewsPanel.module.css";
import { useEffect, useRef, useState } from "react";
export function DeleteNewsPanel({
  adminKey: key,
  keyInput,
  status,
  setStatus,
  statusAction,
  setStatusAction,
  pending,
  setPending,
}: NewsManagementState) {
  const { t } = useI18n();

  const { news, reload } = useNews();
  const [deleting, setDeleting] = useState("");
  const selectAllInput = useRef<HTMLInputElement>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkConfirmation, setBulkConfirmation] = useState<string[] | null>(
    null,
  );
  const selected = news
    .filter((item) => selectedIds.includes(item.id))
    .map((item) => item.id);
  const allSelected = news.length > 0 && selected.length === news.length;
  useEffect(() => {
    if (selectAllInput.current)
      selectAllInput.current.indeterminate =
        selected.length > 0 && !allSelected;
  }, [selected.length, allSelected]);
  async function remove(id: string) {
    setStatusAction("delete");
    if (!key.trim()) {
      setStatus(
        "Introduce la clave de administración para eliminar la noticia.",
      );
      keyInput.current?.focus();
      return;
    }
    setPending(true);
    setStatus("");
    try {
      const res = await fetch(`/api/noticias/${id}`, {
        method: "DELETE",
        headers: { "X-Admin-Key": key },
      });
      if (!res.ok)
        throw Error(
          res.status === 401
            ? "La clave de administración no es válida."
            : "No se pudo eliminar la noticia.",
        );
      await reload();
      setStatus("Noticia eliminada.");
      setSelectedIds((ids) => ids.filter((value) => value !== id));
      setDeleting("");
    } catch (e) {
      setStatus(
        e instanceof Error ? e.message : "No se pudo conectar con el servidor.",
      );
    } finally {
      setPending(false);
    }
  }
  async function removeSelected() {
    if (pending || !bulkConfirmation?.length) return;
    setStatusAction("delete");
    if (!key.trim()) {
      setStatus(
        "Introduce la clave de administración para eliminar las noticias seleccionadas.",
      );
      keyInput.current?.focus();
      return;
    }
    setPending(true);
    setStatus("");
    try {
      const response = await fetch("/api/noticias", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "X-Admin-Key": key },
        body: JSON.stringify({ ids: bulkConfirmation }),
      });
      if (!response.ok)
        throw new Error(
          response.status === 401
            ? "La clave de administración no es válida."
            : "No se pudieron eliminar las noticias seleccionadas. Intenta nuevamente.",
        );
      const result: { deleted: number } = await response.json();
      setSelectedIds((ids) =>
        ids.filter((id) => !bulkConfirmation.includes(id)),
      );
      setBulkConfirmation(null);
      await reload();
      setStatus(
        result.deleted === 1
          ? "Noticia eliminada."
          : `${result.deleted} noticias eliminadas.`,
      );
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "No se pudo conectar con el servidor.",
      );
    } finally {
      setPending(false);
    }
  }
  return (
    <section aria-labelledby="delete-news-title" className="min-w-0">
      <h2
        id="delete-news-title"
        className={[typographyStyles.sectionTitle, "mb-4"].join(" ")}
      >
        {t("Eliminación de noticias")}
      </h2>
      {news.length > 0 && (
        <div className={managerStyles.selectionToolbar}>
          <label className={managerStyles.selectionLabel}>
            <input
              ref={selectAllInput}
              type="checkbox"
              checked={allSelected}
              disabled={pending || bulkConfirmation !== null}
              onChange={(event) => {
                setSelectedIds(
                  event.target.checked ? news.map((item) => item.id) : [],
                );
                setDeleting("");
                setStatus("");
              }}
            />
            {t("Seleccionar todas (")}
            {news.length})
          </label>
          <button
            type="button"
            className={managerStyles.deleteSelected}
            disabled={
              pending || selected.length === 0 || bulkConfirmation !== null
            }
            onClick={() => {
              setBulkConfirmation([...selected]);
              setDeleting("");
              setStatus("");
              setStatusAction("delete");
            }}
          >
            {t("Eliminar seleccionadas (")}
            {selected.length})
          </button>
        </div>
      )}
      {bulkConfirmation && (
        <div className={managerStyles.bulkConfirmation}>
          <p>
            {t(
              bulkConfirmation.length === 1
                ? "¿Eliminar {count} noticia seleccionada?"
                : "¿Eliminar {count} noticias seleccionadas?",
              { count: bulkConfirmation.length },
            )}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="text-[var(--danger)]"
              disabled={pending}
              onClick={() => void removeSelected()}
            >
              {t(pending ? "Eliminando…" : "Confirmar eliminación")}
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                setBulkConfirmation(null);
                setStatus("");
              }}
            >
              {t("Cancelar")}
            </button>
          </div>
        </div>
      )}
      <ul className="divide-y divide-[var(--border)]">
        {news.map((n) => (
          <li
            key={n.id}
            className="flex flex-wrap items-center justify-between gap-3 py-3"
          >
            <label className={managerStyles.selectionLabel}>
              <input
                type="checkbox"
                aria-label={t("Seleccionar: {title}", { title: t(n.title) })}
                checked={selectedIds.includes(n.id)}
                disabled={pending || bulkConfirmation !== null}
                onChange={(event) => {
                  setSelectedIds((ids) =>
                    event.target.checked
                      ? [...ids, n.id]
                      : ids.filter((id) => id !== n.id),
                  );
                  setDeleting("");
                  setStatus("");
                }}
              />
              <span className="min-w-0 break-words">{t(n.title)}</span>
            </label>
            {deleting === n.id ? (
              <div className="flex w-full flex-wrap items-center gap-4">
                <span>{t("¿Eliminar esta noticia?")}</span>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => void remove(n.id)}
                  className="text-[var(--danger)]"
                >
                  {t(pending ? "Eliminando…" : "Confirmar eliminación")}
                </button>
                <button
                  disabled={pending}
                  onClick={() => {
                    setDeleting("");
                    setStatus("");
                  }}
                >
                  {t("Cancelar")}
                </button>
                {!key.trim() && (
                  <p className="w-full text-sm text-[var(--danger)]">
                    {t("Falta introducir la clave de administración.")}
                  </p>
                )}
                {status && statusAction === "delete" && key.trim() && (
                  <p
                    role="alert"
                    className="w-full text-sm text-[var(--danger)]"
                  >
                    {t(status)}
                  </p>
                )}
              </div>
            ) : (
              <button
                className="shrink-0 text-[var(--danger)]"
                disabled={pending || bulkConfirmation !== null}
                onClick={() => {
                  setDeleting(n.id);
                  setStatus("");
                }}
              >
                {t("Eliminar")}
              </button>
            )}
          </li>
        ))}
      </ul>
      {news.length === 0 && (
        <p className="text-[var(--text-muted)]">
          {t("No hay noticias para eliminar.")}
        </p>
      )}
      {status && statusAction === "delete" && !deleting && key.trim() && (
        <p role="status" className={noticeStyles.notice}>
          {t(status)}
        </p>
      )}
    </section>
  );
}
