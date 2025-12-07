"use client";

import DashboardLayout from "@/components/(user-dashboard)/layout/DashboardLayout";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHooks";
import { useEffect, useCallback } from "react";

import { formatDate } from "@/utils/apiUtility";
import clsx from "clsx";
import { fetchPayments, setPage } from "@/features/payments/paymentsSlice";
import {
  FaCheckCircle,
  FaClock,
  FaCreditCard,
  FaTimesCircle,
} from "react-icons/fa";

export default function UserPaymentsPage() {
  const dispatch = useAppDispatch();
  const { payments, totalPages, loading, page } = useAppSelector(
    (state) => state.payments,
  );

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch, page]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      dispatch(setPage(newPage));
    },
    [dispatch],
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex w-full justify-center py-10">
          <div className="relative">
            <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">
        <div className="rounded-xl border border-gray-300 backdrop-blur-sm dark:border-gray-800">
          <div className="relative rounded-xl bg-white p-6 dark:bg-gray-900">
            <div className="bg-primary dark:bg-primary/80 absolute top-8 left-0 h-10 w-[4px] -translate-x-1/2 rounded-full" />
            <div className="xs:flex block items-center gap-3">
              <FaCreditCard className="xs:mb-0 mb-1 h-10 w-10 text-primary dark:text-primary/80" />
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-gray-100">
                  Payment History
                </h1>
                <p className="text-slate-800 dark:text-gray-300">
                  Track all your subscription payments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 mb-10 max-w-6xl">
        <div className="grid grid-cols-1 gap-6">
          <div className="rounded-xl border border-gray-300 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              My Transactions
            </h3>
            <div className="custom-scrollbar overflow-x-auto rounded-xl">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase dark:text-gray-300">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase dark:text-gray-300">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase dark:text-gray-300">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase dark:text-gray-300">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase dark:text-gray-300">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {payments.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                      >
                        <FaCreditCard className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                        <div>No payments found</div>
                        <div className="text-sm">
                          Your payment history will appear here
                        </div>
                      </td>
                    </tr>
                  ) : (
                    payments.map((payment: any, index: number) => (
                      <tr
                        key={payment._id}
                        className={clsx(
                          "transition-colors hover:bg-gray-100 dark:hover:bg-gray-700",
                          index % 2 === 0
                            ? "bg-white dark:bg-gray-900"
                            : "bg-gray-50 dark:bg-gray-800",
                        )}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {formatDate(payment.createdAt, true)}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(payment.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-mono text-sm text-gray-900 dark:text-gray-100">
                            {payment.transactionId?.slice(-8) ||
                              payment._id?.slice(-8)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                          <div>{payment.planId?.name || "Subscription"}</div>
                          <div className="text-xs text-emerald-600 dark:text-emerald-400">
                            {payment.planId?.type?.toUpperCase()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                          <div className="text-2xl text-emerald-600 dark:text-emerald-400">
                            ₹{payment.amount}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {payment.currency || "INR"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={clsx(
                              "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                              payment.status === "completed"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200"
                                : payment.status === "failed"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                                  : payment.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
                                    : payment.status === "cancelled"
                                      ? "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                      : "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200",
                            )}
                          >
                            {payment.status === "completed" && (
                              <FaCheckCircle className="mr-1 h-3 w-3" />
                            )}
                            {payment.status === "failed" && (
                              <FaTimesCircle className="mr-1 h-3 w-3" />
                            )}
                            {payment.status === "pending" && (
                              <FaClock className="mr-1 h-3 w-3" />
                            )}
                            {payment.status === "cancelled" && (
                              <FaTimesCircle className="mr-1 h-3 w-3" />
                            )}
                            {payment.status?.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                <nav className="flex items-center justify-between">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Showing {payments.length} of {payments.length * totalPages}{" "}
                    payments
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className={clsx(
                        "rounded-lg px-3 py-2 text-sm font-medium",
                        page === 1
                          ? "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-600"
                          : "bg-primary hover:bg-primary/80 text-white",
                      )}
                    >
                      Previous
                    </button>

                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                      className={clsx(
                        "rounded-lg px-3 py-2 text-sm font-medium",
                        page === totalPages
                          ? "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-600"
                          : "bg-primary hover:bg-primary/80 text-white",
                      )}
                    >
                      Next
                    </button>
                  </div>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
