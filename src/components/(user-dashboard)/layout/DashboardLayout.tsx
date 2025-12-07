"use client";

import { useState } from "react";
import { useMediaQuery } from "@/hook/useMediaQuery";
import UserDashboardHeader from "@/components/(user-dashboard)/UserDashboardHeader";
import UserDashboardSidebar from "@/components/(user-dashboard)/UserDashboardSidebar";
import { UserDashboardDrawer } from "@/components/(user-dashboard)/UserDashboardDrawer";
import DiagonalDivider from "@/components/(user-dashboard)/components/DiagonalDivider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useMediaQuery("(max-width: 840px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <UserDashboardHeader
        isMobile={isMobile}
        onDrawerOpen={() => setDrawerOpen(true)}
      />

      <main className="relative flex pt-4 md:pt-6 mx-2 sm:mx-8">
        {/* Sidebar / Drawer */}
        {isMobile ? (
          <UserDashboardDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          />
        ) : (
          <aside className="hidden md:block">
            <UserDashboardSidebar />
          </aside>
        )}

        {/* Main content */}
        <section className="relative z-20 flex-1 px-2 sm:px-4 sm:py-6 pl-2 lg:pl-10 md:pr-5">
          {children}
        </section>
      </main>
      <DiagonalDivider />
    </div>
  );
}
