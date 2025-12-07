"use client";
import { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick: () => void;
  isDark: boolean;
  className?: string;
}

export function SecondaryButton({ children, onClick, isDark, className = "" }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white py-6 px-12 rounded-3xl font-black text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 overflow-hidden ${
        isDark ? 'ring-4 ring-blue-500/30' : 'ring-4 ring-blue-200/50'
      } ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 transform -rotate-3 group-hover:animate-shimmer duration-1000" />
    </button>
  );
}
