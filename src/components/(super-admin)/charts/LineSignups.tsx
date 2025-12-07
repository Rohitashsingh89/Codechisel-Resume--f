"use client";
import { useTheme } from "@/hook/useTheme";
import { useState } from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

export default function LineSignups({
  data,
}: {
  data: { month: string; users: number }[];
}) {
  const { theme } = useTheme();

  const [hovered, setHovered] = useState(false); // hover state
  const [clicked, setClicked] = useState(false); // click state

  // Dynamic theme-based colors
  const lineColor =
    theme === "dark" ? "var(--color-primary)" : "var(--color-primary)"; // amber tones
  const textColor = theme === "dark" ? "#e5e7eb" : "#374151"; // gray-200 / gray-700
  const gridColor =
    theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";
  const tooltipBg = theme === "dark" ? "#1f2937" : "#ffffff"; // gray-800 / white
  const tooltipText = theme === "dark" ? "#f3f4f6" : "#111827"; // gray-100 / gray-900

  const getStrokeWidth = () => {
    if (clicked) return 6; // clicked state
    if (hovered) return 6; // hovered state
    return 3; // normal state
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: -40, bottom: 10 }}
        >
          {/* Grid */}
          <CartesianGrid
            stroke={gridColor}
            strokeDasharray="4 4"
            vertical={false}
          />

          {/* X Axis */}
          <XAxis
            dataKey="month"
            stroke={textColor}
            tick={{ fill: textColor, fontSize: 12 }}
            tickLine={{ stroke: textColor }}
            axisLine={{ stroke: textColor }}
          />

          {/* Y Axis */}
          <YAxis
            stroke={textColor}
            tick={{ fill: textColor, fontSize: 12 }}
            tickLine={{ stroke: textColor }}
            axisLine={{ stroke: textColor }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              backgroundColor: theme === "dark" ? "#111827" : "#ffffff",
              color: theme === "dark" ? "#f9fafb" : "#111827",
              border: `1px solid ${theme === "dark" ? "#374151" : "#d1d5db"}`,
            }}
            cursor={{
              fill: theme === "dark" ? "#ffffff10" : "#00000010", // light/dark hover overlay
              stroke: "none", // optional, remove border
            }}
          />

          {/* Legend */}
          <Legend
            wrapperStyle={{
              paddingTop: 10,
              color: textColor,
            }}
            iconType="circle"
          />

          {/* Line */}
          <Line
            type="monotone"
            dataKey="users"
            stroke={lineColor}
            strokeWidth={getStrokeWidth()}
            dot={{ r: 4, strokeWidth: 1, fill: lineColor }}
            name="User Signups"
            cursor="pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setClicked(!clicked)}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
