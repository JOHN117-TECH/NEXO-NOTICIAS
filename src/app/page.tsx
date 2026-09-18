"use client";
import { useI18n } from "@/hooks/useI18n";
import homeStyles from "@/app/page.module.css";
import buttonStyles from "@/components/ui/Button.module.css";
import typographyStyles from "@/components/ui/Typography.module.css";
import Link from "next/link";

import { NewsStatus } from "@/components/NewsStatus";
import { MentalGamesSection } from "@/components/MentalGamesSection";
import { IndicatorsSection } from "@/components/IndicatorsSection";
import { CartoonsSection } from "@/components/CartoonsSection";
import { MostReadSection } from "@/components/MostReadSection";
import { OpinionsSection } from "@/components/OpinionsSection";
import { VideoSlider } from "@/components/VideoSlider";
import { HomeNewsGrid } from "@/components/HomeNewsGrid";
export default function Home() {
  const { t, href: localizedHref } = useI18n();

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
        <HomeNewsGrid />
      </section>
      <section className={homeStyles.why}>
        <h2>{t("¿Por qué utilizar Nexo Noticias?")}</h2>
        <p>
          {t(
            "Reunimos información de diferentes categorías en una experiencia fácil, ordenada y accesible, desde cualquier dispositivo.",
          )}
        </p>
      </section>
      <VideoSlider />
      <section className={homeStyles.cta}>
        <h2>{t("¿Te gustaría conocer todas nuestras noticias?")}</h2>
        <Link className={buttonStyles.button} href={localizedHref("/noticias")}>
          {t("Ver todas las noticias")}
        </Link>
      </section>
      <OpinionsSection />
      <MentalGamesSection />
      <IndicatorsSection />
      <CartoonsSection />
      <MostReadSection />
    </main>
  );
}
