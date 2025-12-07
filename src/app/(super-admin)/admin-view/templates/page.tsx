"use client";

import MainShell from "@/components/(super-admin)/MainShell";
import Card from "@/components/(super-admin)/shared/Card";
import moment from "moment";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  Edit2Icon,
  Trash2Icon,
} from "lucide-react";
import {
  fetchTemplates,
  setSearch,
  setCategory,
  setIsActive,
  setPage,
  setLimit,
  toggleColumn,
  setColumnsDropdown,
  openAdd,
  closeAdd,
  openEdit,
  closeEdit,
  updateNew,
  updateEdit,
  openDelete,
  closeDelete,
  addTemplate,
  updateTemplate,
  deleteTemplate,
} from "@/features/templates/templatesSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHooks";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { formatDate } from "@/utils/apiUtility";

export default function TemplatesPage() {
  const dispatch = useAppDispatch();
  const {
    templates,
    totalPages,
    loading,
    submitting,
    search,
    category,
    isActive,
    page,
    limit,
    columns,
    showColumnsDropdown,
    isModalOpen,
    editTemplate,
    newTemplate,
    confirmDeleteSlug,
  } = useAppSelector((state) => state.templates);

  useEffect(() => {
    dispatch(fetchTemplates());
  }, [dispatch, search, category, isActive, page, limit]);

  // Calculate stats for dashboard cards (using Redux data)
  const totalTemplates = templates.length;
  const activeTemplates = templates.filter((t) => t.isActive).length;
  const inactiveTemplates = totalTemplates - activeTemplates;

  const categoryCount: Record<string, number> = {};
  templates.forEach((t) => {
    if (t.category) {
      categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
    }
  });
  const topCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([category]) => category);

  if (loading && templates.length === 0) {
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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                Templates
              </h1>
              <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400">
                Create, edit, and manage templates for resumes.
              </p>
            </div>
            {/* <button
              onClick={() => dispatch(openAdd())}
              className="flex items-center gap-2 rounded bg-primary px-4 py-2 text-gray-100 dark:bg-primary dark:text-gray-100"
            >
              Add Template
              <MdFormatListBulletedAdd size={18} />
            </button> */}
            <button
              onClick={() => dispatch(openAdd())}
              className="xs:w-auto xs:mt-0 mt-2 flex w-full items-center justify-center gap-2 rounded bg-green-100 px-4 py-2 whitespace-nowrap text-green-800 transition-all hover:bg-green-200 dark:bg-green-700/20 dark:text-green-300 dark:hover:bg-green-600/30"
            >
              Add Template <MdFormatListBulletedAdd size={18} />
            </button>
          </div>
        </Card>

        {/* Admin Summary Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="group shrink-0 border border-gray-300 bg-gradient-to-br from-white to-gray-50 p-6 transition-all duration-200 hover:border-gray-300 dark:border-gray-700/50 dark:from-gray-900/50 dark:to-gray-800/50 dark:hover:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
                  Total Templates
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                  {totalTemplates}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 transition-colors group-hover:bg-blue-200 dark:bg-blue-900/50 dark:group-hover:bg-blue-800/50">
                <svg
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="group border border-gray-300 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 transition-all duration-200 hover:border-gray-300 dark:border-gray-700/50 dark:from-emerald-900/20 dark:to-emerald-800/30 dark:hover:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
                  Active
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {activeTemplates}
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

          <Card className="group border border-gray-300 bg-gradient-to-br from-red-50 to-red-100/50 p-6 transition-all duration-200 hover:border-gray-300 dark:border-gray-700/50 dark:from-red-900/20 dark:to-red-800/30 dark:hover:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
                  Inactive
                </p>
                <p className="mt-1 text-3xl font-bold text-red-600 dark:text-red-400">
                  {inactiveTemplates}
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

          <Card className="group border border-gray-300 bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 transition-all duration-200 hover:border-gray-300 dark:border-gray-700/50 dark:from-purple-900/20 dark:to-purple-800/30 dark:hover:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
                  Categories
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {topCategories.length > 0 ? (
                    topCategories.slice(0, 3).map((cat, i) => (
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
                  {topCategories.length > 3 && (
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      +{topCategories.length - 3}
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

        {/* Filters */}
        <Card className="border border-gray-300 bg-white/80 dark:border-gray-700/50 dark:bg-gray-900/30">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="col-span-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none sm:col-span-2 lg:col-span-1 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400"
            />
            <select
              value={category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400"
            >
              <option value="">All Categories</option>
              <option value="business">Business</option>
              <option value="professional">Professional</option>
              <option value="creative">Creative</option>
            </select>
            <select
              value={isActive}
              onChange={(e) => dispatch(setIsActive(e.target.value))}
              className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400"
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            {/* Columns Dropdown - FULL RESPONSIVE */}
            <div className="relative col-span-1 lg:col-span-1 xl:col-span-1">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                onClick={() =>
                  dispatch(setColumnsDropdown(!showColumnsDropdown))
                }
              >
                <span className="truncate">Columns</span>
                <svg
                  className={`h-4 w-4 transition-transform ${showColumnsDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {showColumnsDropdown && (
                <div className="absolute top-full right-0 z-50 mt-2 w-56 rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-600 dark:bg-gray-800">
                  {Object.entries(columns).map(([col, visible]) => (
                    <label
                      key={col}
                      className="flex cursor-pointer items-center gap-3 px-4 py-3 text-sm text-gray-700 capitalize first:rounded-t-2xl last:rounded-b-2xl hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={visible}
                        onChange={() =>
                          dispatch(toggleColumn(col as keyof typeof columns))
                        }
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:checked:bg-blue-600"
                      />
                      <span className="capitalize">
                        {col.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Template Table */}
        {/* Template Table - PROFESSIONAL VERSION */}
        <Card className="overflow-hidden border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
          <div className="mb-5 flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                All Templates ({templates.length})
              </h2>
              {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {templates.length} templates found
              </p> */}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span>
                Page {page} of {totalPages}
              </span>
            </div>
          </div>

          <div className="overflow-hidden">
            {/* Professional Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50">
              <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
                <thead className="sticky top-0 z-10 bg-gradient-to-r from-gray-100 to-gray-200 backdrop-blur-sm dark:from-gray-800 dark:to-gray-900">
                  <tr>
                    {columns.name && (
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Name
                      </th>
                    )}
                    {columns.slug && (
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Slug
                      </th>
                    )}
                    {columns.category && (
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Category
                      </th>
                    )}
                    {columns.isActive && (
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Status
                      </th>
                    )}
                    {columns.createdAt && (
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Created
                      </th>
                    )}
                    <th className="w-32 px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900/30">
                  {/* SKELETON LOADING ROWS - PROFESSIONAL */}
                  {loading && (
                    <>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <tr key={`skeleton-${i}`} className="animate-pulse">
                          {columns.name && (
                            <td className="px-6 py-4">
                              <div className="h-4 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                            </td>
                          )}
                          {columns.slug && (
                            <td className="px-6 py-4">
                              <div className="h-3.5 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                            </td>
                          )}
                          {columns.category && (
                            <td className="px-6 py-4">
                              <div className="h-3.5 w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                            </td>
                          )}
                          {columns.isActive && (
                            <td className="px-6 py-4">
                              <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                            </td>
                          )}
                          {columns.createdAt && (
                            <td className="px-6 py-4">
                              <div className="h-3.5 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
                            </td>
                          )}
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                              <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}

                  {/* EMPTY STATE */}
                  {!loading && templates.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-20 text-center">
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
                            No templates found
                          </h3>
                          <p className="mb-4 text-gray-500 dark:text-gray-400">
                            Try adjusting your search or filter criteria.
                          </p>
                          <button
                            onClick={() => dispatch(openAdd())}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-blue-700 hover:to-blue-800"
                          >
                            <PlusIcon className="h-4 w-4" />
                            Create First Template
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* REAL DATA ROWS */}
                  {!loading &&
                    templates.map((t, i) => (
                      <tr
                        key={t._id}
                        className={`transition-colors duration-200 ${i % 2 === 0 ? "bg-white/30 dark:bg-gray-900/20" : "bg-gray-200 dark:bg-gray-800/40"} hover:bg-gray-300 dark:hover:bg-gray-700`}
                      >
                        {columns.name && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-semibold text-gray-800 dark:text-gray-300">
                              {t.name}
                            </div>
                          </td>
                        )}
                        {columns.slug && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <code className="rounded-md bg-gray-100 px-2 py-1 font-mono text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                              {t.slug}
                            </code>
                          </td>
                        )}
                        {columns.category && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200">
                              {t.category}
                            </span>
                          </td>
                        )}
                        {columns.isActive && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                t.isActive
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                              }`}
                            >
                              {t.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                        )}
                        {columns.createdAt && (
                          <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-800 dark:text-gray-300">
                            {/* {moment(t.createdAt).format("DD MMM YY")} */}
                            {t.createdAt
                              ? `${formatDate(t.createdAt, true)}`
                              : ""}
                          </td>
                        )}
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => dispatch(openEdit(t))}
                              className="rounded-xl p-2 text-yellow-700 transition-all duration-200 hover:bg-yellow-100 hover:text-yellow-900 dark:text-yellow-400 dark:hover:bg-yellow-900/20"
                              title="Edit template"
                            >
                              <Edit2Icon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => dispatch(openDelete(t.slug))}
                              className="rounded-xl p-2 text-red-700 transition-all duration-200 hover:bg-red-100 hover:text-red-900 dark:text-red-400 dark:hover:bg-red-900/20"
                              title="Delete template"
                            >
                              <Trash2Icon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* PROFESSIONAL PAGINATION */}
            {!loading && totalPages > 1 && (
              <div className="mt-8 border-t border-gray-200/50 pt-6 dark:border-gray-700/50">
                <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 text-sm text-gray-700 sm:mb-0 dark:text-gray-300">
                    Showing {(page - 1) * limit + 1} to{" "}
                    {Math.min(page * limit, templates.length)} of{" "}
                    {templates.length} results
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => dispatch(setPage(Math.max(1, page - 1)))}
                      disabled={page === 1}
                      className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        dispatch(setPage(Math.min(totalPages, page + 1)))
                      }
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
        </Card>

        {/* Add Template Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 backdrop-blur-sm sm:p-4">
            <div className="w-full max-w-md rounded-xl bg-white/90 px-3 py-6 shadow-xl backdrop-blur-xl sm:px-6 dark:bg-gray-900/80">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                Add New Template
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(addTemplate());
                }}
                className="space-y-3"
              >
                {/* Template Name */}
                <input
                  type="text"
                  required
                  placeholder="Template name"
                  value={newTemplate.name}
                  onChange={(e) =>
                    dispatch(updateNew({ name: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:outline-none dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100 dark:placeholder:text-gray-500"
                />

                {/* Slug */}
                <input
                  type="text"
                  required
                  placeholder="Unique slug"
                  value={newTemplate.slug}
                  onChange={(e) =>
                    dispatch(updateNew({ slug: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
                />

                {/* Category */}
                <select
                  value={newTemplate.category}
                  onChange={(e) =>
                    dispatch(updateNew({ category: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
                >
                  <option value="">Select Category</option>
                  <option value="business">Business</option>
                  <option value="professional">Professional</option>
                  <option value="creative">Creative</option>
                </select>

                {/* Status */}
                <select
                  value={newTemplate.isActive ? "true" : "false"}
                  onChange={(e) =>
                    dispatch(updateNew({ isActive: e.target.value === "true" }))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>

                {/* Buttons */}
                <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => dispatch(closeAdd())}
                    className="flex-1 rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:from-blue-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:opacity-50 dark:from-blue-600 dark:to-blue-700"
                  >
                    {submitting ? "Creating…" : "Create Template"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Template Modal */}
        {editTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 backdrop-blur-sm sm:p-4">
            <div className="w-full max-w-md rounded-xl bg-white/90 px-3 py-6 shadow-xl backdrop-blur-xl sm:px-6 dark:bg-gray-900/80">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                Edit Template
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!editTemplate) return;
                  dispatch(updateTemplate());
                }}
                className="space-y-3"
              >
                {/* Template Name */}
                <input
                  type="text"
                  required
                  placeholder="Template name"
                  value={editTemplate.name}
                  onChange={(e) =>
                    dispatch(updateEdit({ name: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:outline-none dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
                />

                {/* Slug */}
                <input
                  type="text"
                  required
                  placeholder="Unique slug"
                  value={editTemplate.slug}
                  onChange={(e) =>
                    dispatch(updateEdit({ slug: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
                />

                {/* Category */}
                <select
                  value={editTemplate.category}
                  onChange={(e) =>
                    dispatch(updateEdit({ category: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
                >
                  <option value="business">Business</option>
                  <option value="professional">Professional</option>
                  <option value="creative">Creative</option>
                </select>

                {/* Status */}
                <select
                  value={editTemplate.isActive ? "true" : "false"}
                  onChange={(e) =>
                    dispatch(
                      updateEdit({ isActive: e.target.value === "true" }),
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>

                {/* Buttons */}
                <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => dispatch(closeEdit())}
                    className="flex-1 rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:from-emerald-700 hover:to-emerald-800 disabled:cursor-not-allowed disabled:opacity-50 dark:from-emerald-600 dark:to-emerald-700"
                  >
                    {submitting ? "Updating…" : "Update Template"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {confirmDeleteSlug && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 backdrop-blur-sm sm:p-4">
            <div className="w-full max-w-sm rounded-xl bg-white/90 px-3 py-6 shadow-xl backdrop-blur-xl sm:px-6 dark:bg-gray-900/80">
              {/* Warning Icon */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <Trash2Icon className="h-7 w-7" />
              </div>

              {/* Title */}
              <h2 className="mt-4 text-center text-xl font-semibold text-gray-900 dark:text-gray-100">
                Delete Template?
              </h2>

              {/* Description */}
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                This action is permanent and cannot be undone.
              </p>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 pt-5 sm:flex-row">
                <button
                  onClick={() => dispatch(closeDelete())}
                  className="flex-1 rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    if (!confirmDeleteSlug) return;
                    await dispatch(deleteTemplate(confirmDeleteSlug));
                    dispatch(closeDelete());
                  }}
                  className="flex-1 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-500 disabled:opacity-50 dark:from-red-600 dark:to-red-700"
                >
                  Delete Forever
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainShell>
  );
}
