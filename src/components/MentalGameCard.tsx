"use client";
import { useI18n } from "@/hooks";
import type { MentalGame } from "@/lib";
import { MentalGameImage } from "./MentalGameImage";
import { MentalGameAction } from "./MentalGameAction";
import styles from "@/styles/components/MentalGameCard.module.css";
export function MentalGameCard({ game, featured = false }: { game: MentalGame; featured?: boolean }) {
  const { t } = useI18n();
  return (
    <article className={[styles.card, featured ? styles.featured : ""].join(" ")}>
      <div className={styles.art}><MentalGameImage game={game} /></div>
      <div className={styles.copy}>
        <h3>{t(game.title)}</h3>
        <p>{t(game.description)}</p>
      </div>
      <div className={styles.action}><MentalGameAction game={game} /></div>
    </article>
  );
}
