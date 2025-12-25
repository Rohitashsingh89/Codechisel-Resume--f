"use client";

import React, { useRef, useState } from "react";
import ResumePreview from "@/components/(resumes)/resume/ResumePreview";
import { useDownload } from "@/hook/useDownload";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import ResumeLimitPopup from "@/components/(resumes)/resume/controls/ResumeLimitPopup";
import { useRouter } from "next/navigation";
import { TemplateConfig } from "@/types/resumeTemplate";
import { mapTemplateToPDF } from "../pdf/mapTemplatesToPDF";
import { DynamicResumePDF } from "../pdf/DynamicResumePDF";
import { pdf } from "@react-pdf/renderer";

type Props = {
  open: boolean;
  onClose: () => void;
  data: any;
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
  const [downloading, setDownloading] = useState<"pdf" | "docx" | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [showLimitPopup, setShowLimitPopup] = useState(false);
  const router = useRouter();
  const { resumeId } = useSelector((state: RootState) => state.resumeBuilder);

  const { theme, selectedTemplateSlug, config, isFallback } = useSelector(
    (state: RootState) => state.resumeBuilder,
  );
  const { downloadResume } = useDownload();

  if (!open) return null;

  const downloadPdf = async () => {
    try {
      downloadResume({
        resumeId: resumeId,
        resumeName: data.resumeName || "resume",
        downloadType: "pdf",
      });
      setDownloading("pdf");

      const accent = theme?.color ?? config?.colors?.primary ?? "#2563eb";
      const pdfConfig = mapTemplateToPDF(config, accent);

      const doc = <DynamicResumePDF data={data} pdfConfig={pdfConfig} />;
      const blob = await pdf(doc).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.resumeName || data.personal.fullName || "resume"}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF error", e);
    } finally {
      setDownloading(null);
    }
  };

  const handleDocxDownload = () => {
    downloadResume({
      resumeId: resumeId,
      resumeName: data.resumeName || "resume",
      downloadType: "docx",
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 backdrop-blur-xl">
        <div className="relative mx-4 h-[85vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/20 bg-white/70 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl dark:border-white/10 dark:bg-gray-900">
          <div className="absolute top-0 right-0 left-0 z-20 border-b border-gray-300/40 bg-white/80 px-6 py-3 backdrop-blur-xl dark:border-gray-700/40 dark:bg-gray-900">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
              Resume Preview
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Scroll down to see the full resume preview. This bar stays pinned
              so download options are always within reach.
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
                  config={config}
                  isFallback={isFallback}
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
                onClick={handleDocxDownload}
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
      <ResumeLimitPopup
        isOpen={showLimitPopup}
        onClose={() => setShowLimitPopup(false)}
        onSkip={() => setShowLimitPopup(false)}
        onUpgrade={() => {
          setShowLimitPopup(false);
          router.push("/billing");
        }}
      />
    </>
  );
}
