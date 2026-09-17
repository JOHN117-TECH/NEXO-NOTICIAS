"use client";
import buttonStyles from "./ui/Button.module.css";
import { useNews } from "@/hooks/useNews";
import { NewsLoader } from "./NewsLoader";
export function NewsStatus() {
  const { loading, error, reload } = useNews();
  return loading ? (
    <NewsLoader />
  ) : error ? (
    <div role="alert" className="py-8">
      <p>{error}</p>
      <button
        className={[buttonStyles.button, "mt-3"].join(" ")}
        onClick={() => void reload()}
      >
        Reintentar
      </button>
    </div>
  ) : null;
}
