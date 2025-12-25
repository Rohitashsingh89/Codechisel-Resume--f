"use client";

import React from "react";
import { ResumeShape, TemplateConfig } from "@/types/resumeTemplate";
import { useResumeBuilder } from "@/hook/useResumeBuilder";
import ResumeRenderer from "../ResumeRenderer/ResumeRenderer";

type ResumePreviewProps = {
  data: ResumeShape;
  completion: number;
  templateType: string;
  config?: TemplateConfig | null;
  isFallback?: boolean;
  loading?: boolean;
};

export default function ResumePreview({
  data,
  completion,
  templateType,
  config,
  isFallback,
  loading,
}: ResumePreviewProps) {
  const { theme } = useResumeBuilder();
  const accent = theme?.color ?? "#2563eb";

  return (
    <div
      className="p-2 sm:p-5"
      style={{ ["--accent" as any]: accent } as React.CSSProperties}
    >
      {/* STATUS BAR */}
      <div className="mb-4 flex items-center justify-center gap-2 text-sm">
        <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700 dark:bg-gray-900 dark:text-gray-200">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Preview — {Math.round(completion)}% Complete
        </div>

        {loading ? (
          <span className="text-xs text-gray-500">Loading template…</span>
        ) : isFallback ? (
          <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
            Fallback mode
          </span>
        ) : (
          <span className="rounded-full border border-indigo-300 bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
            Dynamic template
          </span>
        )}
      </div>

      {/* PAGE */}
      <div className="no-scrollbar w-full overflow-x-auto">
        <div
          className="mx-auto border border-gray-300 bg-white dark:border-gray-800 dark:bg-gray-900"
          style={{
            width: "210mm",
            minHeight: "297mm",
            boxSizing: "border-box",
          }}
        >
          <ResumeRenderer data={data} config={config} isFallback={isFallback} />
        </div>
      </div>
    </div>
  );
}
