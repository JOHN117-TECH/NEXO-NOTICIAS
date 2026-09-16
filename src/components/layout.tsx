"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  ["Home", "/"],
  ["Noticias", "/noticias"],
  ["Categorías", "/noticias#categorias"],
  ["Favoritos", "/favoritos"],
  ["Contacto", "/contacto"],
];
export function Header() {
  const pathname = usePathname();
  return (
    <header className="site-header flex flex-wrap items-center justify-between gap-5 px-6 py-5">
      <Link className="brand" href="/">
        Nexo Noticias
      </Link>
      <nav
        aria-label="Navegación principal"
        className="flex flex-wrap gap-x-7 gap-y-3"
      >
        {links.map(([name, href]) => (
          <Link
            key={name}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
          >
            {name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer px-6 py-5">
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
              <Link href={href}>{name}</Link>
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
  );
}
