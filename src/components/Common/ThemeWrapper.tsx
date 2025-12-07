'use client';
import { useTheme } from '@/hook/useTheme';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return <div className={theme === 'dark' ? 'dark bg-black' : 'bg-white'}>{children}</div>;
}
