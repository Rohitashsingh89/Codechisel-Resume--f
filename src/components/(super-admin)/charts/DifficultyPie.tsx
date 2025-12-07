"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RTooltip,
  Legend as RLegend,
} from "recharts";
import React from "react";

function ThemedLegend({ payload }: any) {
  const items = payload ?? [];
  return (
    <ul className="m-0 flex flex-wrap gap-3 p-0 text-xs text-gray-800 dark:text-gray-200">
      {items.map((it: any) => (
        <li key={it.value} className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded" style={{ backgroundColor: it.color }} />
          <span>{it.value}</span>
        </li>
      ))}
    </ul>
  );
}

function DefaultTooltipContent({ active, label, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded" style={{ background: p.color }} />
          <span>{p.name ?? p.payload?.name}: {p.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function DifficultyPie({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) {
  return (
    <div className="h-72 w-full text-gray-900 dark:text-gray-100">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label />
          {data.map((d, i) => <Cell key={i} fill={d.color} />)}
          <RTooltip content={<DefaultTooltipContent />} />
          <RLegend content={(props) => <ThemedLegend {...props} />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
