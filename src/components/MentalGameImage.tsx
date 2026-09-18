"use client";
import { useState } from "react";
import type { MentalGame } from "@/lib";
import styles from "./MentalGameImage.module.css";
export function MentalGameImage({ game }: { game: MentalGame }) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  return game.image && game.image !== failedImage ? (
    <img className={styles.image} src={game.image} alt="" loading="lazy" onError={() => setFailedImage(game.image)} />
  ) : (
    <div className={styles.placeholder} aria-hidden="true">{game.symbol}</div>
  );
}
