import Image from "next/image";
import Container from "./container";
import Button from "./button";
import { Check, ChevronRight, Linkedin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-10">
      {/* gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/25 via-fuchsia-500/20 to-cyan-400/20 blur-3xl dark:from-indigo-500/25 dark:via-fuchsia-500/20 dark:to-cyan-400/15" />
        <div className="absolute bottom-0 left-0 h-64 w-full bg-gradient-to-b from-transparent to-white dark:to-[#070814]" />
      </div>

      <div className="relative container mx-auto grid items-center px-4 py-16 sm:px-0 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs text-zinc-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/80">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            ATS-friendly templates + one-click export
          </div>

          <h1 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Build an ATS-friendly resume that gets callbacks,
            <span className="block">not just compliments.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-pretty text-zinc-600 sm:text-base dark:text-white/70">
            Create a clean, modern, ATS-optimized resume in minutes. Perfect for
            freshers, developers, and working professionals.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              id="get-started"
              href="/app"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-[#070814] dark:hover:bg-zinc-200"
            >
              Build resume free
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>

            <a
              href="#templates"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              View templates
            </a>
          </div>
          <div className="mt-3 text-xs text-zinc-500 dark:text-white/60">
            · No credit card required · Free forever plan available
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-500 dark:text-white/60">
            <div className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              Auto formatting
            </div>
            <div className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              ATS optimized
            </div>
            <div className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              One-click PDF export
            </div>
          </div>

          {/* logos */}
          <p className="mt-4 mb-2 text-xs tracking-wide text-zinc-500 uppercase dark:text-white/50">
            Resumes trusted by professionals hired at
          </p>

          <div className="mb-5 flex flex-wrap items-center gap-x-8 gap-y-4 opacity-70 lg:mb-0">
            <Linkedin className="h-6 w-20" strokeWidth={1.5} />
            <div className="text-lg font-semibold tracking-tight">Meta</div>
            <div className="text-lg font-semibold tracking-widest">TESLA</div>
            <div className="text-lg font-semibold">shopify</div>
          </div>
        </div>

        {/* Right mock */}
        <div className="relative">
          <div className="mx-auto max-w-md rounded-2xl border border-zinc-200 bg-white lg:max-w-none dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 text-xs text-zinc-500 dark:border-white/10 dark:text-white/60">
              <span>Resume editor</span>
              <span>Saved automatically</span>
            </div>

            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <div className="space-y-2">
                {[
                  "Profile",
                  "Summary",
                  "Experience",
                  "Projects",
                  "Education",
                  "Skills",
                ].map((x) => (
                  <div
                    key={x}
                    className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
                  >
                    {x}
                  </div>
                ))}
                <button className="w-full rounded-xl border border-dashed border-zinc-300 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-white/20 dark:text-white/70 dark:hover:bg-white/10">
                  + Add section
                </button>
              </div>

              <div className="rounded-xl bg-zinc-50 p-4 text-zinc-900 dark:bg-white/5 dark:text-zinc-900">
                <div className="text-base font-bold dark:text-white/80">
                  John Deo
                </div>
                <div className="mt-1 text-xs text-zinc-600 dark:text-white/60">
                  Full Stack Developer
                </div>
                <div className="mt-4 text-xs font-semibold dark:text-white/80">
                  Professional Summary
                </div>
                <p className="mt-2 text-[11px] leading-relaxed dark:text-white/60">
                  Full-stack engineer building production-grade apps with
                  React/Next.js, Node.js, and TypeScript. Focused on clean UI,
                  performance, and shipping fast.
                </p>

                <div className="mt-4 text-xs font-semibold dark:text-white/80">
                  Experience
                </div>
                <div className="mt-2 text-[11px] text-zinc-700">
                  <div className="font-medium text-zinc-900 dark:text-white/60">
                    Software Engineer — AVL
                  </div>
                  <div className="text-zinc-600 dark:text-white/60">
                    Jan 2021 — Present
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* floating badge */}
          <div className="absolute top-10 -right-4 hidden w-56 rounded-2xl border border-zinc-200 bg-white p-4 text-sm lg:block dark:border-white/10 dark:bg-white/5 dark:text-white/80">
            <div className="text-xs text-zinc-500 dark:text-white/60">Tip</div>
            <div className="mt-2 font-medium">Tailor resume per job</div>
            <div className="mt-1 text-xs text-zinc-500 dark:text-white/60">
              Add keywords from the job description to pass ATS filters.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
