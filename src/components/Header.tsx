"use client";

import headerStyles from "@/components/Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  ["Home", "/"],
  ["Noticias", "/noticias"],
  ["Categorías", "/noticias#categorias"],
  ["Favoritos", "/favoritos"],
  ["Contacto", "/contacto"],
];
const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return (
    <header
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }}
      className={[
        headerStyles.siteHeader,
        "flex flex-wrap items-center justify-between gap-5 px-6 py-5",
      ].join(" ")}
    >
      <Link className={`no-underline! ${headerStyles.brand}`} href="/" onClick={() => setMenuOpen(false)}>
        Nexo Noticias 📰
      </Link>
      <button
        ref={menuButton}
        type="button"
        className={headerStyles.menuButton}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d={menuOpen ? "M6 6l12 12M6 18L18 6" : "M3 6h18M3 12h18M3 18h18"} />
        </svg>
      </button>
      <nav
        id="main-navigation"
        data-open={menuOpen}
        aria-label="Navegación principal"
        className="flex flex-wrap items-center gap-x-7 gap-y-3"
      >
        {links.map(([name, href]) => (
          <Link
            className="no-underline!"
            key={name}
            href={href}
            onClick={() => setMenuOpen(false)}
            aria-current={pathname === href ? "page" : undefined}
          >
            {name}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Header;
