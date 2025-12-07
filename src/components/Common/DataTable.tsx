'use client';
import { useMemo, useState } from 'react';

export type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
  hideOnMobile?: boolean;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  globalFilterPlaceholder?: string;
  onRowClick?: (row: T) => void;
  filters?: React.ReactNode; // custom filter UI above table
};

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  pageSizeOptions = [5, 10, 20],
  defaultPageSize = 10,
  globalFilterPlaceholder = 'Search...',
  onRowClick,
  filters
}: Props<T>) {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const filtered = useMemo(() => {
    if (!q.trim()) return data;
    const needle = q.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((v) => String(v ?? '').toLowerCase().includes(needle))
    );
  }, [q, data]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pages);
  const start = (safePage - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  return (
    <div className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 p-3 md:flex-row md:items-center md:justify-between">
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
          placeholder={globalFilterPlaceholder}
          className="w-full rounded-md border border-slate-300 bg-white p-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 md:max-w-xs"
        />
        <div className="flex flex-1 justify-end">{filters}</div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <tr>
              {columns.map((c) => (
                <th
                  key={String(c.key)}
                  className={[
                    'px-3 py-2 font-medium',
                    c.hideOnMobile ? 'hidden md:table-cell' : '',
                    c.className || ''
                  ].join(' ')}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, ri) => (
              <tr
                key={ri}
                onClick={() => onRowClick?.(row)}
                className="border-t border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
              >
                {columns.map((c) => (
                  <td
                    key={String(c.key)}
                    className={[
                      'px-3 py-2 align-top text-slate-800 dark:text-slate-100',
                      c.hideOnMobile ? 'hidden md:table-cell' : '',
                      c.className || ''
                    ].join(' ')}
                  >
                    {c.render ? c.render(row) : String(row[c.key as keyof typeof row] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td className="px-3 py-4 text-center text-slate-500 dark:text-slate-400" colSpan={columns.length}>
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 p-3 sm:flex-row">
        <div className="text-xs text-slate-600 dark:text-slate-400">
          Showing {pageRows.length} of {total}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(1)}
            disabled={safePage === 1}
            className="rounded border border-slate-300 px-2 py-1 text-xs disabled:opacity-50 dark:border-slate-700"
          >
            First
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="rounded border border-slate-300 px-2 py-1 text-xs disabled:opacity-50 dark:border-slate-700"
          >
            Prev
          </button>
          <span className="text-xs text-slate-700 dark:text-slate-300">
            Page {safePage} / {pages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={safePage === pages}
            className="rounded border border-slate-300 px-2 py-1 text-xs disabled:opacity-50 dark:border-slate-700"
          >
            Next
          </button>
          <button
            onClick={() => setPage(pages)}
            disabled={safePage === pages}
            className="rounded border border-slate-300 px-2 py-1 text-xs disabled:opacity-50 dark:border-slate-700"
          >
            Last
          </button>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="rounded border border-slate-300 bg-white p-1 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>{n} / page</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
