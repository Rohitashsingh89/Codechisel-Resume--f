"use client";

import { ResumeData } from "@/types/resumeTemplate";
import PrimaryButton from "../../Common/ui/PrimaryButton";
import TextInput from "../resume/inputs/TextInput";

interface Step3Props {
  selectedPlanId: string;       // ⭐ use logic from first file
  resumePreview: ResumeData | null;
  onSuccess: () => void;
  onBack: () => void;
  loading: boolean;
}

export default function Step3PaymentDetails({
  selectedPlanId,
  resumePreview,
  onSuccess,
  onBack,
  loading,
}: Step3Props) {
  
  // ⭐ SAME LOGIC FROM FIRST COMPONENT
  const getPlanInfo = (planId: string) => {
    const plans: Record<string, { name: string; price: number }> = {
      "basic-plan": { name: "Basic Resume", price: 99 },
      "pro-plan": { name: "Pro Resume", price: 299 },
      "week": { name: "1 Week Access", price: 299 },
      "month": { name: "1 Month Access", price: 1999 },
    };
    return plans[planId] || { name: "Subscription", price: 0 };
  };

  const plan = getPlanInfo(selectedPlanId);

  return (
    <div className="grid items-start gap-12 lg:grid-cols-2">
      
      {/* ---------------- LEFT SIDE ---------------- */}
      <div className="space-y-10">
        
        {/* Main Heading */}
        <div>
          <h1 className="mb-4 text-4xl font-black text-slate-900 dark:text-slate-100">
            Get Your Dream Resume
          </h1>

          {/* CHECKLIST BELOW HEADING */}
          <div className="mt-6 space-y-4">

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-8 items-center justify-center rounded-md bg-green-600 text-white sm:w-6">✔</div>
              <p className="text-slate-700 dark:text-slate-400">
                Payment through a <strong>trusted payment service</strong>
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-8 items-center justify-center rounded-md bg-green-600 text-white sm:w-6">✔</div>
              <p className="text-slate-700 dark:text-slate-400">
                SSL Secure – <strong>256-bit encrypted checkout</strong>
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-green-600 text-white">✔</div>
              <p className="text-slate-700 dark:text-slate-400">
                <strong>7-day money-back guarantee</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Cancellation Info */}
        <div className="rounded-lg bg-slate-100 p-6 dark:bg-slate-800">
          <h3 className="mb-2 text-lg font-bold text-slate-800 dark:text-slate-100">
            How can I cancel?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            You can cancel anytime from your dashboard. Access stays active until period end.
          </p>
        </div>

        {/* Security Message */}
        <div className="flex items-start gap-3">
          <div className="flex h-6 w-10 items-center justify-center rounded-md bg-green-500 text-white sm:w-7">✔</div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Your payment is protected & secure — SSL encryption enabled.
          </p>
        </div>
      </div>

      {/* ---------------- RIGHT SIDE ---------------- */}
      <div className="w-full rounded-xl border border-slate-300 p-3 py-5 sm:p-10 dark:border-slate-700">

        {/* TOTAL DUE TODAY */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            Total Due Today:
          </p>

          {/* DYNAMIC PRICE FROM FIRST COMPONENT */}
          <p className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-3xl font-black text-transparent">
            ₹{plan.price}
          </p>
        </div>

        {/* PAYMENT FORM */}
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (!loading) onSuccess();
          }}
        >
          {/* Card Number */}
          <TextInput
            label="Card Number"
            required
            placeholder="1234 5678 9012 3456"
            disabled={loading}
          />

          {/* Expiry + CVV */}
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Expiry"
              required
              placeholder="MM/YY"
              disabled={loading}
            />
            <TextInput
              label="CVV"
              required
              placeholder="123"
              disabled={loading}
            />
          </div>

          {/* Name on Card */}
          <TextInput
            label="Name on Card"
            required
            placeholder="Shyam"
            disabled={loading}
          />

          {/* PAY BUTTON */}
          <PrimaryButton type="submit" disabled={loading} className="w-full">
            {loading ? "Processing Secure Payment..." : `Pay ₹${plan.price} Securely →`}
          </PrimaryButton>
        </form>

        {/* PROMOCODE */}
        <div className="mt-10 border-t border-slate-300 pt-6 dark:border-slate-700">
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Promo Code
          </label>

          <div className="flex items-center gap-3">
            <input
              className="flex-1 rounded-xs border border-gray-300 bg-transparent px-4 py-3 text-base text-gray-700 dark:border-gray-700 dark:text-gray-300"
              placeholder="Enter Promocode"
              disabled={loading}
            />
            <PrimaryButton disabled={loading}>Apply</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
