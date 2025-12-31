"use client";

import BgGlassmorphism from "@/components/Common/BgGlassmorphism";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section className="relative container mx-auto px-4 sm:px-0">
      <div className="relative overflow-hidden rounded-[32px] border border-zinc-200 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:border-white/10 dark:from-[#0a0b14] dark:via-[#0c0d18] dark:to-[#0a0b14]">
        <BgGlassmorphism />

        {/* extra loud glows */}
        <div className="pointer-events-none absolute -top-32 right-24 h-96 w-96 rounded-full bg-fuchsia-500/30 blur-[140px]" />
        <div className="pointer-events-none absolute right-10 -bottom-40 h-96 w-96 rounded-full bg-cyan-400/30 blur-[140px]" />

        <div className="relative z-10 grid items-center gap-16 p-10 sm:p-16 md:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
              ATS-friendly · Recruiter-approved
            </span>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              Your resume deserves
              <span className="block bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
                main character energy ✨
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm text-zinc-600 sm:text-base dark:text-white/70 z-20">
              Stop sending boring resumes. Build something recruiters actually
              open, read, and shortlist.
            </p>

            <div className="mt-9 flex flex-col gap-4 lg:flex-row lg:items-center">
              <Link
                href="/app"
                className="group relative inline-flex items-center justify-center rounded-xl bg-zinc-900 px-8 py-3 text-sm font-medium text-white transition-all hover:scale-[1.02] dark:bg-white dark:text-[#070814] dark:hover:bg-zinc-200"
              >
                Build my resume free
                <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 opacity-0 blur transition group-hover:opacity-40" />
              </Link>

              <span className="text-xs text-zinc-500 dark:text-white/60">
                Free forever · No credit card · Zero stress
              </span>
            </div>
          </div>

          {/* CRINGE ILLUSTRATION (OVERFLOW TOP + BOTTOM) */}
          <div className="relative hidden md:block">
            {/* floating card */}
            <div className="absolute -top-32 -right-10 rotate-6 rounded-[26px] bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 p-[2px]">
              <div className="w-[420px] rounded-[24px] bg-white shadow-[0_50px_140px_rgba(0,0,0,0.35)] dark:bg-[#0b0c15]">
                {/* header */}
                <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 text-xs dark:border-white/10 dark:text-white/60">
                  <span>🔥 Resume Score</span>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-600">
                    92% ATS
                  </span>
                </div>

                {/* body */}
                <div className="space-y-3 p-5">
                  <div className="h-4 w-36 rounded bg-zinc-200 dark:bg-white/10" />
                  <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-white/10" />

                  <div className="space-y-2 pt-2">
                    <div className="h-2 w-full rounded bg-zinc-100 dark:bg-white/5" />
                    <div className="h-2 w-[88%] rounded bg-zinc-100 dark:bg-white/5" />
                    <div className="h-2 w-[72%] rounded bg-zinc-100 dark:bg-white/5" />
                  </div>

                  <div className="mt-4 flex gap-2">
                    <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs text-indigo-600">
                      AI Optimized
                    </span>
                    <span className="rounded-full bg-fuchsia-500/10 px-2 py-0.5 text-xs text-fuchsia-600">
                      Recruiter Loved
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* second playful card */}
            <div className="absolute right-10 lg:right-24 -bottom-36 -rotate-6 rounded-2xl bg-black px-5 py-4 text-sm text-white shadow-2xl">
              “Reviewed & parsed correctly by modern ATS systems”
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
