'use client';
import React from 'react';
import { inputBase } from './InputBase';

type Props = {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
};

const LinkInput = ({ placeholder, value, onChange }: Props) => (
  <input
    className={inputBase}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default React.memo(LinkInput);
