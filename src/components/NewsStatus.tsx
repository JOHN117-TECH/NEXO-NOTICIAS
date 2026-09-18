"use client";
import { useI18n, useNews } from "@/hooks";
import buttonStyles from "@/styles/components/ui/Button.module.css";

import { NewsLoader } from "./NewsLoader";
export function NewsStatus() {
  const { t } = useI18n();

  const { loading, error, reload } = useNews();
  return loading ? (
    <NewsLoader />
  ) : error ? (
    <div role="alert" className="py-8">
      <p>{t(error)}</p>
      <button
        className={[buttonStyles.button, "mt-3"].join(" ")}
        onClick={() => void reload()}
      >
        {t("Reintentar")}
      </button>
    </div>
  ) : null;
}
