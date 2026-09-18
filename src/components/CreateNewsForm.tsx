"use client";
import { useI18n, useNews } from "@/hooks";
import buttonStyles from "@/components/ui/Button.module.css";
import formStyles from "@/components/ui/FormField.module.css";
import noticeStyles from "@/components/ui/Notice.module.css";
import typographyStyles from "@/components/ui/Typography.module.css";

import type { NewsManagementState } from "@/lib";

import { useState, type FormEvent } from "react";
import { categories, readImage } from "@/lib";
import { ImageField } from "./ImageField";

export function CreateNewsForm({
  adminKey: key,
  status,
  setStatus,
  statusAction,
  setStatusAction,
  pending,
  setPending,
}: NewsManagementState) {
  const { t } = useI18n();

  const { reload } = useNews();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFieldVersion, setImageFieldVersion] = useState(0);
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
  return (
    <form onSubmit={create}>
      <h2 className={[typographyStyles.sectionTitle, "mb-4"].join(" ")}>
        {t("Crear noticia")}
      </h2>
      <label className={formStyles.field}>
        {t("Título")}
        <input name="title" required minLength={5} maxLength={180} />
      </label>
      <label className={formStyles.field}>
        {t("Categoría")}
        <select name="category">
          {categories.map((c) => (
            <option key={c} value={c}>
              {t(c)}
            </option>
          ))}
        </select>
      </label>
      <label className={formStyles.field}>
        {t("Resumen")}
        <textarea name="summary" required minLength={10} maxLength={400} />
      </label>
      <label className={formStyles.field}>
        {t("Contenido")}
        <textarea name="content" required minLength={30} maxLength={20000} />
      </label>
      <ImageField
        key={imageFieldVersion}
        onFileChange={setImageFile}
        disabled={pending}
      />
      <button disabled={pending || !key} className={buttonStyles.button}>
        {t(pending ? "Guardando…" : "Crear noticia")}
      </button>
      {status && statusAction === "create" && key.trim() && (
        <p role="status" className={noticeStyles.notice}>
          {t(status)}
        </p>
      )}
    </form>
  );
}
