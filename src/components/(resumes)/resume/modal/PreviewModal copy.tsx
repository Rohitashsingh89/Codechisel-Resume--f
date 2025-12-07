"use client";

import React, { useMemo, useRef, useState } from "react";
import ResumePreview from "@/components/(resumes)/resume/ResumePreview";
// import { ResumePDF } from "@/components/resume/pdf/ResumePDF";
import { useResumeBuilder } from "@/hook/useResumeBuilder";
import { pdfThemeRegistry } from "../pdf/registry";
import { pdf } from "@react-pdf/renderer";

type Props = {
  open: boolean;
  onClose: () => void;
  data: any; // ResumeShape
  templateType: string;
  completion: number;
};

export default function PreviewModal({
  open,
  onClose,
  data,
  templateType,
  completion,
}: Props) {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [downloading, setDownloading] = useState<"pdf" | "docx" | null>(null);
  const { theme } = useResumeBuilder();
  const accent = theme?.color || "#2563EB";

  const PdfComp =
    pdfThemeRegistry[templateType] ?? pdfThemeRegistry["professional"];
  const pdfDoc = useMemo(
    () => <PdfComp data={data} accent={accent} />,
    [data, accent, PdfComp],
  );

  if (!open) return null;

  const downloadPdf = async () => {
    setDownloading("pdf");
    try {
      const blob = await pdf(pdfDoc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data?.resumeName || "resume"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(null);
    }
  };

  // Drop-in replacement for exportDocx in PreviewModal.tsx
  const exportDocx = async () => {
    try {
      setDownloading("docx");

      const {
        Document,
        Packer,
        Paragraph,
        TextRun,
        HeadingLevel,
        AlignmentType,
        PageNumber,
        Numbering,
      } = await import("docx");

      // Pull theme accent from your preview CSS variables if available
      const root = document.documentElement;
      const accentCss =
        getComputedStyle(root).getPropertyValue("--accent")?.trim() ||
        "#2563eb";
      const accent = accentCss.replace("#", "").toUpperCase(); // docx wants hex without '#'

      // Helpers
      const P = (children: any[], opts: any = {}) =>
        new Paragraph({ children, ...opts });
      const T = (text: string, opts: any = {}) =>
        new TextRun({ text, ...opts });

      // Build sections
      const parts: any[] = [];

      // Header: Name + Role
      if (data?.personal?.fullName) {
        parts.push(
          P([T(data.personal.fullName, { bold: true, size: 60 })], {
            alignment: AlignmentType.CENTER,
            spacing: { after: 80 },
          }),
        );
      }
      if (data?.personal?.designation) {
        parts.push(
          P([T(data.personal.designation, { color: accent, size: 28 })], {
            alignment: AlignmentType.CENTER,
            spacing: { after: 160 },
          }),
        );
      }

      // Contact line
      const c = data?.contact ?? {};
      const contactLine = [c.email, c.phone, c.linkedin, c.github, c.website]
        .filter(Boolean)
        .join(" • ");
      if (contactLine || c.address) {
        if (contactLine) {
          parts.push(
            P([T(contactLine, { size: 22, color: "374151" })], {
              alignment: AlignmentType.CENTER,
            }),
          );
        }
        if (c.address) {
          parts.push(
            P([T(c.address, { size: 22, color: "374151" })], {
              alignment: AlignmentType.CENTER,
            }),
          );
        }
        parts.push(P([T("")], { spacing: { after: 120 } }));
      }

      const sectionHeading = (text: string) =>
        P([T(text, { bold: true, color: accent, size: 32 })], {
          spacing: { before: 200, after: 60 },
        });

      // Summary
      if (data?.personal?.summary) {
        parts.push(sectionHeading("Summary"));
        parts.push(
          P([T(data.personal.summary, { size: 22, color: "111827" })]),
        );
      }

      // Experience
      if (Array.isArray(data?.experience) && data.experience.length) {
        parts.push(sectionHeading("Work Experience"));
        for (const e of data.experience) {
          const title = `${e?.role || ""}${e?.role && e?.company ? " — " : ""}${e?.company || ""}`;
          parts.push(P([T(title, { bold: true, size: 28 })]));
          const dates = `${e?.start || ""}${e?.start || e?.end ? " - " : ""}${e?.end || ""}`;
          if (dates.trim())
            parts.push(P([T(dates, { size: 20, color: "6B7280" })]));
          if (e?.description) parts.push(P([T(e.description, { size: 22 })]));
          if (Array.isArray(e?.highlights) && e.highlights.length) {
            for (const h of e.highlights) {
              parts.push(
                P([T(h, { size: 22 })], {
                  bullet: { level: 0 },
                  spacing: { before: 40, after: 40 },
                }),
              );
            }
          }
          parts.push(P([T("")], { spacing: { after: 80 } }));
        }
      }

      // Education
      if (Array.isArray(data?.education) && data.education.length) {
        parts.push(sectionHeading("Education"));
        for (const ed of data.education) {
          const line = `${ed?.degree || ""}${ed?.degree && ed?.institution ? " — " : ""}${ed?.institution || ""}`;
          parts.push(P([T(line, { bold: true, size: 26 })]));
          const dates = `${ed?.start || ""}${ed?.start || ed?.end ? " - " : ""}${ed?.end || ""}`;
          if (dates.trim())
            parts.push(P([T(dates, { size: 20, color: "6B7280" })]));
          if (ed?.description) parts.push(P([T(ed.description, { size: 22 })]));
          parts.push(P([T("")], { spacing: { after: 80 } }));
        }
      }

      // Projects
      if (Array.isArray(data?.projects) && data.projects.length) {
        parts.push(sectionHeading("Projects"));
        for (const p of data.projects) {
          parts.push(P([T(p?.title || "Project", { bold: true, size: 26 })]));
          if (p?.description) parts.push(P([T(p.description, { size: 22 })]));
          const links = [p?.github, p?.live].filter(Boolean).join(" • ");
          if (links) parts.push(P([T(links, { size: 20, color: "1F2937" })]));
          parts.push(P([T("")], { spacing: { after: 60 } }));
        }
      }

      // Skills
      if (Array.isArray(data?.skills) && data.skills.length) {
        parts.push(sectionHeading("Skills"));
        const skillsLine = data.skills
          .map(
            (s: any) =>
              `${s?.name || ""}${Number.isFinite(s?.level) ? ` (${s.level}/5)` : ""}`,
          )
          .filter(Boolean)
          .join(" • ");
        parts.push(P([T(skillsLine, { size: 22 })]));
      }

      // Certifications
      if (Array.isArray(data?.certifications) && data.certifications.length) {
        parts.push(sectionHeading("Certifications"));
        for (const cert of data.certifications) {
          const line = `${cert?.title || ""}${cert?.title && cert?.issuer ? " — " : ""}${cert?.issuer || ""}${cert?.year ? ` (${cert.year})` : ""}`;
          parts.push(P([T(line, { size: 22 })], { bullet: { level: 0 } }));
        }
      }

      // Languages / Interests
      const langs = data?.additional?.languages
        ?.map(
          (l: any) =>
            `${l?.language || ""}${l?.proficiency ? ` — ${l.proficiency}` : ""}`,
        )
        .filter(Boolean);
      if (langs?.length) {
        parts.push(sectionHeading("Languages"));
        parts.push(P([T(langs.join(" • "), { size: 22 })]));
      }
      const ints = data?.additional?.interests
        ?.map((i: any) => (typeof i === "string" ? i : i?.label))
        .filter(Boolean);
      if (ints?.length) {
        parts.push(sectionHeading("Interests"));
        parts.push(P([T(ints.join(" • "), { size: 22 })]));
      }

      // Document with styles, A4 size and 1" margins (twips)
      const doc = new Document({
        styles: {
          default: {
            document: {
              run: { font: "Calibri", size: 22, color: "111827" },
              paragraph: { spacing: { line: 276, after: 80 } }, // ~1.15 line height
            },
          },
          paragraphStyles: [
            {
              id: "Heading1",
              name: "Heading 1",
              basedOn: "Normal",
              quickFormat: true,
              run: { bold: true, size: 60, color: "111827" },
              paragraph: { spacing: { before: 240, after: 120 } },
            },
            {
              id: "Heading2",
              name: "Heading 2",
              basedOn: "Normal",
              quickFormat: true,
              run: { bold: true, size: 32, color: accent },
              paragraph: { spacing: { before: 200, after: 80 } },
            },
            {
              id: "Heading3",
              name: "Heading 3",
              basedOn: "Normal",
              quickFormat: true,
              run: { bold: true, size: 26, color: "111827" },
              paragraph: { spacing: { before: 120, after: 40 } },
            },
          ],
        },
        sections: [
          {
            properties: {
              page: {
                // A4 page size in twips (width x height)
                size: { width: 11906, height: 16838 },
                margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
              },
            },
            children: parts,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data?.resumeName || "resume"}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 backdrop-blur-xl">
      <div className="relative mx-4 h-[85vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/20 bg-white/70 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl dark:border-white/10 dark:bg-gray-900">
        <div className="absolute top-0 right-0 left-0 z-20 border-b border-gray-300/40 bg-white/80 px-6 py-3 backdrop-blur-xl dark:border-gray-700/40 dark:bg-gray-900">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
            Resume Preview
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Scroll down to see the full resume preview. This bar stays pinned so
            download options are always within reach.
          </p>
        </div>

        <div className="flex h-full pt-[70px]">
          {/* LEFT: Scrollable resume preview */}
          <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-4">
            <div
              ref={previewRef}
              className="rounded-xl border border-gray-300/60 bg-white p-4 shadow-md dark:border-gray-700/60 dark:bg-zinc-900"
            >
              <ResumePreview
                templateType={templateType}
                data={data}
                completion={completion}
              />
            </div>
          </div>

          {/* RIGHT: Sticky actions */}
          <div className="w-64 border-l border-gray-300/60 bg-white p-4 dark:border-gray-700/60 dark:bg-gray-900">
            <div className="text-dark mb-3 border-b border-gray-300 pb-3 text-sm font-semibold dark:border-gray-700 dark:text-gray-200">
              Export
            </div>
            <button
              className="mb-2 w-full rounded bg-gray-900 px-3 py-2 text-white disabled:opacity-50 dark:bg-zinc-800"
              onClick={downloadPdf}
              disabled={!!downloading}
            >
              {downloading === "pdf" ? "Exporting..." : "Export to PDF"}
            </button>
            <button
              className="bg-primary mb-4 w-full rounded px-3 py-2 text-white disabled:opacity-50"
              onClick={exportDocx}
              disabled={!!downloading}
            >
              {downloading === "docx" ? "Exporting..." : "Export to Word"}
            </button>
            <button
              className="text-dark w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:text-gray-200"
              onClick={onClose}
            >
              Close
            </button>

            <div className="mt-6 text-xs text-gray-600 dark:text-gray-300">
              Tip: Ensure all images and fonts are loaded before exporting for
              best fidelity. [External images may require CORS headers.]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
