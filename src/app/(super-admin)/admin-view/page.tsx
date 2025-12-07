"use client";

import { useEffect } from "react";
import MainShell from "@/components/(super-admin)/MainShell";
import AreaMonthlyResumes from "@/components/(super-admin)/charts/AreaMonthlyResumes";
import BarTopTemplates from "@/components/(super-admin)/charts/BarTopTemplates";
import LineSignups from "@/components/(super-admin)/charts/LineSignups";
import PieCategory from "@/components/(super-admin)/charts/PieCategory";
import Sparkline from "@/components/(super-admin)/charts/Sparkline";
import Card from "@/components/(super-admin)/shared/Card";

import { fetchDashboardSummary } from "@/features/dashboard/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHooks";
import { formatDate } from "@/utils/apiUtility";
import { AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const {
    metrics,
    monthlyResumes,
    topTemplates,
    signupTrend,
    categoryDistribution,
    recentActivity,
    recentTopUsers,
    loading,
    error,
  } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);

  if (loading) {
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

  if (error) {
    let errorMessage = "Something went wrong";

    if (typeof error === "string") {
      errorMessage = error;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error
    ) {
      errorMessage = (error as { message: string }).message;
    }

    return (
      <MainShell>
        <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
          <div className="relative overflow-hidden rounded-lg border border-red-300 bg-red-50 p-5 dark:border-red-700 dark:bg-red-900/20">
            <div className="absolute -top-3 -right-3 h-12 w-12 rounded-full bg-red-300/20 dark:bg-red-700/40"></div>
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h3 className="text-base font-semibold text-red-700 dark:text-red-300">
                  Error
                </h3>
              </div>
              <p className="text-sm text-red-700/90 dark:text-red-400">
                {errorMessage}
              </p>
              {/* <div className="flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-400">
                    <AlertTriangle className="h-3 w-3" />
                    This action is irreversible
                  </div> */}
            </div>
          </div>
        </Card>
      </MainShell>
    );
  }

  const isEmptyData = !metrics || Object.keys(metrics).length === 0;
  if (isEmptyData) {
    return (
      <MainShell>
        <p className="text-sm text-gray-500">No data available.</p>
      </MainShell>
    );
  }

  // If paymentsGrowth is empty, fallback to dummy data
const paymentsGrowthData =
  metrics.paymentsGrowth.length > 0
    ? metrics.paymentsGrowth
    : [
        { name: "W1", value: 0 },
        { name: "W2", value: 0 },
        { name: "W3", value: 0 },
        { name: "W4", value: 0 },
      ];


  return (
    <MainShell>
      <div className="space-y-6 overflow-hidden text-gray-800 dark:text-gray-200">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Users
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {metrics.totalUsers.toLocaleString()}
                </p>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  metrics.userMoM >= 0
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                    : "bg-red-500/15 text-red-600"
                }`}
              >
                {metrics.userMoM >= 0 ? "+" : ""}
                {metrics.userMoM}% MoM
              </span>
            </div>
            <div className="mt-3">
              <Sparkline data={metrics.usersGrowth} color="#10b981" />
            </div>
          </Card>

          <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Resumes
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {metrics.totalResumes.toLocaleString()}
                </p>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  metrics.resumeMoM >= 0
                    ? "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400"
                    : "bg-red-500/15 text-red-600"
                }`}
              >
                {metrics.resumeMoM >= 0 ? "+" : ""}
                {metrics.resumeMoM}% MoM
              </span>
            </div>
            <div className="mt-3">
              <Sparkline data={metrics.resumesGrowth} color="#6366f1" />
            </div>
          </Card>

          <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Templates
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {metrics.totalTemplates}
                </p>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  metrics.templateMoM >= 0
                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                    : "bg-red-500/15 text-red-600"
                }`}
              >
                {metrics.templateMoM >= 0 ? "+" : ""}
                {metrics.templateMoM} new
              </span>
            </div>
            <div className="mt-3">
              <Sparkline data={metrics.templatesGrowth} color="#f59e0b" />
            </div>
          </Card>
          <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Payments
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {metrics.totalPayments}
                </p>
              </div>
              <span className="rounded-full bg-blue-500/15 px-2 py-1 text-xs text-blue-700 dark:text-blue-400">
                +5% MoM
              </span>
            </div>
            <div className="mt-3">
              <Sparkline data={paymentsGrowthData} color="#3b82f6" />
            </div>
          </Card>
        </div>

        {/* <div className="grid gap-4 md:grid-cols-3">
          <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Payments
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {metrics.totalPayments}
                </p>
              </div>
              <span className="rounded-full bg-blue-500/15 px-2 py-1 text-xs text-blue-700 dark:text-blue-400">
                +5% MoM
              </span>
            </div>
            <div className="mt-3">
              <Sparkline data={metrics.paymentsGrowth} color="#3b82f6" />
            </div>
          </Card>

          <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Successful Payments
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {metrics.successfulPayments}
                </p>
              </div>
              <span className="rounded-full bg-green-500/15 px-2 py-1 text-xs text-green-700 dark:text-green-400">
                +3% MoM
              </span>
            </div>
          </Card>

          <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Revenue
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  ${metrics.totalRevenue.toLocaleString()}
                </p>
              </div>
              <span className="rounded-full bg-yellow-500/15 px-2 py-1 text-xs text-yellow-700 dark:text-yellow-400">
                +7% MoM
              </span>
            </div>
          </Card>
        </div> */}

        {/* Charts */}
        <div className="grid gap-4 xl:grid-cols-3">
          <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm xl:col-span-2 dark:border-gray-700/50 dark:bg-gray-900/30">
            <h2 className="mb-3 text-lg font-medium">
              Monthly Resume Creation
            </h2>
            <AreaMonthlyResumes data={monthlyResumes} />
          </Card>

          <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
            <h2 className="mb-3 text-lg font-medium">Category Distribution</h2>
            <PieCategory data={categoryDistribution} />
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
            <h2 className="mb-3 text-lg font-medium">Top 5 Templates</h2>
            <BarTopTemplates data={topTemplates} />
          </Card>

          <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
            <h2 className="mb-3 text-lg font-medium">User Signup Trend</h2>
            <LineSignups data={signupTrend} />
          </Card>
        </div>

        {/* Recent Activity Table */}
        <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
          <h2 className="mb-3 text-lg font-medium">Recent Activity</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-300/50 text-left text-gray-600 dark:bg-gray-700/40 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2">Template</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-300 dark:border-white/10"
                  >
                    <td className="px-4 py-2 whitespace-nowrap">{item.id}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{item.type}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{item.user}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.template}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item?.date ? formatDate(item.date, true) : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/30">
          <h2 className="mb-3 text-lg font-medium">Recent User</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-300/50 text-left text-gray-600 dark:bg-gray-700/40 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2">Template</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTopUsers.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-gray-300 dark:border-white/10"
                  >
                    <td
                      className="max-w-[80px] truncate overflow-hidden py-2 pr-6 pl-4 whitespace-nowrap"
                      title={item._id}
                    >
                      {item._id}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.email}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.role === "Admin"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-700/20 dark:text-purple-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-700/20 dark:text-blue-300"
                        }`}
                      >
                        {item.role || "User"}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.createdAt ? formatDate(item.createdAt, true) : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </MainShell>
  );
}
