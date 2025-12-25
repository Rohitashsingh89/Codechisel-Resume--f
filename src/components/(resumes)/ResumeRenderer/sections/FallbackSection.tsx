"use client";

export default function FallbackSection({ sectionKey }: any) {
  return (
    <section className="rounded border border-dashed border-gray-300 p-3 text-sm text-gray-500 dark:border-gray-600 dark:text-gray-400">
      Unknown section:{" "}
      <strong className="text-gray-700 dark:text-gray-200">{sectionKey}</strong>
    </section>
  );
}
