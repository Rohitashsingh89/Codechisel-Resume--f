"use client";

import React from "react";

type TP = {
  active?: boolean;
  label?: string | number;
  payload?: Array<{
    color?: string;
    name?: string;
    value?: number | string;
    payload?: any;
  }>;
};

export default function CustomTooltip({ active, label, payload }: TP) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
      {label !== undefined && (
        <div className="mb-1 font-medium">{String(label)}</div>
      )}
      <ul className="space-y-0.5">
        {payload.map((p, i) => (
          <li key={i} className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded"
              style={{ background: p.color || "currentColor" }}
            />
            <span>{p.name ?? p.payload?.name}: {p.value as any}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
