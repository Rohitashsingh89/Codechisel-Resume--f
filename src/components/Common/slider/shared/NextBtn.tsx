import twFocusClass from "@/utils/twFocusClass";
import React, { ButtonHTMLAttributes, FC } from "react";
import { ChevronRight } from "lucide-react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const NextBtn: FC<Props> = ({ className = "w-10 h-10", disabled, ...args }) => {
  return (
    <button
      disabled={disabled}
      className={`NextBtn ${className}
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-700
        rounded-full inline-flex items-center justify-center
        text-neutral-700 dark:text-neutral-200
        hover:bg-neutral-50 dark:hover:bg-neutral-800
        hover:text-neutral-900 dark:hover:text-white
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-colors
        ${twFocusClass()}
      `}
      {...args}
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  );
};

export default NextBtn;
