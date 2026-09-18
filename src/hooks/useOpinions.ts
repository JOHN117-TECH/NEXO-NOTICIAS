"use client";
import { useCallback, useEffect, useState } from "react";
import type { Opinion } from "@/lib/opinion";
export function useOpinions() {
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  useEffect(() => {
    const controller = new AbortController();
    let finishMinimum: () => void = () => {};
    let timer: ReturnType<typeof setTimeout>;
    const minimumDisplay = new Promise<void>((resolve) => {
      finishMinimum = resolve;
      timer = setTimeout(resolve, 3000);
    });
    setLoading(true);
    setError(false);
    fetch("/api/opinions", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Opinions unavailable");
        const items: Opinion[] = await response.json();
        if (!Array.isArray(items)) throw new Error("Invalid opinions response");
        if (!controller.signal.aborted) setOpinions(items);
      })
      .catch(() => { if (!controller.signal.aborted) setError(true); })
      .finally(async () => {
        await minimumDisplay;
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => {
      controller.abort();
      clearTimeout(timer);
      finishMinimum();
    };
  }, [attempt]);
  return { opinions, loading, error, retry };
}
