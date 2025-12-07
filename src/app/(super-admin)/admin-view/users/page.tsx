"use client";

import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  fetchUsers,
  openAddModal,
  closeAddModal,
  openEditModal,
  closeEditModal,
  togglePasswordField,
  updateFormData,
  setCurrentPage,
  addUser,
  updateUser,
  deleteUser,
  openConfirmDelete,
  closeConfirmDelete,
  hideSuccessPrompt,
} from "@/features/users/usersSlice";
import MainShell from "@/components/(super-admin)/MainShell";
import Card from "@/components/(super-admin)/shared/Card";
import { FiEdit, FiTrash2, FiUserPlus } from "react-icons/fi";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Trash2Icon,
  Users,
} from "lucide-react";

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

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    users,
    loading,
    error,
    showAddModal,
    showEditModal,
    currentUser,
    showPassword,
    formData,
    currentPage,
    itemsPerPage,
    topMessage,
    showSuccessPrompt,
    confirmDeleteId,
  } = useSelector((state: RootState) => state.users);

  // Pagination calculations
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  // Insights
  const totalUsersCount = users.length;
  const totalAdmins = users.filter((u) => u.role === "Admin").length;
  const totalActive = users.filter((u) => u.isActive).length;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Pagination handlers
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

  const handleFormChange = useCallback(
    (field: string, value: any) => {
      dispatch(updateFormData({ [field]: value }));
    },
    [dispatch],
  );

  const onClickDelete = (id: string) => {
    dispatch(openConfirmDelete(id));
  };

  const onConfirmDelete = async () => {
    if (confirmDeleteId) {
      await dispatch(deleteUser(confirmDeleteId));
      dispatch(closeConfirmDelete());
    }
  };

  const onCancelDelete = () => {
    dispatch(closeConfirmDelete());
  };

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
          <div className="xs:items-center xs:flex-row xs:justify-between flex flex-col items-start justify-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Users
              </h1>
              <p className="mt-1 text-gray-700 dark:text-gray-300">
                View, manage, and assign roles to users.
              </p>
            </div>
            <button
              onClick={() => dispatch(openAddModal())}
              className="xs:w-auto xs:mt-0 mt-2 flex w-full items-center justify-center gap-2 rounded bg-green-100 px-4 py-2 whitespace-nowrap text-green-800 transition-all hover:bg-green-200 dark:bg-green-700/20 dark:text-green-300 dark:hover:bg-green-600/30"
            >
              Add User <FiUserPlus size={18} />
            </button>
          </div>
        </Card>

        {/* dispatch(showWarningMessage("You are about to delete a user. This action cannot be undone.")); */}
        {showSuccessPrompt && (
          <div className="group relative overflow-hidden rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-5 transition-all dark:border-green-800 dark:from-green-900/20 dark:to-gray-800">
            <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-green-200 opacity-20 dark:bg-green-800/30" />
            <div className="relative z-10 flex justify-between">
              <div>
                <div className="mb-2 flex items-center">
                  <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-semibold text-white">
                    ⚡
                  </span>
                  <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">
                    Admin Control Center
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Welcome to the Users Management Hub. Here, every decision you
                  make shapes a smoother, smarter, and more empowered community.
                  Lead with clarity. Manage with confidence.
                </p>

                <div className="mt-3 flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                  <svg
                    className="mr-1 h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Efficient Tools • Smarter Insights • Total Control
                </div>
              </div>

              <div>
                <button
                  onClick={() => dispatch(hideSuccessPrompt())}
                  className="rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 px-2.5 py-1.5 text-sm font-medium text-white shadow-md hover:from-emerald-700 hover:to-emerald-800 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2.5 dark:from-emerald-600 dark:to-emerald-700"
                >
                  X
                </button>
              </div>
            </div>
          </div>
        )}

        {/* <div className="group relative overflow-hidden rounded-xl border border-red-300 bg-gradient-to-br from-red-100 to-white p-5 transition-all dark:border-red-800 dark:from-red-900/30 dark:to-gray-900">
          <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-red-300 opacity-20 dark:bg-red-700/30" />

          <div className="relative z-10">
            <div className="mb-2 flex items-center">
              <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                !
              </span>
              <h3 className="text-base font-bold text-red-700 dark:text-red-300">
                User Delete Warning
              </h3>
            </div>

            <p className="text-sm text-red-700/80 dark:text-red-400">
              Aap is user ko permanently delete karne ja rahe ho. Is action ko
              undo nahi kiya ja sakta.
            </p>

            <div className="mt-3 flex items-center text-xs font-semibold text-red-600 dark:text-red-400">
              <svg
                className="mr-1 h-3 w-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.366-.446 1.12-.446 1.486 0l6 7.333c.457.558.052 1.568-.743 1.568H3.999c-.795 0-1.2-1.01-.743-1.568l6-7.333zM9 12a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                />
              </svg>
              This action is irreversible
            </div>
          </div>
        </div> */}

        {/* Insights */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="group border border-gray-300 bg-gradient-to-br from-white to-gray-50 p-6 transition-all duration-200 hover:border-gray-300 dark:border-gray-700/50 dark:from-gray-900/50 dark:to-gray-800/50 dark:hover:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
                  Total Users
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                  {totalUsersCount}
                </p>
              </div>
              {/* SVG icon */}
            </div>
          </Card>
          {/* Other insight cards - same styling */}
          <Card className="group border border-gray-300 bg-gradient-to-br from-yellow-50 to-yellow-100/50 p-6 transition-all duration-200 hover:border-gray-300 dark:border-gray-700/50 dark:from-yellow-900/20 dark:to-yellow-800/30 dark:hover:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
                  Admins
                </p>
                <p className="mt-1 text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {totalAdmins}
                </p>
              </div>
            </div>
          </Card>
          <Card className="group border border-gray-300 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 transition-all duration-200 hover:border-gray-300 dark:border-gray-700/50 dark:from-emerald-900/20 dark:to-emerald-800/30 dark:hover:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
                  Active Users
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {totalActive}
                </p>
              </div>
            </div>
          </Card>
          <Card className="group border border-gray-300 bg-gradient-to-br from-red-50 to-red-100/50 p-6 transition-all duration-200 hover:border-gray-300 dark:border-gray-700/50 dark:from-red-900/20 dark:to-red-800/30 dark:hover:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
                  Inactive Users
                </p>
                <p className="mt-1 text-3xl font-bold text-red-600 dark:text-red-400">
                  {totalUsersCount - totalActive}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
          <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              User Table
            </h2>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of{" "}
              {totalItems} users
            </div>
          </div>

          {error ? (
            <>
              <div className="relative mb-6 rounded-lg border border-red-300 bg-red-50 p-5 overflow-hidden dark:border-red-700 dark:bg-red-900/20">
                <div className="absolute -top-3 -right-3 h-12 w-12 rounded-full bg-red-300/20 dark:bg-red-700/40"></div>
                <div className="relative z-10 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <h3 className="text-base font-semibold text-red-700 dark:text-red-300">
                      Error
                    </h3>
                  </div>
                  <p className="text-sm text-red-700/90 dark:text-red-400">
                    {error}
                  </p>
                  {/* <div className="flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-400">
                    <AlertTriangle className="h-3 w-3" />
                    This action is irreversible
                  </div> */}
                </div>
              </div>
            </>
          ) : currentUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-300 bg-gray-50 p-6 dark:border-gray-700/50 dark:bg-gray-900/20">
              <Users className="h-12 w-12 text-gray-400 dark:text-gray-500" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                No users found.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
                  <thead className="sticky top-0 z-10 bg-gradient-to-r from-gray-100 to-gray-200 backdrop-blur-sm dark:from-gray-800 dark:to-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/30 dark:divide-gray-700/30">
                    {currentUsers.map((user, idx) => (
                      <tr
                        key={user._id}
                        className={`transition-colors duration-200 ${idx % 2 === 0 ? "bg-white/30 dark:bg-gray-900/20" : "bg-gray-200 dark:bg-gray-800/40"} hover:bg-gray-300 dark:hover:bg-gray-700`}
                      >
                        <td
                          className="max-w-[100px] truncate overflow-hidden px-6 py-4 font-mono text-sm whitespace-nowrap text-gray-900 dark:text-gray-100"
                          title={user._id}
                        >
                          {user._id}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-gray-100">
                          {user.name || "—"}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100">
                          {user.email || "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              user.role === "Admin"
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-700/20 dark:text-purple-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-700/20 dark:text-blue-300"
                            }`}
                          >
                            {user.role || "User"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              user.isActive
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-700/20 dark:text-emerald-300"
                                : "bg-red-100 text-red-800 dark:bg-red-700/20 dark:text-red-300"
                            }`}
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              className="flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-2 text-xs font-medium text-blue-800 transition-all hover:bg-blue-200 dark:bg-blue-700/20 dark:text-blue-300 dark:hover:bg-blue-600/30"
                              onClick={() => dispatch(openEditModal(user))}
                            >
                              <FiEdit size={14} /> Edit
                            </button>
                            <button
                              className="flex items-center gap-1 rounded-lg bg-red-100 px-3 py-2 text-xs font-medium text-red-800 transition-all hover:bg-red-200 dark:bg-red-700/20 dark:text-red-300 dark:hover:bg-red-600/30"
                              onClick={() => onClickDelete(user._id)}
                            >
                              <FiTrash2 size={14} /> Delete
                            </button>
                          </div>
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

        {/* Add Modal */}
        <Modal isOpen={showAddModal} onClose={() => dispatch(closeAddModal())}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Add User
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(addUser());
            }}
            className="space-y-3"
          >
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:outline-none dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleFormChange("email", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:outline-none dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleFormChange("password", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:outline-none dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
              required
            />
            <select
              value={formData.role}
              onChange={(e) => handleFormChange("role", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:outline-none dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
            >
              <option>User</option>
              <option>Admin</option>
            </select>
            <select
              value={formData.isActive ? "Active" : "Inactive"}
              onChange={(e) =>
                handleFormChange("isActive", e.target.value === "Active")
              }
              className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:outline-none dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
              <button
                type="button"
                onClick={() => dispatch(closeAddModal())}
                className="flex-1 rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:from-emerald-700 hover:to-emerald-800 disabled:cursor-not-allowed disabled:opacity-50 dark:from-emerald-600 dark:to-emerald-700"
              >
                Add User
              </button>
            </div>
          </form>
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => dispatch(closeEditModal())}
        >
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Edit User
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(updateUser());
            }}
            className="space-y-3"
          >
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:outline-none dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleFormChange("email", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:outline-none dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
            />
            <select
              value={formData.role}
              onChange={(e) => handleFormChange("role", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:outline-none dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
            >
              <option>User</option>
              <option>Admin</option>
            </select>
            <select
              value={formData.isActive ? "Active" : "Inactive"}
              onChange={(e) =>
                handleFormChange("isActive", e.target.value === "Active")
              }
              className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:outline-none dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div>
              {!showPassword ? (
                <button
                  type="button"
                  onClick={() => dispatch(togglePasswordField())}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Change Password
                </button>
              ) : (
                <input
                  type="password"
                  placeholder="New Password"
                  value={formData.password}
                  onChange={(e) => handleFormChange("password", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:outline-none dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
                />
              )}
            </div>
            <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
              <button
                type="button"
                onClick={() => dispatch(closeEditModal())}
                className="flex-1 rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:from-emerald-700 hover:to-emerald-800 disabled:cursor-not-allowed disabled:opacity-50 dark:from-emerald-600 dark:to-emerald-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>

        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 backdrop-blur-sm sm:p-4">
            <div className="w-full max-w-sm rounded-xl bg-white/90 px-3 py-6 shadow-xl backdrop-blur-xl sm:px-6 dark:bg-gray-900/80">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <Trash2Icon className="h-7 w-7" />
              </div>
              <h2 className="mt-4 text-center text-xl font-semibold text-gray-900 dark:text-gray-100">
                Delete User?
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                This action is permanent and cannot be undone.
              </p>
              <div className="flex flex-col-reverse gap-3 pt-5 sm:flex-row">
                <button
                  onClick={onCancelDelete}
                  className="flex-1 rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirmDelete}
                  className="flex-1 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-500 dark:from-red-600 dark:to-red-700"
                >
                  Delete Forever
                </button>
              </div>
            </div>
          </div>
        )}
        {/* <WarningBox
          message={showWarningMessage ? warningMessage : ""}
          onClose={() => dispatch(hideWarningMessage())}
        /> */}
      </div>
    </MainShell>
  );
}
