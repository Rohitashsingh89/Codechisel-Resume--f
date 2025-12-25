"use client";
import { DownloadIcon } from "lucide-react";
import PrimaryButton from "../../Common/ui/PrimaryButton";
import { apiFetch } from "@/lib/api";
import { useState } from "react";

interface Step4Props {
  resumeData: any;
  planId: string;
}

export default function Step4DownloadResume({
  resumeData,
  planId,
}: Step4Props) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Generate real PDF (mock for now)
      const response = await apiFetch("/api/generate-resume", {
        method: "POST",
        body: JSON.stringify(resumeData),
      });

      // Mock download
      const link = document.createElement("a");
      link.href = "#"; // Replace with actual blob URL
      link.download = `${resumeData.formData?.fullName || "Resume"}_Professional.pdf`;
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 text-center">
      {/* Success Animation */}
      <div className="mx-auto mb-12 flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-400 to-green-500 shadow-2xl ring-4 ring-emerald-200/50">
        <svg
          className="h-20 w-20 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <h1 className="mb-8 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 bg-clip-text text-5xl font-black text-transparent md:text-6xl">
        Perfect!
      </h1>

      <p className="mx-auto mb-16 max-w-2xl text-2xl leading-relaxed font-semibold text-gray-700 dark:text-gray-200">
        Your subscription is active. Download your ATS-optimized resume
        instantly and get hired faster! 🚀
      </p>

      {/* Resume Preview Card */}
      <div className="mx-auto mb-12 max-w-2xl rounded-3xl border border-gray-200/50 bg-white/80 p-8 shadow-2xl backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/80">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
            <span className="text-2xl font-bold text-white">📄</span>
          </div>
          <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            {resumeData?.formData?.fullName || "Your Resume"}
          </h3>
          <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Ready to Download • ATS Optimized
          </p>
        </div>
      </div>

      {/* Download Button */}
      <PrimaryButton
        onClick={handleDownload}
        disabled={downloading}
        className="hover:shadow-3xl mx-auto w-full max-w-md transform bg-gradient-to-r from-emerald-600 to-green-600 px-12 py-6 text-2xl font-black text-white shadow-2xl transition-all duration-200 hover:scale-[1.02] hover:from-emerald-700 hover:to-green-700"
      >
        {downloading ? (
          <>
            <div className="mr-3 inline-block h-6 w-6 animate-spin rounded-full border-b-2 border-white"></div>
            Preparing PDF...
          </>
        ) : (
          <>
            <DownloadIcon className="mr-3 inline h-6 w-6" />
            Download Resume PDF
          </>
        )}
      </PrimaryButton>

      {/* Subscription Info */}
      <div className="mx-auto mt-16 max-w-2xl rounded-3xl border-2 border-emerald-200/50 bg-gradient-to-r from-emerald-50 to-green-50 p-8 dark:border-emerald-400/30 dark:from-emerald-500/10 dark:to-green-500/10">
        <h4 className="mb-4 text-center text-2xl font-bold text-emerald-800 dark:text-emerald-300">
          🎉 Subscription Active
        </h4>
        <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
          <div className="p-4">
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              Unlimited
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Resumes
            </div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              500+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Templates
            </div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              24/7
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Support
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400">
        Need more resumes? Create unlimited versions anytime from your
        dashboard.
      </p>
    </div>
  );
}
