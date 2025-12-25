"use client";

export default function Certifications({ data, config }: any) {
  return (
    <section className="mb-4">
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-200">
        {config?.title ?? "Certifications"}
      </h3>

      {data.certifications.map((c: any, i: number) => (
        <div key={i} className="mb-2 text-gray-800 dark:text-gray-100">
          {c.title} — {c.issuer} ({c.year})
        </div>
      ))}
    </section>
  );
}
