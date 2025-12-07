"use client";

import React from "react";

export default function MobileStickyBar({
  title,
  onLeft,
  onRight,
}: {
  title: string;
  onLeft: () => void;
  onRight: () => void;
}) {
  return (
    <div className="md:hidden sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
      <div className="flex items-center justify-between px-3 py-2">
        <button
          aria-label="Open details"
          onClick={onLeft}
          className="h-11 w-11 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 active:scale-95 transition dark:text-gray-200 dark:hover:bg-gray-800"
        >
          {/* left icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </button>

        <div className="min-w-0 flex-1 px-2 text-center">
          <div className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </div>
        </div>

        <button
          aria-label="Change theme"
          onClick={onRight}
          className="h-11 w-11 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 active:scale-95 transition dark:text-gray-200 dark:hover:bg-gray-800"
        >
          {/* right icon */}
          <span className="text-xl">🎨</span>
        </button>
      </div>
    </div>
  );
}
