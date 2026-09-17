"use client";
import { useRef, useState, type FormEvent } from "react";
import { categories } from "@/lib/types";
import { useNews } from "./Providers";
export function NewsManager() {
  const { news, reload } = useNews();
  const keyInput = useRef<HTMLInputElement>(null);
  const [statusAction, setStatusAction] = useState<"create" | "delete">("create");
  const [key, setKey] = useState(""),
    [status, setStatus] = useState(""),
    [pending, setPending] = useState(false),
    [deleting, setDeleting] = useState("");
  async function create(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatusAction("create");
    const form = e.currentTarget;
    setPending(true);
    setStatus("");
    try {
      const response = await fetch("/api/noticias", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Key": key },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok)
        throw Error(
          response.status === 401
            ? "La clave de administración no es válida."
            : "No se pudo crear la noticia. Revisa los campos e intenta nuevamente.",
        );
      form.reset();
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
      setStatus("Introduce la clave de administración para eliminar la noticia.");
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
      setDeleting("");
    } catch (e) {
      setStatus(
        e instanceof Error ? e.message : "No se pudo conectar con el servidor.",
      );
    } finally {
      setPending(false);
    }
  }
  return (
    <details className="management">
      <summary>Administrar noticias</summary>
      <div className="mt-4 max-w-xl">
        <label className="field">
          Clave de administración
          <input
            ref={keyInput}
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            autoComplete="off"
            required
          />
        </label>
        <p className="text-sm text-gray-700">
          La clave es necesaria para crear y eliminar noticias. Debes volver a
          introducirla si recargas la página.
        </p>
        {status && !key.trim() && <p role="alert" className="notice">{status}</p>}
      </div>
      <div className="management-columns">
        <form onSubmit={create}>
          <h2 className="section-title mb-4">Crear noticia</h2>
          <label className="field">
            Título
            <input name="title" required minLength={5} maxLength={180} />
          </label>
          <label className="field">
            Categoría
            <select name="category">
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="field">
            Resumen
            <textarea name="summary" required minLength={10} maxLength={400} />
          </label>
          <label className="field">
            Contenido
            <textarea name="content" required minLength={30} maxLength={20000} />
          </label>
          <label className="field">
            URL de imagen (opcional)
            <input name="image" type="url" placeholder="https://..." />
          </label>
          <button disabled={pending || !key} className="button">
            {pending ? "Guardando…" : "Crear noticia"}
          </button>
          {status && statusAction === "create" && key.trim() && (
            <p role="status" className="notice">{status}</p>
          )}
        </form>
        <section aria-labelledby="delete-news-title" className="min-w-0">
          <h2 id="delete-news-title" className="section-title mb-4">Eliminación de noticias</h2>
          <ul className="divide-y divide-gray-200">
            {news.map((n) => (
              <li
                key={n.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3"
              >
                <span className="min-w-0 flex-1 break-words">{n.title}</span>
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
                    <button disabled={pending} onClick={() => { setDeleting(""); setStatus(""); }}>Cancelar</button>
                    {!key.trim() && <p className="w-full text-sm text-red-700">Falta introducir la clave de administración.</p>}
                    {status && statusAction === "delete" && key.trim() && <p role="alert" className="w-full text-sm text-red-700">{status}</p>}
                  </div>
                ) : (
                  <button
                    className="shrink-0 text-red-700"
                    disabled={pending}
                    onClick={() => { setDeleting(n.id); setStatus(""); }}
                  >
                    Eliminar
                  </button>
                )}
              </li>
            ))}
          </ul>
          {news.length === 0 && <p className="text-gray-700">No hay noticias para eliminar.</p>}
          {status && statusAction === "delete" && !deleting && key.trim() && (
            <p role="status" className="notice">
              {status}
            </p>
          )}
        </section>
      </div>
    </details>
  );
}
