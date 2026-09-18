"use client";
import { useI18n } from "@/hooks";
import footerStyles from "@/components/Footer.module.css";
import Link from "next/link";

const Footer = () => {
  const { t, href: localizedHref } = useI18n();

  return (
    <>
      <footer className={[footerStyles.siteFooter, "px-6 py-5"].join(" ")}>
        <div>
          <h2 className="mb-1 text-lg font-bold">{t("Nexo Noticias")}</h2>
          <p>{t("Información que te conecta.")}</p>
          <nav
            aria-label={t("Enlaces del pie de página")}
            className="my-3 flex flex-wrap gap-2"
          >
            {[
              ["Inicio", "/"],
              ["Noticias", "/noticias"],
              ["Favoritos", "/favoritos"],
              ["Contacto", "/contacto"],
            ].map(([name, href], index) => (
              <span key={name}>
                {index > 0 && (
                  <span className="mr-2" aria-hidden="true">
                    |
                  </span>
                )}
                <Link className="no-underline!" href={localizedHref(href)}>
                  {t(name)}
                </Link>
              </span>
            ))}
          </nav>
          <p className="mb-2">
            {t("Correo:")}{" "}
            <a href="mailto:contacto@nexonoticias.com">
              contacto@nexonoticias.com
            </a>
          </p>
          <p className="text-xs">
            {t("© 2026 Nexo Noticias. Proyecto académico.")}
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
