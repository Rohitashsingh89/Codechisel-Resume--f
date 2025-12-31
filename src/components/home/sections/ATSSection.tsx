"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function ATSSection() {
  return (
    <section className="relative py-24">
      {/* background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              ATS Optimized
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Built to pass ATS,
              <span className="block">designed to impress recruiters</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm text-zinc-600 sm:text-base dark:text-white/70">
              Our resume builder follows modern applicant tracking system
              standards — ensuring your resume gets parsed correctly and
              shortlisted faster.
            </p>

            <ul className="mt-8 space-y-4 text-sm text-zinc-700 dark:text-white/80">
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 text-primary" />
                Clean headings & structure that ATS can easily scan
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 text-primary" />
                Automatic keyword optimization from job descriptions
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 text-primary" />
                No tables, columns, or graphics that break parsing
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 text-primary" />
                Tested with popular ATS platforms used by recruiters
              </li>
            </ul>
          </motion.div>

          {/* RIGHT VISUAL CARD */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-white/60">
                <span>ATS Compatibility</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                  Excellent
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <ATSRow label="Resume structure" value="Optimized" />
                <ATSRow label="Keyword match" value="High" />
                <ATSRow label="Formatting issues" value="None" />
                <ATSRow label="Parsing accuracy" value="98%" />
              </div>

              <div className="mt-6 rounded-xl bg-primary/10 px-4 py-3 text-xs text-primary dark:bg-primary/10">
                ✔ This resume is ready for most ATS systems
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ATSRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2 text-sm dark:bg-white/5">
      <span className="text-zinc-600 dark:text-white/70">
        {label}
      </span>
      <span className="font-medium text-zinc-900 dark:text-white">
        {value}
      </span>
    </div>
  );
}
