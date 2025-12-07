"use client";

import DashboardLayout from "@/components/(user-dashboard)/layout/DashboardLayout";
import DiagonalDivider from "@/components/(user-dashboard)/components/DiagonalDivider";
import { HandHelping } from "lucide-react";

export default function SupportPage() {
  return (
    <>
      <DashboardLayout>
        {/* Header Section */}
        <div className="mx-auto max-w-6xl">
          <div className="rounded-xl border border-gray-300 backdrop-blur-sm dark:border-gray-800">
            <div className="relative rounded-xl bg-white p-6 dark:bg-gray-900">
              <div className="bg-primary dark:bg-primary/80 absolute top-8 left-0 h-10 w-[4px] -translate-x-1/2 rounded-full" />
              <div className="xs:flex block items-center gap-3">
                <HandHelping className="xs:mb-0 mb-1 h-10 w-10 text-primary dark:text-primary/80" />
                <div>
                  <h1 className="text-2xl font-bold text-slate-800 dark:text-gray-100">
                    Support Center
                  </h1>
                  <p className="text-slate-800 dark:text-gray-300">
                    Track all tickets and support queries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Content Section */}
        <div className="mx-auto mt-10 mb-10 max-w-6xl">
          <div className="rounded-xl border border-gray-300 backdrop-blur-sm dark:border-gray-800">
            <div className="relative rounded-xl bg-white p-6 dark:bg-gray-900">
              <p className="text-slate-700 dark:text-gray-300">
                Welcome to the Support page. Here you can submit your queries,
                view FAQs, or contact our team.
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>{" "}
    </>
  );
}
