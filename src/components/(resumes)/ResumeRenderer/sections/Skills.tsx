"use client";

export default function Skills({ data, config }: any) {
  const skills = data?.skills ?? [];
  const title = config?.title ?? "Skills";
  const display = config?.display ?? "list";
  const columns = config?.maxColumns ?? 1;

  return (
    <section className="mb-5">
      {/* Title */}
      <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-gray-200">
        {title}
      </h3>

      {/* TAG CLOUD (Badge style) */}
      {display === "tag-cloud" ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((s: any, i: number) => (
            <span
              key={i}
              className="inline-flex items-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs leading-none font-medium text-[var(--accent)]"
            >
              {s.name}
            </span>
          ))}
        </div>
      ) : (
        /* FLEX LIST MODE (Wrap by content) */
        <div
          className="flex flex-wrap gap-x-6 gap-y-2"
          style={{
            maxWidth: columns > 1 ? "100%" : "auto",
          }}
        >
          {skills.map((s: any, i: number) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm whitespace-nowrap text-gray-800 dark:text-gray-300"
              style={{
                flexBasis: columns > 1 ? `${100 / columns}%` : "auto",
              }}
            >
              {/* Bullet */}
              <span
                className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                aria-hidden
              />

              <span>{s.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
