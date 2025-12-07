"use client";
import React from "react";
import { ResumeShape } from "@/types/resumeTemplate";
import { sectionCard } from "../inputs/InputBase";
import TextInput from "../inputs/TextInput";
import TextArea from "../inputs/TextArea";
import LinkInput from "../inputs/LinkInput";
import { LuPlus } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function ProjectsStep({
  data,
  setData,
}: {
  data: ResumeShape;
  setData: (patch: ResumeShape | Partial<ResumeShape>) => void;
}) {
  const add = () =>
    setData({
      projects: [
        ...data.projects,
        { title: "", description: "", github: "", live: "" },
      ],
    });

  // 🔁 CHANGED: prev-based updater → direct patch using current data
  const remove = (i: number) =>
    setData({
      projects: data.projects.filter((_, idx) => idx !== i),
    });

  // 🔁 CHANGED: prev-based updater → direct patch using current data
  const patch = (
    i: number,
    key: "title" | "description" | "github" | "live",
    val: string,
  ) => {
    const next = [...data.projects];
    next[i] = { ...next[i], [key]: val };
    setData({ projects: next });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-dark font-semibold dark:text-gray-200">Projects</h3>

      {data.projects.map((p, i) => (
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
            placeholder="Project Title"
            value={p.title}
            onChange={(v) => patch(i, "title", v)}
          />
          <TextArea
            placeholder="Description"
            value={p.description}
            onChange={(v) => patch(i, "description", v)}
          />
          <LinkInput
            placeholder="GitHub Link"
            value={p.github}
            onChange={(v) => patch(i, "github", v)}
          />
          <LinkInput
            placeholder="Live Demo URL"
            value={p.live}
            onChange={(v) => patch(i, "live", v)}
          />
        </div>
      ))}

      <button
        className="flex items-center gap-3 rounded bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 font-bold text-white shadow-lg transition-all hover:scale-105"
        onClick={add}
      >
        <LuPlus size={20} />
        <span className="flex">
          Add <span className="hidden pl-1 sm:block">Project</span>
        </span>
      </button>
    </div>
  );
}
