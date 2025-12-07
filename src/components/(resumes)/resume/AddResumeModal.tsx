"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hook/reduxHooks";
import { createResume } from "@/features/resumes/resumesSlice";

export default function AddResumeModal() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [templateType, setTemplateType] = useState<"classic" | "minimal">(
    "classic"
  );
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!resumeName.trim()) return;

    try {
      setCreating(true);

      // thunk ko dispatch karo, aur unwrap se return value lo (id)
      const id = await dispatch(
        createResume({
          resumeName,
          templateType,
          resumeData: {
            name: "",
            email: "",
            phone: "",
            summary: "",
            experience: [],
            education: [],
            skills: [],
          },
        })
      ).unwrap();

      setOpen(false);
      setResumeName("");
      setTemplateType("classic");
      router.push(`/builder?id=${id}`);
    } catch (err) {
      console.error("Failed to create resume", err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <button
        className="bg-black text-white px-3 py-1 rounded"
        onClick={() => setOpen(true)}
      >
        Add Resume
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded p-4 w-full max-w-md space-y-3">
            <h3 className="font-semibold">New Resume</h3>

            <input
              className="w-full border rounded px-2 py-1"
              placeholder="Resume name"
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
            />

            <div>
              <label className="text-sm">Template</label>
              <select
                className="border rounded px-2 py-1 ml-2"
                value={templateType}
                onChange={(e) =>
                  setTemplateType(e.target.value as "classic" | "minimal")
                }
              >
                <option value="classic">Classic</option>
                <option value="minimal">Minimal</option>
              </select>
            </div>

            <div className="flex gap-2 justify-end">
              <button className="px-3 py-1" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button
                className="bg-black text-white px-3 py-1 rounded"
                onClick={handleCreate}
                disabled={!resumeName.trim() || creating}
              >
                {creating ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
