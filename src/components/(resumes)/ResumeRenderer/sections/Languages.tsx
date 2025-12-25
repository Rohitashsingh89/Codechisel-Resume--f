"use client";

export default function Languages({ data, config }: any) {
  if (!data.additional?.languages || data.additional.languages.length === 0)
    return null;

  return (
    <section className="mb-4">
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-200">
        {config?.title ?? "Languages"}
      </h3>
      <ul className="ml-5 list-disc text-gray-700 dark:text-gray-300">
        {data.additional.languages.map((l: any, i: number) => (
          <li key={i}>
            {l.language} — {l.proficiency}
          </li>
        ))}
      </ul>
    </section>
  );
}
