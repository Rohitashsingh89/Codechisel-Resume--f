'use client';
import React from 'react';
import { ResumeShape } from '@/types/resumeTemplate';
import { sectionCard } from '../inputs/InputBase';
import TextInput from '../inputs/TextInput';
import DateInput from '../inputs/DateInput';
import { LuPlus } from 'react-icons/lu';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function EducationStep({
  data,
  setData,
}: {
  data: ResumeShape;
  setData: (patch: ResumeShape | Partial<ResumeShape>) => void;
}) {
  const add = () =>
    setData({
      education: [
        ...data.education,
        { degree: '', institution: '', start: '', end: '' },
      ],
    });

  // 🔁 CHANGED: prev → data
  const remove = (i: number) =>
    setData({
      education: data.education.filter((_, idx) => idx !== i),
    });

  // 🔁 CHANGED: prev-based updater → pure patch using current data
  const patch = (
    i: number,
    key: 'degree' | 'institution' | 'start' | 'end',
    val: string,
  ) => {
    const next = [...data.education];
    next[i] = { ...next[i], [key]: val };
    setData({ education: next });
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-dark dark:text-gray-200">Education</h3>

      {data.education.map((ed, i) => (
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

          <TextInput
            placeholder="Degree"
            value={ed.degree}
            onChange={(v) => patch(i, 'degree', v)}
          />
          <TextInput
            placeholder="Institution"
            value={ed.institution}
            onChange={(v) => patch(i, 'institution', v)}
          />

          <div className="grid grid-cols-2 gap-2">
            <DateInput
              placeholder="Start Date"
              value={ed.start}
              onChange={(v) => patch(i, 'start', v)}
            />
            <DateInput
              placeholder="End Date"
              value={ed.end}
              onChange={(v) => patch(i, 'end', v)}
            />
          </div>
        </div>
      ))}

      <button
        className="flex items-center gap-3 rounded bg-gradient-to-r from-indigo-500 to-purple-500 px-4 sm:px-6 py-2 font-bold text-white shadow-lg transition-all hover:scale-105"
        onClick={add}
      >
        <LuPlus size={20} />
        <span className="flex">
          Add <span className="hidden pl-1 sm:block">Education</span>
        </span>
      </button>
    </div>
  );
}
