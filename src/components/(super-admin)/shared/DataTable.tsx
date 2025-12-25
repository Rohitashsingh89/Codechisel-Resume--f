"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ReactNode } from "react";

interface ColumnConfig {
  key: string;
  label: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Record<string, boolean>;
  columnConfig: ColumnConfig[];
  loading: boolean;
  totalPages: number;
  totalItems?: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  renderCell: (item: T, columnKey: string) => ReactNode;
  renderActions: (item: T) => ReactNode;
}

export default function DataTable<T>({
  data,
  columns,
  columnConfig,
  loading,
  totalPages,
  totalItems,
  page,
  limit,
  onPageChange,
  renderCell,
  renderActions,
}: DataTableProps<T>) {
  const visibleColumns = columnConfig.filter((col) => columns[col.key]);

  if (loading && data.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center py-10">
        <div className="relative">
          <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
      <div className="flex flex-col items-start p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          All Items ({data.length})
        </h2>
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <span>
            Page {page} of {totalPages}
          </span>
        </div>
      </div>

      <div className="overflow-hidden px-4 pb-6 sm:px-6">
        <div className="no-scrollbar overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50">
          <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
            <thead className="sticky top-0 z-10 bg-gradient-to-r from-gray-100 to-gray-200 backdrop-blur-sm dark:from-gray-800 dark:to-gray-900">
              <tr>
                {visibleColumns.map((col) => (
                  <th
                    key={col.key} // ✅ FIXED: Unique key
                    className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="w-32 px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900/30">
              {/* ✅ FIXED: Skeleton Loading with UNIQUE KEYS */}
              {loading &&
                Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={`skeleton-row-${i}`}>
                      {visibleColumns.map(
                        (
                          col,
                          colIndex, // ✅ FIXED: Use colIndex as key
                        ) => (
                          <td
                            key={`skeleton-cell-${i}-${colIndex}`}
                            className="px-6 py-4"
                          >
                            <div className="h-4 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                          </td>
                        ),
                      )}
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                          <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                      </td>
                    </tr>
                  ))}

              {/* ✅ FIXED: Empty State */}
              {!loading && data.length === 0 && (
                <tr>
                  <td
                    colSpan={visibleColumns.length + 1}
                    className="px-6 py-20 text-center"
                  >
                    <div className="text-center">
                      <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 p-3 dark:from-gray-800 dark:to-gray-900">
                        <svg
                          className="mx-auto h-10 w-10 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                      <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                        No items found
                      </h3>
                      <p className="mb-4 text-gray-500 dark:text-gray-400">
                        Try adjusting your search or filter criteria.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {/* ✅ FIXED: Data Rows with UNIQUE KEYS */}
              {!loading &&
                data.map((item, i) => (
                  <tr
                    key={(item as any)._id || (item as any).id || `item-${i}`} // ✅ UNIQUE KEY
                    className={`transition-colors duration-200 ${i % 2 === 0 ? "bg-white/30 dark:bg-gray-900/20" : "bg-gray-200 dark:bg-gray-800/40"} hover:bg-gray-300 dark:hover:bg-gray-700`}
                  >
                    {visibleColumns.map((col) => (
                      <td
                        key={`data-cell-${(item as any)._id || (item as any).id || i}-${col.key}`}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        {renderCell(item, col.key)}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {renderActions(item)}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* ✅ FIXED: Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-8 border-t border-gray-200/50 px-0 pt-6 pb-6 sm:px-0 dark:border-gray-700/50">
            <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 text-sm text-gray-700 sm:mb-0 dark:text-gray-300">
                Showing {(page - 1) * limit + 1} to{" "}
                {Math.min(page * limit, totalItems)} of {totalItems} results
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onPageChange(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                  Previous
                </button>
                <button
                  onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                  disabled={page >= totalPages}
                  className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Next
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
