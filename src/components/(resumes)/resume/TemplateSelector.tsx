"use client";

import { useThemeRegistry } from "@/hook/useThemeRegistry";

export default function TemplateSelector({
  value,
  onChange,
}: {
  value: string; // slug
  onChange: (v: string) => void;
}) {
  const { templates, loading } = useThemeRegistry();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Template
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2"
      >
        {loading && <option>Loading templates…</option>}

        {!loading &&
          templates.map((t) => (
            <option key={t.slug} value={t.slug}>
              {/* TemplateMeta me field `name` tha, `title` nahi */}
              {t.name}
            </option>
          ))}
      </select>
    </div>
  );
}
