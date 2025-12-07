export default function WarningBox({ message, onClose }: any) {
  if (!message) return null;

  return (
    <div className="relative mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
      >
        ✕
      </button>

      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
