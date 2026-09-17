"use client";
import { useContext } from "react";
import { NewsContext } from "@/contexts/NewsContext";
export const useNews = () => useContext(NewsContext);
