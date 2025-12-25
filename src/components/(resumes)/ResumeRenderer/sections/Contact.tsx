"use client";

export default function Contact({ data, config }: any) {
  const c = data.contact;
  if (!c) return null;

  return (
    <section className="mb-4">
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-200">
        {config?.title ?? "Contact"}
      </h3>

      <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
        {c.address && <div>{c.address}</div>}
        {c.email && <div>{c.email}</div>}
        {c.phone && <div>{c.phone}</div>}

        <div className="flex flex-wrap gap-x-2 gap-y-1 text-blue-600 dark:text-blue-400">
          {c.linkedin && <span>{c.linkedin}</span>}
          {c.github && <span>{c.github}</span>}
          {c.website && <span>{c.website}</span>}
        </div>
      </div>
    </section>
  );
}
