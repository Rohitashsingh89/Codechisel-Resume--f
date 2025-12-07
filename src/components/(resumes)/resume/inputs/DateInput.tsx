"use client";

import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

const DateInput = ({ value, onChange, placeholder }: Props) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <>
      {/* Tailwind CSS for Flatpickr Calendar Override */}
      <style jsx global>{`
        /* Light Mode Calendar - White BG */
        .flatpickr-calendar {
          background: white !important;
          border: 1px solid #e5e7eb !important;
          box-shadow:
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
          border-radius: 0.75rem !important;
          width: 313.875px !important;
        }
        .flatpickr-calendar:before {
          color: #fff !important;
        }
        .flatpickr-calendar:after {
          color: #fff !important;
        }
        .dark .flatpickr-calendar:before {
          color: #fff !important;
        }
        .dark .flatpickr-calendar:after {
          color: #fff !important;
        }

        .flatpickr-months {
          background: white !important;
          border-radius: 0.75rem 0.75rem 0 0 !important;
        }

        .flatpickr-month {
          color: #111827 !important;
          background: linear-gradient(
            135deg,
            #f8fafc 0%,
            white 100%
          ) !important;
        }

        .flatpickr-weekdays {
          background: #f9fafb !important;
          color: #000 !important;
        }

        .flatpickr-weekday {
          background: #f9fafb !important;
          color: #000 !important;
        }

        .flatpickr-day {
          color: #374151 !important;
          border-radius: 1.5rem !important;
          transition: all 0.2s ease !important;
        }

        /* Weekdays */
        .flatpickr-weekdays,
        .flatpickr-weekday {
          background: #f9fafb !important;
          color: #000 !important;
        }

        /* Month Header */
        .flatpickr-months,
        .flatpickr-month,
        .flatpickr-current-month {
          background: #f9fafb !important;
          color: #000 !important;
          padding: 0px !important;
        }

        /* Month Dropdown */
        .flatpickr-monthDropdown-months {
          background: transparent !important;
          color: #000 !important;
        }

        /* Year Input */
        .numInputWrapper input {
          background: #fff !important;
          color: #000 !important;
        }

        /* Prev/Next Arrow Icons */
        .flatpickr-prev-month svg path,
        .flatpickr-next-month svg path {
          fill: #000 !important;
        }

        .flatpickr-prev-month:hover svg path,
        .flatpickr-next-month:hover svg path {
          fill: var(--color-primary) !important;
        }

        .flatpickr-day:hover {
          background: var(--color-primary) !important;
          border-color: var(--color-primary) !important;
          color: #fff !important;
        }

        .flatpickr-day.selected,
        .flatpickr-day.selected:hover {
          background: var(--color-primary) !important;
          color: white !important;
          // box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4) !important;
          font-weight: 600 !important;
          border-color: var(--color-primary) !important;
        }

        .dark .flatpickr-day.selected,
        .dark .flatpickr-day.selected:hover {
          background: var(--color-primary) !important;
          color: #fff !important;
          // box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4) !important;
          font-weight: 600 !important;
          border-color: var(--color-primary) !important;
        }

        .flatpickr-day.today {
          border: 1px solid var(--color-primary) !important;
          border-color: var(--color-primary) !important;
          color: #000 !important;
          font-weight: 600 !important;
        }

        .dark .flatpickr-day.today {
          border: 1px solid var(--color-primary) !important;
          border-color: var(--color-primary) !important;
          color: #fff !important;
          font-weight: 600 !important;
        }

        .flatpickr-day.disabled,
        .flatpickr-day.disabled:hover {
          color: #d1d5db !important;
          background: transparent !important;
        }

        .prevMonthDay {
          color: #d0d0d0 !important;
        }

        .nextMonthDay {
          color: #d0d0d0 !important;
        }

        /* YEAR INPUT ARROWS – LIGHT */
        .numInputWrapper .arrowUp:after {
          border-bottom-color: #000 !important; /* Up arrow color */
        }

        .numInputWrapper .arrowDown:after {
          border-top-color: #000 !important; /* Down arrow color */
        }

        /* Optional: background */
        .numInputWrapper span {
          background: transparent !important;
        }

        /* Month Dropdown Modern Design */
        .flatpickr-monthDropdown-months {
          background: transparent !important;
          border-radius: 0.5rem !important;
          padding: 0.4rem !important;
          margin-right: 10px !important;
          // box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
        }

        .flatpickr-monthDropdown-month {
          padding: 0.5rem 1rem !important;
          border-radius: 0.375rem !important;
          font-weight: 500 !important;
          color: #374151 !important;
          transition: all 0.2s ease !important;
        }

        .flatpickr-monthDropdown-month:hover {
          background: #dbeafe !important;
          color: #1e40af !important;
          transform: translateX(4px) !important;
        }

        /* Dark Mode */
        .dark .flatpickr-calendar {
          background: #1f2937 !important;
          border-color: #374151 !important;
          color: #f9fafb !important;
        }

        .dark .flatpickr-weekdays,
        .dark .flatpickr-weekday {
          background: #1f2937 !important;
          color: #fff !important;
        }

        .dark .flatpickr-months,
        .dark .flatpickr-current-month {
          background: #1f2937 !important;
          color: #fff !important;
        }

        .dark .flatpickr-month {
          background: transparent !important;
          color: #fff !important;
        }

        .dark .flatpickr-monthDropdown-months {
          background: #111827 !important;
          color: #fff !important;
        }

        /* YEAR INPUT ARROWS – DARK */
        .dark .numInputWrapper .arrowUp:after {
          border-bottom-color: #fff !important;
        }

        .dark .numInputWrapper .arrowDown:after {
          border-top-color: #fff !important;
        }

        /* Optional: background */
        .dark .numInputWrapper span {
          background: #374151 !important;
        }

        .dark .numInputWrapper input {
          background: transparent !important;
          color: #fff !important;
        }

        .dark .flatpickr-prev-month svg path,
        .dark .flatpickr-next-month svg path {
          fill: #fff !important;
        }

        /* Prevent svg from blocking hover/click */
        .flatpickr-prev-month svg,
        .flatpickr-next-month svg {
          pointer-events: none !important;
        }

        /* Default icon color (dark) */
        .dark .flatpickr-prev-month svg path,
        .dark .flatpickr-next-month svg path {
          fill: #fff !important;
        }

        /* Hover color applied to the button */
        .dark .flatpickr-prev-month:hover svg path,
        .dark .flatpickr-next-month:hover svg path {
          fill: var(--color-primary) !important;
        }

        .dark .flatpickr-month {
          background: transparent !important;
          color: #f9fafb !important;
        }

        .dark .flatpickr-prev-month {
          background: transparent !important;
          color: #fff !important;
        }

        .dark .flatpickr-weekdays {
          background: #1f2937 !important;
          color: #fff !important;
        }
        .dark .flatpickr-weekday {
          background: #1f2937 !important;
          color: #fff !important;
        }

        .dark .flatpickr-day {
          color: #d1d5db !important;
        }

        .dark .prevMonthDay {
          color: #545557 !important;
        }

        .dark .nextMonthDay {
          color: #545557 !important;
        }

        .dark .flatpickr-day:hover {
          background: var(--color-primary) !important;
          border-color: var(--color-primary) !important;
          color: #fff !important;
        }

        .dark .flatpickr-monthDropdown-months {
          background: #1f2937 !important;
          border-color: #374151 !important;
        }

        .dark .flatpickr-monthDropdown-month {
          color: #d1d5db !important;
        }

        .dark .flatpickr-monthDropdown-month:hover {
          background: #1e40af !important;
          color: white !important;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .flatpickr-calendar {
            left: 0 !important;
            right: 0 !important;
            margin: 0 auto !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      <Flatpickr
        value={value}
        onChange={([date]) => {
          const formatted =
            date instanceof Date ? date.toLocaleDateString("en-CA") : "";
          onChange(formatted);
        }}
        options={{
          altInput: true,
          altFormat: "F j, Y",
          dateFormat: "Y-m-d",
          disableMobile: true,
          monthSelectorType: "dropdown",
          showMonths: 1,
          inline: false,
        }}
        placeholder={placeholder}
        className={`${
          isDark
            ? "border-gray-300 bg-transparent text-gray-900 dark:border-gray-700 dark:bg-transparent dark:text-gray-200"
            : "border-gray-300 bg-transparent text-gray-900"
        } focus:border-primary dark:focus:border-primary w-full rounded-xs border px-4 py-3 text-base outline-hidden transition-all duration-300 outline-none dark:focus:shadow-none`}
      />
    </>
  );
};

export default React.memo(DateInput);
