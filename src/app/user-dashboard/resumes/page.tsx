"use client";

import DashboardLayout from "@/components/(user-dashboard)/layout/DashboardLayout";
import DiagonalDivider from "@/components/(user-dashboard)/components/DiagonalDivider";
import { useState } from "react";
import TipTapEditorMinimal from "@/components/(editors)/RichTextEditor/TipTapEditorMinimal";
import PrimaryButton from "@/components/Common/ui/PrimaryButton";
import { FaFile } from "react-icons/fa";
import { FileChartColumn } from "lucide-react";

export default function ResumesPage() {
  const [resumeHtml, setResumeHtml] = useState("");
  const [resumeJson, setResumeJson] = useState(null);

  const handleResumeChange = (html: string, json: any) => {
    setResumeHtml(html);
    setResumeJson(json);
    // Save to your MongoDB via API route
  };

  const [post, setPost] = useState("");

  const onChange = (content: string) => {
    setPost(content);
  };

  const initialTemplate = `
    <h2>Professional Summary</h2>
    <p>Full-stack developer with expertise in MERN stack, Next.js, and Tailwind CSS.</p>
    
    <h2>Experience</h2>
    <ul>
      <li>Software Engineer at XYZ Corp (2023-Present)</li>
    </ul>
  `;

  return (
    <>
      <DashboardLayout>
        {/* Header Section */}
        <div className="mx-auto max-w-6xl">
          <div className="rounded-xl border border-gray-300 backdrop-blur-sm dark:border-gray-800">
            <div className="relative rounded-xl bg-white p-6 dark:bg-gray-900">
              <div className="bg-primary dark:bg-primary/80 absolute top-8 left-0 h-10 w-[4px] -translate-x-1/2 rounded-full" />
              <div className="flex items-center gap-4">
                <FileChartColumn className="xs:mb-0 text-primary dark:text-primary/80 mb-1 h-10 w-10" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    Resumes
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Track all your resume download activities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Content Section */}
        <div className="mx-auto mt-10 mb-10 max-w-6xl">
          <div className="rounded-xl border border-gray-300 backdrop-blur-sm dark:border-gray-800">
            <div className="relative rounded-xl bg-white p-6 dark:bg-gray-900">
              <p className="text-slate-700 dark:text-gray-300">
                Welcome to the Resumes page.
              </p>

              <h1 className="mt-2 mb-4 text-3xl font-bold text-gray-800 sm:mb-8 dark:text-gray-100">
                Resume Builder
              </h1>

              <TipTapEditorMinimal content={post} onChange={onChange} />

              <div className="mt-6 rounded-lg border border-gray-300 bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-900">
                <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
                  Preview HTML Length:
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {resumeHtml.length} characters
                </p>
                <PrimaryButton
                  className="mt-4"
                  onClick={() => {
                    // Save to API or download as PDF
                    console.log("Save resume:", {
                      html: resumeHtml,
                      json: resumeJson,
                    });
                  }}
                >
                  Save Resume
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
