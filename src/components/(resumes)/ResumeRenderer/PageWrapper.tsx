"use client";

import React from "react";
import {
  PageConfig,
  FontsConfig,
  ColorsConfig,
  TemplateConfig,
} from "@/types/resumeTemplate";

type PageWrapperProps = {
  page: PageConfig;
  fonts?: FontsConfig;
  colors?: ColorsConfig;
  backgroundLayout?: TemplateConfig["backgroundLayout"];
  contentArea?: TemplateConfig["contentArea"];
  children: React.ReactNode;
};

export default function PageWrapper({
  page,
  fonts,
  colors,
  backgroundLayout,
  contentArea,
  children,
}: PageWrapperProps) {
  // padding priority
  const padding = contentArea?.padding || page.margins;

  const bgIsDualTone = page.background === "dual-tone";

  // Tailwind fallback classes (NEW logic)
  const bgClass = colors?.background
    ? "bg-[color:var(--page-bg)]"
    : "bg-gray-50 dark:bg-gray-900";

  const textClass = colors?.text
    ? "text-[color:var(--page-text)]"
    : "text-gray-900 dark:text-gray-100";

  return (
    <div
      className={`relative mx-auto min-h-[297mm] w-full max-w-[210mm] overflow-hidden rounded-md shadow-sm ${bgClass} ${textClass}`}
      style={
        colors?.background || colors?.text
          ? ({
              "--page-bg": colors?.background ?? "#f9fafb",
              "--page-text": colors?.text ?? "#111827",
            } as React.CSSProperties)
          : undefined
      }
    >
      {/* Dual tone background */}
      {bgIsDualTone && backgroundLayout ? (
        <div className="absolute inset-0 flex">
          <div
            className="h-full"
            style={{
              flex:
                parseInt(backgroundLayout.ratio.split(":")[0] ?? "1", 10) || 1,
              backgroundColor: backgroundLayout.primaryColor,
            }}
          />
          <div
            className="h-full"
            style={{
              flex:
                parseInt(backgroundLayout.ratio.split(":")[1] ?? "1", 10) || 1,
              backgroundColor: backgroundLayout.secondaryColor,
            }}
          />
        </div>
      ) : null}

      {/* Content */}
      <div
        className="relative box-border h-full"
        style={{
          paddingTop: padding.top,
          paddingLeft: padding.left,
          paddingRight: padding.right,
          paddingBottom: padding.bottom,
          fontFamily: fonts?.primary || "system-ui",
        }}
      >
        {children}
      </div>
    </div>
  );
}
