"use client";
import managerStyles from "@/components/News-manager.module.css";
import buttonStyles from "@/components/ui/Button.module.css";
import formStyles from "@/components/ui/FormField.module.css";
import noticeStyles from "@/components/ui/Notice.module.css";
import typographyStyles from "@/components/ui/Typography.module.css";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { categories } from "@/lib/types";
import { useNews } from "./Providers";
import { ImageField, readImage } from "./ImageField";
const ADMIN_KEY_STORAGE = "nexo-admin-key";
export function NewsManager() {
  const { news, reload } = useNews();
  const keyInput = useRef<HTMLInputElement>(null);
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFieldVersion, setImageFieldVersion] = useState(0);
  const [statusAction, setStatusAction] = useState<"create" | "delete">(
    "create",
  );
  const [key, setKey] = useState(""),
    [status, setStatus] = useState(""),
    [pending, setPending] = useState(false),
    [deleting, setDeleting] = useState("");
  const [keyStorageError, setKeyStorageError] = useState(false);
  const [keyHelpOpen, setKeyHelpOpen] = useState(false);
  useEffect(() => {
    try {
      setKey(sessionStorage.getItem(ADMIN_KEY_STORAGE) || "");
    } catch {
      setKeyStorageError(true);
    }
  }, []);
  function updateAdminKey(value: string) {
    setKey(value);
    try {
      if (value) sessionStorage.setItem(ADMIN_KEY_STORAGE, value);
      else sessionStorage.removeItem(ADMIN_KEY_STORAGE);
      setKeyStorageError(false);
    } catch {
      setKeyStorageError(true);
    }
  }
  async function create(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatusAction("create");
    const form = e.currentTarget;
    setPending(true);
    setStatus("");
    try {
      const formData = new FormData(form);
      formData.delete("imageSource");
      const payload = Object.fromEntries(formData);
      if (imageFile) payload.imageData = await readImage(imageFile);
      const response = await fetch("/api/noticias", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Key": key },
        body: JSON.stringify(payload),
      });
      if (!response.ok)
        throw Error(
          response.status === 401
            ? "La clave de administración no es válida."
            : response.status === 413
              ? "La imagen es demasiado grande. Selecciona una de hasta 2 MB."
              : "No se pudo crear la noticia. Revisa los campos y la imagen e intenta nuevamente.",
        );
      form.reset();
      setImageFile(null);
      setImageFieldVersion((version) => version + 1);
      await reload();
      setStatus("Noticia creada correctamente.");
    } catch (e) {
      setStatus(
        e instanceof Error ? e.message : "No se pudo conectar con el servidor.",
      );
    } finally {
      setPending(false);
    }
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
    <details className={managerStyles.management}>
      <summary>Administrar noticias</summary>
      <div className="mt-4 max-w-xl">
        <div className={managerStyles.keyRow}>
        <label className={formStyles.field}>
          Clave de administración
          <input
            ref={keyInput}
            type="password"
            value={key}
            onChange={(e) => updateAdminKey(e.target.value)}
            autoComplete="off"
            aria-describedby="admin-key-help"
            required
          />
        </label>
        <div
          className={managerStyles.keyHelp}
          onMouseEnter={() => setKeyHelpOpen(true)}
          onMouseLeave={() => setKeyHelpOpen(false)}
          onFocus={() => setKeyHelpOpen(true)}
          onBlur={() => setKeyHelpOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setKeyHelpOpen(false);
          }}
        >
          <button
            type="button"
            className={managerStyles.helpButton}
            aria-label="Ayuda sobre la clave de administración"
            aria-describedby="admin-key-help"
            onClick={() => setKeyHelpOpen(true)}
          >
            <span aria-hidden="true">?</span>
          </button>
        <p id="admin-key-help" role="tooltip" hidden={!keyHelpOpen} className={managerStyles.keyTooltip}>
          La clave es necesaria para crear y eliminar noticias. Se conserva al
          recargar durante la sesión de esta pestaña. Vacía el campo para olvidarla.
        </p>
        </div>
        </div>
        {keyStorageError && <p role="alert" className="text-sm text-red-700">
          El navegador no permite guardar la clave en esta sesión. Puedes usarla,
          pero tendrás que introducirla nuevamente al recargar.
        </p>}
        {status && !key.trim() && (
          <p role="alert" className={noticeStyles.notice}>
            {status}
          </p>
        )}
      </div>
      <div className={managerStyles.managementColumns}>
        <form onSubmit={create}>
          <h2 className={[typographyStyles.sectionTitle, "mb-4"].join(" ")}>
            Crear noticia
          </h2>
          <label className={formStyles.field}>
            Título
            <input name="title" required minLength={5} maxLength={180} />
          </label>
          <label className={formStyles.field}>
            Categoría
            <select name="category">
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className={formStyles.field}>
            Resumen
            <textarea name="summary" required minLength={10} maxLength={400} />
          </label>
          <label className={formStyles.field}>
            Contenido
            <textarea
              name="content"
              required
              minLength={30}
              maxLength={20000}
            />
          </label>
          <ImageField
            key={imageFieldVersion}
            onFileChange={setImageFile}
            disabled={pending}
          />
          <button disabled={pending || !key} className={buttonStyles.button}>
            {pending ? "Guardando…" : "Crear noticia"}
          </button>
          {status && statusAction === "create" && key.trim() && (
            <p role="status" className={noticeStyles.notice}>
              {status}
            </p>
          )}
        </form>
        <section aria-labelledby="delete-news-title" className="min-w-0">
          <h2
            id="delete-news-title"
            className={[typographyStyles.sectionTitle, "mb-4"].join(" ")}
          >
            Eliminación de noticias
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
                Seleccionar todas ({news.length})
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
                Eliminar seleccionadas ({selected.length})
              </button>
            </div>
          )}
          {bulkConfirmation && (
            <div className={managerStyles.bulkConfirmation}>
              <p>
                ¿Eliminar {bulkConfirmation.length}{" "}
                {bulkConfirmation.length === 1
                  ? "noticia seleccionada"
                  : "noticias seleccionadas"}
                ?
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  className="text-red-700"
                  disabled={pending}
                  onClick={() => void removeSelected()}
                >
                  {pending ? "Eliminando…" : "Confirmar eliminación"}
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => {
                    setBulkConfirmation(null);
                    setStatus("");
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
          <ul className="divide-y divide-gray-200">
            {news.map((n) => (
              <li
                key={n.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3"
              >
                <label className={managerStyles.selectionLabel}>
                  <input
                    type="checkbox"
                    aria-label={`Seleccionar: ${n.title}`}
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
                  <span className="min-w-0 break-words">{n.title}</span>
                </label>
                {deleting === n.id ? (
                  <div className="flex w-full flex-wrap items-center gap-4">
                    <span>¿Eliminar esta noticia?</span>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => void remove(n.id)}
                      className="text-red-700"
                    >
                      {pending ? "Eliminando…" : "Confirmar eliminación"}
                    </button>
                    <button
                      disabled={pending}
                      onClick={() => {
                        setDeleting("");
                        setStatus("");
                      }}
                    >
                      Cancelar
                    </button>
                    {!key.trim() && (
                      <p className="w-full text-sm text-red-700">
                        Falta introducir la clave de administración.
                      </p>
                    )}
                    {status && statusAction === "delete" && key.trim() && (
                      <p role="alert" className="w-full text-sm text-red-700">
                        {status}
                      </p>
                    )}
                  </div>
                ) : (
                  <button
                    className="shrink-0 text-red-700"
                    disabled={pending || bulkConfirmation !== null}
                    onClick={() => {
                      setDeleting(n.id);
                      setStatus("");
                    }}
                  >
                    Eliminar
                  </button>
                )}
              </li>
            ))}
          </ul>
          {news.length === 0 && (
            <p className="text-gray-700">No hay noticias para eliminar.</p>
          )}
          {status && statusAction === "delete" && !deleting && key.trim() && (
            <p role="status" className={noticeStyles.notice}>
              {status}
            </p>
          )}
        </section>
      </div>
    </details>
  );
}
