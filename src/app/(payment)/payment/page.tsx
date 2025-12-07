import { Metadata } from "next";
import CheckoutButton from "@/components/(payments)/phonepe/CheckoutButton";

export const metadata: Metadata = {
  title: "Payment Page | Free Next.js Template for Startup and SaaS",
  description: "This is Payment Page for Startup Nextjs Template",
  // other metadata
};

const Payment = () => {
  return (
    <>
      <main className="mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <p className="text-gray-600">Enter an amount and pay via PhonePe Pay Page.</p>
      <CheckoutButton />
    </main>
    </>
  );
};

export default Payment;
