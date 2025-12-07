"use client";
import { useTheme } from "@/hook/useTheme";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function BarTopTemplates({
  data,
}: {
  data: { name: string; uses: number }[];
}) {
  const { theme } = useTheme();

  // Theme-based colors
  const barColor =
    theme === "dark" ? "var(--color-primary)" : "var(--color-primary)";
  const bgColor = theme === "dark" ? "#111827" : "#ffffff"; // dark gray / light gray
  const axisColor = theme === "dark" ? "#d1d5db" : "#4b5563"; // light text / gray-700
  const gridColor =
    theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"; // subtle opacity
  const toolTipBg = theme === "dark" ? "#111827" : "#ffffff"; // subtle opacity
  const toolTipColor = theme === "dark" ? "#f9fafb" : "#111827"; // subtle opacity
  const toolTipBorder = theme === "dark" ? "#374151" : "#d1d5db"; // subtle opacity

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 16, left: -40, bottom: 0 }}
          style={{ backgroundColor: bgColor, borderRadius: 12 }}
        >
          <CartesianGrid
            stroke={gridColor}
            strokeDasharray="4 4"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: axisColor }}
            axisLine={{ stroke: axisColor }}
          />
          <YAxis tick={{ fill: axisColor }} axisLine={{ stroke: axisColor }} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              backgroundColor: toolTipBg,
              color: toolTipColor,
              border: `1px solid ${toolTipBorder}`,
            }}
            cursor={{
              fill: gridColor, // light/dark hover overlay
              stroke: "none", // optional, remove border
            }}
          />
          {/* <Bar dataKey="uses" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={barColor}
                style={{ cursor: "pointer" }} // <- this makes the pointer appear
              />
            ))}
          </Bar> */}
          {/* <Tooltip
            contentStyle={{
              borderRadius: 12,
              backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
              color: theme === 'dark' ? '#f9fafb' : '#111827',
            }}
          /> */}
          <Bar
            dataKey="uses"
            fill={barColor}
            radius={[10, 10, 0, 0]}
            cursor="pointer"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
