"use client";
import homeStyles from "@/app/page.module.css";
import buttonStyles from "@/components/ui/Button.module.css";
import typographyStyles from "@/components/ui/Typography.module.css";
import Link from "next/link";
import { useNews } from "@/components/Providers";
import { NewsCard, NewsStatus } from "@/components/News-card";
export default function Home() {
  const { news } = useNews();
  return (
    <main id="contenido">
      <section className={homeStyles.hero}>
        <h1>Información que te conecta con el mundo</h1>
        <p>
          Encuentra las noticias más relevantes de tecnología, educación,
          turismo y actualidad en un solo lugar.
        </p>
        <Link href="/noticias" className={buttonStyles.button}>
          Explorar noticias
        </Link>
      </section>
      <section className="px-6 pt-6">
        <h2 className={[typographyStyles.sectionTitle, "mb-3"].join(" ")}>
          Noticias principales
        </h2>
        <NewsStatus />
        <div className="grid gap-[18px] md:grid-cols-3">
          {news
            .filter((n) => n.featured)
            .slice(0, 3)
            .map((n) => (
              <NewsCard key={n.id} news={n} home />
            ))}
        </div>
      </section>
      <section className={homeStyles.why}>
        <h2>¿Por qué utilizar Nexo Noticias?</h2>
        <p>
          Reunimos información de diferentes categorías en una experiencia
          fácil, ordenada y accesible, desde cualquier dispositivo.
        </p>
      </section>
      <section className={homeStyles.cta}>
        <h2>¿Te gustaría conocer todas nuestras noticias?</h2>
        <Link className={buttonStyles.button} href="/noticias">
          Ver todas las noticias
        </Link>
      </section>
    </main>
  );
}
