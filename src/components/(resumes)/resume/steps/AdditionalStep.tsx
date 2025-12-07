"use client";
import React from "react";
import { ResumeShape } from "@/types/resumeTemplate";
import { sectionCard } from "../inputs/InputBase";
import TextInput from "../inputs/TextInput";
import { LuPlus } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function AdditionalStep({
  data,
  setData,
}: {
  data: ResumeShape;
  setData: (patch: ResumeShape | Partial<ResumeShape>) => void;
}) {
  const addLanguage = () =>
    setData({
      additional: {
        ...data.additional,
        languages: [
          ...data.additional.languages,
          { language: "", proficiency: "" },
        ],
      },
    });

  // 🔁 CHANGED: prev-based updater → direct patch
  const removeLanguage = (i: number) =>
    setData({
      additional: {
        ...data.additional,
        languages: data.additional.languages.filter((_, idx) => idx !== i),
      },
    });

  // 🔁 CHANGED: prev-based updater → direct patch
  const patchLanguage = (
    i: number,
    key: "language" | "proficiency",
    val: string,
  ) => {
    const next = [...data.additional.languages];
    next[i] = { ...next[i], [key]: val };
    setData({
      additional: {
        ...data.additional,
        languages: next,
      },
    });
  };

  // Interests
  // 🔁 CHANGED: prev-based updater → direct patch
  const addInterest = () =>
    setData({
      additional: {
        ...data.additional,
        interests: [...data.additional.interests, ""],
      },
    });

  // 🔁 CHANGED: prev-based updater → direct patch
  const removeInterest = (i: number) =>
    setData({
      additional: {
        ...data.additional,
        interests: data.additional.interests.filter((_, idx) => idx !== i),
      },
    });

  // 🔁 CHANGED: prev-based updater → direct patch
  const patchInterest = (i: number, val: string) => {
    const next = [...data.additional.interests];
    next[i] = val;
    setData({
      additional: {
        ...data.additional,
        interests: next,
      },
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-dark font-semibold dark:text-gray-200">
        Additional Information
      </h3>

      <div className={sectionCard}>
        <div className="text-dark mb-2 font-medium dark:text-gray-200">
          Languages
        </div>

        {data.additional.languages.map((l, i) => (
          <div
            key={i}
            className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center"
          >
            {/* Language input */}
            <div className="flex-1">
              <TextInput
                placeholder="Language"
                value={l.language}
                onChange={(v) => patchLanguage(i, "language", v)}
              />
            </div>

            {/* Proficiency input */}
            <div className="flex-1">
              <TextInput
                placeholder="Proficiency"
                value={l.proficiency}
                onChange={(v) => patchLanguage(i, "proficiency", v)}
              />
            </div>

            {/* Delete Button */}
            <button
              type="button"
              className="flex p-2 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 transition-all hover:bg-red-500 hover:text-white dark:bg-red-600/20 dark:hover:bg-red-500 duration-300"
              onClick={() => removeLanguage(i)}
            >
              <RiDeleteBin6Line size={18} />
            </button>
          </div>
        ))}

        <button
          className="flex items-center gap-3 rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 sm:px-6 py-2 font-bold text-white shadow-lg transition-all hover:scale-105"
          onClick={addLanguage}
        >
          <LuPlus size={20} />
          <div className="flex">
            Add <span className="hidden pl-0 sm:block sm:pl-1">Language</span>
          </div>
        </button>
      </div>

      <div className={sectionCard}>
        <div className="text-dark mb-2 font-medium dark:text-gray-200">
          Interests
        </div>

        {data.additional.interests.map((it, i) => (
          <div key={i} className="mb-3 flex items-center gap-2">
            {/* Input full width */}
            <div className="flex-1">
              <TextInput
                placeholder="Interest"
                value={it}
                onChange={(v) => patchInterest(i, v)}
              />
            </div>

            {/* Delete button */}
            <button
              type="button"
              className="flex p-2 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 transition-all hover:bg-red-500 hover:text-white dark:bg-red-600/20 dark:hover:bg-red-500"
              onClick={() => removeInterest(i)}
            >
              <RiDeleteBin6Line size={18} />
            </button>
          </div>
        ))}

        <button
          className="mt-1 flex items-center gap-3 rounded bg-gradient-to-r from-orange-500 to-red-500 px-4 sm:px-6 py-2 font-bold text-white shadow-lg transition-all hover:scale-105"
          onClick={addInterest}
        >
          <LuPlus size={20} />
          <div className="flex">
            Add <span className="hidden pl-0 sm:block sm:pl-1">Interest</span>
          </div>
        </button>
      </div>
    </div>
  );
}
