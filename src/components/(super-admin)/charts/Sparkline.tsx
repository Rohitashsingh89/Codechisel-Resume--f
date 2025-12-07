"use client";
import { useTheme } from "@/hook/useTheme";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = { data: { name: string; value: number }[]; color: string };

export default function Sparkline({ data, color }: Props) {
    const { theme } = useTheme();
    // const color = theme === "dark" ? "#fbbf24" : "#d97706"; // line color
    const tooltipBg = theme === "dark" ? "#111827" : "#ffffff";
    const tooltipColor = theme === "dark" ? "#f9fafb" : "#111827";
  
    return (
      <div className="h-10 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                backgroundColor: tooltipBg,
                color: tooltipColor,
                border: "none",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }