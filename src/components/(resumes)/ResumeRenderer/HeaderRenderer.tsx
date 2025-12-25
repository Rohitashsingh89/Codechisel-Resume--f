"use client";

import { HeaderConfig, ResumeShape } from "@/types/resumeTemplate";
import Image from "next/image";

type Props = {
  data: ResumeShape;
  header?: any;
};

export default function HeaderRenderer({ data, header }: Props) {
  if (!header) return null;

  const {
    showProfileImage = false,
    alignment = "left",
    nameSize = 28,
    roleSize = 14,
    spacingBelow = 16,
    showDividerBelow = false,
    textColor,
    style,
    height,
  } = header as HeaderConfig & {
    style?: string;
    height?: number;
    textColor?: string;
  };

  // Tailwind alignment mapping
  const alignmentClass =
    alignment === "center"
      ? "text-center justify-center"
      : alignment === "right"
        ? "text-right justify-end"
        : "text-left justify-start";

  const nameColor = textColor || "#111827";

  const isOverlay = style === "overlay";

  return (
    <header
      className={`mb-4`}
      style={isOverlay && height ? { minHeight: height } : undefined}
    >
      <div
        className={`flex flex-wrap items-center gap-4 ${alignmentClass} mb-${spacingBelow}`}
      >
        {showProfileImage && data.personal.image && (
          <Image
            src={data.personal.image}
            alt="Profile"
            width={112}
            height={112}
            className="rounded-full object-cover sm:h-24 sm:w-24 md:h-28 md:w-28"
            priority
          />
        )}

        <div className={alignmentClass}>
          <h1
            className={`font-bold text-[${nameSize}px] sm:text-[${nameSize * 1.1}px] md:text-[${nameSize * 1}px] leading-tight text-gray-900 dark:text-gray-200`}
          >
            {data.personal.fullName}
          </h1>
          <p className="text-[14px] text-gray-600 sm:text-[15px] md:text-[16px] dark:text-gray-300">
            {data.personal.designation}
          </p>
        </div>
      </div>

      {showDividerBelow && (
        <hr className="mt-2 border-gray-200 dark:border-gray-800" />
      )}
    </header>
  );
}
