"use client";

export default function Projects({ data, config }: any) {
  return (
    <section className="mb-4">
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-200">
        {config?.title ?? "Projects"}
      </h3>

      {data.projects.map((p: any, i: number) => (
        <div key={i} className="mb-3">
          <div className="font-medium text-gray-800 dark:text-gray-100">
            {p.title}
          </div>
          <p className="text-gray-700 dark:text-gray-300">{p.description}</p>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {p.github && <span>GitHub: {p.github} </span>}
            {p.live && <span>Live: {p.live}</span>}
          </div>
        </div>
      ))}
    </section>
  );
}
