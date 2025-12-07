"use client";
import { useTheme } from "@/hook/useTheme";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";

export default function PieCategory({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  const { theme } = useTheme();
  const light = [
    "#6366f1",
    "#22c55e",
    "#f97316",
    "#06b6d4",
    "#ef4444",
    "#a855f7",
  ];
  const dark = [
    "#818cf8",
    "#34d399",
    "#fb923c",
    "#22d3ee",
    "#f87171",
    "#c084fc",
  ];
  const colors = theme === "dark" ? dark : light;

  const toolTipBg = theme === "dark" ? "#1f2937" : "#ffffff";
  const toolTipColor = theme === "dark" ? "#f9fafb" : "#111827";
  const toolTipBorder = theme === "dark" ? "#4b5563" : "#d1d5db";

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  // ✅ Responsive height based on screen size
  const [chartHeight, setChartHeight] = useState("h-64");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640)
        setChartHeight("h-56"); // sm: 224px
      else if (width < 768)
        setChartHeight("h-64"); // md: 256px
      else if (width < 1024)
        setChartHeight("h-72"); // lg: 288px
      else setChartHeight("h-80"); // xl+: 320px
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full space-y-3 p-2 sm:p-4">
      {/* ✅ Responsive chart container */}
      <div
        className={`${chartHeight} w-full sm:min-h-[250px] md:min-h-[280px]`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                backgroundColor: toolTipBg,
                border: `1px solid ${toolTipBorder}`,
              }}
              itemStyle={{
                color: toolTipColor, // color of the value text
              }}
              labelStyle={{
                color: toolTipColor, // color of the label (name)
              }}
            />

            {/* ✅ Responsive center text */}
            <svg width="100%" height="100%">
              {/* Value in center */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: window.innerWidth < 640 ? "20px" : "24px",
                  fill: theme === "dark" ? "var(--color-primary)" : "#111827",
                  fontWeight: "bold",
                }}
              >
                {totalValue.toLocaleString()}
              </text>

              {/* Label/Title above the value */}
              <text
                x="50%"
                y="40%" // slightly above the number
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: window.innerWidth < 640 ? "12px" : "16px",
                  fill: theme === "dark" ? "#aaa" : "#555",
                  fontWeight: "normal",
                }}
              >
                Total
              </text>
            </svg>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={window.innerWidth < 640 ? "55%" : "60%"}
              outerRadius={window.innerWidth < 640 ? "85%" : "100%"}
              paddingAngle={4}
              cursor="pointer"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Responsive legends */}
      <div className="flex flex-wrap justify-center gap-2 px-1 sm:gap-3 sm:px-2">
        {data.map((entry, i) => (
          <div
            key={entry.name}
            className="flex items-center gap-1.5 text-xs sm:gap-2 sm:text-sm"
          >
            <div
              className="h-2.5 w-2.5 shrink-0 rounded-full sm:h-3 sm:w-3"
              style={{ backgroundColor: colors[i % colors.length] }}
            />
            <span
              className={`truncate ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              {entry.name}
            </span>
            <span className="min-w-[40px] text-xs font-semibold sm:text-sm">
              {((entry.value / totalValue) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
