"use client";

import { useTheme } from "@/hook/useTheme";
import { useEffect } from "react";

export default function ThemeCSSSync() {
  const { primary, secondary, accent } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", primary);
    root.style.setProperty("--color-secondary", secondary);
    root.style.setProperty("--color-accent", accent);
  }, [primary, secondary, accent]);

  return null;
}
