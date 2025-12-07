"use client";

import { ResumeShape } from "@/types/resumeTemplate";
import { formatDate } from "@/utils/apiUtility";

export default function ThemeBasic({
  data,
  templateType,
  completion,
}: {
  data: ResumeShape;
  templateType: string;
  completion: number;
}) {
  const renderSection = (key: string) => {
    switch (key) {
      case "personal":
        return (
          <section>
            <h1
              className={
                templateType === "classic"
                  ? "text-3xl font-semibold"
                  : "text-2xl font-medium tracking-tight"
              }
            >
              {data.personal.fullName}
            </h1>
            <div
              className={
                templateType === "classic" ? "text-gray-600" : "text-gray-500"
              }
            >
              {data.personal.designation}
            </div>
            <p className="mt-2">{data.personal.summary}</p>
          </section>
        );
      case "contact":
        return (
          <section>
            <h3 className="font-semibold">Contact</h3>
            <p>{data.contact.address}</p>
            <p>
              {data.contact.email} • {data.contact.phone}
            </p>
            <p>
              {data.contact.linkedin} • {data.contact.github} •{" "}
              {data.contact.website}
            </p>
          </section>
        );
      case "experience":
        return (
          <section>
            <h3 className="font-semibold">Work Experience</h3>
            {data.experience.map((e, i) => (
              <div key={i} className="mb-2">
                <div className="font-medium">
                  {e.role} — {e.company}
                </div>
                <div className="text-xs text-gray-600">
                  {e.start ? formatDate(e.start) : ""} -{" "}
                  {e.end ? formatDate(e.end) : "Present"}
                </div>

                <p>{e.description}</p>
              </div>
            ))}
          </section>
        );
      case "education":
        return (
          <section>
            <h3 className="font-semibold">Education</h3>
            {data.education.map((ed, i) => (
              <div key={i}>
                {ed.degree} — {ed.institution} (
                {ed.start ? formatDate(ed.start) : ""} -{" "}
                {ed.end ? formatDate(ed.end) : "Present"})
              </div>
            ))}
          </section>
        );
      case "skills":
        return (
          <section>
            <h3 className="font-semibold">Skills</h3>
            <ul className="ml-5 list-disc">
              {data.skills.map((s, i) => (
                <li key={i}>
                  {s.name} — {s.level}/5
                </li>
              ))}
            </ul>
          </section>
        );
      case "projects":
        return (
          <section>
            <h3 className="font-semibold">Projects</h3>
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
        );
      case "certifications":
        return (
          <section>
            <h3 className="font-semibold">Certifications</h3>
            {data.certifications.map((c, i) => (
              <div key={i}>
                {c.title} — {c.issuer} ({c.year})
              </div>
            ))}
          </section>
        );
      case "additional":
        return (
          <section>
            <h3 className="font-semibold">Additional Information</h3>
            <div className="mt-1">
              <div className="font-medium">Languages</div>
              <ul className="ml-5 list-disc">
                {data.additional.languages.map((l, i) => (
                  <li key={i}>
                    {l.language} — {l.proficiency}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-2">
              <div className="font-medium">Interests</div>
              <div>{data.additional.interests.join(" • ")}</div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 bg-white p-5 text-gray-900 dark:bg-gray-800 dark:text-gray-200">
      {data.order.map((key, index) => (
        <div
          key={key}
          className={`pb-3 ${
            index !== data.order.length - 1
              ? "border-b border-gray-300 dark:border-gray-700"
              : ""
          }`}
        >
          {renderSection(key)}
        </div>
      ))}
    </div>
  );
}
