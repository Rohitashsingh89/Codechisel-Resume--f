"use client";

import { apiFetchRaw } from "@/lib/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "./reduxHooks";

export const useDownload = () => {
  const [downloading, setDownloading] = useState<
    "pdf" | "docx" | "image" | null
  >(null);
  const { accessToken } = useAppSelector((state) => state.auth);

  const downloadResume = async ({
    resumeId,
    resumeName = "resume",
    downloadType,
  }: any) => {
    setDownloading(downloadType);

    try {
      const formData = new FormData();
      formData.append("downloadType", downloadType);

      const blob = await apiFetchRaw(`/v1/resumes/${resumeId}/download`, {
        method: "POST",
        body: formData,
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Download success
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${resumeName}.${downloadType}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(`${downloadType.toUpperCase()} downloaded successfully!`);
    } catch (err: any) {
      // ✅ Single unified error handler - works everywhere
      if (err.code === "DOWNLOAD_LIMIT_REACHED" && err.data) {
        toast.error(
          `Free download limit reached! Used: ${err.data.used}/${err.data.limit}. Please upgrade your plan.`,
          { duration: 6000 },
        );
      } else if (err.code === "NETWORK_ERROR") {
        toast.error(
          "Network error. Please check your connection and try again.",
        );
      } else {
        toast.error(err.message || "Download failed");
      }
    } finally {
      setDownloading(null);
    }
  };

  return { downloadResume, downloading };
};
