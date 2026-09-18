"use client";
import { createContext } from "react";
import type { News } from "@/lib";
export const NewsContext = createContext<{
  news: News[];
  loading: boolean;
  error: string;
  reload: () => Promise<void>;
  favorites: string[];
  toggle: (id: string) => void;
}>({
  news: [],
  loading: true,
  error: "",
  reload: async () => {},
  favorites: [],
  toggle: () => {},
});
