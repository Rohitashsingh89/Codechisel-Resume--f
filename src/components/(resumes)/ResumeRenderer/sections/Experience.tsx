"use client";

import { formatDate } from "@/utils/apiUtility";

export default function Experience({ data, config }: any) {
  return (
    <section className="mb-4">
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-200">
        {config?.title ?? "Experience"}
      </h3>

      {data.experience.map((e: any, i: number) => (
        <div key={i} className="mb-3">
          <div className="font-medium text-gray-800 dark:text-gray-100">
            {e.role} — {e.company}
          </div>

          {config?.showDateRange && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {formatDate(e.start)} – {e.end ? formatDate(e.end) : "Present"}
            </div>
          )}

          {config?.itemStyle === "bullet" ? (
            <ul className="ml-5 list-disc text-gray-700 dark:text-gray-300">
              {e.description
                ?.split("\n")
                .map((d: string, idx: number) => <li key={idx}>{d}</li>)}
            </ul>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">{e.description}</p>
          )}
        </div>
      ))}
    </section>
  );
}
