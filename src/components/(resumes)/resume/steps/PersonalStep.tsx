"use client";
import TextInput from "../inputs/TextInput";
import TextArea from "../inputs/TextArea";
import React from "react";
import { ResumeShape } from "@/types/resumeTemplate";

export default function PersonalStep({
  data,
  setData,
}: {
  data: ResumeShape;
  // 🔁 CHANGED TYPE
  setData: (patch: ResumeShape | Partial<ResumeShape>) => void;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg text-dark dark:text-gray-200 font-semibold">Personal Information</h3>

      <TextInput
        label="Full Name"
        required
        placeholder="John Doe"
        value={data.personal.fullName}
        // 🔁 CHANGED HANDLER
        onChange={(v) =>
          setData({
            personal: {
              ...data.personal,
              fullName: v,
            },
          })
        }
      />
      {!data.personal.fullName && (
        <div className="text-sm text-red-600">Full Name is required</div>
      )}

      <TextInput
        label="Designation"
        required
        placeholder="Frontend Developer"
        value={data.personal.designation}
        onChange={(v) =>
          setData({
            personal: {
              ...data.personal,
              designation: v,
            },
          })
        }
      />
      {!data.personal.designation && (
        <div className="text-sm text-red-600">Designation is required</div>
      )}

      <TextArea
        label="Summary"
        required
        rows={3}
        placeholder="Brief professional summary..."
        value={data.personal.summary}
        onChange={(v) =>
          setData({
            personal: {
              ...data.personal,
              summary: v,
            },
          })
        }
      />
      {!data.personal.summary && (
        <div className="text-sm text-red-600">Summary is required</div>
      )}
    </div>
  );
}
