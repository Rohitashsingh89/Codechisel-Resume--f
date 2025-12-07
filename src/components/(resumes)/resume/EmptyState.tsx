"use client";

export default function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 py-16 text-center">
      <div className="text-5xl">📄</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        No Resumes Yet
      </h3>
      <p className="max-w-md text-gray-600 dark:text-gray-400">
        You haven&apos;t created any resumes yet. Start building your professional
        resume to land your dream job.
      </p>
      <button
        className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
        onClick={onCreate}
      >
        Create your First Resume
      </button>
    </div>
  );
}
