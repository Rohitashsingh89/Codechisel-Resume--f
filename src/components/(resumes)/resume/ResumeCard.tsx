"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import clsx from "clsx";
import { formatDate } from "@/utils/apiUtility";

export default function ResumeCard({
  _id,
  resumeName,
  templateType,
  createdAt,
  updatedAt,
  completion,
  theme,
}: {
  _id: string;
  resumeName: string;
  templateType: string;
  createdAt: string;
  updatedAt: string;
  completion?: number;
  theme?: { mode: "light" | "dark"; color: string };
}) {
  const [hovered, setHovered] = useState(false);

  const safeCompletion = Math.min(Math.max(completion ?? 0, 0), 100);

  const getProgressColor = (value: number) => {
    if (value < 30) return "from-red-400/70 to-red-500/70";
    if (value < 70) return "from-amber-400/70 to-yellow-500/70";
    return "from-green-400/70 to-emerald-500/70";
  };

  const gradient = useMemo(() => {
    if (theme?.color) {
      return `from-[${theme.color}] via-[${theme.color}] to-[${theme.color}]`;
    }

    const fallbackGradients = [
      "from-purple-300/40 via-pink-300/40 to-rose-300/40",
      "from-teal-300/40 via-cyan-300/40 to-blue-300/40",
      "from-orange-300/40 via-rose-300/40 to-pink-300/40",
      "from-green-300/40 via-lime-300/40 to-yellow-300/40",
      "from-sky-300/40 via-blue-300/40 to-indigo-300/40",
    ];
    return fallbackGradients[
      Math.floor(Math.random() * fallbackGradients.length)
    ];
  }, [theme]);

  function lightenColor(hex: string, percent: number) {
    const num = parseInt(hex.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  function darkenColor(hex: string, percent: number) {
    return lightenColor(hex, -percent);
  }

  return (
    <Link
      href={`/resume/${_id}`}
      className={clsx(
        "group flex flex-col overflow-hidden rounded-xl",
        // 🌤 Light mode glass
        "border border-gray-200 bg-white/60 backdrop-blur-xl",
        // 🌑 Dark mode glass
        "dark:bg-gray-dark dark:border-gray-700",
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header gradient */}
      <div
        className="h-20 w-full transition-colors duration-500"
        style={{
          background: `linear-gradient(to right, ${lightenColor(theme.color, 20)}, ${theme.color}, ${darkenColor(theme.color, 20)})`,
        }}
      ></div>

      {/* Bottom content */}
      <div className="dark:bg-gray-dark relative flex flex-col justify-between gap-3 border-t border-gray-300/40 bg-white/40 p-5 backdrop-blur-xl dark:border-white/20">
        {/* Hover action buttons */}
        {hovered && (
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button className="rounded-lg border border-gray-300/50 bg-white/50 p-2 text-gray-700 transition-all hover:scale-105 hover:bg-white/70 dark:border-white/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30">
              <FiEdit2 size={16} />
            </button>
            <button className="rounded-lg border border-white/30 bg-red-500/50 p-2 text-white transition-all hover:scale-105 hover:bg-red-500/70">
              <FiTrash2 size={16} />
            </button>
          </div>
        )}

        {/* Resume name + template */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-primary dark:text-primary">
            {resumeName ?? "NA"}
          </div>
          <span className="rounded-lg border border-gray-300/50 bg-white/40 px-3 py-1 text-xs text-gray-700 dark:border-white/30 dark:bg-white/10 dark:text-white/90">
            {templateType ?? "NA"}
          </span>
        </div>

        {/* Dates */}
        <div className="text-xs text-gray-600 dark:text-white/70">
          Created: {formatDate(createdAt, true)}
        </div>
        <div className="text-xs text-gray-600 dark:text-white/70">
          Updated: {formatDate(updatedAt, true)}
        </div>

        {/* Progress */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-white/80">
            {safeCompletion < 100 ? (
              <span>In Progress</span>
            ) : (
              <span className="font-medium text-emerald-600 dark:text-emerald-300">
                Completed 🎉
              </span>
            )}
          </div>
          <span
            className={clsx(
              "text-xs font-semibold",
              safeCompletion < 30
                ? "text-red-600 dark:text-red-400"
                : safeCompletion < 70
                  ? "text-yellow-600 dark:text-yellow-300"
                  : "text-green-600 dark:text-green-300",
            )}
          >
            {safeCompletion}% Completed
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full border border-gray-300/40 bg-gray-200/40 backdrop-blur-sm dark:border-white/20 dark:bg-white/10">
          <div
            className={clsx(
              "h-full rounded-full bg-gradient-to-r transition-all duration-500",
              getProgressColor(safeCompletion),
            )}
            style={{ width: `${safeCompletion}%` }}
          />
        </div>
      </div>
    </Link>
  );
}
