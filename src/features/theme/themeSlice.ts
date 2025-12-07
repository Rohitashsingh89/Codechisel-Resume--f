"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";
export type SidebarColor = "slate" | "indigo" | "emerald" | "rose";

export interface ThemeState {
  theme: Theme;
  sidebarColor: SidebarColor;
  useBgImage: boolean;
  backgroundImage: string | null;
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;

  primary: string;
  secondary: string;
  accent: string;
}

const initialState: ThemeState = {
  theme: "light",
  sidebarColor: "indigo",
  useBgImage: false,
  backgroundImage: null,
  sidebarCollapsed: false,
  mobileSidebarOpen: false,

  primary: "#4f46e5",
  secondary: "#10b981",
  accent: "#f43f5e",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    hydrateFromStorage(state) {
      if (typeof window === "undefined") return;

      try {
        const lsTheme = localStorage.getItem("theme") as Theme | null;
        const lsColor = localStorage.getItem(
          "sidebarColor"
        ) as SidebarColor | null;
        const lsUseBg = localStorage.getItem("useBgImage");
        const lsBg = localStorage.getItem("backgroundImage");

        // NEW
        const lsPrimary = localStorage.getItem("color-primary");
        const lsSecondary = localStorage.getItem("color-secondary");
        const lsAccent = localStorage.getItem("color-accent");

        if (lsTheme === "light" || lsTheme === "dark") state.theme = lsTheme;
        if (lsColor) state.sidebarColor = lsColor as SidebarColor;
        if (lsUseBg !== null) state.useBgImage = lsUseBg === "true";
        if (lsBg) state.backgroundImage = lsBg;

        if (lsPrimary) state.primary = lsPrimary;
        if (lsSecondary) state.secondary = lsSecondary;
        if (lsAccent) state.accent = lsAccent;
      } catch {
        // ignore
      }
    },

    setPrimary(state, action: PayloadAction<string>) {
      state.primary = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("color-primary", action.payload);
      }
    },
    setSecondary(state, action: PayloadAction<string>) {
      state.secondary = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("color-secondary", action.payload);
      }
    },
    setAccent(state, action: PayloadAction<string>) {
      state.accent = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("color-accent", action.payload);
      }
    },

    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("theme", action.payload);
        } catch {}
      }
    },

    toggleTheme(state) {
      const next = state.theme === "light" ? "dark" : "light";
      state.theme = next;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("theme", next);
        } catch {}
      }
    },

    setSidebarColor(state, action: PayloadAction<SidebarColor>) {
      state.sidebarColor = action.payload;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("sidebarColor", action.payload);
        } catch {}
      }
    },

    setUseBgImage(state, action: PayloadAction<boolean>) {
      state.useBgImage = action.payload;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("useBgImage", String(action.payload));
        } catch {}
      }
    },

    setBackgroundImage(state, action: PayloadAction<string | null>) {
      state.backgroundImage = action.payload;
      if (typeof window !== "undefined") {
        try {
          if (action.payload) {
            localStorage.setItem("backgroundImage", action.payload);
          } else {
            localStorage.removeItem("backgroundImage");
          }
        } catch {}
      }
    },

    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },

    setMobileSidebarOpen(state, action: PayloadAction<boolean>) {
      state.mobileSidebarOpen = action.payload;
    },
  },
});

export const {
  hydrateFromStorage,
  setTheme,
  toggleTheme,
  setSidebarColor,
  setUseBgImage,
  setBackgroundImage,
  setSidebarCollapsed,
  setMobileSidebarOpen,
  
  setPrimary,
  setSecondary,
  setAccent,
} = themeSlice.actions;

export default themeSlice.reducer;
