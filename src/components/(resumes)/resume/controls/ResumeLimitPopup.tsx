"use client";

import { useEffect, useRef } from "react";
import { X, Check } from "lucide-react";
import Image from "next/image";

interface ResumeLimitPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  onSkip: () => void;
}

export default function ResumeLimitPopup({
  isOpen,
  onClose,
  onUpgrade,
  onSkip,
}: ResumeLimitPopupProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (overlayRef.current && e.target === overlayRef.current) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-xl shadow-2xl border border-gray-200 dark:border-gray-700">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute z-[50] top-4 right-4 p-2 bg-white/80 dark:bg-gray-800 rounded-full shadow hover:bg-white transition"
        >
          <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Top Image */}
        <div className="w-full h-60 relative overflow-hidden rounded-t-2xl">
          <Image
            src="/images/limit/limitover.jpg"
            alt="Popup image"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            You are over the resume limit
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Only three resumes are available on the free plan. Upgrade your plan
            to create an unlimited number of resumes.
          </p>

          {/* List Section (Full Box Section) */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl space-y-3 mb-6 border border-gray-200 dark:border-gray-700">

            {[
              "Access to all templates",
              "Unlimited resume downloads",
              "Unlimited cover letters",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {text}
                </span>
              </div>
            ))}

          </div>

          {/* Buttons Right-Aligned */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onSkip}
              className="ease-in-up shadow-btn hover:shadow-btn-hover border border-primary hover:border-primary/90 hidden rounded-xs px-8 py-3 text-base font-medium text-gray-800 dark:text-white transition duration-300 md:block md:px-9 lg:px-6 xl:px-9"
            >
              Skip
            </button>

            <button
              onClick={onUpgrade}
              className="ease-in-up shadow-btn hover:shadow-btn-hover bg-primary hover:bg-primary/90 hidden rounded-xs px-8 py-3 text-base font-medium text-white transition duration-300 md:block md:px-9 lg:px-6 xl:px-9"
            >
              Upgrade Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
