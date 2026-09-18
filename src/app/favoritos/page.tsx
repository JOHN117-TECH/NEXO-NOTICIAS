"use client";
import { useI18n, useNews } from "@/hooks";
import layoutStyles from "@/app/layout.module.css";
import favoritesStyles from "@/app/favoritos/page.module.css";
import buttonStyles from "@/styles/components/ui/Button.module.css";
import typographyStyles from "@/styles/components/ui/Typography.module.css";
import Link from "next/link";

import { NewsCard, NewsStatus } from "@/components";

export default function Favoritos() {
  const { t, href: localizedHref } = useI18n();

  const { news, favorites, loading, error } = useNews();
  const saved = news.filter((n) => favorites.includes(n.id));
  return (
    <main
      id="contenido"
      className={[layoutStyles.listingPage, "px-6 pb-7 pt-2"].join(" ")}
    >
      <div className={typographyStyles.pageIntro}>
        <h1>{t("Mis noticias favoritas")}</h1>
        <p>
          {t(
            "Consulta las noticias que has guardado para leerlas posteriormente.",
          )}
        </p>
      </div>
      <NewsStatus />
      <div className="grid gap-5 md:grid-cols-2">
        {saved.map((n) => (
          <NewsCard key={n.id} news={n} />
        ))}
      </div>
      {!loading && !error && saved.length === 0 && (
        <section className={favoritesStyles.empty}>
          <h2>{t("Todavía no tienes noticias favoritas.")}</h2>
          <p>
            {t(
              "Explora nuestras publicaciones y guarda las que más te gusten.",
            )}
          </p>
          <Link
            href={localizedHref("/noticias-y-eventos")}
            className={buttonStyles.button}
          >
            {t("Explorar noticias")}
          </Link>
        </section>
      )}
    </main>
  );
}
