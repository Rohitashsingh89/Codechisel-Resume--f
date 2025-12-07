"use client";
import { useCallback, useRef, useEffect } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface Filter {
  key: string;
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

interface FilterGridProps {
  search: string;
  onSearchChange: (value: string) => void;
  filters: Filter[];
  columns: Record<string, boolean>;
  showColumnsDropdown: boolean;
  onToggleColumnsDropdown: () => void;
  onToggleColumn: (column: string) => void;
}

export default function FilterGrid({
  search,
  onSearchChange,
  filters,
  columns,
  showColumnsDropdown,
  onToggleColumnsDropdown,
  onToggleColumn,
}: FilterGridProps) {

  const dropdownRef = useRef<HTMLDivElement>(null);

  // ⭐ OUTSIDE CLICK HANDLER
  useEffect(() => {
    if (!showColumnsDropdown) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onToggleColumnsDropdown(); // close dropdown
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onToggleColumnsDropdown();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showColumnsDropdown, onToggleColumnsDropdown]);

  const debouncedSearch = useCallback((value: string) => {
    const timeout = setTimeout(() => onSearchChange(value), 300);
    return () => clearTimeout(timeout);
  }, [onSearchChange]);

  return (
    <div className="border border-gray-300 bg-white/80 dark:border-gray-700/50 dark:bg-gray-900/30 rounded-xl p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => debouncedSearch(e.target.value)}
          className="col-span-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none sm:col-span-2 lg:col-span-1 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />

        {/* FILTER DROPDOWNS */}
        {filters.map(({ key, label, value, options, onChange }) => (
          <select
            key={key}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="">{label}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}

        {/* COLUMN DROPDOWN */}
        <div ref={dropdownRef} className="relative col-span-1">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            onClick={onToggleColumnsDropdown}
          >
            <span className="truncate">Columns</span>
            <svg
              className={`h-4 w-4 transition-transform ${showColumnsDropdown ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showColumnsDropdown && (
            <div className="absolute top-full right-0 z-50 mt-2 w-56 rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-600 dark:bg-gray-800">
              {Object.entries(columns).map(([col, visible]) => (
                <label
                  key={col}
                  className="flex cursor-pointer items-center gap-3 px-4 py-3 text-sm text-gray-700 capitalize hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={visible}
                    onChange={() => onToggleColumn(col)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 dark:border-gray-600"
                  />
                  <span>{col.replace(/([A-Z])/g, " $1").trim()}</span>
                </label>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
