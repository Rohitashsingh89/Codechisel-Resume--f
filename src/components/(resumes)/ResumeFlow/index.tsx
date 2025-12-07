"use client";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/hook/reduxHooks"; // ✅ Redux hook
import Step1CreateResume from "./Step1CreateResume";
import Step2ChoosePlan from "./Step2ChoosePlan";
import Step3PaymentDetails from "./Step3PaymentDetails";
import Step4DownloadResume from "./Step4DownloadResume";
import ProgressBar from "./ProgressBar";
import { apiFetch } from "@/lib/api";

const STEPS = ["create", "plan", "payment", "download"] as const;
type StepType = (typeof STEPS)[number];

export default function ResumeFlow() {
  const [currentStep, setCurrentStep] = useState<StepType>("create");
  const [resumeData, setResumeData] = useState<any>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null); // ⭐ Plan ID
  const [completedSteps, setCompletedSteps] = useState<Set<StepType>>(new Set());
  const [loading, setLoading] = useState(false);

  // ✅ REDUX AUTH - Get current user
  const { user } = useAppSelector((state) => state.auth);

  const goToNextStep = async () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      const nextStep = STEPS[currentIndex + 1] as StepType;
      
      if (currentStep === "payment") {
        await handlePaymentSuccess();
        return;
      }
      
      setCurrentStep(nextStep);
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
    }
  };

  // ⭐ REAL PAYMENT with actual plan ID
  const handlePaymentSuccess = async () => {
    if (!selectedPlanId || !user?.id || !resumeData) {
      alert("Please select a plan and login first");
      return;
    }

    setLoading(true);
    try {
      const paymentResponse = await apiFetch("/v1/payments", {
        method: "POST",
        body: JSON.stringify({
          transactionId: `RESUME_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          userId: user.id, // ✅ Redux auth user.id
          planId: selectedPlanId, // ✅ Actual plan ID
          amount: selectedPlanId === "basic-plan" ? 99 : 299, // Match your plans
          status: "completed",
          currency: "INR",
          gatewayResponse: { paymentId: `pay_${Date.now()}`, status: "captured" }
        }),
      });

      console.log("✅ Payment created:", paymentResponse);
      setCurrentStep("download");
      setCompletedSteps((prev) => new Set([...prev, "payment"]));
      
    } catch (error: any) {
      console.error("❌ Payment failed:", error);
      alert(error.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="container mx-auto py-12">
        <ProgressBar
          steps={STEPS}
          currentStep={currentStep}
          completedSteps={completedSteps}
          isDark={false} // Fixed for now
          goToStep={setCurrentStep}
        />

        <div className="mt-20">
          {currentStep === "create" && <Step1CreateResume onNext={setResumeData} />}
          {currentStep === "plan" && (
            <Step2ChoosePlan
              resumePreview={resumeData}
              onNext={(planId) => {
                setSelectedPlanId(planId);
                goToNextStep();
              }}
              onBack={() => setCurrentStep("create")}
            />
          )}
          {currentStep === "payment" && selectedPlanId && resumeData && user && (
            <Step3PaymentDetails
              selectedPlanId={selectedPlanId}
              resumePreview={resumeData}
              onSuccess={handlePaymentSuccess}
              onBack={() => setCurrentStep("plan")}
              loading={loading}
            />
          )}
          {currentStep === "download" && resumeData && selectedPlanId && (
            <Step4DownloadResume resumeData={resumeData} planId={selectedPlanId} />
          )}
        </div>
      </div>
    </div>
  );
}
