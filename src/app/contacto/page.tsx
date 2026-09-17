import contactStyles from "@/app/contacto/page.module.css";
import { ContactForm } from "@/components/ContactForm";
export default function Contact() {
  return (
    <main id="contenido" className={contactStyles.contact}>
      <h1>Contáctanos</h1>
      <p className={contactStyles.intro}>
        ¿Tienes alguna pregunta, recomendación o noticia que quieras compartir?
        Escríbenos mediante el siguiente formulario.
      </p>
      <ContactForm />
    </main>
  );
}
