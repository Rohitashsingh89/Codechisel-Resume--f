"use client";

import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  fetchUsersUsage,
  setCurrentPage,
  setSearchTerm,
  setFilters,
} from "@/features/usersUsage/usersUsageSlice";
import MainShell from "@/components/(super-admin)/MainShell";
import Card from "@/components/(super-admin)/shared/Card";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  UserIcon,
  Download,
  Zap,
  Filter,
} from "lucide-react";

export default function UsersUsagePage() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchInput, setSearchInput] = useState("");

  const { users, loading, error, currentPage, itemsPerPage, totalUsers } =
    useSelector((state: RootState) => state.usersUsage);

  // Pagination calculations
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalUsers);

  // Insights
  const totalUsersCount = users.length;
  const heavyUsers = users.filter((u) => u.used >= 5).length;
  const zeroUsage = users.filter((u) => u.used === 0).length;

  useEffect(() => {
    dispatch(fetchUsersUsage());
  }, [dispatch]);

  // Search handler
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchTerm(searchInput));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchInput, dispatch]);

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

  if (loading && users.length === 0) {
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
          <div className="xs:flex-row xs:items-center xs:justify-between flex flex-col items-start justify-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Users Usage
              </h1>
              <p className="mt-1 text-gray-700 dark:text-gray-300">
                Monitor download usage across all users
              </p>
            </div>
            <div className="xs:mt-0 xs:w-auto mt-4 flex w-full items-center gap-3">
              <div className="xs:w-64 relative flex-1">
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pl-12 text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none dark:border-gray-600 dark:bg-gray-900/50 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-400"
                />
                <UserIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
              <button className="flex items-center gap-2 rounded-xl bg-blue-100 px-4 py-3 text-sm font-medium text-blue-800 transition-all hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/50">
                <Filter size={16} />
                Filters
              </button>
            </div>
          </div>
        </Card>

        {/* Insights */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="group border border-gray-300 bg-gradient-to-br from-white to-gray-50 p-6 transition-all duration-200 hover:border-gray-300 dark:border-gray-700/50 dark:from-gray-900/50 dark:to-gray-800/50 dark:hover:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
                  Total Users
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                  {totalUsersCount.toLocaleString()}
                </p>
              </div>
              <UserIcon className="h-12 w-12 text-gray-400" />
            </div>
          </Card>

          <Card className="group border border-gray-300 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 transition-all duration-200 hover:border-gray-300 dark:border-gray-700/50 dark:from-emerald-900/20 dark:to-emerald-800/30 dark:hover:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
                  Heavy Users
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {heavyUsers}
                </p>
              </div>
              <Zap className="h-12 w-12 text-emerald-400" />
            </div>
          </Card>

          <Card className="group border border-gray-300 bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 transition-all duration-200 hover:border-gray-300 dark:border-gray-700/50 dark:from-orange-900/20 dark:to-orange-800/30 dark:hover:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
                  Zero Usage
                </p>
                <p className="mt-1 text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {zeroUsage}
                </p>
              </div>
              <Download className="h-12 w-12 text-orange-400" />
            </div>
          </Card>
        </div>

        {/* Users Usage Table */}
        <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
          <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Usage Details
            </h2>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {startIndex + 1}-{endIndex} of {totalUsers} users
            </div>
          </div>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : users.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300">No users found.</p>
          ) : (
            <>
              <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
                  <thead className="sticky top-0 z-10 bg-gradient-to-r from-gray-100 to-gray-200 backdrop-blur-sm dark:from-gray-800 dark:to-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Usage
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Last Download
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/30 dark:divide-gray-700/30">
                    {users.map((user, idx) => {
                      const progress = (user.used / user.limit) * 100;
                      return (
                        <tr
                          key={user.userId}
                          className={`transition-colors duration-200 ${
                            idx % 2 === 0
                              ? "bg-white/30 dark:bg-gray-900/20"
                              : "bg-gray-200 dark:bg-gray-800/40"
                          } hover:bg-gray-300 dark:hover:bg-gray-700`}
                        >
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900 dark:text-gray-100">
                              {user.name || "—"}
                            </div>
                            <div className="max-w-[200px] truncate text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex w-24 items-center gap-2">
                                <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                  <div
                                    className={`h-3 rounded-full transition-all ${
                                      progress >= 100
                                        ? "bg-red-500"
                                        : progress > 70
                                          ? "bg-orange-500"
                                          : "bg-emerald-500"
                                    }`}
                                    style={{
                                      width: `${Math.min(progress, 100)}%`,
                                    }}
                                  />
                                </div>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900 dark:text-gray-100">
                                  {user.used}/{user.limit}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {user.remaining} remaining
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                user.remaining === 0
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                                  : user.used === 0
                                    ? "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300"
                                    : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                              }`}
                            >
                              {user.remaining === 0
                                ? "Limit Reached"
                                : user.used === 0
                                  ? "No Usage"
                                  : "Active"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {user.lastDownloadAt
                              ? new Date(
                                  user.lastDownloadAt,
                                ).toLocaleDateString()
                              : "Never"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                user.role === "Admin"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
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
