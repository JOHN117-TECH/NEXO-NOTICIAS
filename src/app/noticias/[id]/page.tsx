"use client";
import detailStyles from "@/app/noticias/[id]/page.module.css";
import buttonStyles from "@/components/ui/Button.module.css";
import typographyStyles from "@/components/ui/Typography.module.css";
import { use } from "react";
import Link from "next/link";
import { useNews } from "@/hooks/useNews";
import { NewsImage } from "@/components/NewsImage";
import { FavoriteButton } from "@/components/FavoriteButton";
import { NewsStatus } from "@/components/NewsStatus";
export default function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { news, loading, error } = useNews();
  const item = news.find((n) => n.id === id);
  return (
    <main id="contenido" className={detailStyles.detail}>
      <NewsStatus />
      {item ? (
        <article>
          <p className={typographyStyles.category}>{item.category}</p>
          <h1>{item.title}</h1>
          <p className="text-[13px] text-gray-700">
            Fecha de publicación:{" "}
            {new Date(item.publishedAt).toLocaleDateString("es-CO", {
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            })}
          </p>
          <NewsImage news={item} large />
          <div className={detailStyles.articleCopy}>
            {item.content.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
            <FavoriteButton id={item.id} full />
            <Link className={buttonStyles.textLink} href="/noticias">
              ← Regresar a noticias
            </Link>
          </div>
        </article>
      ) : !loading && !error ? (
        <>
          <h1>Noticia no encontrada</h1>
          <p>Esta publicación no existe o fue eliminada.</p>
          <Link
            className={[buttonStyles.button, "mt-6"].join(" ")}
            href="/noticias"
          >
            Regresar a noticias
          </Link>
        </>
      ) : null}
    </main>
  );
}
