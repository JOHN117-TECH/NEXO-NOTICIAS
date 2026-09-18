"use client";
import { useI18n } from "@/hooks/useI18n";
import headerStyles from "@/components/Header.module.css";
import worldIcon from "@/assets/svg/world.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { LanguageSwitch } from "./LanguageSwitch";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  ["Inicio", "/"],
  ["Noticias", "/noticias"],
  ["Categorías", "/noticias#categorias"],
  ["Favoritos", "/favoritos"],
  ["Contacto", "/contacto"],
];
const Header = () => {
  const { t, href: localizedHref } = useI18n();

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
        "flex flex-wrap items-center justify-between gap-5 px-6 py-5 sm:fixed sm:top-0 sm:left-0 sm:right-0 sm:z-50",
      ].join(" ")}
    >
      <Link
        className={`no-underline! ${headerStyles.brand}`}
        href={localizedHref("/")}
        onClick={() => setMenuOpen(false)}
      >
        {t("Nexo Noticias")}
        <img
          className={headerStyles.brandIcon}
          src={worldIcon.src}
          alt="Icon"
          width={28}
          height={28}
          loading="lazy"
        />
      </Link>

      <button
        ref={menuButton}
        type="button"
        className={headerStyles.menuButton}
        aria-label={t(menuOpen ? "Cerrar menú" : "Abrir menú")}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path
            d={menuOpen ? "M6 6l12 12M6 18L18 6" : "M3 6h18M3 12h18M3 18h18"}
          />
        </svg>
      </button>
      <nav
        id="main-navigation"
        data-open={menuOpen}
        aria-label={t("Navegación principal")}
        className="flex flex-wrap items-center gap-x-7 gap-y-3"
      >
        {links.map(([name, href]) => (
          <Link
            className="no-underline!"
            key={name}
            href={localizedHref(href)}
            scroll={name === "Categorías" ? false : undefined}
            onNavigate={
              name === "Categorías"
                ? () => {
                  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                }
                : undefined
            }
            onClick={() => setMenuOpen(false)}
            aria-current={pathname === localizedHref(href) ? "page" : undefined}
          >
            {t(name)}
          </Link>
        ))}
        <div className={`-ml-1 gap-x-4! ${headerStyles.preferences}`}>
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
