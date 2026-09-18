"use client";
import { useCallback, useEffect, useState } from "react";
import type { Video } from "@/lib";
export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
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
    fetch("/api/videos", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Videos unavailable");
        const data: Video[] = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid video response");
        if (!controller.signal.aborted) setVideos(data);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
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
  return { videos, loading, error, retry };
}
