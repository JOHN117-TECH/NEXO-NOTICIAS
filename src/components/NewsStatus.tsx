"use client";
import { useI18n } from "@/hooks/useI18n";
import buttonStyles from "./ui/Button.module.css";
import { useNews } from "@/hooks/useNews";
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
