// app/(super-admin)/payments/page.tsx
"use client";

import MainShell from "@/components/(super-admin)/MainShell";
import StatsCard from "@/components/(super-admin)/shared/StatsCard";
import PageHeader from "@/components/(super-admin)/shared/PageHeader";
import FilterGrid from "@/components/(super-admin)/shared/FilterGrid";
import DataTable from "@/components/(super-admin)/shared/DataTable";
import AddEditModal from "@/components/(super-admin)/shared/AddEditModal";
import DeleteModal from "@/components/(super-admin)/shared/DeleteModal";
import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHooks";
import {
  fetchPayments,
  setSearch,
  setStatus,
  setPage,
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
  addPayment,
  updatePayment,
  deletePayment,
  fetchUsers,
  fetchPlans,
} from "@/features/payments/paymentsSlice";
import {
  Edit2Icon,
  Trash2Icon,
  CreditCard,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";
import { formatDate } from "@/utils/apiUtility";

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

export default function PaymentsPage() {
  const dispatch = useAppDispatch();
  const {
    payments,
    totalPages,
    totalPayments,
    totalAmount,
    statusCounts,
    loading,
    submitting,
    search,
    status,
    page,
    limit,
    columns,
    showColumnsDropdown,
    isAddModalOpen,
    isEditModalOpen,
    editPayment,
    newPayment,
    confirmDeleteId,
    users,
    plans,
    usersLoading,
    plansLoading,
  } = useAppSelector((state) => state.payments);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch, search, status, page, limit]);

  const handleAddClose = useCallback(() => {
    dispatch(closeAdd());
  }, [dispatch]);

  const handleEditClose = useCallback(() => {
    dispatch(closeEdit());
  }, [dispatch]);

  const handleAddSubmit = useCallback(() => {
    dispatch(addPayment());
  }, [dispatch]);

  const handleEditSubmit = useCallback(() => {
    dispatch(updatePayment());
  }, [dispatch]);

  const handleDeleteConfirm = useCallback(
    async (id: string) => {
      await dispatch(deletePayment(id));
      dispatch(closeDelete());
    },
    [dispatch],
  );

  // Fetch users and plans for modals
  useEffect(() => {
    if (isAddModalOpen || isEditModalOpen) {
      dispatch(fetchUsers());
      dispatch(fetchPlans());
    }
  }, [isAddModalOpen, isEditModalOpen, dispatch]);

  const columnConfig = [
    { key: "transactionId", label: "Transaction" },
    { key: "user", label: "User" },
    { key: "plan", label: "Plan" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "currency", label: "Currency" },
    { key: "createdAt", label: "Created" },
  ];

  const filters = [
    {
      key: "status",
      label: "All Status",
      value: status || "",
      options: [
        { value: "", label: "All Status" },
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
        { value: "failed", label: "Failed" },
        { value: "cancelled", label: "Cancelled" },
      ],
      onChange: (value: string) => dispatch(setStatus(value)),
    },
  ];

  const addFields: FormField[] = [
    {
      key: "transactionId",
      label: "Transaction ID",
      type: "text",
      required: true,
      placeholder: "Gateway transaction id",
      value: newPayment.transactionId,
      onChange: (v) => dispatch(updateNew({ transactionId: v as string })),
    },
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
      value: newPayment.userId,
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
      value: newPayment.planId,
      onChange: (v) => dispatch(updateNew({ planId: v as string })),
    },
    {
      key: "amount",
      label: "Amount (₹)",
      type: "number",
      required: true,
      min: 0,
      step: "0.01",
      placeholder: "Amount",
      value: newPayment.amount,
      onChange: (v) => dispatch(updateNew({ amount: v as number })),
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
        { value: "failed", label: "Failed" },
        { value: "cancelled", label: "Cancelled" },
      ],
      value: newPayment.status,
      onChange: (v) => dispatch(updateNew({ status: v as string })),
    },
    {
      key: "currency",
      label: "Currency",
      type: "text",
      required: true,
      placeholder: "INR / USD",
      value: newPayment.currency,
      onChange: (v) => dispatch(updateNew({ currency: v as string })),
    },
  ];

  const editFields: FormField[] = [
    {
      key: "transactionId",
      label: "Transaction ID",
      type: "text",
      required: true,
      value: editPayment?.transactionId ?? "",
      onChange: (v) => dispatch(updateEdit({ transactionId: v as string })),
    },
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
              value: user._id.toString(),
              label: `${user.name} (${user.email})`,
            })),
          ],
      value: (() => {
        if (!editPayment) return "";
        if (typeof editPayment.userId === "string") return editPayment.userId;
        if (editPayment.userId?._id) return editPayment.userId._id.toString();
        return "";
      })(),
      onChange: (v) => {
        dispatch(updateEdit({ userId: v as string }));
      },
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
              value: plan._id.toString(),
              label: `${plan.name} - ₹${plan.price}`,
            })),
          ],
      value: (() => {
        if (!editPayment) return "";
        if (typeof editPayment.planId === "string") return editPayment.planId;
        if (editPayment.planId?._id) return editPayment.planId._id.toString();
        return "";
      })(),
      onChange: (v) => {
        dispatch(updateEdit({ planId: v as string }));
      },
    },
    {
      key: "amount",
      label: "Amount (₹)",
      type: "number",
      required: true,
      min: 0,
      step: "0.01",
      value: editPayment?.amount ?? 0,
      onChange: (v) => dispatch(updateEdit({ amount: v as number })),
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
        { value: "failed", label: "Failed" },
        { value: "cancelled", label: "Cancelled" },
      ],
      value: editPayment?.status ?? "pending",
      onChange: (v) => dispatch(updateEdit({ status: v as string })),
    },
  ];

  const renderCell = (payment: any, col: string) => {
    switch (col) {
      case "transactionId":
        return (
          <div className="font-mono text-sm text-gray-800 dark:text-gray-200">
            {payment.transactionId}
          </div>
        );
      case "user":
        return (
          <div className="text-sm text-gray-800 dark:text-gray-200">
            {payment.userId?.name ||
              payment.userId?.email ||
              (typeof payment.userId === "string"
                ? payment.userId
                : "Unknown User")}
          </div>
        );
      case "plan":
        return (
          <div className="text-sm text-gray-800 dark:text-gray-200">
            {payment.planId?.name
              ? `${payment.planId.name} (${payment.planId.type || "Basic"})`
              : typeof payment.planId === "string"
                ? payment.planId
                : "Unknown Plan"}
          </div>
        );
      case "amount":
        return (
          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            ₹{payment.amount}
          </span>
        );
      case "status":
        return (
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              payment.status === "completed"
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                : payment.status === "failed"
                  ? "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200"
                  : payment.status === "cancelled"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            }`}
          >
            {payment.status}
          </span>
        );
      case "currency":
        return (
          <span className="text-sm text-gray-800 dark:text-gray-200">
            {payment.currency}
          </span>
        );
      case "createdAt":
        return (
          <span className="text-sm text-gray-800 dark:text-gray-200">
            {payment.createdAt ? formatDate(payment.createdAt, true) : ""}
          </span>
        );
      default:
        return payment[col];
    }
  };

  return (
    <MainShell>
      <div className="space-y-6">
        <PageHeader
          title="Payments"
          description="View and manage subscription payments."
          onAdd={() => dispatch(openAdd())}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <StatsCard
            title="Total Payments"
            value={totalPayments}
            colorScheme="blue"
            icon={CreditCard}
          />
          <StatsCard
            title="Total Revenue"
            value={`₹${totalAmount}`}
            colorScheme="emerald"
            icon={IndianRupee}
          />
          <StatsCard
            title="Completed"
            value={statusCounts.completed || 0}
            colorScheme="green"
            icon={CheckCircle2}
          />
          <StatsCard
            title="Status Stats"
            value=""
            colorScheme="purple"
            icon={CreditCard}
            tags={Object.entries(statusCounts || {})
              .slice(0, 3)
              .map(([status, count]) => ({
                label: status,
                count: count as number,
              }))}
          />
        </div>

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

        <DataTable
          data={payments}
          columns={columns}
          columnConfig={columnConfig}
          loading={loading}
          totalPages={totalPages}
          totalPlans={totalPayments}
          page={page}
          limit={limit}
          onPageChange={(p) => dispatch(setPage(p))}
          renderCell={renderCell}
          renderActions={(payment: any) => (
            <>
              <button
                onClick={() => dispatch(openEdit(payment))}
                className="rounded-xl p-2 text-yellow-700 transition-all duration-200 hover:bg-yellow-100 hover:text-yellow-900 dark:text-yellow-400 dark:hover:bg-yellow-900/20"
                title="Edit payment"
              >
                <Edit2Icon className="h-4 w-4" />
              </button>
              <button
                onClick={() => dispatch(openDelete(payment._id))}
                className="rounded-xl p-2 text-red-700 transition-all duration-200 hover:bg-red-100 hover:text-red-900 dark:text-red-400 dark:hover:bg-red-900/20"
                title="Delete payment"
              >
                <Trash2Icon className="h-4 w-4" />
              </button>
            </>
          )}
        />

        <AddEditModal
          isOpen={isAddModalOpen}
          title="Add Payment"
          mode="add"
          formData={newPayment}
          fields={addFields}
          onSubmit={handleAddSubmit}
          onCancel={handleAddClose}
          submitting={submitting}
          onClose={handleAddClose}
          resetForm={handleAddClose}
        />

        {isEditModalOpen && editPayment && (
          <AddEditModal
            isOpen={true}
            title="Edit Payment"
            mode="edit"
            formData={editPayment}
            fields={editFields}
            onSubmit={handleEditSubmit}
            onCancel={handleEditClose}
            submitting={submitting}
            onClose={handleEditClose}
            resetForm={handleEditClose}
          />
        )}

        {confirmDeleteId && (
          <DeleteModal
            isOpen={true}
            title="Payment"
            onConfirm={() => handleDeleteConfirm(confirmDeleteId)}
            onCancel={() => dispatch(closeDelete())}
            submitting={submitting}
          />
        )}
      </div>
    </MainShell>
  );
}
