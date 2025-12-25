"use client";

import { formatDate } from "@/utils/apiUtility";

export default function Education({ data, config }: any) {
  return (
    <section className="mb-4">
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-200">
        {config?.title ?? "Education"}
      </h3>

      {data.education.map((ed: any, i: number) => (
        <div key={i} className="mb-2">
          <div className="font-medium text-gray-800 dark:text-gray-100">
            {config?.format === "degree-first"
              ? `${ed.degree} — ${ed.institution}`
              : `${ed.institution} — ${ed.degree}`}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {formatDate(ed.start)} – {ed.end ? formatDate(ed.end) : "Present"}
          </div>

          {config?.showPercentage && ed.percentage && (
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Score: {ed.percentage}%
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
