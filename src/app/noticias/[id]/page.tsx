"use client";
import { use } from "react";
import Link from "next/link";
import { useNews } from "@/components/providers";
import { NewsImage, FavoriteButton, NewsStatus } from "@/components/news-card";
export default function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { news, loading, error } = useNews();
  const item = news.find((n) => n.id === id);
  return (
    <main id="contenido" className="detail">
      <NewsStatus />
      {item ? (
        <article>
          <p className="category">{item.category}</p>
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
          <div className="article-copy">
            {item.content.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
            <FavoriteButton id={item.id} full />
            <Link className="text-link" href="/noticias">
              ← Regresar a noticias
            </Link>
          </div>
        </article>
      ) : !loading && !error ? (
        <>
          <h1>Noticia no encontrada</h1>
          <p>Esta publicación no existe o fue eliminada.</p>
          <Link className="button mt-6" href="/noticias">
            Regresar a noticias
          </Link>
        </>
      ) : null}
    </main>
  );
}
