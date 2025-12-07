"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useThemeRegistry } from "@/hook/useThemeRegistry";
import { useAppDispatch } from "@/hook/reduxHooks";
import { createResume } from "@/features/resumes/resumesSlice";
import toast from "react-hot-toast";

export default function CreateResumeModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [templateType, setTemplateType] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { templates, loading } = useThemeRegistry();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const create = async () => {
    if (!title.trim()) {
      setError("Please enter resume title");
      return;
    }
    if (!templateType) {
      setError("Please select a template");
      return;
    }

    setError(null);

    try {
      // Redux thunk ko dispatch, aur id unwrap karo
      const newId = await dispatch(
        createResume({
          resumeName: title.trim(),
          templateType,
          resumeData: {
            personal: { fullName: "", designation: "", summary: "" },
            contact: {
              address: "",
              email: "",
              phone: "",
              linkedin: "",
              github: "",
              website: "",
            },
            experience: [],
            education: [],
            skills: [],
            projects: [],
            certifications: [],
            additional: { languages: [], interests: [] },
            order: [
              "personal",
              "contact",
              "experience",
              "education",
              "skills",
              "projects",
              "certifications",
              "additional",
            ],
          },
        })
      ).unwrap();

      if (newId) {
        toast.success("Resume created successfully 🎉");
        router.push(`/resume?id=${newId}`);
      }

      await onCreated();
      onClose();
      setTitle("");
      setTemplateType("");
    } catch (e) {
      console.error("Failed to create resume", e);
      setError("Failed to create resume. Please try again.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 dark:bg-black/60">
      <div className="w-full max-w-lg space-y-4 rounded bg-white p-5 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Create New Resume</h3>
          <button onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Give your resume a title to get started. You can customize
            everything later.
          </p>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Resume Title</label>
          <input
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="e.g., Sarthak - Frontend Engineer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Template Select */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Template</label>
          <select
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            value={templateType}
            onChange={(e) => setTemplateType(e.target.value)}
          >
            <option value="">
              {loading ? "Loading templates..." : "Select a theme..."}
            </option>
            {!loading &&
              templates?.length > 0 &&
              templates.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name || t.slug}
                </option>
              ))}
          </select>
        </div>

        {/* Error */}
        {error && (
          <div className="text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button className="px-3 py-2" onClick={onClose}>
            Cancel
          </button>
          <button
            className="dark:bg-primary rounded bg-black px-3 py-2 text-white md:px-6 dark:text-white"
            onClick={create}
          >
            Create Resume
          </button>
        </div>
      </div>
    </div>
  );
}
