import { useRef } from "react";
import dynamic from "next/dynamic";

const Html2Pdf = dynamic(() => import("html2pdf.js"), { ssr: false });

export default function ResumePDFExporter({ previewRef, filename }) {
  const handleExport = async () => {
    if (!previewRef.current) return;

    const html2pdf = (await import("html2pdf.js")).default;

    html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: filename || "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(previewRef.current)
      .save();
  };

  return (
    <button
      className="w-full rounded bg-gray-900 px-3 py-2 text-white dark:bg-zinc-800"
      onClick={handleExport}
    >
      Export to PDF
    </button>
  );
}
