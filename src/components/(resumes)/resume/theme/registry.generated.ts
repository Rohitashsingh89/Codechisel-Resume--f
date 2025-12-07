/* AUTO-GENERATED: do not edit */
"use client";
import dynamic from "next/dynamic";
const Theme_basic = dynamic(() => import("./ThemeBasic"), { ssr: false });
const Theme_classic = dynamic(() => import("./ThemeClassic"), { ssr: false });
const Theme_minimal = dynamic(() => import("./ThemeMinimal"), { ssr: false });
const Theme_profession = dynamic(() => import("./ThemeProfession"), { ssr: false });
const Theme_student = dynamic(() => import("./ThemeStudent"), { ssr: false });

export const themeRegistry: Record<string, any> = {
  "basic": Theme_basic,
  "classic": Theme_classic,
  "minimal": Theme_minimal,
  "profession": Theme_profession,
  "student": Theme_student,
};
export const themeMeta: Record<string, { name: string }> = {
  "basic": { name: "Basic" },
  "classic": { name: "Classic" },
  "minimal": { name: "Minimal" },
  "profession": { name: "Profession" },
  "student": { name: "Student" },
};
