"use client";
import {
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { NewsContext } from "@/contexts";
import type { News } from "@/lib";
export function Providers({ children }: { children: ReactNode }) {
  const latestRequest = useRef(0);
  const [news, setNews] = useState<News[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [favorites, setFavorites] = useState<string[]>([]);
  const reload = useCallback(async () => {
    const request = ++latestRequest.current;
    const minimumDisplay = new Promise<void>((resolve) =>
      setTimeout(resolve, 3000),
    );
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/noticias");
      if (!res.ok) throw Error();
      const items: News[] = await res.json();
      await minimumDisplay;
      if (request === latestRequest.current) setNews(items);
    } catch {
      if (request === latestRequest.current)
        setError("No pudimos cargar las noticias. Intenta nuevamente.");
    } finally {
      await minimumDisplay;
      if (request === latestRequest.current) setLoading(false);
    }
  }, []);
  useEffect(() => {
    void reload();
    try {
      const saved = JSON.parse(localStorage.getItem("nexo-favoritos") || "[]");
      if (Array.isArray(saved))
        setFavorites(saved.filter((v: unknown) => typeof v === "string"));
    } catch {}
    const sync = (event: StorageEvent) => {
      if (event.key === "nexo-favoritos") {
        try {
          const value = JSON.parse(event.newValue || "[]");
          if (Array.isArray(value))
            setFavorites(value.filter((v: unknown) => typeof v === "string"));
        } catch {}
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [reload]);
  const toggle = (id: string) =>
    setFavorites((previous) => {
      const next = previous.includes(id)
        ? previous.filter((x) => x !== id)
        : [...previous, id];
      try {
        localStorage.setItem("nexo-favoritos", JSON.stringify(next));
      } catch {
        setError("No se pudieron guardar tus favoritos en este navegador.");
      }
      return next;
    });
  return (
    <NewsContext.Provider
      value={{ news, loading, error, reload, favorites, toggle }}
    >
      {children}
    </NewsContext.Provider>
  );
}
