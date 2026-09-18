"use client";
import { useI18n, useNews } from "@/hooks";
import noticeStyles from "@/styles/components/ui/Notice.module.css";
import typographyStyles from "@/styles/components/ui/Typography.module.css";

import type { NewsManagementState } from "@/lib";

import managerStyles from "@/styles/components/DeleteNewsPanel.module.css";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
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
  const confirming = useRef(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const selectAllInput = useRef<HTMLInputElement>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selected = news
    .filter((item) => selectedIds.includes(item.id))
    .map((item) => item.id);
  const allSelected = news.length > 0 && selected.length === news.length;
  useEffect(() => {
    if (selectAllInput.current)
      selectAllInput.current.indeterminate =
        selected.length > 0 && !allSelected;
  }, [selected.length, allSelected]);
  async function confirmDeletion(ids: string[], individual = false) {
    if (pending || confirming.current || ids.length === 0) return;
    confirming.current = true;
    setConfirmationOpen(true);
    try {
      const result = await Swal.fire({
        titleText: individual
          ? t("¿Eliminar esta noticia?")
          : t(
            ids.length === 1
              ? "¿Eliminar {count} noticia seleccionada?"
              : "¿Eliminar {count} noticias seleccionadas?",
            { count: ids.length },
          ),
        text: t("Esta acción no se puede deshacer."),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("Confirmar eliminación"),
        cancelButtonText: t("Cancelar"),
        confirmButtonColor: "#b91c1c",
        cancelButtonColor: "#475569",
        background: "var(--surface)",
        color: "var(--text)",
        focusCancel: true,
        customClass: {
          popup: managerStyles.dialogBorder,
        },
      });
      if (!result.isConfirmed) return;
      if (individual) await remove(ids[0]);
      else await removeSelected(ids);
    } finally {
      confirming.current = false;
      setConfirmationOpen(false);
    }
  }
  async function showDeletionSuccess(count: number) {
    await Swal.fire({
      icon: "success",
      titleText:
        count === 1
          ? t("Noticia eliminada.")
          : t("{count} noticias eliminadas.", { count }),
      confirmButtonText: t("Aceptar"),
      confirmButtonColor: "var(--button-bg)",
      background: "var(--surface)",
      color: "var(--text)",
      timer: 3000,
      customClass: {
        popup: managerStyles.dialogBorder,
      },
    });
  }
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
      setSelectedIds((ids) => ids.filter((value) => value !== id));
      await showDeletionSuccess(1);
    } catch (e) {
      setStatus(
        e instanceof Error ? e.message : "No se pudo conectar con el servidor.",
      );
    } finally {
      setPending(false);
    }
  }
  async function removeSelected(idsToDelete: string[]) {
    if (pending || !idsToDelete.length) return;
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
        body: JSON.stringify({ ids: idsToDelete }),
      });
      if (!response.ok)
        throw new Error(
          response.status === 401
            ? "La clave de administración no es válida."
            : "No se pudieron eliminar las noticias seleccionadas. Intenta nuevamente.",
        );
      const result: { deleted: number } = await response.json();
      setSelectedIds((ids) => ids.filter((id) => !idsToDelete.includes(id)));

      await reload();
      await showDeletionSuccess(result.deleted);
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
              disabled={pending || confirmationOpen}
              onChange={(event) => {
                setSelectedIds(
                  event.target.checked ? news.map((item) => item.id) : [],
                );

                setStatus("");
              }}
            />
            {t("Seleccionar todas (")}
            {news.length})
          </label>
          <button
            type="button"
            className={managerStyles.deleteSelected}
            disabled={pending || selected.length === 0 || confirmationOpen}
            onClick={() => void confirmDeletion([...selected])}
          >
            {t("Eliminar seleccionadas (")}
            {selected.length})
          </button>
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
                disabled={pending || confirmationOpen}
                onChange={(event) => {
                  setSelectedIds((ids) =>
                    event.target.checked
                      ? [...ids, n.id]
                      : ids.filter((id) => id !== n.id),
                  );

                  setStatus("");
                }}
              />
              <span className="min-w-0 break-words">{t(n.title)}</span>
            </label>
            <button
              type="button"
              className="shrink-0 text-[var(--danger)]"
              disabled={pending || confirmationOpen}
              onClick={() => void confirmDeletion([n.id], true)}
            >
              {t("Eliminar")}
            </button>
          </li>
        ))}
      </ul>
      {news.length === 0 && (
        <p className="text-[var(--text-muted)]">
          {t("No hay noticias para eliminar.")}
        </p>
      )}
      {status && statusAction === "delete" && (
        <p role="status" className={noticeStyles.notice}>
          {t(status)}
        </p>
      )}
    </section>
  );
}
