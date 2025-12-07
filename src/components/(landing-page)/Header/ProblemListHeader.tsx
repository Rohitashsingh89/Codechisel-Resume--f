"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { IoIosMenu, IoMdArrowBack } from "react-icons/io";

type ProblemListHeaderProps = {
  total: number;
  onSidebarToggle: () => void;
};

export default function ProblemListHeader({
  total,
  onSidebarToggle,
}: ProblemListHeaderProps) {
  const router = useRouter();

  // Minimal theme toggler that mirrors the original behavior (no visual change)
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggleTheme = useCallback(() => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDark(el.classList.contains("dark"));
  }, []);

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-gray-100 px-4 py-3 backdrop-blur-lg dark:border-gray-700 dark:bg-gray-800/80">
      <div className="flex w-full flex-nowrap items-center justify-between">
        <div className="flex min-w-0 items-center space-x-2">
          <button
            onClick={onSidebarToggle}
            className="my-auto block md:hidden cursor-pointer rounded-md text-xs font-medium whitespace-nowrap text-gray-800 transition-colors dark:text-white"
          >
            <IoIosMenu className="h-6 w-6" />
          </button>
          <h1 className="truncate text-base font-bold text-gray-900 sm:text-lg md:text-lg lg:text-lg dark:text-white">
            <span className="inline md:hidden">{total} Problems</span>
            <span className="hidden md:inline">{total} Problems Sheet</span>
          </h1>
        </div>
        <div className="flex flex-nowrap items-center space-x-2">
          <span className="hidden rounded-md bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 text-xs font-medium whitespace-nowrap text-white">
            {total} Problems
          </span>
          <button
            onClick={() => router.back()}
            className="cursor-pointer rounded-md bg-gray-200 px-4 py-1.5 text-xs font-medium whitespace-nowrap text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-800" title="Go Back"
          >
            <span className="inline md:hidden"><IoMdArrowBack className="w-4 h-4" /></span>
            <span className="hidden md:inline">Go Back</span>
          </button>
          <div className="flex h-5 w-5 items-center justify-center dark:h-5 dark:w-5">
            <button
              aria-label="theme toggler"
              onClick={toggleTheme}
              className="bg-gray-2 dark:bg-dark-bg flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-black md:h-14 md:w-14 dark:text-white"
            >
              {isDark ? (
                <FiSun className="h-5 w-5 md:h-6 md:w-6" />
              ) : (
                <FiMoon className="h-5 w-5 md:h-6 md:w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
