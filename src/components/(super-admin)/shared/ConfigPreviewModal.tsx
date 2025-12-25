type TemplateWithConfig = {
  name: string;
  slug: string;
  config?: unknown;
};

export function ConfigPreviewModal({
  template,
  onClose,
}: {
  template: TemplateWithConfig;
  onClose: () => void;
}) {
  let pretty = "";
  let isJson = false;

  try {
    const raw = template.config;
    const parsed =
      typeof raw === "string" && raw.trim() ? JSON.parse(raw) : (raw ?? {});

    pretty = JSON.stringify(parsed, null, 2);
    isJson = true;
  } catch {
    pretty =
      typeof template.config === "string"
        ? template.config
        : JSON.stringify(template.config ?? {}, null, 2);
  }

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4"
      onClick={handleBackgroundClick}
    >
      <div className="flex w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-800">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
              Config – {template.name}
            </h3>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              Slug: {template.slug}
            </p>

            {!isJson && (
              <p className="mt-1 text-[11px] text-amber-600 dark:text-amber-400">
                Warning: Config is not valid JSON. Showing raw value.
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            aria-label="Close modal"
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

        {/* Body */}
        <div className="flex-1 overflow-hidden px-3 py-3 sm:px-4">
          <pre className="custom-scroll h-full max-h-[60vh] overflow-auto rounded-lg bg-gray-100 p-3 text-xs leading-relaxed text-gray-900 dark:bg-gray-800 dark:text-gray-100">
            <code className="break-words whitespace-pre-wrap">{pretty}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 px-4 py-2 dark:border-gray-800">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
