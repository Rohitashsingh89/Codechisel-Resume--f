"use client";
import { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "Is it ATS-friendly?",
    answer:
      "Yes—our templates keep structure clean with readable fonts and spacing, making them fully compatible with Applicant Tracking Systems (ATS).",
  },
  {
    id: 2,
    question: "Can I export PDF?",
    answer:
      "Absolutely! One-click export ensures stable margins, consistent layout, and professional formatting.",
  },
  {
    id: 3,
    question: "Do you save my data?",
    answer:
      "Auto-save functionality ensures your work is securely stored in your account. Your privacy is our top priority.",
  },
  {
    id: 4,
    question: "Can I customize sections?",
    answer:
      "Yes! Add, remove, or reorder sections anytime—projects, skills, links, and more, fully customizable.",
  },
];

const FAQAccordion = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="container mx-auto px-4 pt-16 sm:px-0">
      <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-10 dark:border-white/10 dark:bg-white/5">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-slate-600 dark:text-white/70">
            Find Answers and Explore Tools to Effortlessly Craft Your
            Professional CV
          </p>
        </div>
        <div className="mt-8 space-y-4">
          {FAQ_DATA.map((item) => {
            const isOpen = item.id === openId;
            return (
              <div
                key={item.id}
                className={`overflow-hidden rounded-2xl border bg-white dark:bg-white/5 ${
                  isOpen
                    ? "border-primary dark:border-primary"
                    : "border-zinc-200 dark:border-white/10"
                }`}
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.question}
                  </span>
                  {/* Circle with + / - */}
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-300 ${
                      isOpen
                        ? "border-primary dark:border-primary text-primary dark:text-primary"
                        : "border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`px-6 text-sm text-gray-600 transition-all duration-300 dark:text-white/70 ${
                    isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
