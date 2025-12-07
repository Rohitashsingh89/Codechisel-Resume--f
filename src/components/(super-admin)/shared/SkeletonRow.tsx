interface SkeletonRowProps {
    columns: number;
    hasActions?: boolean;
  }
  
  export default function SkeletonRow({ columns, hasActions = true }: SkeletonRowProps) {
    return (
      <tr className="animate-pulse">
        {Array(columns).fill(0).map((_, i) => (
          <td key={`skeleton-cell-${i}`} className="px-6 py-4">
            <div className="h-4 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </td>
        ))}
        {hasActions && (
          <td className="px-6 py-4">
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </td>
        )}
      </tr>
    );
  }
  