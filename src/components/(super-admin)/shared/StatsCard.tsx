"use client";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  colorScheme: 'blue' | 'emerald' | 'orange' | 'purple' | 'red' | 'green';
  icon: LucideIcon;
  tags?: Array<{ label: string; count: number }>;
  bgVariant?: 'default' | 'gradient' | 'solid' | 'glass' | 'minimal';
  className?: string;
}

const colorMap = {
  blue: { light: 'blue', dark: 'blue' },
  emerald: { light: 'emerald', dark: 'emerald' },
  orange: { light: 'orange', dark: 'orange' },
  purple: { light: 'purple', dark: 'purple' },
  red: { light: 'red', dark: 'red' },
  green: { light: 'green', dark: 'green' }
};

export default function StatsCard({ 
  title, 
  value, 
  colorScheme, 
  icon: Icon, 
  tags,
  bgVariant = 'default',
  className = ""
}: StatsCardProps) {
  const bgClasses = {
    default: `bg-gradient-to-br from-${colorScheme}-50 to-${colorScheme}-100/50 dark:from-${colorScheme}-900/20 dark:to-${colorScheme}-800/30`,
    gradient: `bg-gradient-to-br from-${colorScheme}-50 via-${colorScheme}-100/30 to-${colorScheme}-200/50 dark:from-${colorScheme}-900/30 dark:via-${colorScheme}-800/40 dark:to-${colorScheme}-700/50`,
    solid: `bg-${colorScheme}-100/80 dark:bg-${colorScheme}-900/40`,
    glass: `bg-white/80 backdrop-blur-xl dark:bg-gray-900/80 border border-${colorScheme}-200/50 dark:border-${colorScheme}-800/50`,
    minimal: `bg-gradient-to-br from-white/50 to-gray-50/50 dark:from-gray-900/50 dark:to-gray-800/50`
  };
  const colors = colorMap[colorScheme];
  
  return (
    <div className={`group rounded-xl shrink-0 border border-gray-300 bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 transition-all duration-200 hover:border-gray-400 dark:border-gray-700/50 dark:from-gray-900/50 dark:to-gray-800/50 dark:hover:border-gray-600 ${bgClasses[bgVariant]} ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
            {title}
          </p>
          <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {tags && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags.slice(0, 3).map(({ label, count }) => (
                <span
                  key={label}
                  className={`rounded-full bg-${colors.light}-100 px-2 py-1 text-xs font-medium text-${colors.light}-800 dark:bg-${colors.dark}-900/50 dark:text-${colors.dark}-200`}
                >
                  {label} ({count})
                </span>
              ))}
            </div>
          )}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-${colors.light}-100 transition-colors group-hover:bg-${colors.light}-200 dark:bg-${colors.dark}-900/50 dark:group-hover:bg-${colors.dark}-800/50`}>
          <Icon className={`h-6 w-6 text-${colors.light}-600 dark:text-${colors.dark}-400`} />
        </div>
      </div>
    </div>
  );
}
