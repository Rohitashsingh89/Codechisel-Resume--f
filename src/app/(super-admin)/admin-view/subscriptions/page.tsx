"use client";

import MainShell from "@/components/(super-admin)/MainShell";
import StatsCard from "@/components/(super-admin)/shared/StatsCard";
import PageHeader from "@/components/(super-admin)/shared/PageHeader";
import FilterGrid from "@/components/(super-admin)/shared/FilterGrid";
import AddEditModal from "@/components/(super-admin)/shared/AddEditModal";
import DeleteModal from "@/components/(super-admin)/shared/DeleteModal";
import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHooks";

// ✅ Subscriptions Redux Imports
import {
  fetchSubscriptions,
  setSearch,
  setStatus,
  setPlanId,
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
  addSubscription,
  updateSubscription,
  deleteSubscription,
  resetNewSubscription,
  resetEditSubscription,
  fetchUsers,
  fetchPlans,
} from "@/features/subscriptions/subscriptionsSlice";

// Icons
import {
  Edit2Icon,
  Trash2Icon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  CalendarIcon,
  FolderKanban,
  BadgeCheck,
} from "lucide-react";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { formatDate } from "@/utils/apiUtility";
import DataTable from "@/components/(super-admin)/shared/DataTable";

interface FormField {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "date";
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  value: string | number | undefined;
  onChange: (value: string | number | undefined) => void;
  min?: number;
  step?: string;
}

export default function SubscriptionsPage() {
  const dispatch = useAppDispatch();
  const {
    subscriptions,
    totalPages,
    totalSubscriptions,
    totalActiveSubscriptions,
    totalExpiredSubscriptions,
    statusCounts,
    planCounts,
    loading,
    submitting,
    search,
    status,
    planId,
    page,
    limit,
    columns,
    showColumnsDropdown,
    isAddModalOpen,
    isEditModalOpen,
    editSubscription,
    newSubscription,
    confirmDeleteId,
    users,
    plans,
    usersLoading,
    plansLoading,
  } = useAppSelector((state) => state.subscriptions);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search
  const debouncedSearch = useCallback(
    (searchValue: string) => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = setTimeout(
        () => dispatch(setSearch(searchValue)),
        300,
      );
    },
    [dispatch],
  );

  // Fetch data on mount and filter changes
  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch, search, status, planId, page, limit]);

  // Fetch users and plans for modals
  useEffect(() => {
    if (isAddModalOpen || isEditModalOpen) {
      dispatch(fetchUsers());
      dispatch(fetchPlans());
    }
  }, [isAddModalOpen, isEditModalOpen, dispatch]);

  // Memoized handlers
  const handleAddClose = useCallback(() => {
    dispatch(closeAdd());
    dispatch(resetNewSubscription());
  }, [dispatch]);

  const handleEditClose = useCallback(() => {
    dispatch(closeEdit());
    dispatch(resetEditSubscription());
  }, [dispatch]);

  const handleAddSubmit = useCallback(() => {
    dispatch(addSubscription());
  }, [dispatch]);

  const handleEditSubmit = useCallback(() => {
    dispatch(updateSubscription());
  }, [dispatch]);

  const handleDeleteConfirm = useCallback(
    async (id: string) => {
      await dispatch(deleteSubscription(id));
      dispatch(closeDelete());
    },
    [dispatch],
  );

  // ✅ Column config for Subscriptions
  const columnConfig = [
    { key: "user", label: "User" },
    { key: "plan", label: "Plan" },
    { key: "downloadsRemaining", label: "Downloads" },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Created" },
  ];

  // ✅ Filters for Subscriptions
  const filters = [
    {
      key: "status",
      label: "All Status",
      value: status || "",
      options: [
        { value: "", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "expired", label: "Expired" },
        { value: "cancelled", label: "Cancelled" },
      ],
      onChange: (value: string) => dispatch(setStatus(value)),
    },
    {
      key: "plan",
      label: "All Plans",
      value: planId || "",
      options: [
        { value: "", label: "All Plans" },
        ...Object.entries(planCounts || {}).map(([planId, count]) => ({
          value: planId,
          label: `${planId} (${count})`,
        })),
      ],
      onChange: (value: string) => dispatch(setPlanId(value)),
    },
  ];

  // ✅ Add form fields for Subscriptions
  const addFields: FormField[] = [
    {
      key: "userId",
      label: "Select User",
      type: "select",
      required: true,
      options: usersLoading
        ? [{ value: "", label: "Loading users..." }]
        : [
            { value: "", label: "Select User" },
            ...users.map((user: any) => ({
              value: user._id || user.id,
              label: `${user.name} (${user.email})`,
            })),
          ],
      value: newSubscription.userId,
      onChange: (v) => dispatch(updateNew({ userId: v as string })),
    },
    {
      key: "planId",
      label: "Select Plan",
      type: "select",
      required: true,
      options: plansLoading
        ? [{ value: "", label: "Loading plans..." }]
        : [
            { value: "", label: "Select Plan" },
            ...plans.map((plan: any) => ({
              value: plan._id || plan.id,
              label: `${plan.name} - ₹${plan.price}`,
            })),
          ],
      value: newSubscription.planId,
      onChange: (v) => dispatch(updateNew({ planId: v as string })),
    },
    {
      key: "downloadsRemaining",
      label: "Downloads Remaining",
      type: "number",
      min: 0,
      placeholder: "Downloads remaining (0 = unlimited)",
      value: newSubscription.downloadsRemaining,
      onChange: (v) => dispatch(updateNew({ downloadsRemaining: v as number })),
    },
    {
      key: "startDate",
      label: "Start Date",
      type: "date",
      required: true,
      value: newSubscription.startDate,
      onChange: (v) => dispatch(updateNew({ startDate: v as string })),
    },
    {
      key: "endDate",
      label: "End Date",
      type: "date",
      placeholder: "Leave empty for lifetime",
      value: newSubscription.endDate,
      onChange: (v) => dispatch(updateNew({ endDate: v as string })),
    },
  ];

  // ✅ Edit form fields
  const editFields: FormField[] = [
    {
      key: "userId",
      label: "Select User",
      type: "select",
      required: true,
      options: usersLoading
        ? [{ value: "", label: "Loading users..." }]
        : [
            { value: "", label: "Select User" },
            ...users.map((user) => ({
              value: user._id.toString(),
              label: `${user.name} (${user.email})`,
            })),
          ],
      value: (() => {
        if (!editSubscription) return "";
        if (typeof editSubscription.userId === "string")
          return editSubscription.userId;
        return editSubscription.userId?._id?.toString() || "";
      })(),
      onChange: (v) => dispatch(updateEdit({ userId: v as string })),
    },

    {
      key: "planId",
      label: "Select Plan",
      type: "select",
      required: true,
      options: plansLoading
        ? [{ value: "", label: "Loading plans..." }]
        : [
            { value: "", label: "Select Plan" },
            ...plans.map((plan) => ({
              value: plan._id.toString(),
              label: `${plan.name} - ₹${plan.price}`,
            })),
          ],
      value: (() => {
        if (!editSubscription) return "";
        if (typeof editSubscription.planId === "string")
          return editSubscription.planId;
        return editSubscription.planId?._id?.toString() || "";
      })(),
      onChange: (v) => dispatch(updateEdit({ planId: v as string })),
    },

    {
      key: "downloadsRemaining",
      label: "Downloads Remaining",
      type: "number",
      min: 0,
      value: editSubscription?.downloadsRemaining ?? 0,
      onChange: (v) =>
        dispatch(updateEdit({ downloadsRemaining: v as number })),
    },

    {
      key: "startDate",
      label: "Start Date",
      type: "date",
      required: true,
      value: editSubscription?.startDate?.substring(0, 10) ?? "",
      onChange: (v) => dispatch(updateEdit({ startDate: v })),
    },

    {
      key: "endDate",
      label: "End Date",
      type: "date",
      value: editSubscription?.endDate?.substring(0, 10) ?? "",
      onChange: (v) => dispatch(updateEdit({ endDate: v })),
    },
  ];

  // ✅ Render cell logic for Subscriptions
  const renderCell = (subscription: any, col: string) => {
    switch (col) {
      case "user":
        return (
          <div>
            <div className="font-semibold text-gray-800 dark:text-gray-300">
              {subscription.userId?.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {subscription.userId?.email}
            </div>
          </div>
        );
      case "plan":
        return (
          <div>
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {subscription.planId?.name}
            </span>
            <div className="font-mono text-sm text-gray-500 dark:text-gray-400">
              ₹{subscription.planId?.price}
            </div>
          </div>
        );
      case "downloadsRemaining":
        return (
          <span className="font-mono text-sm text-gray-800 dark:text-gray-300">
            {subscription.downloadsRemaining ?? "Unlimited"}
          </span>
        );
      case "startDate":
        return (
          <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
            {formatDate(subscription.startDate, true)}
          </span>
        );
      case "endDate":
        return (
          <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
            {subscription.endDate
              ? formatDate(subscription.endDate, true)
              : "Lifetime"}
          </span>
        );
      case "status":
        const statusColor =
          subscription.status === "active"
            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200"
            : subscription.status === "expired"
              ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200";
        return (
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusColor}`}
          >
            {subscription.status?.toUpperCase()}
          </span>
        );
      case "createdAt":
        return (
          <span className="text-sm text-gray-800 dark:text-gray-300">
            {formatDate(subscription.createdAt, true)}
          </span>
        );
      default:
        return subscription[col];
    }
  };

  // Top status and plans for stats cards
  const topStatuses = Object.entries(statusCounts || {})
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 3)
    .map(([status]) => status);

  const topPlans = Object.entries(planCounts || {})
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 3)
    .map(([plan]) => plan);

  return (
    <MainShell>
      <div className="space-y-6">
        <PageHeader
          title="Subscriptions"
          description="Manage user subscriptions and plans."
          onAdd={() => dispatch(openAdd())}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <StatsCard
            title="Total Subscriptions"
            value={totalSubscriptions}
            colorScheme="blue"
            icon={UsersIcon}
          />
          <StatsCard
            title="Active"
            value={totalActiveSubscriptions}
            colorScheme="emerald"
            icon={CheckCircleIcon}
          />
          <StatsCard
            title="Expired"
            value={totalExpiredSubscriptions}
            colorScheme="red"
            icon={XCircleIcon}
          />
          <StatsCard
            title="Top Statuses"
            value=""
            colorScheme="purple"
            icon={FolderKanban}
            tags={topStatuses.map((status) => ({
              label: status,
              count: (statusCounts as any)[status] || 0,
            }))}
          />
        </div>

        {/* Filters */}
        <FilterGrid
          search={search}
          onSearchChange={debouncedSearch}
          filters={filters}
          columns={columns}
          showColumnsDropdown={showColumnsDropdown}
          onToggleColumnsDropdown={() =>
            dispatch(setColumnsDropdown(!showColumnsDropdown))
          }
          onToggleColumn={(col) =>
            dispatch(toggleColumn(col as keyof typeof columns))
          }
        />

        {/* Data Table */}
        <DataTable
          data={subscriptions}
          columns={columns}
          columnConfig={columnConfig}
          loading={loading}
          totalPages={totalPages}
          totalPlans={totalSubscriptions}
          page={page}
          limit={limit}
          onPageChange={(p) => dispatch(setPage(p))}
          renderCell={renderCell}
          renderActions={(subscription: any) => (
            <>
              <button
                onClick={() => dispatch(openEdit(subscription))}
                className="rounded-xl p-2 text-yellow-700 transition-all duration-200 hover:bg-yellow-100 hover:text-yellow-900 dark:text-yellow-400 dark:hover:bg-yellow-900/20"
                title="Edit subscription"
              >
                <Edit2Icon className="h-4 w-4" />
              </button>
              <button
                onClick={() => dispatch(openDelete(subscription._id))}
                className="rounded-xl p-2 text-red-700 transition-all duration-200 hover:bg-red-100 hover:text-red-900 dark:text-red-400 dark:hover:bg-red-900/20"
                title="Delete subscription"
              >
                <Trash2Icon className="h-4 w-4" />
              </button>
            </>
          )}
        />

        {/* Add Modal */}
        <AddEditModal
          isOpen={isAddModalOpen}
          title="Add New Subscription"
          mode="add"
          formData={newSubscription}
          fields={addFields}
          onSubmit={handleAddSubmit}
          onCancel={handleAddClose}
          submitting={submitting}
          onClose={handleAddClose}
          resetForm={handleAddClose}
        />

        {/* Edit Modal */}
        {isEditModalOpen && editSubscription && (
          <AddEditModal
            isOpen={true}
            title="Edit Subscription"
            mode="edit"
            formData={editSubscription}
            fields={editFields}
            onSubmit={handleEditSubmit}
            onCancel={handleEditClose}
            submitting={submitting}
            onClose={handleEditClose}
            resetForm={handleEditClose}
          />
        )}

        {/* Delete Modal */}
        {confirmDeleteId && (
          <DeleteModal
            isOpen={true}
            title="Subscription"
            onConfirm={() => handleDeleteConfirm(confirmDeleteId)}
            onCancel={() => dispatch(closeDelete())}
            submitting={submitting}
          />
        )}
      </div>
    </MainShell>
  );
}
