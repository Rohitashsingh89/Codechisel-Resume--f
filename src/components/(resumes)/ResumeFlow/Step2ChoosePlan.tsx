"use client";

import { ResumeData } from "@/types/resumeTemplate";
import {
  ArrowLeftIcon,
  CheckCircle,
  ShieldCheck,
  LifeBuoy,
} from "lucide-react";
import { useEffect, useState } from "react";
import PrimaryButton from "../../Common/ui/PrimaryButton";
import { apiFetch } from "@/lib/api";

interface Step2Props {
  resumePreview: ResumeData | null;
  onNext: (planId: string) => void; // ⭐ planId dynamic
  onBack: () => void;
}

export default function Step2ChoosePlan({
  resumePreview,
  onNext,
  onBack,
}: Step2Props) {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ⭐ first wale jaisa logic
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // ⭐ Fetch plans from backend
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await apiFetch("/v1/plans");
        setPlans(response.plans || []);
      } catch (error) {
        console.error("Failed to fetch plans:", error);

        // ⭐ fallback
        setPlans([
          { _id: "week", name: "1 Week Access", price: 299, popular: true },
          { _id: "month", name: "1 Month Access", price: 1999, popular: false },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleContinue = () => {
    if (selectedPlanId) onNext(selectedPlanId);
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center py-10">
        <div className="relative">
          <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Heading */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          You&apos;re about to get hired faster
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        {/* ---------------- LEFT SIDE: PLAN CARDS ---------------- */}
        <div className="space-y-8">
          {/* PLANS */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {plans.map((plan) => (
              <label
                key={plan._id}
                className={`relative cursor-pointer rounded-3xl border-2 bg-white/70 p-8 backdrop-blur-md transition-all dark:bg-gray-900/70 ${
                  selectedPlanId === plan._id
                    ? "border-primary bg-primary/10 ring-primary/20 shadow-2xl ring-4"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-xl dark:border-gray-700 dark:hover:border-gray-600"
                } `}
              >
                <input
                  type="radio"
                  name="plan"
                  value={plan._id}
                  checked={selectedPlanId === plan._id}
                  onChange={() => setSelectedPlanId(plan._id)}
                  className="absolute h-0 w-0 opacity-0"
                />

                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </h3>

                    <div className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-3xl font-black text-transparent">
                      ₹{plan.price}
                    </div>

                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {plan.type || plan.duration || "subscription"}
                    </span>
                  </div>

                  {selectedPlanId === plan._id && (
                    <CheckCircle className="text-primary h-8 w-8" />
                  )}
                </div>
              </label>
            ))}
          </div>

          {/* FEATURES (same as clean UI version) */}
          <div className="mt-6 rounded-lg border border-gray-200 bg-white/60 p-8 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900">
            <ul className="space-y-4">
              {[
                "Unlimited resumes & cover letters",
                "Access 500+ templates",
                "AI-powered optimization",
                "Download in PDF & DOCX formats",
              ].map((feature, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-800 dark:text-gray-200">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------------- RIGHT SIDE: BENEFITS + CONTINUE ---------------- */}
        <div className="sticky top-24 space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white/60 p-8 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
              All Subscription Benefits
            </h3>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                "Unlimited resumes & cover letters",
                "500+ ATS-optimized templates",
                "AI-powered content suggestions",
                "PDF & DOCX export formats",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 rounded-lg border border-gray-200 bg-white/60 p-4 dark:border-gray-800 dark:bg-gray-900"
                >
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <span className="text-gray-800 dark:text-gray-100">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Guarantee Cards */}
            <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="bg-primary/10 dark:bg-primary/20 flex items-center space-x-3 rounded-lg border border-gray-200 p-4">
                <ShieldCheck className="h-10 w-10 text-gray-700 dark:text-gray-300" />
                <span className="text-gray-800 dark:text-gray-100">
                  7-Day Money Back Guarantee
                </span>
              </div>

              <div className="bg-primary/10 dark:bg-primary/20 flex items-center space-x-3 rounded-lg border border-gray-200 p-4">
                <LifeBuoy className="h-10 w-10 text-gray-700 dark:text-gray-300" />
                <span className="text-gray-800 dark:text-gray-100">
                  24/7 Customer Support
                </span>
              </div>
            </div>

            {/* Continue Button */}
            <PrimaryButton
              disabled={!selectedPlanId}
              onClick={handleContinue}
              fullWidth
              className={`${selectedPlanId ? "" : "cursor-not-allowed"}`}
              padding="px-10 py-4"
            >
              Continue → ₹
              {plans.find((p) => p._id === selectedPlanId)?.price || 0}
            </PrimaryButton>

            {/* Cancel Info */}
            <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
              Cancel any time from dashboard or email{" "}
              <span className="font-medium">support@yourapp.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
