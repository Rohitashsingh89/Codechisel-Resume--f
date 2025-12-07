"use client";
import { useTheme } from "@/hook/useTheme";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AreaMonthlyResumes({
  data,
}: {
  data: { month: string; resumes: number }[];
}) {
  const { theme } = useTheme();

  // ✅ Top Stats Calculation
  const topStats = useMemo(() => {
    if (!data || data.length === 0) return null;

    const latestMonth = data[data.length - 1]?.resumes || 0;
    const highestMonth = Math.max(...data.map((d) => d.resumes));
    const totalResumes = data.reduce((sum, d) => sum + d.resumes, 0);
    const avgResumes = totalResumes / data.length;

    return {
      current: latestMonth,
      peak: highestMonth,
      total: totalResumes,
      avg: Math.round(avgResumes),
    };
  }, [data]);

  // Theme-based colors
  const stroke =
    theme === "dark" ? "var(--color-primary)" : "var(--color-primary)"; // line
  const fill =
    theme === "dark" ? "rgba(96,165,250,0.25)" : "rgba(37,99,235,0.20)"; // gradient
  const bgColor = theme === "dark" ? "#111827" : "#ffffff"; // chart bg
  const axisColor = theme === "dark" ? "#d1d5db" : "#4b5563"; // X/Y labels
  const gridColor =
    theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"; // grid lines
  const tooltipBg = theme === "dark" ? "#111827" : "#ffffff";
  const tooltipColor = theme === "dark" ? "#f9fafb" : "#111827";

  return (
    <div className="w-full">
      {/* Chart */}
      <div className="h-[250px] w-full sm:h-[300px] md:h-[300px] lg:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 16, left: -40, bottom: 0 }}
            style={{ backgroundColor: bgColor, borderRadius: 12 }}
          >
            <defs>
              <linearGradient id="gradArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={stroke} stopOpacity={0.4} />
                <stop offset="95%" stopColor={stroke} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke={gridColor}
              strokeDasharray="4 4"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: axisColor }}
              axisLine={{ stroke: axisColor }}
            />
            <YAxis
              tick={{ fill: axisColor }}
              axisLine={{ stroke: axisColor }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                backgroundColor: tooltipBg,
                color: tooltipColor,
                border: `1px solid ${theme === "dark" ? "#374151" : "#d1d5db"}`,
              }}
            />
            <Area
              type="monotone"
              dataKey="resumes"
              stroke={stroke}
              fill="url(#gradArea)"
              strokeWidth={2}
              cursor="pointer"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ TOP STATS */}
      {topStats && (
        <div className="mt-4 flex flex-wrap gap-4">
          {[
            { label: "Current", value: topStats.current },
            { label: "Peak", value: topStats.peak },
            { label: "Total", value: topStats.total },
            { label: "Average", value: topStats.avg },
          ].map((stat) => (
            <div
              key={stat.label}
              className="min-w-[100px] flex-1 rounded-lg border border-gray-200/50 bg-white/90 p-3 text-center shadow-sm backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/90"
            >
              <p className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                {stat.label}
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {stat.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
