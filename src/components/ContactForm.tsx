"use client";
import { useI18n } from "@/hooks";
import buttonStyles from "@/styles/components/ui/Button.module.css";
import formStyles from "@/styles/components/ui/FormField.module.css";
import noticeStyles from "@/styles/components/ui/Notice.module.css";
import { useState, type FormEvent } from "react";
import { categories } from "@/lib";

export function ContactForm() {
  const { t } = useI18n();

  const [status, setStatus] = useState(""),
    [pending, setPending] = useState(false),
    [success, setSuccess] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setPending(true);
    setStatus("");
    setSuccess(false);
    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw Error();
      setSuccess(true);
      setStatus(
        "¡Gracias por contactar! Tu mensaje ha sido enviado correctamente.",
      );
      form.reset();
    } catch {
      setStatus(
        "No pudimos enviar tu mensaje. Tus datos se conservan; intenta nuevamente.",
      );
    } finally {
      setPending(false);
    }
  }
  return (
    <form onSubmit={submit}>
      <label className={formStyles.field}>
        {t("Nombre completo")}
        <input
          name="name"
          autoComplete="name"
          placeholder={t("Introduce tu nombre")}
          required
          minLength={2}
          maxLength={100}
        />
      </label>
      <label className={formStyles.field}>
        {t("Correo electrónico")}
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t("correo@ejemplo.com")}
          required
          maxLength={254}
        />
      </label>
      <label className={formStyles.field}>
        {t("Asunto")}
        <input
          name="subject"
          placeholder={t("Introduce el asunto")}
          required
          minLength={3}
          maxLength={150}
        />
      </label>
      <label className={formStyles.field}>
        {t("Categoría de la consulta")}
        <select name="category" required defaultValue="">
          <option value="" disabled>
            {t("Selecciona una opción ▾")}
          </option>
          {[...categories, "General"].map((c) => (
            <option key={c} value={c}>
              {t(c)}
            </option>
          ))}
        </select>
      </label>
      <label className={formStyles.field}>
        {t("Mensaje")}
        <textarea
          name="message"
          placeholder={t("Escribe aquí tu mensaje...")}
          required
          minLength={10}
          maxLength={5000}
        />
      </label>
      <button
        className={[buttonStyles.button, "mt-2 w-full"].join(" ")}
        disabled={pending}
      >
        {t(pending ? "Enviando…" : "Enviar mensaje")}
      </button>
      {status && (
        <p role={success ? "status" : "alert"} className={noticeStyles.notice}>
          {t(status)}
        </p>
      )}
    </form>
  );
}
