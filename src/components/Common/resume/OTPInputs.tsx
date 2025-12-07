'use client';
import React, { useEffect, useMemo, useRef } from 'react';

type Props = {
  length?: number;
  value: string;
  onChange: (next: string) => void;
  autoFocusFirst?: boolean;
};

export default function OTPInputs({ length = 6, value, onChange, autoFocusFirst = true }: Props) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const chars = useMemo(() => {
    const arr = value.split('').slice(0, length);
    while (arr.length < length) arr.push('');
    return arr;
  }, [value, length]);

  useEffect(() => {
    if (autoFocusFirst && inputsRef.current[0]) inputsRef.current[0].focus();
  }, [autoFocusFirst]);

  const setChar = (idx: number, ch: string) => {
    const next = [...chars];
    next[idx] = ch;
    onChange(next.join(''));
  };

  const handleChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const ch = raw.slice(-1).trim();
    setChar(idx, ch);
    if (ch && idx < length - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (chars[idx]) {
        setChar(idx, '');
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
        setChar(idx - 1, '');
      }
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
      e.preventDefault();
    } else if (e.key === 'ArrowRight' && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
      e.preventDefault();
    }
  };

  const handlePaste = (idx: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text').replace(/\s+/g, '');
    if (!text) return;
    const next = [...chars];
    for (let i = 0; i < text.length && idx + i < length; i++) {
      next[idx + i] = text[i];
    }
    onChange(next.join(''));
    const last = Math.min(idx + text.length, length - 1);
    inputsRef.current[last]?.focus();
    e.preventDefault();
  };

  return (
    <div className="flex gap-2">
      {chars.map((c, i) => (
        <input
          key={i}
          ref={el => { inputsRef.current[i] = el; }}
          inputMode="text"
          maxLength={1}
          value={c}
          onChange={e => handleChange(i, e)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={e => handlePaste(i, e)}
          className="h-12 w-10 rounded border text-center"
          aria-label={`Code digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
