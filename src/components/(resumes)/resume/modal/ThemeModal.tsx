"use client";

import { useThemeRegistry } from "@/hook/useThemeRegistry";

export default function ThemeModal({
  current,
  onClose,
  onSelect,
}: {
  current: string;
  onClose: () => void;
  onSelect: (slug: string) => void;
}) {
  const { templates, loading } = useThemeRegistry();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 dark:bg-black/70 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label="Select Theme"
    >
      <div className="w-11/12 max-w-md rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900/80 p-6 shadow-2xl">
        <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
          Select Theme
        </h2>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Loading templates...
            </div>
          )}

          {!loading &&
            templates.map((t) => (
              <button
                key={t.slug}
                onClick={() => onSelect(t.slug)}
                className={`w-full rounded border px-4 py-2 text-left text-sm font-medium ${
                  current === t.slug
                    ? "border-violet-600 bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300"
                    : "border-gray-300 text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {t.name || t.slug}
              </button>
            ))}

          {!loading && !templates.length && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              No themes available.
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded bg-gray-200 px-4 py-2 text-sm text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
