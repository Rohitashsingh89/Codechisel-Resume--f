'use client';
import axios from 'axios';
import { useState } from 'react';

type PayResponse = { url?: string; transactionId?: string; error?: string; detail?: unknown };

export default function CheckoutButton() {
  const [amount, setAmount] = useState<number | ''>('');
  const [userId, setUserId] = useState<string>('user_123');
  const apiBase = process.env.NEXT_PUBLIC_API_BASE as string;

  const onPay = async () => {
    try {
      const payload = { amount: Number(amount), userId };
      const { data } = await axios.post<PayResponse>(`${apiBase}/v1/payments/pay`, payload);
      if (data?.url) window.location.href = data.url;
      else alert(data?.error ?? 'Failed to get redirect URL');
    } catch (e) {
      alert('Payment initiation failed');
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <input
        type="number"
        min={1}
        value={amount}
        onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
        placeholder="Amount (INR)"
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={onPay}
        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        Pay with PhonePe
      </button>
    </div>
  );
}
