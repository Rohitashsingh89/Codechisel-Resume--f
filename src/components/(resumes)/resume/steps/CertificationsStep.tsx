"use client";
import React from "react";
import { ResumeShape } from "@/types/resumeTemplate";
import { sectionCard } from "../inputs/InputBase";
import TextInput from "../inputs/TextInput";
import { LuPlus } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CertificationsStep({
  data,
  setData,
}: {
  data: ResumeShape;
  setData: (patch: ResumeShape | Partial<ResumeShape>) => void;
}) {
  const add = () =>
    setData({
      certifications: [
        ...data.certifications,
        { title: "", issuer: "", year: "" },
      ],
    });

  // 🔁 CHANGED: prev-based updater → direct patch using current data
  const remove = (i: number) =>
    setData({
      certifications: data.certifications.filter((_, idx) => idx !== i),
    });

  // 🔁 CHANGED: prev-based updater → direct patch using current data
  const patch = (i: number, key: "title" | "issuer" | "year", val: string) => {
    const next = [...data.certifications];
    next[i] = { ...next[i], [key]: val };
    setData({ certifications: next });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-dark font-semibold dark:text-gray-200">
        Certifications
      </h3>

      {data.certifications.map((c, i) => (
        <div key={i} className={sectionCard}>
          {/* Delete Button */}
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              className="flex px-2 py-2 items-center justify-center rounded-full bg-red-100 text-red-600 transition-all duration-300 hover:bg-red-500 hover:text-white dark:bg-red-600/20 dark:hover:bg-red-500"
              onClick={() => remove(i)}
            >
              <RiDeleteBin6Line size={18} />
            </button>
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <TextInput
              placeholder="Certificate Title"
              value={c.title}
              onChange={(v) => patch(i, "title", v)}
            />
            <TextInput
              placeholder="Issuer"
              value={c.issuer}
              onChange={(v) => patch(i, "issuer", v)}
            />
            <TextInput
              placeholder="Year"
              value={c.year}
              onChange={(v) => patch(i, "year", v)}
            />
          </div>
        </div>
      ))}

      {/* Add button */}
      <button
        className="flex items-center gap-3 rounded bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 font-bold text-white shadow-lg transition-all hover:scale-105 sm:px-6"
        onClick={add}
      >
        <LuPlus size={20} />
        <span className="flex">
          Add <span className="hidden pl-1 sm:block">Certification</span>
        </span>
      </button>
    </div>
  );
}
