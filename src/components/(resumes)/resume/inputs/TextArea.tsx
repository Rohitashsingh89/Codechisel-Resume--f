'use client';
import React from 'react';
import { inputBase } from './InputBase';

type Props = {
  rows?: number;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  label?: string;
  required?: boolean;
};

function TextAreaImpl({ rows = 3, placeholder, value, onChange, label, required }: Props) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label} {required ? <span className="text-red-500">*</span> : null}
        </label>
      )}
      <textarea
        rows={rows}
        className={inputBase}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

const TextArea = React.memo(TextAreaImpl);
export default TextArea;
