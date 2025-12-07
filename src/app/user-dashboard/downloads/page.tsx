"use client";

import DashboardLayout from "@/components/(user-dashboard)/layout/DashboardLayout";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHooks";
import { fetchDownloadLogs } from "@/features/downloadLogs/downloadLogsSlice";
import { RootState } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";

export default function DownloadsPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { logs, loading } = useAppSelector(
    (state: RootState) => state.downloadLogs
  );

  useEffect(() => {
    if (user?.id) dispatch(fetchDownloadLogs());
  }, [user, dispatch]);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mx-auto max-w-6xl">
        <div className="relative rounded-xl bg-white p-6 border border-gray-300 dark:border-gray-800 dark:bg-gray-900">
          <div className="bg-primary dark:bg-primary/80 absolute top-8 left-0 h-10 w-[4px] -translate-x-1/2 rounded-full" />
          <div className="flex items-center gap-4">
            <FaDownload className="xs:mb-0 mb-1 h-8 w-8 text-primary dark:text-primary/80" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Downloads History
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track all your resume download activities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Downloads Cards */}
      <div className="mx-auto mt-10 max-w-6xl mb-10">
        {loading ? (
          <div className="py-20 text-center text-gray-500 dark:text-gray-400">
            Loading downloads...
          </div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-300 bg-gray-50 p-8 dark:border-gray-700/50 dark:bg-gray-900/20">
            <Image
              src="/images/user-dashboard/empty-contact.png"
              alt="No Download Logs"
              height={150}
              width={150}
              className="object-contain grayscale"
            />
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-400">
              No Download Logs found
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your downloaded resumes will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {logs.map((log) => (
              <div
                key={log._id}
                className="group relative flex flex-col rounded-2xl bg-white border border-gray-300 dark:border-gray-800 transition-all dark:bg-gray-900"
              >
                <div className="flex flex-col md:flex-row items-start p-6 gap-6">
                  {/* Thumbnail */}
                  <div className="relative h-32 w-full md:h-40 md:w-40 flex-shrink-0">
                    <Link href={`/downloads/${log._id}`} target="_blank">
                      <Image
                        src={
                          log.resumeId?.selectedTemplateSlug
                            ? `/templates/${log.resumeId.selectedTemplateSlug}.png`
                            : "/images/user-dashboard/Matdash_angular_free.png"
                        }
                        alt={log.resumeId?.resumeName || "Resume Thumbnail"}
                        fill
                        className="rounded-xl object-cover shadow-md"
                      />
                    </Link>
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        {log.resumeId?.resumeName || "Untitled Resume"}
                      </h2>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Type: <span className="font-medium">{log.downloadType}</span>
                      </p>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Downloaded on:{" "}
                        <span className="font-medium">
                          {new Date(log.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3 md:mt-6">
                      <button className="rounded-lg bg-yellow-500 px-5 py-2 font-medium text-white shadow hover:bg-yellow-600 transition-all">
                        Write a Review
                      </button>
                      <Link
                        href={`/downloads/${log._id}`}
                        className="rounded-lg bg-primary px-5 py-2 font-medium text-white shadow hover:bg-primary/90 transition-all"
                      >
                        Download
                      </Link>
                      <button className="rounded-lg bg-secondary px-5 py-2 font-medium text-white shadow hover:bg-secondary/90 transition-all">
                        Invoice
                      </button>
                      <button className="rounded-lg bg-teal-500 px-5 py-2 font-medium text-white shadow hover:bg-teal-600 transition-all">
                        Get Pro Version
                      </button>
                    </div>
                  </div>
                </div>

                {/* Optional Footer Badge */}
                <div className="absolute top-4 right-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-md">
                  {/* {log.resumeId?.plan || "Basic"} */} Basic
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
