"use client";

import MainShell from "@/components/(super-admin)/MainShell";
import Card from "@/components/(super-admin)/shared/Card";
import { useTheme } from "@/hook/useTheme";
import { useEffect } from "react";

// Color options with hex values
const COLOR_OPTIONS = [
  { key: "slate", color: "#1e293b" },
  { key: "indigo", color: "#4f46e5" },
  { key: "emerald", color: "#10b981" },
  { key: "rose", color: "#f43f5e" },
] as const;

export default function SettingsPage() {
  const {
    theme,
    setTheme,
    sidebarColor,
    setSidebarColor,
    useBgImage,
    setUseBgImage,
    backgroundImage,
    setBackgroundImage,
    primary,
    setPrimary,
    secondary,
    setSecondary,
    accent,
    setAccent,
  } = useTheme();

  // Sync CSS variables whenever colors change
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", primary);
    root.style.setProperty("--color-secondary", secondary);
    root.style.setProperty("--color-accent", accent);
  }, [primary, secondary, accent]);

  // Update color in Redux + localStorage
  const updateColor = (
    type: "primary" | "secondary" | "accent",
    value: string,
  ) => {
    if (type === "primary") setPrimary(value);
    else if (type === "secondary") setSecondary(value);
    else if (type === "accent") setAccent(value);
  };

  return (
    <MainShell>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {/* Theme Selector */}
        <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
            Theme
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setTheme("light")}
              className={`focus-ring rounded-lg px-4 py-2 text-sm font-medium ${
                theme === "light"
                  ? "bg-[var(--color-primary)] text-white shadow-md"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`focus-ring rounded-lg px-4 py-2 text-sm font-medium ${
                theme === "dark"
                  ? "bg-[var(--color-primary)] text-white shadow-md"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Dark
            </button>
          </div>
        </Card>

        {/* Sidebar Color Selector */}
        <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
            Sidebar Color
          </h2>
          <div className="flex flex-wrap gap-3">
            {COLOR_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                aria-label={opt.key}
                onClick={() => setSidebarColor(opt.key)}
                style={{ backgroundColor: opt.color }}
                className={`focus-ring h-10 w-10 rounded-lg border-2 transition ${
                  sidebarColor === opt.key
                    ? "ring-4 ring-[var(--color-primary)] ring-offset-2"
                    : "border-gray-300 dark:border-white/30"
                }`}
              />
            ))}
          </div>
        </Card>

        {/* Primary Color */}
        <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
          <h2 className="mb-4 text-lg font-medium text-gray-800 dark:text-gray-100">
            Primary Color
          </h2>
          <div className="flex flex-wrap gap-3">
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c.key}
                onClick={() => updateColor("primary", c.color)}
                style={{ backgroundColor: c.color }}
                className={`focus-ring h-10 w-10 rounded-lg border-2 transition ${
                  primary === c.color
                    ? "ring-4 ring-[var(--color-primary)] ring-offset-2"
                    : "border-gray-300 dark:border-white/30"
                }`}
              />
            ))}
          </div>
        </Card>

        {/* Secondary Color */}
        <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
          <h2 className="mb-4 text-lg font-medium text-gray-800 dark:text-gray-100">
            Secondary Color
          </h2>
          <div className="flex flex-wrap gap-3">
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c.key}
                onClick={() => updateColor("secondary", c.color)}
                style={{ backgroundColor: c.color }}
                className={`focus-ring h-10 w-10 rounded-lg border-2 transition ${
                  secondary === c.color
                    ? "ring-4 ring-[var(--color-primary)] ring-offset-2"
                    : "border-gray-300 dark:border-white/30"
                }`}
              />
            ))}
          </div>
        </Card>

        {/* Accent Color */}
        <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
          <h2 className="mb-4 text-lg font-medium text-gray-800 dark:text-gray-100">
            Accent Color
          </h2>
          <div className="flex flex-wrap gap-3">
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c.key}
                onClick={() => updateColor("accent", c.color)}
                style={{ backgroundColor: c.color }}
                className={`focus-ring h-10 w-10 rounded-lg border-2 transition ${
                  accent === c.color
                    ? "ring-4 ring-[var(--color-primary)] ring-offset-2"
                    : "border-gray-300 dark:border-white/30"
                }`}
              />
            ))}
          </div>
        </Card>

        {/* Background Image */}
        <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
            Background Image
          </h2>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={useBgImage}
              onChange={(e) => setUseBgImage(e.target.checked)}
              className="h-4 w-4 accent-[var(--color-primary)]"
            />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Enable background image
            </span>
          </label>

          <div className="mt-4 flex flex-col gap-3 lg:flex-row">
            <input
              type="text"
              value={backgroundImage ?? ""}
              onChange={(e) => setBackgroundImage(e.target.value || null)}
              placeholder="Paste image URL..."
              className="focus-ring flex-1 rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-gray-800 focus:outline-none dark:border-white/10 dark:bg-zinc-900/60 dark:text-gray-200"
            />
            <button
              onClick={() => setBackgroundImage(null)}
              className="focus-ring rounded-lg bg-gray-400 px-4 py-2 font-medium text-white dark:bg-zinc-900/50 dark:text-gray-200"
            >
              Clear
            </button>
          </div>
        </Card>
      </div>
    </MainShell>
  );
}
