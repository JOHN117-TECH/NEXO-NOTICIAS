"use client";
import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";
import type { MentalGame } from "@/lib/mental-games";
import styles from "./MentalGameAction.module.css";
export function MentalGameAction({ game }: { game: MentalGame }) {
  const { t, href } = useI18n();
  return game.href ? (
    <Link className={styles.button} href={href(game.href)} aria-label={t("Jugar: {title}", { title: t(game.title) })}>{t("Juega")}</Link>
  ) : (
    <div className={styles.pending}>
      <button className={styles.button} type="button" disabled>{t("Juega")}</button>
      <span className={styles.hint}>{t("Próximamente")}</span>
    </div>
  );
}
