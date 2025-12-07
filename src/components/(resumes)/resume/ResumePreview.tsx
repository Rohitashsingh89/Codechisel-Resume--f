"use client";
import React from "react";
import { ResumeShape } from "@/types/resumeTemplate";
import ThemeBasic from "./theme/ThemeBasic";
import { themeRegistry } from "./theme/registry";
import { useResumeBuilder } from "@/hook/useResumeBuilder";

function tint(hex: string, ratio = 0.6) {
  // simple lighten: mix with white
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16),
    g = parseInt(n.slice(2, 4), 16),
    b = parseInt(n.slice(4, 6), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * ratio);
  const toHex = (c: number) => c.toString(16).padStart(2, "0");
  return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`;
}

type ResumePreviewProps = {
  data: ResumeShape;
  completion: number;
  templateType: string;
};

export default function ResumePreview({
  data,
  completion,
  templateType,
}: ResumePreviewProps) {
  const Comp = themeRegistry[templateType] ?? ThemeBasic;
  const themeContext = useResumeBuilder();

  const accent = themeContext?.theme?.color ?? "#2563eb";
  const accent2 = tint(accent, 0.55);
  return (
    <div
      className="p-5"
      style={
        {
          // consumed by themes
          ["--accent" as any]: accent,
          ["--accent-2" as any]: accent2,
        } as React.CSSProperties
      }
    >
      <div className="mb-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-900 dark:text-gray-200">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
          Preview — {Math.round(completion)}% Complete
        </div>
      </div>
      <div
        className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 overflow-hidden"
        style={{
          minHeight: "297mm",
          boxSizing: "border-box",
        }}
      >

      <Comp data={data} templateType={templateType} completion={completion} />
    </div>
    </div>
  );
}
