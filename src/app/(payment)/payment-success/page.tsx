"use client";

import PaymentSuccessPage from "@/components/(payment)/PaymentSuccessPage";
import { Suspense } from "react";

export default function PaymentPage() {
  return (
    <Suspense fallback={<div> Loading reset form...</div>}>
      <PaymentSuccessPage />
    </Suspense>
  );
}