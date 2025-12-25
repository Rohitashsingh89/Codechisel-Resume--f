"use client";

export default function Links({ data, config }: any) {
  if (!data.links || data.links.length === 0) return null;

  return (
    <section className="mb-4">
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-200">
        {config?.title ?? "Links"}
      </h3>
      <ul className="ml-5 list-disc text-gray-700 dark:text-gray-300">
        {data.links.map((link: any, i: number) => (
          <li key={i}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {link.title || link.url}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
