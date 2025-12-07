'use client';
import SuperAdminSidebar from './SuperAdminSidebar';
import SuperAdminHeader from './SuperAdminHeader';
import { useTheme } from "@/hook/useTheme";

export default function MainShell({ children }: { children: React.ReactNode }) {
  const { useBgImage, backgroundImage, mobileSidebarOpen, setMobileSidebarOpen } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 w-full relative">
      {useBgImage && backgroundImage && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-40 dark:opacity-30"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="flex">
        <SuperAdminSidebar />
        <div className="flex-1 min-w-0">
          <SuperAdminHeader />
          <main className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>

      {mobileSidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setMobileSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs"
        />
      )}
    </div>
  );
}
