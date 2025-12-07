"use client";

import { ResumeShape } from "@/types/resumeTemplate";
import { formatDate } from "@/utils/apiUtility";

export default function ThemeClassic({ data }: { data: ResumeShape }) {
  return (
    <div className="grid grid-cols-3 gap-6 rounded-md bg-white p-6 text-gray-900 shadow dark:bg-gray-800 dark:text-gray-100">
      {/* LEFT COLUMN */}
      <div className="col-span-1 space-y-6 border-r border-gray-300 pr-4 dark:border-gray-700">
        {/* Personal Info */}
        <div>
          <h1 className="text-3xl font-bold">{data.personal.fullName}</h1>
          <p className="text-gray-500">{data.personal.designation}</p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="mb-2 border-b border-gray-300 text-lg font-semibold dark:border-gray-700">
            Contact
          </h2>
          <p>{data.contact.email}</p>
          <p>{data.contact.phone}</p>
          <p>{data.contact.linkedin}</p>
          <p>{data.contact.github}</p>
          <p>{data.contact.website}</p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="mb-2 border-b border-gray-300 text-lg font-semibold dark:border-gray-700">
            Skills
          </h2>
          <ul className="ml-5 list-disc space-y-1">
            {data.skills.map((s, i) => (
              <li key={i}>
                {s.name} — {s.level}/5
              </li>
            ))}
          </ul>
        </div>

        {/* Languages */}
        <div>
          <h2 className="mb-2 border-b border-gray-300 text-lg font-semibold dark:border-gray-700">
            Languages
          </h2>
          <ul className="ml-5 list-disc">
            {data.additional.languages.map((l, i) => (
              <li key={i}>
                {l.language} — {l.proficiency}
              </li>
            ))}
          </ul>
        </div>

        {/* Interests */}
        <div>
          <h2 className="mb-2 border-b border-gray-300 text-lg font-semibold dark:border-gray-700">
            Interests
          </h2>
          <p>{data.additional.interests.join(" • ")}</p>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="col-span-2 space-y-6 pl-4">
        {/* Summary */}
        <section>
          <h2 className="mb-2 border-b border-gray-300 text-xl font-semibold dark:border-gray-700">
            Profile Summary
          </h2>
          <p>{data.personal.summary}</p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="mb-2 border-b border-gray-300 text-xl font-semibold dark:border-gray-700">
            Work Experience
          </h2>
          {data.experience.map((e, i) => (
            <div key={i} className="mb-3">
              <div className="font-medium">
                {e.role} — {e.company}
              </div>
              <div className="text-sm text-gray-500">
                {e.start ? formatDate(e.start) : ""} -{" "}
                {e.end ? formatDate(e.end) : "Present"}
              </div>

              <p className="text-gray-700 dark:text-gray-300">
                {e.description}
              </p>
            </div>
          ))}
        </section>

        {/* Education */}
        <section>
          <h2 className="mb-2 border-b border-gray-300 text-xl font-semibold dark:border-gray-700">
            Education
          </h2>
          {data.education.map((ed, i) => (
            <div key={i}>
              <strong>{ed.degree}</strong> — {ed.institution} (
              {ed.start ? formatDate(ed.start) : ""} -{" "}
              {ed.end ? formatDate(ed.end) : "Present"})
            </div>
          ))}
        </section>

        {/* Projects */}
        <section>
          <h2 className="mb-2 border-b border-gray-300 text-xl font-semibold dark:border-gray-700">
            Projects
          </h2>
          {data.projects.map((p, i) => (
            <div key={i}>
              <div className="font-medium">{p.title}</div>
              <p>{p.description}</p>
              <div className="text-sm text-gray-600">
                {p.github} • {p.live}
              </div>
            </div>
          ))}
        </section>

        {/* Certifications */}
        <section>
          <h2 className="mb-2 border-b border-gray-300 text-xl font-semibold dark:border-gray-700">
            Certifications
          </h2>
          {data.certifications.map((c, i) => (
            <div key={i}>
              {c.title} — {c.issuer} ({c.year})
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
