"use client";

import { STEPS, Step } from "@/types/resumeTemplate";
import { CheckIcon } from "lucide-react";

interface ProgressBarProps {
  steps: readonly Step[];
  currentStep: Step;
  completedSteps: Set<Step>;
  isDark: boolean;
  goToStep: (step: Step) => void;
}

export default function ProgressBar({
  steps,
  currentStep,
  completedSteps,
  isDark,
  goToStep,
}: ProgressBarProps) {
  const getStepLabel = (step: Step) => {
    const labels: Record<Step, string> = {
      create: "Create Resume",
      plan: "Choose Plan",
      payment: "Payment Details",
      download: "Download Resume",
    };
    return labels[step];
  };

  const currentIndex = STEPS.indexOf(currentStep);

  return (
    <div className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Desktop Timeline */}
        <div className="hidden w-full justify-center md:flex">
          <div className="flex w-full max-w-5xl items-center">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.has(step);
              const isCurrent = currentStep === step;
              const label = getStepLabel(step);

              return (
                <div key={step} className="flex w-full items-center">
                  <button
                    onClick={() => goToStep(step)}
                    className="group flex flex-col items-center justify-center md:flex-row"
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 md:h-8 md:w-8 md:text-sm ${isCompleted ? "bg-green-500 text-white" : isCurrent ? "bg-primary text-white" : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-100"} `}
                    >
                      {isCompleted ? (
                        <CheckIcon className="h-5 w-5 md:h-6 md:w-6" />
                      ) : (
                        index + 1
                      )}
                    </div>

                    <span
                      className={`mt-2 w-24 text-center text-[10px] font-medium whitespace-nowrap md:mt-0 md:ml-3 md:text-xs ${isCompleted ? "text-green-600" : isCurrent ? "text-primary" : "text-gray-600"} `}
                    >
                      {label}
                    </span>
                  </button>

                  <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-slate-300 md:mx-4 dark:bg-slate-700">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-700"
                      style={{
                        width:
                          STEPS.indexOf(currentStep) > index
                            ? "100%"
                            : STEPS.indexOf(currentStep) === index
                              ? "50%"
                              : "0%",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline: Only Current Step */}
        <div className="flex w-full flex-col items-center space-y-4 md:hidden">
          {/* Current Step Label */}
          <span className="mb-2 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
            {getStepLabel(currentStep)}
          </span>

          {/* Dots: Filled until step index */}
          <div className="flex space-x-2">
            {Array(STEPS.length)
              .fill(0)
              .map((_, dotIndex) => (
                <div
                  key={dotIndex}
                  className={`h-4 w-4 rounded-full transition-colors duration-300 ${
                    dotIndex <= currentIndex
                      ? "bg-primary"
                      : "bg-slate-300 dark:bg-slate-700"
                  }`}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
