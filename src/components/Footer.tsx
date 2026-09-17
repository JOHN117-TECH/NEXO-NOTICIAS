import footerStyles from "@/components/Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className={[footerStyles.siteFooter, "px-6 py-5"].join(" ")}>
        <div>
          <h2 className="mb-1 text-lg font-bold">Nexo Noticias</h2>
          <p>Información que te conecta.</p>
          <nav
            aria-label="Enlaces del pie de página"
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
                <Link className="no-underline!" href={href}>
                  {name}
                </Link>
              </span>
            ))}
          </nav>
          <p className="mb-2">
            Correo:{" "}
            <a href="mailto:contacto@nexonoticias.com">
              contacto@nexonoticias.com
            </a>
          </p>
          <p className="text-xs">© 2026 Nexo Noticias. Proyecto académico.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
