'use client';
import React from 'react';
import { ResumeShape } from '@/types/resumeTemplate';
import { sectionCard } from '../inputs/InputBase';
import TextInput from '../inputs/TextInput';
import SkillLevelSelector from '../inputs/SkillLevelSelector';
import { LuPlus } from 'react-icons/lu';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function SkillsStep({
  data,
  setData,
}: {
  data: ResumeShape;
  setData: (patch: ResumeShape | Partial<ResumeShape>) => void;
}) {
  const add = () =>
    setData({
      skills: [...data.skills, { name: '', level: 0 }],
    });

  // 🔁 CHANGED: prev → direct data usage
  const remove = (i: number) =>
    setData({
      skills: data.skills.filter((_, idx) => idx !== i),
    });

  // 🔁 CHANGED: prev-based updater → pure patch using current data
  const patchName = (i: number, name: string) => {
    const next = [...data.skills];
    next[i] = { ...next[i], name };
    setData({ skills: next });
  };

  // 🔁 CHANGED: prev-based updater → pure patch using current data
  const patchLevel = (i: number, level: number) => {
    const next = [...data.skills];
    next[i] = { ...next[i], level };
    setData({ skills: next });
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-dark dark:text-gray-200">Skills</h3>

      {data.skills.map((s, i) => (
        <div key={i} className={sectionCard}>
          <div className="flex justify-end">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-full px-2 py-2 font-semibold text-red-600 transition-all hover:text-white duration-500 bg-red-100 hover:bg-red-500 dark:bg-red-600/20 dark:hover:bg-red-500"
              onClick={() => remove(i)}
            >
              <RiDeleteBin6Line />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pb-5">
            <div>
              <label className="block pb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                Skill Name <span className="text-red-500">*</span>
              </label>
              <TextInput
                placeholder="Skill Name"
                value={s.name}
                onChange={(v) => patchName(i, v)}
              />
            </div>

            <SkillLevelSelector
              value={s.level}
              onChange={(lvl) => patchLevel(i, lvl)}
            />
          </div>
        </div>
      ))}

      <button
        className="flex items-center gap-3 rounded bg-gradient-to-r from-amber-500 to-orange-500 px-4 sm:px-6 py-2 font-bold text-white shadow-lg transition-all hover:scale-105"
        onClick={add}
      >
        <LuPlus size={20} />
        <span className="flex">
          Add <span className="hidden pl-1 sm:block">Skill</span>
        </span>
      </button>
    </div>
  );
}
