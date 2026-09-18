"use client";
import { useI18n } from "@/hooks";
import contactStyles from "@/app/contacto/page.module.css";
import { ContactForm } from "@/components";
export default function Contact() {
  const { t } = useI18n();

  return (
    <main id="contenido" className={contactStyles.contact}>
      <h1>{t("Contáctanos")}</h1>
      <p className={contactStyles.intro}>
        {t(
          "¿Tienes alguna pregunta, recomendación o noticia que quieras compartir? Escríbenos mediante el siguiente formulario.",
        )}
      </p>
      <ContactForm />
    </main>
  );
}
