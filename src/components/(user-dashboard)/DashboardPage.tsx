"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/(user-dashboard)/layout/DashboardLayout";
import { apiFetch } from "@/lib/api";
import { toast } from "react-hot-toast";
import { Download, FileText, Award, Zap, Clock, BarChart3 } from "lucide-react";
import DiagonalDivider from "@/components/(user-dashboard)/components/DiagonalDivider";
import Link from "next/link";
import { formatDate } from "@/utils/apiUtility";
import { useLogout } from "@/hook/useLogout";
import { useAppSelector } from "@/hook/reduxHooks";

interface UsageStats {
  limit: number;
  used: number;
  remaining: number;
  lastDownloadAt: string | null;
  downloadsByResume: Record<string, number>;
}

export default function DownloadUsagePage() {
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const { logout } = useLogout();

  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    try {
      setLoading(true);

      // 👇 Replaced fetch() with apiFetch()
      const data = await apiFetch("/v1/dashboard/me/usage");

      setUsage(data);
    } catch (err: any) {
      console.error("Usage fetch error:", err);
      toast.error("Failed to load usage data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-6xl p-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-500">Loading download usage...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!usage) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-6xl p-8 text-center">
          <p className="text-gray-500">Unable to load usage data</p>
          <button
            onClick={fetchUsage}
            className="mt-4 rounded-md bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const rawProgress = (usage.used / usage.limit) * 100;

  const visualProgress = rawProgress === 0 ? 0 : Math.max(rawProgress, 1);

  const resumeDownloads = Object.entries(usage.downloadsByResume);

  // Calculate percentage dynamically
  const percentageRemaining = (usage.remaining / usage.limit) * 100;

  // Choose color from percentage
  const getColor = () => {
    if (usage.remaining === 0) {
      return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"; // 0% left
    }
    if (percentageRemaining <= 30) {
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300"; // LOW
    }
    if (percentageRemaining <= 60) {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"; // MEDIUM
    }
    return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"; // GOOD
  };

  return (
    <>
      <DashboardLayout>
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-xl border border-gray-300 backdrop-blur-sm dark:border-gray-800">
              <div className="relative rounded-xl bg-white p-6 dark:bg-gray-900">
                <div className="bg-primary dark:bg-primary/80 absolute top-8 left-0 h-10 w-[4px] -translate-x-1/2 rounded-full" />
                <div className="xs:flex block items-center gap-3">
                  <Download className="xs:mb-0 text-primary dark:text-primary/80 mb-1 h-10 w-10" />
                  <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-gray-100">
                      Download Usage
                    </h1>
                    <p className="text-slate-800 dark:text-gray-300">
                      Track your resume downloads and limits
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-10 max-w-6xl">
            <div className="rounded-xl border border-gray-300 backdrop-blur-sm dark:border-gray-800">
              <div className="relative rounded-xl bg-white p-6 dark:bg-gray-900">
                <p className="mb-3 text-slate-700 dark:text-gray-300">
                  Hello <strong>Rohitash Thakur</strong> (not{" "}
                  <strong>Rohitash Thakur</strong>?
                  <button
                    onClick={() => logout("user")}
                    className="text-primary ml-1 no-underline"
                  >
                    Log out
                  </button>
                  )
                </p>

                <p className="text-slate-700 dark:text-gray-300">
                  From your account dashboard you can view your
                  <Link href="/" className="text-primary ml-1 no-underline">
                    recent orders
                  </Link>{" "}
                  and
                  <Link href="/" className="text-primary ml-1 no-underline">
                    edit your password and account details
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Column: Main Stats */}
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-300 backdrop-blur-sm dark:border-gray-800">
                <div className="rounded-xl bg-white p-6 dark:bg-gray-900">
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                    <BarChart3 size={24} />
                    Usage Summary
                  </h3>

                  {/* Main Progress Card */}
                  <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 dark:from-gray-900/50 dark:to-gray-800/50">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5" />

                    <div className="relative z-10 space-y-4">
                      <div className="block items-start justify-start sm:flex sm:items-baseline sm:justify-between">
                        <div>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white">
                            {usage.used} / {usage.limit}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Downloads used
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${getColor()}`}
                          >
                            {usage.remaining} remaining
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative">
                        <div className="mb-2 flex justify-between text-xs font-medium text-gray-500">
                          <span>0</span>
                          <span>{usage.limit}</span>
                        </div>

                        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className="from-primary to-primary h-3 overflow-hidden rounded-full bg-gradient-to-r transition-all duration-700"
                            style={{ width: `${visualProgress}%` }}
                          />
                        </div>

                        <div className="mt-1 flex justify-between text-xs text-gray-500">
                          <span>{Math.round(rawProgress)}%</span>
                          <span>Free Limit</span>
                        </div>
                      </div>

                      {usage.remaining === 0 && (
                        <div className="mt-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 p-4 dark:from-orange-900/20 dark:to-red-900/20">
                          <div className="block items-center gap-3 sm:flex">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/50">
                              ⚠️
                            </div>
                            <div>
                              <p className="font-semibold text-orange-900 dark:text-orange-300">
                                Free limit reached!
                              </p>
                              <p className="text-sm text-orange-800 dark:text-orange-400">
                                Upgrade to premium for unlimited downloads
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Last Download */}
                  {usage.lastDownloadAt && (
                    <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-700">
                      <div className="block items-center gap-3 sm:flex">
                        <Clock className="mb-0 h-5 w-5 text-gray-400 sm:mb-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Last Download
                          </p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {usage.lastDownloadAt
                              ? formatDate(usage.lastDownloadAt, true)
                              : "Never"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Resume Breakdown */}
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-300 backdrop-blur-sm dark:border-gray-800">
                <div className="rounded-xl bg-white p-6 dark:bg-gray-900">
                  <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                    <FileText size={24} />
                    Resume Breakdown
                  </h3>

                  {resumeDownloads.length === 0 ? (
                    <div className="py-12 text-center">
                      <Award className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                      <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                        No downloads yet
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400">
                        Your first download will appear here
                      </p>
                    </div>
                  ) : (
                    <div className="max-h-96 space-y-3 overflow-y-auto">
                      {resumeDownloads.map(([resumeId, count]) => (
                        <div
                          key={resumeId}
                          className="block items-center justify-between gap-4 rounded-lg bg-gray-50 p-4 transition-all hover:bg-gray-100 sm:flex dark:bg-gray-800/50 dark:hover:bg-gray-700/50"
                        >
                          <div className="truncate">
                            <p className="max-w-[200px] font-medium text-gray-900 dark:text-gray-100">
                              Resume {resumeId.slice(-6)}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {count} download{count > 1 ? "s" : ""}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center gap-2 sm:mt-0">
                            <div className="h-6 w-20 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                              <div
                                className="from-primary to-primary h-6 rounded-full bg-gradient-to-r transition-all"
                                style={{
                                  width: `${Math.max(Math.min((count / usage.limit) * 100, 100), 5)}%`,
                                }}
                              />
                            </div>

                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              {count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mb-5 grid grid-cols-1 gap-4">
                <button className="from-primary to-primary hover:from-primary hover:to-primary flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r px-6 py-4 text-lg font-semibold text-white shadow-xl transition-all">
                  <Zap size={20} />
                  Upgrade to Premium
                </button>
                <button
                  onClick={fetchUsage}
                  className="rounded-xl border-2 border-gray-300 px-6 py-4 font-semibold text-gray-900 transition-all hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  Refresh Stats
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      <DiagonalDivider />
    </>
  );
}
