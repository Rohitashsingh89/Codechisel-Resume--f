'use client';
import React from 'react';
import { inputBase } from './InputBase';

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
};

function TextInputImpl({ placeholder, value, onChange, label, required }: Props) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-dark mb-3 block text-sm font-medium dark:text-white">
          {label} {required ? <span className="text-red-500">*</span> : null}
        </label>
      )}
      <input
        className={inputBase}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

const TextInput = React.memo(TextInputImpl);
export default TextInput;
