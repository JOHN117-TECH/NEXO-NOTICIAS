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
const Header = () => {
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



export default Header;