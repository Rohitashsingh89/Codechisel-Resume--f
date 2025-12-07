"use client";

import { ResumeShape } from "@/types/resumeTemplate";
import { formatDate } from "@/utils/apiUtility";

export default function ThemeMinimal({ data }: { data: ResumeShape }) {
  return (
    <div className="mx-auto max-w-3xl space-y-6 rounded-lg bg-white p-6 text-gray-800 shadow-sm dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="border-b border-gray-300 pb-3 text-center dark:border-gray-700">
        <h1 className="text-2xl font-semibold">{data.personal.fullName}</h1>
        <p className="text-gray-500">{data.personal.designation}</p>
        <p className="mt-1 text-sm">
          {data.contact.email} • {data.contact.phone} • {data.contact.linkedin}
        </p>
      </header>

      {/* Summary */}
      <section>
        <h2 className="mb-1 text-lg font-semibold">About Me</h2>
        <p className="text-gray-700 dark:text-gray-300">
          {data.personal.summary}
        </p>
      </section>

      {/* Experience */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Experience</h2>
        {data.experience.map((e, i) => (
          <div key={i} className="mb-2">
            <div className="font-medium">
              {e.role} — {e.company}
            </div>
            <div className="text-sm text-gray-500">
              {e.start ? formatDate(e.start) : ""} -{" "}
              {e.end ? formatDate(e.end) : "Present"}
            </div>
            <p>{e.description}</p>
          </div>
        ))}
      </section>

      {/* Education */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Education</h2>
        {data.education.map((ed, i) => (
          <div key={i}>
            {ed.degree} — {ed.institution} (
            {ed.start ? formatDate(ed.start) : ""} -{" "}
            {ed.end ? formatDate(ed.end) : ""})
          </div>
        ))}
      </section>

      {/* Projects */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Projects</h2>
        {data.projects.map((p, i) => (
          <div key={i} className="mb-2">
            <div className="font-medium">{p.title}</div>
            <p>{p.description}</p>
            <div className="text-sm text-gray-500">
              {p.github} • {p.live}
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Skills</h2>
        <ul className="flex flex-wrap gap-2">
          {data.skills.map((s, i) => (
            <li
              key={i}
              className="rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800"
            >
              {s.name}
            </li>
          ))}
        </ul>
      </section>

      {/* Languages & Interests */}
      <section className="border-t border-gray-300 pt-3 dark:border-gray-700">
        <div>
          <span className="font-medium">Languages: </span>
          {data.additional.languages.map((l) => l.language).join(", ")}
        </div>
        <div>
          <span className="font-medium">Interests: </span>
          {data.additional.interests.join(", ")}
        </div>
      </section>
    </div>
  );
}
