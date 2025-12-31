"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is this resume builder ATS-friendly?",
    answer:
      "Yes. All templates follow modern ATS standards with clean headings, proper structure, and keyword optimization so your resume gets parsed correctly.",
  },
  {
    question: "Can I use it for free?",
    answer:
      "Absolutely. You can create and download a resume using the free plan. No credit card is required.",
  },
  {
    question: "Can I edit my resume later?",
    answer:
      "Yes. Your resumes are auto-saved to your account, so you can edit, update, or duplicate them anytime.",
  },
  {
    question: "Does it support multiple resumes?",
    answer:
      "Yes. With Pro and Lifetime plans, you can create unlimited resumes tailored for different job roles.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Your data is securely stored and never shared. We follow industry-standard security practices to protect your information.",
  },
];

export default function FAQSection() {
  return (
    <section className="relative py-24">
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
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
            Frequently asked questions
          </h2>
          <p className="mt-3 text-sm text-zinc-600 sm:text-base dark:text-white/70">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="mx-auto mt-14 max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq }: { faq: { question: string; answer: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setOpen(!open)}
      className={`cursor-pointer rounded-2xl border p-5 transition-all ${
        open
          ? "bg-primary/[0.03] ring-primary/20 border-transparent ring-1"
          : "border-zinc-200 bg-white dark:border-white/10 dark:bg-white/5"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{faq.question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </div>

      {/* Content */}
      <motion.div
        layout
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          height: open ? "auto" : 0,
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="overflow-hidden"
      >
        <p className="mt-3 text-sm text-zinc-600 dark:text-white/70">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
}
