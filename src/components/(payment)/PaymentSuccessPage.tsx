'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type VerifyResponse = { status?: 'success' | 'failed'; raw?: unknown; error?: string; detail?: unknown };

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string>('checking...');
  const [error, setError] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [errorParam, setErrorParam] = useState<string | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE as string;

  // ✅ Extract search params inside useEffect to avoid SSR issues
  useEffect(() => {
    const tx = searchParams.get('transactionId');
    const err = searchParams.get('error');
    setTransactionId(tx);
    setErrorParam(err);
  }, [searchParams]);

  // ✅ Verify payment whenever transactionId or errorParam changes
  useEffect(() => {
    if (errorParam) {
      setStatus('failed');
      setError(errorParam);
      return;
    }
    if (!transactionId) return;

    (async () => {
      try {
        const { data } = await axios.post<VerifyResponse>(
          `${apiBase}/v1/payments/verify`,
          { transactionId }
        );
        setStatus(data?.status ?? 'failed');
      } catch {
        setStatus('failed');
        setError('verify-error');
      }
    })();
  }, [transactionId, errorParam, apiBase]);

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Payment Status</h1>
      <p className="text-gray-700">Status: {status}</p>
      {error ? <p className="text-red-600">Error: {error}</p> : null}
    </main>
  );
}
