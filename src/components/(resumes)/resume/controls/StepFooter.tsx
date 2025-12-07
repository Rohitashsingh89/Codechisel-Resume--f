"use client";
import React from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";

type Props = {
  canGoBack: boolean;
  canProceed: boolean;
  isLast: boolean;
  onBack: () => void;
  onNext: () => void;
  onSaveExit: () => void;
  onPreview: () => void;
};

const StepFooter = ({
  canGoBack,
  canProceed,
  isLast,
  onBack,
  onNext,
  onSaveExit,
  onPreview,
}: Props) => (
  <div className="mt-4 flex flex-wrap gap-2">
    <button
      className="flex items-center gap-2 rounded bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700 transition-all hover:bg-gray-200 sm:px-6 sm:py-3"
      onClick={onBack}
      disabled={!canGoBack}
    >
      <IoMdArrowBack size={20} />
      Back
    </button>

    {!isLast ? (
      <>
        <button
          className="flex items-center gap-2 rounded bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 transition-all hover:bg-blue-200 sm:px-6 sm:py-3"
          onClick={onSaveExit}
        >
          <IoSaveOutline size={20} />
          Save & Exit
        </button>
        <button
          // className="flex items-center gap-2 rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 sm:px-6 sm:py-3"
          className="flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 sm:px-6 sm:py-3"
          onClick={onNext}
          disabled={!canProceed}
        >
          Next
          <IoMdArrowForward size={20} />
        </button>
      </>
    ) : (
      <>
        <button
          className="flex items-center gap-2 rounded bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 transition-all hover:bg-blue-200 sm:px-6 sm:py-3"
          onClick={onSaveExit}
        >
          <IoSaveOutline size={20} />
          Save & Exit
        </button>
        <button
          className="flex items-center gap-2 rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 sm:px-6 sm:py-3"
          onClick={onPreview}
        >
          <MdOutlineFileDownload size={20} />

          <div className="flex whitespace-nowrap">
            Preview & Download{" "}
            <span className="hidden pl-0 sm:block sm:pl-1">(later)</span>
          </div>
        </button>
      </>
    )}
  </div>
);

export default React.memo(StepFooter);
