"use client";
import { useI18n } from "@/hooks";
import { mentalGames } from "@/lib";
import { MentalGameCard } from "./MentalGameCard";
import styles from "./MentalGamesSection.module.css";
export function MentalGamesSection() {
  const { t } = useI18n();
  return (
    <section className={styles.section} aria-labelledby="home-mental-games">
      <h2 className={styles.heading} id="home-mental-games">{t("Juegos mentales")}</h2>
      <div className={styles.grid}>
        {mentalGames.map((game, index) => (
          <div key={game.id} className={index === 0 ? styles.featured : styles.item}>
            <MentalGameCard game={game} featured={index === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}
