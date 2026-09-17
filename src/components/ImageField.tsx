"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import styles from "./ImageField.module.css";
import formStyles from "./ui/FormField.module.css";

const maxSize = 2 * 1024 * 1024;
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

export function ImageField({
  onFileChange,
  disabled,
}: {
  onFileChange: (file: File | null) => void;
  disabled: boolean;
}) {
  const [mode, setMode] = useState("url");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] || null;
    const message =
      selected && !allowedTypes.includes(selected.type)
        ? "Selecciona una imagen JPG, PNG o WebP."
        : selected && selected.size > maxSize
          ? "La imagen debe pesar como máximo 2 MB."
          : "";
    event.target.setCustomValidity(message);
    setError(message);
    setFile(message ? null : selected);
    onFileChange(message ? null : selected);
  }

  return (
    <fieldset className={styles.fieldset} disabled={disabled}>
      <legend>Imagen de la noticia (opcional)</legend>
      <div className={styles.options}>
        <label>
          <input
            type="radio"
            name="imageSource"
            value="url"
            checked={mode === "url"}
            onChange={() => {
              setMode("url");
              setFile(null);
              setError("");
              onFileChange(null);
            }}
          />{" "}
          URL de imagen
        </label>
        <label>
          <input
            type="radio"
            name="imageSource"
            value="file"
            checked={mode === "file"}
            onChange={() => setMode("file")}
          />{" "}
          Imagen del computador
        </label>
      </div>
      <label className={formStyles.field} hidden={mode !== "url"}>
        URL de imagen
        <input
          name="image"
          type="url"
          placeholder="https://..."
          disabled={disabled || mode !== "url"}
        />
      </label>
      {mode === "file" && (
        <>
          <label className={formStyles.field}>
            Seleccionar imagen
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={selectFile}
              aria-describedby="image-file-help"
            />
          </label>
          <p id="image-file-help" className={styles.help}>
            JPG, PNG o WebP. Máximo 2 MB.
          </p>
          {error && (
            <p role="alert" className={styles.error}>
              {error}
            </p>
          )}
          {preview && (
            <img
              className={styles.preview}
              src={preview}
              alt="Vista previa de la imagen seleccionada"
            />
          )}
        </>
      )}
    </fieldset>
  );
}
