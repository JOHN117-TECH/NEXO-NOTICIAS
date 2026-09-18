"use client";
import { useContext } from "react";
import { NewsContext } from "@/contexts";
export const useNews = () => useContext(NewsContext);
