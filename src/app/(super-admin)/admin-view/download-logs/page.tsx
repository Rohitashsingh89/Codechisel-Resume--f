"use client";

import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  fetchDownloadLogs,
  setCurrentPage,
  setFilters,
  deleteDownloadLog,
} from "@/features/downloadLogs/downloadLogsSlice";
import MainShell from "@/components/(super-admin)/MainShell";
import Card from "@/components/(super-admin)/shared/Card";
import { FiTrash2 } from "react-icons/fi";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  DownloadIcon,
  UserIcon,
  FileText,
} from "lucide-react";
import { formatDate } from "@/utils/apiUtility";

function Modal({ isOpen, onClose, children }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 backdrop-blur-sm sm:p-4">
      <div className="w-full max-w-md rounded-xl bg-white/90 px-3 py-6 shadow-xl backdrop-blur-xl sm:px-6 dark:bg-gray-900/80">
        {children}
      </div>
    </div>
  );
}

export default function DownloadLogsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { logs, loading, error, currentPage, itemsPerPage, totalLogs } =
    useSelector((state: RootState) => state.downloadLogs);

  // Pagination calculations
  const totalPages = Math.ceil(totalLogs / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalLogs);

  // Insights
  // ✅ SAFE VERSION - Replace insights section
  const totalDownloads = logs.length;
  const pdfDownloads = logs.filter(
    (log) => log.downloadType === "pdf" && log.downloadType,
  ).length;
  const uniqueUsers = new Set(
    logs
      .filter((log) => log.userId?._id) // ✅ Null check
      .map((log) => log.userId._id),
  ).size;

  useEffect(() => {
    dispatch(fetchDownloadLogs());
  }, [dispatch]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
  }, [currentPage, dispatch]);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) dispatch(setCurrentPage(currentPage + 1));
  }, [currentPage, totalPages, dispatch]);

  const goToFirstPage = useCallback(
    () => dispatch(setCurrentPage(1)),
    [dispatch],
  );
  const goToLastPage = useCallback(
    () => dispatch(setCurrentPage(totalPages)),
    [totalPages, dispatch],
  );

  const onClickDelete = (id: string) => {
    if (confirm("Delete this download log?")) {
      dispatch(deleteDownloadLog(id));
    }
  };

  if (loading && logs.length === 0) {
    return (
      <MainShell>
        <div className="flex h-full w-full items-center justify-center py-10">
          <div className="relative">
            <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"></div>
          </div>
        </div>
      </MainShell>
    );
  }

  return (
    <MainShell>
      <div className="space-y-6">
        {/* Page Header */}
        <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
          <div className="xs:items-center xs:flex-row xs:justify-between flex flex-col items-start justify-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Download Logs
              </h1>
              <p className="mt-1 text-gray-700 dark:text-gray-300">
                Track all resume downloads with user details and timestamps.
              </p>
            </div>
          </div>
        </Card>

        {/* Insights */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="group border border-gray-300 bg-gradient-to-br from-white to-gray-50 p-6 transition-all duration-200 hover:border-gray-300 dark:border-gray-700/50 dark:from-gray-900/50 dark:to-gray-800/50 dark:hover:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
                  Total Downloads
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                  {totalDownloads.toLocaleString()}
                </p>
              </div>
              <DownloadIcon className="h-12 w-12 text-gray-400" />
            </div>
          </Card>

          <Card className="group border border-gray-300 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 transition-all duration-200 hover:border-gray-300 dark:border-gray-700/50 dark:from-emerald-900/20 dark:to-emerald-800/30 dark:hover:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
                  PDF Downloads
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {pdfDownloads}
                </p>
              </div>
              <FileText className="h-12 w-12 text-emerald-400" />
            </div>
          </Card>

          <Card className="group border border-gray-300 bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 transition-all duration-200 hover:border-gray-300 dark:border-gray-700/50 dark:from-blue-900/20 dark:to-blue-800/30 dark:hover:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
                  Unique Users
                </p>
                <p className="mt-1 text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {uniqueUsers}
                </p>
              </div>
              <UserIcon className="h-12 w-12 text-blue-400" />
            </div>
          </Card>
        </div>

        {/* Download Logs Table */}
        <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
          <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Download Activity
            </h2>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {startIndex + 1}-{endIndex} of {totalLogs} downloads
            </div>
          </div>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : logs.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300">
              No download logs found.
            </p>
          ) : (
            <>
              <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
                  <thead className="sticky top-0 z-10 bg-gradient-to-r from-gray-100 to-gray-200 backdrop-blur-sm dark:from-gray-800 dark:to-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Resume
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider whitespace-nowrap text-gray-900 uppercase dark:text-gray-100">
                        IP Address
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/30 dark:divide-gray-700/30">
                    {logs.map((log, idx) => (
                      <tr
                        key={log._id}
                        className={`transition-colors duration-200 ${
                          idx % 2 === 0
                            ? "bg-white/30 dark:bg-gray-900/20"
                            : "bg-gray-200 dark:bg-gray-800/40"
                        } hover:bg-gray-300 dark:hover:bg-gray-700`}
                      >
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100">
                          {log.createdAt
                            ? formatDate(log.createdAt, true)
                            : "N/A"}
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-medium whitespace-nowrap text-gray-900 dark:text-gray-100">
                            {log.userId?.name || "Unknown"}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {log.userId?.email || "N/A"}
                          </div>
                        </td>
                        <td className="max-w-[200px] truncate px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                          {log.resumeId?.resumeName || "Unknown Resume"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              log.downloadType === "pdf"
                                ? "bg-primary dark:bg-primary text-gray-200 dark:text-gray-100"
                                : "dark:bg-primary bg-blue-100 text-blue-800 dark:text-gray-100"
                            }`}
                          >
                            {log.downloadType.toUpperCase()}
                          </span>
                        </td>
                        <td
                          className="max-w-[150px] truncate px-6 py-4 font-mono text-sm whitespace-nowrap text-gray-500 dark:text-gray-400"
                          title={log.ipAddress}
                        >
                          {log.ipAddress || "—"}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <button
                            className="bg-primary hover:bg-primary dark:bg-primary dark:hover:bg-primary flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-gray-100 transition-all dark:text-gray-200"
                            onClick={() => onClickDelete(log._id)}
                          >
                            <FiTrash2 size={14} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 border-t border-gray-200/50 pt-6 dark:border-gray-700/50">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={goToFirstPage}
                        disabled={currentPage === 1}
                        className="rounded-xl border border-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700"
                      >
                        <ChevronsLeft size={16} />
                      </button>
                      <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="rounded-xl border border-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            let pageNum =
                              currentPage <= 3
                                ? i + 1
                                : currentPage >= totalPages - 2
                                  ? totalPages - (4 - i)
                                  : currentPage + (i - 2);
                            return (
                              <button
                                key={pageNum}
                                onClick={() =>
                                  dispatch(setCurrentPage(pageNum))
                                }
                                className={`rounded-xl px-3 py-2 text-sm font-semibold transition-all ${
                                  currentPage === pageNum
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "border border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          },
                        )}
                      </div>
                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="rounded-xl border border-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700"
                      >
                        <ChevronRight size={16} />
                      </button>
                      <button
                        onClick={goToLastPage}
                        disabled={currentPage === totalPages}
                        className="rounded-xl border border-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700"
                      >
                        <ChevronsRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </MainShell>
  );
}
