"use client";

export default function Personal({ data, config }: any) {
  const p = data.personal;
  if (!p) return null;

  return (
    <section className="mb-4">
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-200">
        {config?.title ?? "Profile"}
      </h3>

      <div className="space-y-1">
        <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {p.fullName}
        </div>

        {p.designation && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {p.designation}
          </div>
        )}

        {p.summary && (
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {p.summary}
          </p>
        )}
      </div>
    </section>
  );
}
