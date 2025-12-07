"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import {
  hydrateFromStorage,
  setTheme as setThemeAction,
  toggleTheme as toggleThemeAction,
  setSidebarColor as setSidebarColorAction,
  setUseBgImage as setUseBgImageAction,
  setBackgroundImage as setBackgroundImageAction,
  setSidebarCollapsed as setSidebarCollapsedAction,
  setMobileSidebarOpen as setMobileSidebarOpenAction,
  Theme,
  SidebarColor,
  setPrimary,
  setSecondary,
  setAccent,
} from "@/features/theme/themeSlice";

export function useTheme() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    theme,
    sidebarColor,
    useBgImage,
    backgroundImage,
    sidebarCollapsed,
    mobileSidebarOpen,
    primary,
    secondary,
    accent,
  } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    dispatch(hydrateFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  return {
    theme,
    toggleTheme: () => dispatch(toggleThemeAction()),
    setTheme: (t: Theme) => dispatch(setThemeAction(t)),

    sidebarColor,
    setSidebarColor: (c: SidebarColor) => dispatch(setSidebarColorAction(c)),

    useBgImage,
    setUseBgImage: (v: boolean) => dispatch(setUseBgImageAction(v)),

    backgroundImage,
    setBackgroundImage: (url: string | null) =>
      dispatch(setBackgroundImageAction(url)),

    sidebarCollapsed,
    setSidebarCollapsed: (v: boolean) =>
      dispatch(setSidebarCollapsedAction(v)),

    mobileSidebarOpen,
    setMobileSidebarOpen: (v: boolean) =>
      dispatch(setMobileSidebarOpenAction(v)),

    // ✅ Add these
    primary,
    setPrimary: (color: string) => dispatch(setPrimary(color)),
    secondary,
    setSecondary: (color: string) => dispatch(setSecondary(color)),
    accent,
    setAccent: (color: string) => dispatch(setAccent(color)),
  };
}
