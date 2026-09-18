
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useI18n } from "@/hooks";

import styles from "@/styles/components/Breadcrumbs.module.css";

const pages = [
    {
        path: "/noticias",
        label: "Noticias",
    },
    {
        path: "/noticias-y-eventos",
        label: "Noticias y eventos",
    },
    {
        path: "/categorias",
        label: "Categorías",
    },
    {
        path: "/favoritos",
        label: "Favoritos",
    },
    {
        path: "/contacto",
        label: "Contacto",
    },
];

interface NewsDetail {
    id: string;
    title: string;
}

function normalizePath(path: string): string {
    return path.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
}

export function Breadcrumbs() {
    const pathname = usePathname();

    const { t, href: localizedHref } = useI18n();

    const currentPath = normalizePath(pathname);

    const homePath = normalizePath(localizedHref("/"));

    const newsPath = normalizePath(
        localizedHref("/noticias-y-eventos"),
    );

    // Detectar si estamos dentro del detalle de una noticia.
    const isNewsDetail = currentPath.startsWith(
        `${newsPath}/`,
    );

    // Obtener el UUID de la noticia.
    const newsId = isNewsDetail
        ? currentPath.slice(newsPath.length + 1)
        : null;

    const [resolvedNews, setResolvedNews] =
        useState<NewsDetail | null>(null);

    // Obtener el título real desde el backend.
    useEffect(() => {
        if (!newsId) return;

        const controller = new AbortController();

        async function loadNews() {
            try {
                const response = await fetch(
                    `/api/noticias/${encodeURIComponent(newsId!)}`,
                    {
                        signal: controller.signal,
                    },
                );

                if (!response.ok) {
                    throw new Error("No se pudo cargar la noticia");
                }

                const news: NewsDetail = await response.json();

                if (!controller.signal.aborted) {
                    setResolvedNews(news);
                }
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error(
                        "Error al cargar el breadcrumb:",
                        error,
                    );
                }
            }
        }

        void loadNews();

        return () => controller.abort();
    }, [newsId]);

    // No mostrar Breadcrumbs en Inicio.
    if (currentPath === homePath) {
        return null;
    }

    // Buscar páginas normales.
    const currentPage = pages.find(
        (page) =>
            normalizePath(localizedHref(page.path)) ===
            currentPath,
    );

    const lastSegment =
        currentPath.split("/").filter(Boolean).at(-1) ?? "";

    // Preparar la etiqueta del último elemento.
    const currentLabel = isNewsDetail
        ? resolvedNews?.id === newsId
            ? resolvedNews.title
            : "Detalle de noticia"
        : currentPage?.label ??
        decodeURIComponent(lastSegment).replace(/[-_]/g, " ");

    const breadcrumbs = [
        {
            label: "Inicio",
            href: homePath,
        },

        // Agregar Noticias y eventos como nivel intermedio.
        ...(isNewsDetail
            ? [
                {
                    label: "Noticias y eventos",
                    href: newsPath,
                },
            ]
            : []),

        // Página activa.
        {
            label: currentLabel,
            href: currentPath,
        },
    ];

    return (
        <nav
            className={styles.breadcrumbs}
            aria-label={t("Ruta de navegación")}
        >
            <ol className={styles.list}>
                {breadcrumbs.map((item, index) => {
                    const isLast =
                        index === breadcrumbs.length - 1;

                    return (
                        <li
                            key={item.href}
                            className={styles.item}
                        >
                            {index > 0 && (
                                <span
                                    className={styles.separator}
                                    aria-hidden="true"
                                >
                                    ›
                                </span>
                            )}

                            {isLast ? (
                                <span
                                    className={styles.current}
                                    aria-current="page"
                                >
                                    {t(item.label)}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={styles.link}
                                >
                                    {t(item.label)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}