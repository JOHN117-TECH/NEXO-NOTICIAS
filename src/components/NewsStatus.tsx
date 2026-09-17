"use client";
import buttonStyles from "./ui/Button.module.css";
import { useNews } from "@/hooks/useNews";
export function NewsStatus() {
  const { loading, error, reload } = useNews();
  return loading ? (
    <p role="status" className="py-8">
      Cargando noticias…
    </p>
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
