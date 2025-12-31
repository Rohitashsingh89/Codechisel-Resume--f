"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const templates = [
  {
    title: "Software Engineer",
    tag: "ATS Friendly",
  },
  {
    title: "Fresher Resume",
    tag: "Entry Level",
  },
  {
    title: "Product Manager",
    tag: "Professional",
  },
  {
    title: "Designer Resume",
    tag: "Creative",
  },
  {
    title: "Marketing Specialist",
    tag: "Modern",
  },
  {
    title: "Data Analyst",
    tag: "Tech",
  },
];

export default function TemplatesSection() {
  return (
    <section id="templates" className="relative py-24">
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
            Resume templates that recruiters love
          </h2>
          <p className="mt-3 text-sm text-zinc-600 sm:text-base dark:text-white/70">
            Professionally designed, ATS-friendly templates for every role and
            experience level.
          </p>
        </motion.div>

        {/* templates grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template, index) => (
            <motion.div
              key={template.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative rounded-2xl border border-zinc-200 bg-white p-4
                         shadow-sm transition hover:-translate-y-1 hover:shadow-md
                         dark:border-white/10 dark:bg-white/5"
            >
              {/* fake preview */}
              <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200
                              dark:from-white/10 dark:to-white/5" />

              {/* tag */}
              <span className="absolute left-4 top-4 rounded-full bg-black/70 px-2 py-0.5
                               text-xs text-white backdrop-blur dark:bg-white/80 dark:text-black">
                {template.tag}
              </span>

              {/* content */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">
                    {template.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-white/60">
                    Optimized for ATS
                  </p>
                </div>

                <ChevronRight className="h-4 w-4 text-zinc-400 transition
                                        group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="/app"
            className="inline-flex items-center rounded-xl bg-zinc-900 px-6 py-3
                       text-sm font-medium text-white hover:bg-zinc-800
                       dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Browse all templates
          </a>
        </motion.div>
      </div>
    </section>
  );
}
