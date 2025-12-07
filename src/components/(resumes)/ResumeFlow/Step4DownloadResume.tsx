"use client";
import { DownloadIcon } from "lucide-react";
import PrimaryButton from "../../Common/ui/PrimaryButton";
import { apiFetch } from "@/lib/api";
import { useState } from "react";

interface Step4Props {
  resumeData: any;
  planId: string;
}

export default function Step4DownloadResume({ resumeData, planId }: Step4Props) {
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
      
      console.log("✅ Resume downloaded!");
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="text-center max-w-4xl mx-auto py-20 px-4">
      {/* Success Animation */}
      <div className="mx-auto mb-12 w-32 h-32 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl flex items-center justify-center shadow-2xl ring-4 ring-emerald-200/50">
        <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>

      <h1 className="mb-8 text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 bg-clip-text text-transparent">
        Perfect!
      </h1>

      <p className="mb-16 text-2xl font-semibold text-gray-700 dark:text-gray-200 max-w-2xl mx-auto leading-relaxed">
        Your subscription is active. Download your ATS-optimized resume instantly and get hired faster! 🚀
      </p>

      {/* Resume Preview Card */}
      <div className="max-w-2xl mx-auto mb-12 p-8 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">📄</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {resumeData?.formData?.fullName || "Your Resume"}
          </h3>
          <p className="text-xl text-emerald-600 dark:text-emerald-400 font-semibold">
            Ready to Download • ATS Optimized
          </p>
        </div>
      </div>

      {/* Download Button */}
      <PrimaryButton
        onClick={handleDownload}
        disabled={downloading}
        className="w-full max-w-md mx-auto bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-6 text-2xl font-black shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-200 px-12"
      >
        {downloading ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3 inline-block"></div>
            Preparing PDF...
          </>
        ) : (
          <>
            <DownloadIcon className="h-6 w-6 mr-3 inline" />
            Download Resume PDF
          </>
        )}
      </PrimaryButton>

      {/* Subscription Info */}
      <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-500/10 dark:to-green-500/10 border-2 border-emerald-200/50 dark:border-emerald-400/30 max-w-2xl mx-auto">
        <h4 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4 text-center">
          🎉 Subscription Active
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4">
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">Unlimited</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Resumes</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">500+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Templates</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
          </div>
        </div>
      </div>

      <p className="mt-12 text-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">
        Need more resumes? Create unlimited versions anytime from your dashboard.
      </p>
    </div>
  );
}
