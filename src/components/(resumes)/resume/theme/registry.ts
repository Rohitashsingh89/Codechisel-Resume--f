"use client";

import React from "react";
import type { ResumeShape } from "@/types/resumeTemplate";

type ThemeProps = { data: ResumeShape; templateType?: string; completion?: number };

declare var require: {
  context: (path: string, deep?: boolean, filter?: RegExp) => {
    keys: () => string[];
    (key: string): any;
  };
};

const ctx = require.context("./", false, /^\.\/Theme[A-Za-z0-9_-]+\.(tsx|ts|jsx|js)$/);

const fileToSlug = (file: string) => {
  const name = file.replace("./Theme", "").replace(/\.(tsx|ts|jsx|js)$/, "");
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/_/g, "-").toLowerCase();
};

export const themeRegistry: Record<string, React.ComponentType<ThemeProps>> = {};
export const themeMeta: Record<string, { name: string }> = {};

ctx.keys().forEach((key: string) => {
  const mod = ctx(key) as any;
  const Comp = mod.default as React.ComponentType<ThemeProps> | undefined;
  const explicitSlug = mod.slug as string | undefined;
  const meta = mod.themeMeta as { name?: string } | undefined;
  const slug = explicitSlug ?? fileToSlug(key);
  if (Comp && slug) {
    themeRegistry[slug] = Comp;
    themeMeta[slug] = { name: meta?.name ?? slug.replace(/-/g, " ") };
  }
});
