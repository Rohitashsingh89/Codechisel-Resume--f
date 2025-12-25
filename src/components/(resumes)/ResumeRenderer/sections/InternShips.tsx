"use client";

import { formatDate } from "@/utils/apiUtility";

export default function Internships({ data, config }: any) {
  const list = data.internships || [];
  if (!list.length) return null;

  return (
    <section className="mb-4">
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-200">
        {config?.title ?? "Internships"}
      </h3>

      {list.map((i: any, idx: number) => (
        <div key={idx} className="mb-3">
          <div className="font-medium text-gray-800 dark:text-gray-100">
            {i.role} — {i.company}
          </div>

          {config?.showDateRange && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {formatDate(i.start)} – {i.end ? formatDate(i.end) : "Present"}
            </div>
          )}

          {i.description && (
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {i.description}
            </p>
          )}
        </div>
      ))}
    </section>
  );
}
