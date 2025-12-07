"use client";

import React from "react";
import type { ResumeShape } from "@/types/resumeTemplate";
import { formatDate } from "@/utils/apiUtility";

// Explicit metadata; filename ThemeStudent -> "student" works too
export const slug = "student";
export const themeMeta = { name: "Student" };

type Props = {
  data: ResumeShape;
  templateType?: string;
  completion?: number;
};

export default function ThemeStudent({ data }: Props) {
  const has = {
    personal: Boolean(
      data?.personal &&
        (data.personal.fullName ||
          data.personal.designation ||
          data.personal.summary),
    ),
    contact: Boolean(
      data?.contact &&
        (data.contact.email ||
          data.contact.phone ||
          data.contact.linkedin ||
          data.contact.github ||
          data.contact.website ||
          data.contact.address),
    ),
    education: Array.isArray(data?.education) && data.education.length > 0,
    projects: Array.isArray(data?.projects) && data.projects.length > 0,
    experience: Array.isArray(data?.experience) && data.experience.length > 0,
    skills: Array.isArray(data?.skills) && data.skills.length > 0,
    certifications:
      Array.isArray(data?.certifications) && data.certifications.length > 0,
    languages:
      Array.isArray(data?.additional?.languages) &&
      data.additional.languages.length > 0,
    interests:
      Array.isArray(data?.additional?.interests) &&
      data.additional.interests.length > 0,
  };

  const Header = () => (
    <header className="border-b border-gray-200 pb-3 text-center dark:border-gray-700">
      <h1 className="text-3xl font-semibold tracking-tight">
        {data?.personal?.fullName || "Your Name"}
      </h1>
      {data?.personal?.designation && (
        <p
          className="text-sm dark:text-indigo-400"
          style={{ color: "var(--accent)" }}
        >
          {data.personal.designation}
        </p>
      )}
      {data?.personal?.summary && (
        <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-700 dark:text-gray-300">
          {data.personal.summary}
        </p>
      )}
    </header>
  );

  const Contact = () => (
    <section className="mt-3 text-sm">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-gray-700 dark:text-gray-300">
        {data?.contact?.email && <span>{data.contact.email}</span>}
        {data?.contact?.phone && <span>• {data.contact.phone}</span>}
        {data?.contact?.linkedin && <span>• {data.contact.linkedin}</span>}
        {data?.contact?.github && <span>• {data.contact.github}</span>}
        {data?.contact?.website && <span>• {data.contact.website}</span>}
        {data?.contact?.address && (
          <span className="w-full text-center sm:w-auto">
            • {data.contact.address}
          </span>
        )}
      </div>
    </section>
  );

  return (
    <div className="mx-auto max-w-3xl bg-white p-6 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {(has.personal || has.contact) && (
        <div>
          {has.personal && <Header />}
          {has.contact && <Contact />}
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-1">
          {/* Education (primary for students) */}
          {has.education && (
            <section>
              <h2 className="mb-2 text-sm font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((ed: any, i: number) => (
                  <div key={i}>
                    <div className="font-medium">
                      {ed?.degree || "Degree"}
                      {ed?.institution ? ` — ${ed.institution}` : ""}
                    </div>
                    {(ed?.start || ed?.end) && (
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {ed?.start ? formatDate(ed.start) : "Start"}
                        {ed?.end ? ` - ${formatDate(ed.end)}` : ""}
                      </div>
                    )}
                    {ed?.description && (
                      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                        {EdSafe(ed.description)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {has.skills && (
            <section>
              <h2 className="mb-2 text-sm font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                Skills
              </h2>
              <ul className="flex flex-wrap gap-2">
                {data.skills.map((s: any, i: number) => (
                  <li
                    key={i}
                    className="rounded-full px-2 py-1 text-xs transition-colors duration-300"
                    style={{
                      backgroundColor:
                        document.documentElement.classList.contains("dark")
                          ? "var(--accent)"
                          : "var(--accent)",
                      color: document.documentElement.classList.contains("dark")
                        ? "var(--accent-2)"
                        : "var(--accent-2)",
                    }}
                  >
                    {s?.name || "Skill"}
                    {typeof s?.level !== "undefined" ? ` — ${s.level}/5` : ""}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Certifications (as Achievements) */}
          {has.certifications && (
            <section>
              <h2 className="mb-2 text-sm font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                Achievements
              </h2>
              <ul className="list-disc pl-5 text-sm">
                {data.certifications.map((c: any, i: number) => (
                  <li key={i}>
                    {c?.title || "Certificate"}
                    {c?.issuer ? ` — ${c.issuer}` : ""}
                    {c?.year ? ` (${formatDate(c.year)})` : ""}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {has.languages && (
            <section>
              <h2 className="mb-2 text-sm font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                Languages
              </h2>
              <ul className="list-disc pl-5 text-sm">
                {data.additional.languages.map((l: any, i: number) => (
                  <li key={i}>
                    {l?.language || "Language"}
                    {l?.proficiency ? ` — ${l.proficiency}` : ""}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Interests / Activities */}
          {has.interests && (
            <section>
              <h2 className="mb-2 text-sm font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                Activities
              </h2>
              <ul className="list-disc pl-5 text-sm">
                {data.additional.interests.map((it: string, i: number) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Projects (highlighted for students) */}
          {has.projects && (
            <section>
              <h2 className="mb-2 text-sm font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((p: any, i: number) => (
                  <article
                    key={i}
                    className="rounded border border-gray-200 p-3 dark:border-gray-700"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="font-medium">{p?.title || "Project"}</div>
                      {(p?.github || p?.live) && (
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {p.github ? p.github : ""}
                          {p.github && p.live ? " • " : ""}
                          {p.live ? p.live : ""}
                        </div>
                      )}
                    </div>
                    {p?.description && (
                      <p className="mt-1 text-sm">{p.description}</p>
                    )}
                    {Array.isArray(p?.tech) && p.tech.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {p.tech.map((t: string, j: number) => (
                          <li
                            key={j}
                            className="rounded bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Internships / Experience */}
          {has.experience && (
            <section>
              <h2 className="mb-2 text-sm font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                Internships & Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((e: any, i: number) => (
                  <article key={i}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="font-medium">
                        {e?.role || "Role"}
                        {e?.company ? ` — ${e.company}` : ""}
                      </div>
                      {(e?.start || e?.end) && (
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {e?.start ? formatDate(e.start) : "Start"}
                          {e?.end ? ` - ${formatDate(e.end)}` : ""}
                        </div>
                      )}
                    </div>
                    {e?.description && (
                      <p className="mt-1 text-sm">{e.description}</p>
                    )}
                    {Array.isArray(e?.highlights) &&
                      e.highlights.length > 0 && (
                        <ul className="mt-1 list-disc pl-5 text-sm">
                          {e.highlights.map((h: string, j: number) => (
                            <li key={j}>{h}</li>
                          ))}
                        </ul>
                      )}
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

// Optional sanitization for education description if needed
function EdSafe(s: string) {
  return s;
}
