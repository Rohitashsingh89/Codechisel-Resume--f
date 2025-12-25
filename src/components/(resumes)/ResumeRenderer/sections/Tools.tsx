"use client";

export default function Tools({ data, config }: any) {
  if (!data.tools || data.tools.length === 0) return null;

  return (
    <section className="mb-4">
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-200">
        {config?.title ?? "Tools"}
      </h3>

      <div className="flex flex-wrap gap-2">
        {data.tools.map((tool: string, i: number) => (
          <span
            key={i}
            className="rounded bg-gray-200 px-2 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          >
            {tool}
          </span>
        ))}
      </div>
    </section>
  );
}
