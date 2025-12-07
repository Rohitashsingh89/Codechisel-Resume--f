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
  fetchPlans,
  setSearch,
  setType,
  setIsActive,
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
  addPlan,
  updatePlan,
  deletePlan,
  resetNewPlan,
  resetEditPlan,
} from "@/features/plans/plansSlice";
import {
  Edit2Icon,
  Trash2Icon,
  DollarSign,
  Tag,
  FolderKanban,
  ListTree,
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

export default function PlansPage() {
  const dispatch = useAppDispatch();
  const {
    plans,
    totalPages,
    totalPlans,
    totalPricedPlans,
    totalTypedPlans,
    typeCounts,
    loading,
    submitting,
    search,
    type: planType,
    isActive,
    page,
    limit,
    columns,
    showColumnsDropdown,
    isAddModalOpen,
    isEditModalOpen,
    editPlan,
    newPlan,
    confirmDeleteId,
  } = useAppSelector((state) => state.plans);

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
    dispatch(fetchPlans());
  }, [dispatch, search, planType, isActive, page, limit]);

  const handleAddClose = useCallback(() => {
    dispatch(closeAdd());
    dispatch(resetNewPlan());
  }, [dispatch]);

  const handleEditClose = useCallback(() => {
    dispatch(closeEdit());
    dispatch(resetEditPlan());
  }, [dispatch]);

  const handleAddSubmit = useCallback(() => {
    dispatch(addPlan());
  }, [dispatch]);

  const handleEditSubmit = useCallback(() => {
    dispatch(updatePlan());
  }, [dispatch]);

  const handleDeleteConfirm = useCallback(
    async (id: string) => {
      await dispatch(deletePlan(id));
      dispatch(closeDelete());
    },
    [dispatch],
  );

  // Column config
  const columnConfig = [
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "type", label: "Type" },
    { key: "downloadLimit", label: "Downloads" },
    { key: "durationDays", label: "Duration" },
    { key: "createdAt", label: "Created" },
  ];

  // Filters
  const filters = [
    {
      key: "type",
      label: "All Types",
      value: planType || "",
      options: [
        { value: "", label: "All Types" },
        { value: "monthly", label: "Monthly" },
        { value: "yearly", label: "Yearly" },
        { value: "lifetime", label: "Lifetime" },
      ],
      onChange: (value: string) => dispatch(setType(value)),
    },
    {
      key: "status",
      label: "All Status",
      value: isActive || "",
      options: [
        { value: "", label: "All Status" },
        { value: "true", label: "Active" },
        { value: "false", label: "Inactive" },
      ],
      onChange: (value: string) => dispatch(setIsActive(value)),
    },
  ];

  // Add form fields
  const addFields: FormField[] = [
    {
      key: "name",
      label: "Plan Name",
      type: "text",
      required: true,
      placeholder: "Plan name",
      value: newPlan.name,
      onChange: (v) => dispatch(updateNew({ name: v as string })),
    },
    {
      key: "price",
      label: "Price (₹)",
      type: "number",
      required: true,
      min: 0,
      step: "0.01",
      placeholder: "Price",
      value: newPlan.price,
      onChange: (v) => dispatch(updateNew({ price: v as number })),
    },
    {
      key: "type",
      label: "Type",
      type: "select",
      required: true,
      options: [
        { value: "", label: "Select Type" },
        { value: "monthly", label: "Monthly" },
        { value: "yearly", label: "Yearly" },
        { value: "lifetime", label: "Lifetime" },
      ],
      value: newPlan.type,
      onChange: (v) => dispatch(updateNew({ type: v as string })),
    },
    {
      key: "downloadLimit",
      label: "Download Limit",
      type: "number",
      min: 0,
      placeholder: "Download limit (0 = unlimited)",
      value: newPlan.downloadLimit,
      onChange: (v) => dispatch(updateNew({ downloadLimit: v as number })),
    },
    {
      key: "durationDays",
      label: "Duration Days",
      type: "number",
      min: 0,
      placeholder: "Duration days (0 = lifetime)",
      value: newPlan.durationDays,
      onChange: (v) => dispatch(updateNew({ durationDays: v as number })),
    },
  ];

  // Edit form fields
  const editFields: FormField[] = addFields.map((field) => ({
    ...field,
    value: (editPlan as any)?.[field.key] ?? "",
    onChange: (v) => dispatch(updateEdit({ [field.key]: v })),
  }));

  const renderCell = (plan: any, col: string) => {
    switch (col) {
      case "name":
        return (
          <div className="font-semibold text-gray-800 dark:text-gray-300">
            {plan.name}
          </div>
        );
      case "price":
        return (
          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            ₹{plan.price}
          </span>
        );
      case "type":
        return (
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200">
            {plan.type || "Basic"}
          </span>
        );
      case "downloadLimit":
        return (
          <span className="font-mono text-sm text-gray-800 dark:text-gray-300">
            {plan.downloadLimit || "∞"}
          </span>
        );
      case "durationDays":
        return (
          <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
            {plan.durationDays ? `${plan.durationDays} days` : "Lifetime"}
          </span>
        );
      case "createdAt":
        return (
          <span className="text-sm text-gray-800 dark:text-gray-300">
            {plan.createdAt ? formatDate(plan.createdAt, true) : ""}
          </span>
        );
      default:
        return plan[col];
    }
  };

  return (
    <MainShell>
      <div className="space-y-6">
        <PageHeader
          title="Plans"
          description="Create, edit, and manage subscription plans."
          onAdd={() => dispatch(openAdd())}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <StatsCard
            title="Total Plans"
            value={totalPlans}
            colorScheme="blue"
            icon={ListTree}
          />
          <StatsCard
            title="Priced Plans"
            value={totalPricedPlans}
            colorScheme="emerald"
            icon={DollarSign}
          />
          <StatsCard
            title="Typed Plans"
            value={totalTypedPlans}
            colorScheme="orange"
            icon={Tag}
          />
          <StatsCard
            title="Plan Types"
            value=""
            colorScheme="purple"
            icon={FolderKanban}
            tags={Object.entries(typeCounts || {})
              .slice(0, 3)
              .map(([type, count]) => ({
                label: type,
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
          data={plans}
          columns={columns}
          columnConfig={columnConfig}
          loading={loading}
          totalPages={totalPages}
          totalPlans={totalPlans}
          page={page}
          limit={limit}
          onPageChange={(p) => dispatch(setPage(p))}
          renderCell={renderCell}
          renderActions={(plan: any) => (
            <>
              <button
                onClick={() => dispatch(openEdit(plan))}
                className="rounded-xl p-2 text-yellow-700 transition-all duration-200 hover:bg-yellow-100 hover:text-yellow-900 dark:text-yellow-400 dark:hover:bg-yellow-900/20"
                title="Edit plan"
              >
                <Edit2Icon className="h-4 w-4" />
              </button>
              <button
                onClick={() => dispatch(openDelete(plan._id))}
                className="rounded-xl p-2 text-red-700 transition-all duration-200 hover:bg-red-100 hover:text-red-900 dark:text-red-400 dark:hover:bg-red-900/20"
                title="Delete plan"
              >
                <Trash2Icon className="h-4 w-4" />
              </button>
            </>
          )}
        />

        {/* Add Modal */}
        <AddEditModal
          isOpen={isAddModalOpen}
          title="Add New Plan"
          mode="add"
          formData={newPlan}
          fields={addFields}
          onSubmit={handleAddSubmit}
          onCancel={handleAddClose}
          submitting={submitting}
          onClose={handleAddClose}
          resetForm={handleAddClose}
        />

        {/* Edit Modal */}
        {isEditModalOpen && editPlan && (
          <AddEditModal
            isOpen={true}
            title="Edit Plan"
            mode="edit"
            formData={editPlan}
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
            title="Plan"
            onConfirm={() => handleDeleteConfirm(confirmDeleteId)}
            onCancel={() => dispatch(closeDelete())}
            submitting={submitting}
          />
        )}
      </div>
    </MainShell>
  );
}
