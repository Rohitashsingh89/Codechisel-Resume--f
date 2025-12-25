"use client";

import { ResumeShape, TemplateConfig } from "@/types/resumeTemplate";
import { formatDate } from "@/utils/apiUtility";

export default function ThemeBasic({
  data,
  templateType,
  completion,
  config,
}: {
  data: ResumeShape;
  templateType: string;
  completion: number;
  config?: TemplateConfig | null;
}) {
  // Fallback config – hardcoded, hamesha safe
  const safeConfig: TemplateConfig = {
    templateId: "fallback",
    name: "Fallback Template",
    layout: {
      type: config?.layout?.type || "single-column",
      sectionsOrder: config?.layout?.sectionsOrder || data.order,
      leftColumnSections: config?.layout?.leftColumnSections || data.order,
      rightColumnSections: config?.layout?.rightColumnSections || [],
      columnRatio: "30:70",
    },
    header: {
      showProfileImage: false,
      alignment: "center",
      nameSize: 30,
      roleSize: 16,
      showDividerBelow: true,
      spacingBelow: 20,
    },
    page: config?.page || {
      size: "A4",
      margins: { top: 24, left: 24, right: 24, bottom: 24 },
      background: "#FFFFFF",
    },
    fonts: config?.fonts || {
      primary: "Poppins",
      headingSize: 18,
      subheadingSize: 14,
      bodySize: 12,
      lineHeight: 1.5,
    },
    colors: config?.colors || {
      primary: "#111827",
      text: "#1F2937",
      headingText: "#020617",
      subText: "#4B5563",
      divider: "#E5E7EB",
      accent: "#2563EB",
    },
    sections: config?.sections || {},
  };

  const layoutType = safeConfig.layout.type;
  const leftKeys = safeConfig.layout.leftColumnSections || data.order;
  const rightKeys = safeConfig.layout.rightColumnSections || [];

  const renderSection = (key: string) => {
    switch (key) {
      case "personal":
        return (
          <section>
            <h1 className="text-2xl font-semibold">{data.personal.fullName}</h1>
            <div className="text-gray-600">{data.personal.designation}</div>
            <p className="mt-1">{data.personal.summary}</p>
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
            <h3 className="font-semibold">Additional</h3>
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

  // Two-column layout
  if (layoutType === "two-column") {
    return (
      <div className="bg-white p-5 text-gray-900 dark:bg-gray-800 dark:text-gray-200">
        <div className="grid grid-cols-[minmax(0,0.3fr)_minmax(0,0.7fr)] gap-6">
          <div className="space-y-4">
            {leftKeys.map((key) => (
              <div key={key}>{renderSection(key)}</div>
            ))}
          </div>
          <div className="space-y-4">
            {rightKeys.map((key) => (
              <div key={key}>{renderSection(key)}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Single-column fallback
  return (
    <div className="space-y-4 bg-white p-5 text-gray-900 dark:bg-gray-800 dark:text-gray-200">
      {(safeConfig.layout.sectionsOrder || data.order).map((key, index) => (
        <div
          key={key}
          className={`pb-3 ${index !== data.order.length - 1 ? "border-b border-gray-300 dark:border-gray-700" : ""}`}
        >
          {renderSection(key)}
        </div>
      ))}
    </div>
  );
}
