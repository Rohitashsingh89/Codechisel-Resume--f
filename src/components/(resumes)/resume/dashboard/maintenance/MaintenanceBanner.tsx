"use client";

import { useState } from "react";

export default function MaintenanceBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="
        flex items-center justify-between
        rounded-md border border-gray-200 dark:border-gray-700
        bg-indigo-500 backdrop-blur-sm
        px-4 py-2 text-sm text-white
        dark:bg-indigo-500 dark:text-[var(--accent-2)]
      "
      style={{background: "linear-gradient(to right, var(--primary-light), var(--primary-dark), var(--color-primary))"}}
    >
      <p className="font-medium">
        ⚠️ This project is under maintenance.
      </p>

      <button
        onClick={() => setVisible(false)}
        className="
          ml-4 rounded-full p-1.5
          text-white
          hover:bg-[var(--accent-2)]/20
          dark:text-[var(--accent-2)] dark:hover:bg-[var(--accent)]/20
        "
        aria-label="Close maintenance warning"
      >
        ✕
      </button>
    </div>
  );
}
