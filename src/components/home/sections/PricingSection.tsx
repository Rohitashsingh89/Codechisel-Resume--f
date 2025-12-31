"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "Forever",
    description: "For trying out the resume builder",
    features: [
      "1 resume",
      "Basic templates",
      "ATS-friendly format",
      "PDF download",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹199",
    period: "per month",
    description: "Best for active job seekers",
    features: [
      "Unlimited resumes",
      "All premium templates",
      "AI content suggestions",
      "ATS optimization",
      "Unlimited PDF downloads",
      "Resume tailoring per job",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    name: "Lifetime",
    price: "₹999",
    period: "one-time",
    description: "Pay once, use forever",
    features: [
      "Everything in Pro",
      "Lifetime access",
      "Future template updates",
      "Priority support",
    ],
    cta: "Get lifetime access",
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section className="relative">
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-sm text-zinc-600 sm:text-base dark:text-white/70">
            Start for free. Upgrade only when you’re ready.
          </p>
        </motion.div>

        {/* plans */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`relative rounded-2xl border p-6 shadow-sm transition
                ${
                  plan.highlighted
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : "border-zinc-200 bg-white dark:border-white/10 dark:bg-white/5"
                }`}
            >
              {/* badge */}
              {plan.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                  Most popular
                </span>
              )}

              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-white/60">
                {plan.description}
              </p>

              <div className="mt-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="ml-1 text-sm text-zinc-500 dark:text-white/60">
                  {plan.period}
                </span>
              </div>

              <ul className="mt-6 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/app"
                className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-3
                  text-sm font-medium transition
                  ${
                    plan.highlighted
                      ? "bg-primary text-white hover:bg-primary"
                      : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                  }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* note */}
        <p className="mt-8 text-center text-xs text-zinc-500 dark:text-white/60">
          No credit card required for free plan · Cancel anytime
        </p>
      </div>
    </section>
  );
}
