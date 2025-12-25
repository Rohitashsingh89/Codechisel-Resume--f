"use client";

export default function TechnicalSkills({ data, config }: any) {
  const skills = data.skills || [];
  if (!skills.length) return null;

  const display = config?.display ?? "tag-cloud";

  return (
    <section className="mb-4">
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-200">
        {config?.title ?? "Technical Skills"}
      </h3>

      <div
        className={
          display === "inline"
            ? "flex flex-wrap gap-x-2 text-sm text-gray-700 dark:text-gray-300"
            : "flex flex-wrap gap-2"
        }
      >
        {skills.map((s: any, i: number) => (
          <span
            key={i}
            className={
              display === "inline"
                ? ""
                : "rounded bg-gray-200 px-2 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }
          >
            {s.name}
          </span>
        ))}
      </div>
    </section>
  );
}
