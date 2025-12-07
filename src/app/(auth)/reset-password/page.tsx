'use client';

import { Suspense } from 'react';
import ResetPasswordPage from "@/components/(auth)/ResetPasswordPage";

export default function ResetPage() {
  return (
    <Suspense fallback={<div> Loading reset form...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
