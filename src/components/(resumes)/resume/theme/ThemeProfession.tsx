"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import type { ResumeShape } from "@/types/resumeTemplate";
import { formatDate } from "@/utils/apiUtility";

export const slug = "professional";
export const themeMeta = { name: "Professional" };

type Props = {
  data: ResumeShape;
  templateType?: string;
  completion?: number;
};

// Reusable 50–50 split text heading (text only, no bg fill)
export function SplitTextHeading({
  title,
  left = "var(--accent)",
  right = "var(--accent-2)",
}: {
  title: string;
  left?: string;
  right?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [splitAt, setSplitAt] = useState<number | null>(null);

  // Measure visual midpoint so print split matches ~50% width, not just 50% characters.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cs = getComputedStyle(el);
    // Build a font string for accurate measurement
    const font = [
      cs.fontStyle,
      cs.fontVariant,
      cs.fontWeight,
      cs.fontStretch ?? "",
      cs.fontSize,
      cs.fontFamily,
    ]
      .filter(Boolean)
      .join(" ");
    ctx.font = font;

    const letterSpacing = parseFloat(cs.letterSpacing || "0");
    const chars = Array.from(title);
    const widths = chars.map((ch) => ctx.measureText(ch).width + letterSpacing);
    const total = widths.reduce((a, b) => a + b, 0);

    let acc = 0,
      idx = 0;
    for (; idx < widths.length; idx++) {
      if (acc + widths[idx] >= total / 2) break;
      acc += widths[idx];
    }
    setSplitAt(idx);
  }, [title]);

  const leftText = splitAt == null ? title : title.slice(0, splitAt);
  const rightText = splitAt == null ? "" : title.slice(splitAt);

  return (
    <h2 className="mb-2 text-sm font-semibold tracking-wider uppercase">
      <span
        className="split--gradient bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--accent) 0 50%, var(--accent-2) 50% 100%)",
        }}
      >
        {title}
      </span>
      <span className="split--solid hidden">
        <span style={{ color: left }}>{leftText}</span>
        <span style={{ color: right }}>{rightText}</span>
      </span>
    </h2>
  );
}

export default function ThemeProfession({ data }: Props) {
  const has = {
    personal: !!(
      data?.personal?.fullName ||
      data?.personal?.designation ||
      data?.personal?.summary
    ),
    contact: !!(
      data?.contact?.email ||
      data?.contact?.phone ||
      data?.contact?.linkedin ||
      data?.contact?.github ||
      data?.contact?.website ||
      data?.contact?.address
    ),
    education: Array.isArray(data?.education) && data.education.length > 0,
    experience: Array.isArray(data?.experience) && data.experience.length > 0,
    projects: Array.isArray(data?.projects) && data.projects.length > 0,
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

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 text-gray-900 shadow-sm dark:bg-gray-900 dark:text-gray-100">
      {/* Header */}
      {(has.personal || has.contact) && (
        <header className="mb-4 border-b border-gray-200 pb-3 text-center dark:border-gray-700">
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
          {has.contact && (
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-gray-700 dark:text-gray-300">
              {data?.contact?.email && <span>{data.contact.email}</span>}
              {data?.contact?.phone && <span>• {data.contact.phone}</span>}
              {data?.contact?.linkedin && (
                <span>• {data.contact.linkedin}</span>
              )}
              {data?.contact?.github && <span>• {data.contact.github}</span>}
              {data?.contact?.website && <span>• {data.contact.website}</span>}
              {data?.contact?.address && (
                <span className="w-full text-center sm:w-auto">
                  • {data.contact.address}
                </span>
              )}
            </div>
          )}
        </header>
      )}

      <div className="space-y-6">
        {/* About Me */}
        {data?.personal?.summary && (
          <section>
            <SplitTextHeading title="About Me" left="#000000" right="#6366F1" />
            <p className="text-sm leading-6 text-gray-800 dark:text-gray-100">
              {data.personal.summary}
            </p>
          </section>
        )}

        {/* Education */}
        {has.education && (
          <section>
            <SplitTextHeading
              title="Education"
              left="#000000"
              right="#6366F1"
            />
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
                      {ed.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        <section>
          <SplitTextHeading title="Experience" left="#000000" right="#6366F1" />
          {has.experience ? (
            <div className="space-y-3">
              {data.experience.map((e: any, i: number) => (
                <article
                  key={i}
                  className="rounded border border-gray-200 p-3 dark:border-gray-700"
                >
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
                  {Array.isArray(e?.highlights) && e.highlights.length > 0 && (
                    <ul className="mt-1 list-disc pl-5 text-sm">
                      {e.highlights.map((h: string, j: number) => (
                        <li key={j}>{h}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-700 italic dark:text-gray-300">
              Add your internships or roles with achievements and timelines.
            </p>
          )}
        </section>

        {/* Projects */}
        {has.projects && (
          <section>
            <SplitTextHeading title="Projects" left="#000000" right="#6366F1" />
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

        {/* Skills */}
        {has.skills && (
          <section>
            <SplitTextHeading title="Skills" left="#000000" right="#6366F1" />
            <ul className="flex flex-wrap gap-2">
              {data.skills.map((s: any, i: number) => (
                <li
                  key={i}
                  className="rounded-full bg-indigo-50 px-2 py-1 text-xs text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200"
                >
                  {s?.name || "Skill"}
                  {typeof s?.level !== "undefined" ? ` — ${s.level}/5` : ""}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Certifications */}
        {has.certifications && (
          <section>
            <SplitTextHeading
              title="Certifications"
              left="#000000"
              right="#6366F1"
            />
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
            <SplitTextHeading
              title="Languages"
              left="#000000"
              right="#6366F1"
            />
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

        {/* Activities / Interests */}
        {has.interests && (
          <section>
            <SplitTextHeading
              title="Activities"
              left="#000000"
              right="#6366F1"
            />
            <ul className="list-disc pl-5 text-sm">
              {data.additional.interests.map((it: string, i: number) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
