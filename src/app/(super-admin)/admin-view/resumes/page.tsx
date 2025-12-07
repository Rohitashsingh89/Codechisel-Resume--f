"use client";

import MainShell from "@/components/(super-admin)/MainShell";
import Card from "@/components/(super-admin)/shared/Card";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { FiUserPlus, FiEye } from "react-icons/fi";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SquareLibrary,
} from "lucide-react";

export default function ResumesPage() {
  const [allResumes, setAllResumes] = useState<any[]>([]);
  const [currentResumes, setCurrentResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await apiFetch("/v1/resumes/me", {
          method: "GET",
        });

        if (res?.items) {
          setAllResumes(res.items);
        }
      } catch (err) {
        console.error("Failed to fetch resume", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  // Pagination logic
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedResumes = allResumes.slice(startIndex, endIndex);
    setCurrentResumes(paginatedResumes);
  }, [allResumes, currentPage, itemsPerPage]);

  const totalItems = allResumes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  // Pagination functions
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Admin insights (based on all resumes)
  const totalResumes = allResumes.length;
  const today = new Date();
  const submittedToday = allResumes.filter((r) => {
    const created = new Date(r.createdAt);
    return (
      created.getDate() === today.getDate() &&
      created.getMonth() === today.getMonth() &&
      created.getFullYear() === today.getFullYear()
    );
  }).length;

  // Top 5 templates used
  const templateCount: Record<string, number> = {};
  allResumes.forEach((r) => {
    if (r.templateType) {
      templateCount[r.templateType] = (templateCount[r.templateType] || 0) + 1;
    }
  });
  const topTemplates = Object.entries(templateCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([template]) => template);

  if (loading && allResumes.length === 0) {
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
                Resumes
              </h1>
              <p className="mt-1 text-gray-700 dark:text-gray-300">
                Manage all submitted resumes. See useful insights and table
                below.
              </p>
            </div>
            <button className="xs:w-auto xs:mt-0 mt-2 flex w-full items-center justify-center gap-2 rounded bg-green-100 px-4 py-2 whitespace-nowrap text-green-800 transition-all hover:bg-green-200 dark:bg-green-700/20 dark:text-green-300 dark:hover:bg-green-600/30">
              Add Resumes <FiUserPlus size={18} />
            </button>
          </div>
        </Card>

        {/* Admin Summary Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="group border border-gray-300 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 transition-all duration-200 hover:border-gray-300 hover:shadow-md dark:border-gray-700/50 dark:from-emerald-900/20 dark:to-emerald-800/30 dark:hover:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
                  Total Resumes
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {totalResumes}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 transition-colors group-hover:bg-emerald-200 dark:bg-emerald-900/30 dark:group-hover:bg-emerald-800/40">
                <svg
                  className="h-6 w-6 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="group border border-gray-300 bg-gradient-to-br from-red-50 to-red-100/50 p-6 transition-all duration-200 hover:border-gray-300 hover:shadow-md dark:border-gray-700/50 dark:from-red-900/20 dark:to-red-800/30 dark:hover:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
                  Submitted Today
                </p>
                <p className="mt-1 text-3xl font-bold text-red-600 dark:text-red-400">
                  {submittedToday}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 transition-colors group-hover:bg-red-200 dark:bg-red-900/30 dark:group-hover:bg-red-800/40">
                <svg
                  className="h-6 w-6 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="group border border-gray-300 bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 transition-all duration-200 hover:border-gray-300 hover:shadow-md dark:border-gray-700/50 dark:from-purple-900/20 dark:to-purple-800/30 dark:hover:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
                  Top Templates
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {topTemplates.length > 0 ? (
                    topTemplates.slice(0, 3).map((cat, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-900/50 dark:text-purple-200"
                      >
                        {cat}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      None
                    </span>
                  )}
                  {topTemplates.length > 3 && (
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      +{topTemplates.length - 3}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex h-12 w-12 flex-none shrink-0 items-center justify-center rounded-2xl bg-purple-100 transition-colors group-hover:bg-purple-200 dark:bg-purple-900/30 dark:group-hover:bg-purple-800/40">
                <svg
                  className="h-6 w-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Resume Table */}
        <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
          {/* Table Header with Showing info */}
          <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Resume Table
            </h2>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {startIndex}-{endIndex} of {totalItems} resumes
            </div>
          </div>

          {loading ? (
            <p className="text-gray-700 dark:text-gray-300">Loading...</p>
          ) : currentResumes.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-300 bg-gray-50 p-6 dark:border-gray-700/50 dark:bg-gray-900/20">
              <SquareLibrary className="h-12 w-12 text-gray-400 dark:text-gray-500" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                No users found.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                <table className="min-w-full text-sm">
                  <thead className="rounded-t-xl bg-gray-200/50 text-left text-gray-700 dark:bg-gray-800/50 dark:text-gray-300">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider whitespace-nowrap text-gray-900 uppercase dark:text-gray-100">
                        Template Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider whitespace-nowrap text-gray-900 uppercase dark:text-gray-100">
                        Template Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider whitespace-nowrap text-gray-900 uppercase dark:text-gray-100">
                        Date Submitted
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentResumes.map((resume, idx) => (
                      <tr
                        key={resume._id}
                        className={`transition-colors duration-200 ${
                          idx % 2 === 0
                            ? "bg-white/30 dark:bg-gray-900/20"
                            : "bg-gray-200 dark:bg-gray-800/40"
                        } hover:bg-gray-300 dark:hover:bg-gray-700`}
                      >
                        <td
                          className="max-w-[80px] truncate overflow-hidden px-6 py-4 font-mono text-sm whitespace-nowrap text-gray-900 dark:text-gray-100"
                          title={resume._id}
                        >
                          {resume._id}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-gray-100">
                          {resume.resumeName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200">
                          {resume.templateType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200">
                          {resume.createdAt
                            ? new Date(resume.createdAt).toLocaleDateString()
                            : "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-800 transition-all hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/50">
                            <FiEye size={16} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages && (
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
                                onClick={() => setCurrentPage(pageNum)}
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
