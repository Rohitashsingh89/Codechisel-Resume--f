"use client";

import { ReactNode } from "react";
import { MdFormatListBulletedAdd } from "react-icons/md";

interface PageHeaderProps {
  title?: string;
  description?: string;
  onAdd?: () => void;
  className?: string;
  addLabel?: string;
  addIcon?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  onAdd,
  className = "",
  addLabel,
  addIcon,
}: PageHeaderProps) {
  const safeTitle = title ?? "Items";
  const safeDescription = description ?? "Manage your items easily.";
  const buttonLabel =
    addLabel ??
    `Add ${safeTitle.endsWith("s") ? safeTitle.slice(0, -1) : safeTitle}`;
  const icon = addIcon ?? <MdFormatListBulletedAdd size={18} />;

  return (
    <div
      className={`rounded-xl border border-gray-300 bg-white/80 p-4 backdrop-blur-sm sm:p-6 dark:border-gray-700/50 dark:bg-gray-900/30 ${className}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
            {safeTitle}
          </h1>
          <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400">
            {safeDescription}
          </p>
        </div>

        {onAdd && (
          <button
            onClick={onAdd}
            className="xs:w-auto xs:mt-0 mt-2 flex w-full items-center justify-center gap-2 rounded bg-green-100 px-4 py-2 whitespace-nowrap text-green-800 transition-all hover:bg-green-200 dark:bg-green-700/20 dark:text-green-300 dark:hover:bg-green-600/30"
          >
            {buttonLabel} {icon}
          </button>
        )}
      </div>
    </div>
  );
}
