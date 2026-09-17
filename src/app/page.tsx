"use client";
import { useI18n } from "@/hooks/useI18n";
import homeStyles from "@/app/page.module.css";
import buttonStyles from "@/components/ui/Button.module.css";
import typographyStyles from "@/components/ui/Typography.module.css";
import Link from "next/link";
import { useNews } from "@/hooks/useNews";
import { NewsCard } from "@/components/News-card";
import { NewsStatus } from "@/components/NewsStatus";
export default function Home() {
  const { t, href: localizedHref } = useI18n();

  const { news } = useNews();
  return (
    <main id="contenido">
      <section className={homeStyles.hero}>
        <h1>{t("Información que te conecta con el mundo")}</h1>
        <p>
          {t(
            "Encuentra las noticias más relevantes de tecnología, educación, turismo y actualidad en un solo lugar.",
          )}
        </p>
        <Link href={localizedHref("/noticias")} className={buttonStyles.button}>
          {t("Explorar noticias")}
        </Link>
      </section>
      <section className="px-6 pt-6">
        <h2 className={[typographyStyles.sectionTitle, "mb-3"].join(" ")}>
          {t("Noticias principales")}
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
        <h2>{t("¿Por qué utilizar Nexo Noticias?")}</h2>
        <p>
          {t(
            "Reunimos información de diferentes categorías en una experiencia fácil, ordenada y accesible, desde cualquier dispositivo.",
          )}
        </p>
      </section>
      <section className={homeStyles.cta}>
        <h2>{t("¿Te gustaría conocer todas nuestras noticias?")}</h2>
        <Link className={buttonStyles.button} href={localizedHref("/noticias")}>
          {t("Ver todas las noticias")}
        </Link>
      </section>
    </main>
  );
}
