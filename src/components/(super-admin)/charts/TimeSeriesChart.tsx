"use client";

import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RTooltip,
  Legend as RLegend,
  BarChart,
  Bar,
  LineChart,
  Line,
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
      <div className="font-medium">{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded" style={{ background: p.color }} />
          <span>{p.name}: {p.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function TimeSeriesChart({
  data,
  kind = "bar",
}: {
  data: { bucket: string; count: number }[];
  kind?: "bar" | "line";
}) {
  const axes = (
    <>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="bucket" tick={{ fill: "currentColor" }} />
      <YAxis allowDecimals={false} tick={{ fill: "currentColor" }} />
      <RTooltip content={<DefaultTooltipContent />} />
      <RLegend content={(props) => <ThemedLegend {...props} />} />
    </>
  );

  return (
    <div className="h-72 w-full text-gray-900 dark:text-gray-100">
      <ResponsiveContainer width="100%" height="100%">
        {kind === "bar" ? (
          <BarChart data={data}>
            {axes}
            <Bar dataKey="count" name="Problems" fill="#3b82f6" />
          </BarChart>
        ) : (
          <LineChart data={data}>
            {axes}
            <Line type="monotone" dataKey="count" name="Problems" stroke="#22c55e" strokeWidth={2} dot={false} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
