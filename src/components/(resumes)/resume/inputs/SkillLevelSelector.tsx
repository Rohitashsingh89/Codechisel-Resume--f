"use client";
import React from "react";

type Props = {
  value: number; // 0..5
  onChange: (lvl: number) => void;
};

const SkillLevelSelector = ({ value, onChange }: Props) => (
  <div className="flex items-center gap-2">
    <div>
      <label className="block pb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
        Level <span className="text-red-500">*</span>
      </label>
      {[1, 2, 3, 4, 5].map((lvl) => (
        <button
          key={lvl}
          type="button"
          onClick={() => onChange(lvl)}
          className={`mx-1 h-4 w-6 rounded-md border transition-all duration-200 ${
            lvl <= value
              ? "border-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
              : "bg-gray-2 00 border-gray-400 dark:bg-gray-700"
          } hover:scale-105`}
        />
      ))}
    </div>
  </div>
);

export default React.memo(SkillLevelSelector);
