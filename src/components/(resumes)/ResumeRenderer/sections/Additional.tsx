"use client";

export default function Additional({ data, config }: any) {
  const additional = data.additional;
  if (!additional) return null;

  return (
    <section className="mb-4">
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-200">
        {config?.title ?? "Additional"}
      </h3>

      {/* Languages */}
      {additional.languages?.length > 0 && (
        <div className="mb-2">
          <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
            Languages
          </div>
          <ul className="ml-4 list-disc text-sm text-gray-700 dark:text-gray-300">
            {additional.languages.map((l: any, i: number) => (
              <li key={i}>
                {l.language} — {l.proficiency}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Interests */}
      {additional.interests?.length > 0 && (
        <div>
          <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
            Interests
          </div>
          <div className="mt-1 flex flex-wrap gap-2">
            {additional.interests.map((i: string, idx: number) => (
              <span
                key={idx}
                className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
