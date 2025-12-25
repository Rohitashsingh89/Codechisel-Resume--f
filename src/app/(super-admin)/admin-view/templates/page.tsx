"use client";

import MainShell from "@/components/(super-admin)/MainShell";
import StatsCard from "@/components/(super-admin)/shared/StatsCard";
import PageHeader from "@/components/(super-admin)/shared/PageHeader";
import FilterGrid from "@/components/(super-admin)/shared/FilterGrid";
import DataTable from "@/components/(super-admin)/shared/DataTable";
import AddEditModal from "@/components/(super-admin)/shared/AddEditModal";
import DeleteModal from "@/components/(super-admin)/shared/DeleteModal";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  fetchTemplates,
  setSearch,
  setCategory,
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
  addTemplate,
  updateTemplate,
  deleteTemplate,
  resetNewTemplate,
  resetEditTemplate,
} from "@/features/templates/templatesSlice";

import {
  Edit2Icon,
  Trash2Icon,
  LayoutTemplate,
  CheckCircle,
  XCircle,
  Layers,
} from "lucide-react";
import { formatDate } from "@/utils/apiUtility";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHooks";
import { Template } from "@/types/common";
import { ConfigPreviewModal } from "@/components/(super-admin)/shared/ConfigPreviewModal";

interface FormField {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "date" | "textarea" | "boolean";
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  value: string | number | boolean | undefined;
  onChange: (value: string | number | boolean | undefined) => void;
  min?: number;
  step?: string;
  rows?: number;
  textareaClassName?: string;
}

const TemplatesPage = () => {
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
    isAddModalOpen,
    isEditModalOpen,
    editTemplate,
    newTemplate,
    confirmDeleteSlug,
    totalTemplates,
    totalActiveTemplates,
    totalInactiveTemplates,
    categoryCounts,
  } = useAppSelector((state) => state.templates);
  const [configPreviewTemplate, setConfigPreviewTemplate] =
    useState<Template | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenConfig = useCallback((template: Template) => {
    setConfigPreviewTemplate(template);
  }, []);

  const handleCloseConfig = useCallback(() => {
    setConfigPreviewTemplate(null);
  }, []);

  const debouncedSearch = useCallback(
    (searchValue: string) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      searchTimeoutRef.current = setTimeout(() => {
        dispatch(setSearch(searchValue));
      }, 300);
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(fetchTemplates());
  }, [dispatch, search, category, isActive, page, limit]);

  const handleAddClose = useCallback(() => {
    dispatch(closeAdd());
    dispatch(resetNewTemplate());
  }, [dispatch]);

  const handleEditClose = useCallback(() => {
    dispatch(closeEdit());
    dispatch(resetEditTemplate());
  }, [dispatch]);

  const handleAddSubmit = useCallback(() => {
    dispatch(addTemplate());
  }, [dispatch]);

  const handleEditSubmit = useCallback(() => {
    dispatch(updateTemplate());
  }, [dispatch]);

  const handleDeleteConfirm = useCallback(
    async (slug: string) => {
      await dispatch(deleteTemplate(slug));
      dispatch(closeDelete());
    },
    [dispatch],
  );

  const columnConfig = [
    { key: "name", label: "Name" },
    { key: "slug", label: "Slug" },
    { key: "category", label: "Category" },
    { key: "isActive", label: "Status" },
    { key: "createdAt", label: "Created" },
  ];

  const filters = [
    {
      key: "category",
      label: "All Categories",
      value: category,
      options: [
        { value: "", label: "All Categories" },
        { value: "business", label: "Business" },
        { value: "professional", label: "Professional" },
        { value: "creative", label: "Creative" },
      ],
      onChange: (value: string) => dispatch(setCategory(value)),
    },
    {
      key: "status",
      label: "All Status",
      value: isActive,
      options: [
        { value: "", label: "All Status" },
        { value: "true", label: "Active" },
        { value: "false", label: "Inactive" },
      ],
      onChange: (value: string) => dispatch(setIsActive(value)),
    },
  ];

  const addFields: FormField[] = [
    {
      key: "name",
      label: "Template Name",
      type: "text",
      required: true,
      placeholder: "Template name",
      value: newTemplate.name,
      onChange: (v) => dispatch(updateNew({ name: v })),
    },
    {
      key: "slug",
      label: "Slug",
      type: "text",
      required: true,
      placeholder: "Unique slug",
      value: newTemplate.slug,
      onChange: (v) => dispatch(updateNew({ slug: v })),
    },
    {
      key: "category",
      label: "Category",
      type: "select",
      required: true,
      options: [
        { value: "", label: "Select Category" },
        { value: "business", label: "Business" },
        { value: "professional", label: "Professional" },
        { value: "creative", label: "Creative" },
      ],
      value: newTemplate.category,
      onChange: (v) => dispatch(updateNew({ category: v })),
    },
    {
      key: "isActive",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { value: "true", label: "Active" },
        { value: "false", label: "Inactive" },
      ],
      value: newTemplate.isActive ? "true" : "false",
      onChange: (v) => dispatch(updateNew({ isActive: v === "true" })),
    },
    {
      key: "isPremium",
      label: "Premium Template",
      type: "boolean",
      placeholder: "Mark as premium",
      value: newTemplate.isPremium ?? false,
      onChange: (v) => dispatch(updateNew({ isPremium: Boolean(v) })),
    },
    {
      key: "config",
      label: "Config (JSON)",
      type: "textarea",
      required: true,
      placeholder: `{"sections": [], "layout": "one-column"}`,
      rows: 8,
      textareaClassName: "h-56 md:h-72",
      value:
        typeof newTemplate.config === "string"
          ? newTemplate.config
          : JSON.stringify(newTemplate.config ?? {}, null, 2),
      onChange: (v) => {
        // yaha simple string store karo, parse backend/slice me kar sakte ho
        dispatch(updateNew({ config: v }));
      },
    },
  ];

  const editFields: FormField[] = addFields.map((field) => ({
    ...field,
    value:
      field.key === "isActive"
        ? editTemplate?.isActive
          ? "true"
          : "false"
        : field.key === "isPremium"
          ? (editTemplate?.isPremium ?? false)
          : field.key === "config"
            ? typeof editTemplate?.config === "string"
              ? editTemplate.config
              : JSON.stringify(editTemplate?.config ?? {}, null, 2)
            : ((editTemplate as any)?.[field.key] ?? ""),
    onChange: (v: any) => {
      if (!editTemplate) return;

      if (field.key === "isActive") {
        dispatch(updateEdit({ isActive: v === "true" }));
      } else if (field.key === "isPremium") {
        dispatch(updateEdit({ isPremium: Boolean(v) }));
      } else if (field.key === "config") {
        dispatch(updateEdit({ config: v }));
      } else {
        dispatch(updateEdit({ [field.key]: v } as any));
      }
    },
  }));

  const renderCell = (template: any, col: string) => {
    switch (col) {
      case "name":
        return (
          <div className="font-semibold text-gray-800 dark:text-gray-300">
            {template.name}
          </div>
        );
      case "slug":
        return (
          <code className="rounded-md bg-gray-100 px-2 py-1 font-mono text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-300">
            {template.slug}
          </code>
        );
      case "category":
        return (
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200">
            {template.category}
          </span>
        );
      case "isActive":
        return (
          <span
            className={
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold " +
              (template.isActive
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200"
                : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200")
            }
          >
            {template.isActive ? "Active" : "Inactive"}
          </span>
        );
      case "createdAt":
        return (
          <span className="text-sm text-gray-800 dark:text-gray-300">
            {template.createdAt ? formatDate(template.createdAt, true) : "—"}
          </span>
        );
      default:
        return template[col];
    }
  };

  const categoryTags = Object.entries(categoryCounts || {})
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 5)
    .map(([cat, count]) => ({
      label: cat,
      count: count as number,
    }));

  return (
    <MainShell>
      <div className="space-y-6">
        <PageHeader
          title="Templates"
          description="Create, edit, and manage templates for resumes."
          onAdd={() => dispatch(openAdd())}
          addLabel="Add Template"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <StatsCard
            title="Total Templates"
            value={totalTemplates}
            colorScheme="blue"
            icon={LayoutTemplate}
          />

          <StatsCard
            title="Active"
            value={totalActiveTemplates}
            colorScheme="emerald"
            icon={CheckCircle}
          />

          <StatsCard
            title="Inactive"
            value={totalInactiveTemplates}
            colorScheme="red"
            icon={XCircle}
          />

          <StatsCard
            title="Categories"
            value=""
            colorScheme="purple"
            tags={categoryTags}
            icon={Layers}
          />
        </div>

        <FilterGrid
          search={search}
          onSearchChange={(value) => dispatch(setSearch(value))}
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
          data={templates}
          columns={columns}
          columnConfig={columnConfig}
          loading={loading}
          totalPages={totalPages}
          totalItems={totalTemplates}
          page={page}
          limit={limit}
          onPageChange={(p) => dispatch(setPage(p))}
          renderCell={renderCell}
          renderActions={(template: any) => (
            <>
              <button
                onClick={() => handleOpenConfig(template)}
                className="rounded-xl p-2 text-indigo-700 transition-all duration-200 hover:bg-indigo-100 hover:text-indigo-900 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
                title="View config"
                type="button"
              >
                <span className="font-mono text-[11px]">CFG</span>
              </button>
              <button
                onClick={() => dispatch(openEdit(template))}
                className="rounded-xl p-2 text-yellow-700 transition-all duration-200 hover:bg-yellow-100 hover:text-yellow-900 dark:text-yellow-400 dark:hover:bg-yellow-900/20"
                title="Edit template"
              >
                <Edit2Icon className="h-4 w-4" />
              </button>
              <button
                onClick={() => dispatch(openDelete(template.slug))}
                className="rounded-xl p-2 text-red-700 transition-all duration-200 hover:bg-red-100 hover:text-red-900 dark:text-red-400 dark:hover:bg-red-900/20"
                title="Delete template"
              >
                <Trash2Icon className="h-4 w-4" />
              </button>
            </>
          )}
        />

        {isAddModalOpen && (
          <AddEditModal
            isOpen={isAddModalOpen}
            title="Add New Template"
            mode="add"
            formData={newTemplate}
            fields={addFields}
            onSubmit={handleAddSubmit}
            onCancel={handleAddClose}
            submitting={submitting}
            onClose={handleAddClose}
            resetForm={handleAddClose}
            maxWidthClass="max-w-xl lg:max-w-2xl"
            submitLabelAdd="Create Template"
          />
        )}

        {isEditModalOpen && editTemplate && (
          <AddEditModal
            isOpen={true}
            title="Edit Template"
            mode="edit"
            formData={editTemplate}
            fields={editFields}
            onSubmit={handleEditSubmit}
            onCancel={handleEditClose}
            submitting={submitting}
            onClose={handleEditClose}
            resetForm={handleEditClose}
            maxWidthClass="max-w-xl lg:max-w-2xl"
            submitLabelEdit="Update Template"
          />
        )}

        {confirmDeleteSlug && (
          <DeleteModal
            isOpen={true}
            title="Template"
            onConfirm={() => handleDeleteConfirm(confirmDeleteSlug)}
            onCancel={() => dispatch(closeDelete())}
            submitting={submitting}
          />
        )}
        {configPreviewTemplate && (
          <ConfigPreviewModal
            template={configPreviewTemplate}
            onClose={handleCloseConfig}
          />
        )}
      </div>
    </MainShell>
  );
};

export default TemplatesPage;
