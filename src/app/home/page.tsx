import React from "react";
import { Check, ChevronRight, Linkedin } from "lucide-react";
// import ThemeToggler from "@/components/(landing-page)/Header/ThemeToggler";

const CodeChiselLandingModern = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 transition-colors dark:bg-[#070814] dark:text-white">
      {/* Top bar */}
      {/* <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-[#070814]/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-[#070814]">
              <span className="text-sm font-semibold">RC</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">ResumeCraft</div>
              <div className="text-xs text-zinc-500 dark:text-white/60">
                Build. Tailor. Export.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-6 text-sm text-zinc-600 md:flex dark:text-white/70">
              <a
                className="hover:text-zinc-900 dark:hover:text-white"
                href="#features"
              >
                Features
              </a>
              <a
                className="hover:text-zinc-900 dark:hover:text-white"
                href="#templates"
              >
                Templates
              </a>
              <a
                className="hover:text-zinc-900 dark:hover:text-white"
                href="#pricing"
              >
                Pricing
              </a>
              <a
                className="hover:text-zinc-900 dark:hover:text-white"
                href="#faq"
              >
                FAQ
              </a>
            </nav>

            <ThemeToggler />

            <a
              href="#get-started"
              className="hidden rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 sm:inline-flex dark:bg-white dark:text-[#070814] dark:hover:bg-zinc-200"
            >
              Get started
            </a>
          </div>
        </div>
      </header> */}

      {/* Hero */}
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
              Build a resume that gets callbacks,{" "}
              <span className="block">not just compliments.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-pretty text-zinc-600 sm:text-base dark:text-white/70">
              Create a clean, modern resume in minutes. Tailor it per job, keep
              everything auto-saved, and export as PDF with perfect formatting.
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

              <div className="text-xs text-zinc-500 dark:text-white/60">
                No credit card required.
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-500 dark:text-white/60">
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
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 opacity-70">
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

                <div className="rounded-xl bg-zinc-50 p-4 text-zinc-900 dark:bg-white dark:text-zinc-900">
                  <div className="text-base font-bold">Rohitash Singh</div>
                  <div className="mt-1 text-xs text-zinc-600">
                    Full Stack Developer
                  </div>
                  <div className="mt-4 text-xs font-semibold">
                    Professional Summary
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-zinc-700">
                    Full-stack engineer building production-grade apps with
                    React/Next.js, Node.js, and TypeScript. Focused on clean UI,
                    performance, and shipping fast.
                  </p>

                  <div className="mt-4 text-xs font-semibold">Experience</div>
                  <div className="mt-2 text-[11px] text-zinc-700">
                    <div className="font-medium text-zinc-900">
                      Software Engineer — AVL
                    </div>
                    <div className="text-zinc-600">Jan 2021 — Present</div>
                  </div>
                </div>
              </div>
            </div>

            {/* floating badge */}
            <div className="absolute top-10 -right-4 hidden w-56 rounded-2xl border border-zinc-200 bg-white p-4 text-sm lg:block dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <div className="text-xs text-zinc-500 dark:text-white/60">
                Tip
              </div>
              <div className="mt-2 font-medium">Tailor resume per job</div>
              <div className="mt-1 text-xs text-zinc-500 dark:text-white/60">
                Add keywords from the job description to pass ATS filters.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-zinc-200/70 py-16 dark:border-white/10"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-3xl font-semibold tracking-tight">
              Everything needed to ship a standout resume.
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-600 dark:text-white/70">
              Clean templates, fast editing, and exports that don’t break
              formatting.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Modern templates",
                desc: "Minimal, recruiter-friendly designs with consistent spacing and typography.",
              },
              {
                title: "Smart sections",
                desc: "Projects, skills, links, achievements—add/remove in one click.",
              },
              {
                title: "Pixel-perfect export",
                desc: "Export PDF with stable layout and clean margins every time.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="text-lg font-semibold">{f.title}</div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-white/70">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Templates that look premium.
              </h2>
              <p className="mt-3 max-w-2xl text-zinc-600 dark:text-white/70">
                Add 6–10 templates and show small thumbnails; conversions
                improve when users can “see it”.
              </p>
            </div>
            <a
              href="/templates"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Browse all templates <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-white/5"
              >
                <div className="h-48 bg-gradient-to-br from-zinc-100 to-white dark:from-white/10 dark:to-white/5" />
                <div className="p-5">
                  <div className="text-sm font-semibold">Template {i}</div>
                  <div className="mt-1 text-xs text-zinc-500 dark:text-white/60">
                    Best for: Software • Product • Fresher
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="border-t border-zinc-200/70 py-16 dark:border-white/10"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight">
            Simple pricing.
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-600 dark:text-white/70">
            Keep a strong free plan; upsell with premium templates + multiple
            exports + cover letter.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Free",
                price: "₹0",
                points: ["1 resume", "Basic templates", "PDF export"],
              },
              {
                name: "Pro",
                price: "₹199/mo",
                points: ["Unlimited resumes", "All templates", "ATS checks"],
              },
              {
                name: "Lifetime",
                price: "₹999",
                points: [
                  "Everything in Pro",
                  "Future templates",
                  "Priority support",
                ],
              },
            ].map((p, idx) => (
              <div
                key={p.name}
                className={[
                  "rounded-2xl border p-6",
                  idx === 1
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-[#070814]"
                    : "border-zinc-200 bg-white dark:border-white/10 dark:bg-white/5",
                ].join(" ")}
              >
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="mt-2 text-3xl font-semibold">{p.price}</div>
                <ul className="mt-5 space-y-2 text-sm opacity-90">
                  {p.points.map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-emerald-500" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/app"
                  className={[
                    "mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-medium",
                    idx === 1
                      ? "bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-[#070814] dark:text-white dark:hover:bg-[#0b0c1a]"
                      : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-[#070814] dark:hover:bg-zinc-200",
                  ].join(" ")}
                >
                  Choose {p.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight">FAQ</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              {
                q: "Is it ATS-friendly?",
                a: "Yes—templates keep structure clean with readable fonts and spacing.",
              },
              {
                q: "Can I export PDF?",
                a: "Yes—one-click export with stable margins and consistent layout.",
              },
              {
                q: "Do you save my data?",
                a: "Auto-save in your account; add clear privacy copy on the page.",
              },
              {
                q: "Can I customize sections?",
                a: "Add, remove, reorder sections anytime—projects, skills, links, etc.",
              },
            ].map((x) => (
              <div
                key={x.q}
                className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-white/5"
              >
                <div className="text-sm font-semibold">{x.q}</div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-white/70">
                  {x.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-zinc-200/70 py-16 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-10 dark:border-white/10 dark:bg-white/5">
            <h2 className="text-3xl font-semibold tracking-tight">
              Ready to build a resume recruiters actually read?
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-600 dark:text-white/70">
              Start free, pick a template, and export in minutes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/app"
                className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-[#070814] dark:hover:bg-zinc-200"
              >
                Get started for free
              </a>
              <a
                href="/templates"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                See templates
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CodeChiselLandingModern;
