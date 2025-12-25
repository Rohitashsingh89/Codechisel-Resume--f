export default function Summary({ data, config }: any) {
  return (
    <section className="mb-4">
      <h3 className="font-semibold text-gray-900 dark:text-gray-200">
        {config?.title ?? "Summary"}
      </h3>
      <p className="mt-1 text-gray-700 dark:text-gray-300">
        {data.personal.summary}
      </p>
    </section>
  );
}
