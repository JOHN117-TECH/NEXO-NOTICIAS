"use client";
import buttonStyles from "@/components/ui/Button.module.css";
import formStyles from "@/components/ui/FormField.module.css";
import noticeStyles from "@/components/ui/Notice.module.css";
import { useState, type FormEvent } from "react";
import { categories } from "@/lib/types";

export function ContactForm() {
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
        Nombre completo
        <input
          name="name"
          autoComplete="name"
          placeholder="Introduce tu nombre"
          required
          minLength={2}
          maxLength={100}
        />
      </label>
      <label className={formStyles.field}>
        Correo electrónico
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="correo@ejemplo.com"
          required
          maxLength={254}
        />
      </label>
      <label className={formStyles.field}>
        Asunto
        <input
          name="subject"
          placeholder="Introduce el asunto"
          required
          minLength={3}
          maxLength={150}
        />
      </label>
      <label className={formStyles.field}>
        Categoría de la consulta
        <select name="category" required defaultValue="">
          <option value="" disabled>
            Selecciona una opción ▾
          </option>
          {[...categories, "General"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <label className={formStyles.field}>
        Mensaje
        <textarea
          name="message"
          placeholder="Escribe aquí tu mensaje..."
          required
          minLength={10}
          maxLength={5000}
        />
      </label>
      <button
        className={[buttonStyles.button, "mt-2 w-full"].join(" ")}
        disabled={pending}
      >
        {pending ? "Enviando…" : "Enviar mensaje"}
      </button>
      {status && (
        <p role={success ? "status" : "alert"} className={noticeStyles.notice}>
          {status}
        </p>
      )}
    </form>
  );
}
