
"use client";

import { useI18n } from "@/hooks";
import { ContactForm } from "@/components";
import contactStyles from "./page.module.css";
import { socialNetworks } from "@/lib/socialNetworks";
import Link from "next/link";

export default function Contact() {
  const { t } = useI18n();

  return (
    <main id="contenido" className={contactStyles.contact}>
      <div className={contactStyles.container}>

        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <section className={contactStyles.formSection}>
          <h1>{t("Contáctanos")}</h1>

          <p className={contactStyles.intro}>
            {t(
              "¿Tienes alguna pregunta, recomendación o noticia que quieras compartir? Escríbenos mediante el siguiente formulario.",
            )}
          </p>

          <ContactForm />
        </section>

        {/* COLUMNA DERECHA: REDES SOCIALES */}
        <aside
          className={contactStyles.socialSection}
          aria-labelledby="social-title"
        >
          <h2 id="social-title">
            {t("En redes sociales")}
          </h2>

          <p className={contactStyles.socialDescription}>
            {t(
              "Síguenos en nuestras redes sociales y mantente informado.",
            )}
          </p>

          <div className={contactStyles.socialGrid}>
            {socialNetworks.map((network) => {
              const Icon = network.icon;

              return (
                <Link
                  key={network.name}
                  href={network.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactStyles.socialLink}
                  aria-label={network.name}
                >
                  <span
                    className={[
                      contactStyles.socialIcon,
                      network.color,
                    ].join(" ")}
                  >
                    <Icon aria-hidden="true" />
                  </span>

                  <span className={contactStyles.socialName}>
                    {network.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </aside>

      </div>
    </main>
  );
}