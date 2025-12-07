"use client";
import React from "react";
import { sectionCard } from "../inputs/InputBase";
import TextInput from "../inputs/TextInput";
import TextArea from "../inputs/TextArea";
import DateInput from "../inputs/DateInput";
import { LuPlus } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ResumeShape } from "@/types/resumeTemplate";

export default function ExperienceStep({
  data,
  setData,
}: {
  data: ResumeShape;
  setData: (patch: ResumeShape | Partial<ResumeShape>) => void;
}) {
  const add = () =>
    setData({
      experience: [
        ...data.experience,
        { company: "", role: "", start: "", end: "", description: "" },
      ],
    });

  // 🔁 CHANGED: no prev, use `data` directly
  const remove = (i: number) =>
    setData({
      experience: data.experience.filter((_, idx) => idx !== i),
    });

  // 🔁 CHANGED: prev-based update → pure patch using `data`
  const patch = (
    i: number,
    key: "company" | "role" | "start" | "end" | "description",
    val: string,
  ) => {
    const next = [...data.experience];
    next[i] = { ...next[i], [key]: val };
    setData({ experience: next });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-dark font-semibold dark:text-gray-200">
        Work Experience
      </h3>

      {data.experience.map((e, i) => (
        <div key={i} className={sectionCard}>
          <div className="flex justify-end">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-full bg-red-100 px-2 py-2 font-semibold text-red-600 transition-all duration-500 hover:bg-red-500 hover:text-white dark:bg-red-600/20 dark:hover:bg-red-500"
              onClick={() => remove(i)}
            >
              <RiDeleteBin6Line />
            </button>
          </div>

          <TextInput
            placeholder="Company"
            value={e.company}
            onChange={(v) => patch(i, "company", v)}
          />
          <TextInput
            placeholder="Role"
            value={e.role}
            onChange={(v) => patch(i, "role", v)}
          />

          <div className="grid grid-cols-2 gap-2">
            <DateInput
              placeholder="Start Date"
              value={e.start}
              onChange={(v) => patch(i, "start", v)}
            />
            <DateInput
              placeholder="End Date"
              value={e.end}
              onChange={(v) => patch(i, "end", v)}
            />
          </div>

          <TextArea
            placeholder="Description"
            value={e.description}
            onChange={(v) => patch(i, "description", v)}
          />
        </div>
      ))}

      <button
        className="flex items-center gap-3 rounded bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 font-bold text-white shadow-lg transition-all hover:scale-105 sm:px-6"
        onClick={add}
      >
        <LuPlus size={20} />
        Add Work Experience
      </button>
    </div>
  );
}
