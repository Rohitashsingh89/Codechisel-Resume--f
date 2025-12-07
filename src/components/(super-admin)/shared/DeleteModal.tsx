"use client";
import { Trash2Icon } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  title: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
}

export default function DeleteModal({
  isOpen,
  title,
  onConfirm,
  onCancel,
  submitting
}: DeleteModalProps) {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      await onConfirm();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 backdrop-blur-sm sm:p-4">
      <div className="w-full max-w-sm rounded-xl bg-white/90 px-3 py-6 shadow-xl backdrop-blur-xl sm:px-6 dark:bg-gray-900/80">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
          <Trash2Icon className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-center text-xl font-semibold text-gray-900 dark:text-gray-100">
          Delete {title}?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          This action is permanent and cannot be undone.
        </p>
        <div className="flex flex-col-reverse gap-3 pt-5 sm:flex-row">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={submitting}
            className="flex-1 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-500 disabled:opacity-50 dark:from-red-600 dark:to-red-700 transition-all"
          >
            {submitting ? 'Deleting...' : 'Delete Forever'}
          </button>
        </div>
      </div>
    </div>
  );
}
