"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  fetchDownloadConfig,
  updateDownloadConfig,
  clearError,
} from "@/features/downloadConfig/downloadConfigSlice";
import MainShell from "@/components/(super-admin)/MainShell";
import Card from "@/components/(super-admin)/shared/Card";
import {
  Download,
  Settings,
  Zap,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function DownloadConfigPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { config, loading, saving, error } = useSelector(
    (state: RootState) => state.downloadConfig,
  );

  useEffect(() => {
    dispatch(fetchDownloadConfig());
  }, [dispatch]);

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 999) {
      dispatch(updateDownloadConfig(value));
    }
  };

  if (loading && !config) {
    return (
      <MainShell>
        <div className="flex h-full w-full items-center justify-center py-10">
          <div className="relative">
            <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"></div>
          </div>
        </div>
      </MainShell>
    );
  }

  return (
    <MainShell>
      <div className="space-y-6">
        {/* Page Header */}
        <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/30">
          <div className="xs:items-center xs:flex-row xs:justify-between flex flex-col items-start justify-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Download Configuration
              </h1>
              <p className="mt-1 text-gray-700 dark:text-gray-300">
                Control free download limits for all users
              </p>
            </div>
          </div>
        </Card>

        {/* Config Form */}
        <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/30">
          <div className="">
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-red-100/50 p-4 dark:border-red-800 dark:from-red-900/20 dark:to-red-800/30">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                  <div>
                    <p className="font-semibold text-red-900 dark:text-red-300">
                      {error}
                    </p>
                    <button
                      onClick={() => dispatch(clearError())}
                      className="mt-1 text-sm text-red-600 hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Main Config Card */}
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 block items-center gap-3 text-2xl font-bold text-gray-900 sm:flex dark:text-gray-100">
                    <Settings size={28} className="text-primary mb-1" />
                    Free Downloads Limit
                  </h2>

                  <div className="relative">
                    <div className="group relative mb-6">
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Max Free Downloads Per User
                        </label>

                        <div className="relative flex items-center">
                          {/* Left Icon */}
                          <div className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center justify-center">
                            <Download className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          </div>

                          {/* Input */}
                          <input
                            type="number"
                            min="0"
                            max="999"
                            value={config?.maxFreeDownloadsPerUser ?? 0}
                            onChange={handleLimitChange}
                            disabled={saving}
                            className="w-full rounded-xl border border-gray-300 bg-white py-4 pr-20 pl-12 text-4xl font-bold tracking-wide text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/30"
                            placeholder="0"
                          />

                          {/* Right badge */}
                          <div className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg border border-gray-300 bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:border-gray-700/60 dark:bg-gray-800 dark:text-gray-300">
                            per user
                          </div>
                        </div>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Each user will receive this many free downloads.
                        </p>
                      </div>

                      {/* Live Preview */}
                      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`group relative rounded-xl border p-4 text-center transition-all ${
                              i <= (config?.maxFreeDownloadsPerUser ?? 0)
                                ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20"
                                : "border-gray-300 bg-white/50 dark:border-gray-800 dark:bg-gray-900/30"
                            }`}
                          >
                            <div
                              className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full ${
                                i <= (config?.maxFreeDownloadsPerUser ?? 0)
                                  ? "bg-emerald-500 text-white shadow-lg"
                                  : "bg-gray-200 text-gray-500 dark:bg-gray-700"
                              }`}
                            >
                              <Download className="h-6 w-6" />
                            </div>

                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                              Download #{i}
                            </p>
                            <p
                              className={`mt-1 text-xs font-medium ${
                                i <= (config?.maxFreeDownloadsPerUser ?? 0)
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-gray-500"
                              }`}
                            >
                              {i <= (config?.maxFreeDownloadsPerUser ?? 0)
                                ? "✅ Allowed"
                                : "❌ Blocked"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Impact Preview */}
                    <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:from-blue-900/20 dark:to-indigo-900/20">
                      <div className="flex items-center gap-3">
                        <Zap className="h-6 w-6 text-blue-500" />
                        <div>
                          <p className="font-semibold text-blue-900 dark:text-blue-300">
                            Current Impact
                          </p>
                          <p className="text-sm text-blue-800 dark:text-blue-400">
                            {config?.maxFreeDownloadsPerUser ?? 0} free
                            downloads allowed per user
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Config Info */}
              <div className="space-y-6">
                <div className="rounded-xl border border-gray-300 p-6 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
                  <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Configuration Details
                  </h3>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Config ID
                      </span>
                      <code className="font-mono text-gray-900 dark:text-gray-100">
                        {config?._id?.slice(-8) ?? "N/A"}
                      </code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Created
                      </span>
                      <span className="font-mono text-gray-900 dark:text-gray-100">
                        {config?.createdAt
                          ? new Date(config.createdAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Last Updated
                      </span>
                      <span className="font-mono text-gray-900 dark:text-gray-100">
                        {config?.updatedAt
                          ? new Date(config.updatedAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  {saving && (
                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/20">
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                      <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                        Saving...
                      </span>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => dispatch(updateDownloadConfig(3))}
                    disabled={
                      saving || (config?.maxFreeDownloadsPerUser ?? 0) === 3
                    }
                    className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 dark:from-emerald-600 dark:to-emerald-700"
                  >
                    Set to 3 (Default)
                  </button>
                  <button
                    onClick={() => dispatch(updateDownloadConfig(1))}
                    disabled={
                      saving || (config?.maxFreeDownloadsPerUser ?? 0) === 1
                    }
                    className="w-full rounded-xl bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-orange-700 hover:to-orange-800 disabled:opacity-50 dark:from-orange-600 dark:to-orange-700"
                  >
                    Set to 1 (Strict)
                  </button>
                  <button
                    onClick={() => dispatch(updateDownloadConfig(5))}
                    disabled={
                      saving || (config?.maxFreeDownloadsPerUser ?? 0) === 5
                    }
                    className="w-full rounded-xl border border-blue-300 px-6 py-3 text-sm font-semibold text-blue-700 transition-all hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/30"
                  >
                    Set to 5 (Generous)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainShell>
  );
}
