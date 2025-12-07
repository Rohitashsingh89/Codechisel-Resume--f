"use client";
import { useEffect, useCallback } from "react";

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

interface AddEditModalProps {
  isOpen: boolean;
  title: string;
  mode: "add" | "edit";
  formData: Record<string, any>;
  fields: FormField[];
  onSubmit: () => void;
  onCancel: () => void;
  submitting: boolean;
  onClose: () => void;
  resetForm: () => void;
}

export default function AddEditModal({
  isOpen,
  title,
  mode,
  fields,
  onSubmit,
  onClose,
  submitting,
  resetForm,
}: AddEditModalProps) {
  const stableResetForm = useCallback(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    if (!isOpen) stableResetForm();
  }, [isOpen, stableResetForm]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit],
  );

  const handleCancel = useCallback(() => {
    stableResetForm();
    onClose();
  }, [stableResetForm, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center rounded-xl bg-black/40 p-2 backdrop-blur-sm sm:p-4">
      <div className="flex max-h-[90vh] w-full max-w-md flex-col rounded-xl bg-white/90 shadow-xl backdrop-blur-xl dark:bg-gray-900/80">
        {/* HEADER (sticky) */}
        <div className="sticky top-0 z-10 flex-shrink-0 rounded-t-xl border-b border-gray-300 bg-white/90 px-3 py-6 sm:px-6 dark:border-gray-800 dark:bg-gray-900/80">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            <button
              onClick={handleCancel}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                className="h-5 w-5"
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
            </button>
          </div>
        </div>

        {/* FORM + FOOTER both inside form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col overflow-hidden"
        >
          {/* SCROLLABLE BODY */}
          <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto pt-3 pb-5">
            {fields.map((field) => (
              <div key={field.key} className="px-3 sm:px-6">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {field.label}
                </label>

                {field.type === "select" ? (
                  <select
                    value={(field.value as string) || ""}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      field.onChange(newValue === "" ? undefined : newValue);
                    }}
                    required={field.required}
                    disabled={submitting}
                    className="w-full rounded-lg border border-gray-300 bg-white/70 px-4 py-3 text-sm dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
                  >
                    {field.options?.map((opt, idx) => (
                      <option key={opt.value || idx} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    value={field.value?.toString() || ""}
                    onChange={(e) => {
                      if (field.type === "number") {
                        const v =
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value);
                        field.onChange(v);
                      } else field.onChange(e.target.value || undefined);
                    }}
                    disabled={submitting}
                    className="w-full rounded-lg border border-gray-300 bg-white/70 px-4 py-3 text-sm dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
                  />
                )}
              </div>
            ))}
          </div>

          {/* FOOTER (sticky inside form) */}
          <div className="sticky bottom-0 z-10 flex flex-shrink-0 flex-col-reverse gap-3 border-t border-gray-300 bg-white/90 px-3 py-3 sm:flex-row sm:px-6 dark:border-gray-800 dark:bg-gray-900/80">
            <button
              type="button"
              onClick={handleCancel}
              disabled={submitting}
              className="flex-1 rounded-lg bg-gray-200 py-3 text-sm font-medium text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className={`flex-1 rounded-lg py-3 text-sm font-semibold text-white shadow-md ${
                mode === "edit"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {submitting
                ? mode === "edit"
                  ? "Updating..."
                  : "Creating..."
                : mode === "edit"
                  ? "Update Plan"
                  : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
