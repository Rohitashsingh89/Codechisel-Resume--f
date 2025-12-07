'use client';
import React from 'react';

interface ProgressBarProps {
  completion: number;
  step: number;
  total: number;
  color?: string;
}

const ProgressBar = ({
  completion,
  step,
  total,
  color = '#6366f1',
}: ProgressBarProps) => {
  const progress = Math.min(Math.max(completion, 0), 100);

  return (
    <div className="w-full">
      <div className="h-2 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
          }}
          title={`${Math.round(progress)}% completed`}
        />
      </div>

      {/* Step text */}
      <div className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Step {step + 1} of {total} • {Math.round(progress)}%
      </div>
    </div>
  );
};

export default React.memo(ProgressBar);
