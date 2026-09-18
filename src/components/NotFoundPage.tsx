"use client";

import Link from "next/link";
import { useI18n } from "@/hooks";
import styles from "@/styles/components/NotFoundPage.module.css";

export function NotFoundPage({ className = "" }: { className?: string }) {
  const { t, href } = useI18n();

  return (
    <main id="contenido" data-not-found className={`${styles.page} ${className}`}>
      <h1 className={styles.title}>{t("404 · Página no encontrada")}</h1>
      <p className={styles.description}>
        {t("Lo sentimos, la página que buscas no existe o cambió de dirección.")}
      </p>
      <div className={styles.digits} aria-hidden="true">
        <span className={styles.firstFour}>
          <span>4</span>
        </span>{" "}
        <span className={styles.zero}>0</span>{" "}
        <span className={styles.lastFour}>
          <span>4</span>
        </span>
      </div>
      <Link className={styles.homeButton} href={href("/")}>
        {t("Volver al inicio")}
      </Link>
    </main>
  );
}
