"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aman Sharma",
    role: "Software Engineer",
    quote:
      "I rebuilt my resume in 10 minutes and started getting interview calls within a week.",
    rating: 5,
  },
  {
    name: "Neha Verma",
    role: "Fresher",
    quote:
      "The ATS-friendly templates made a huge difference. Much better than Word or Canva.",
    rating: 5,
  },
  {
    name: "Rohit Singh",
    role: "Product Manager",
    quote:
      "Clean design, easy editing, and perfect formatting. Exactly what recruiters expect.",
    rating: 4,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-24">
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
            Loved by job seekers
          </h2>
          <p className="mt-3 text-sm text-zinc-600 sm:text-base dark:text-white/70">
            Thousands of professionals use our resume builder to land interviews.
          </p>
        </motion.div>

        {/* testimonials */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm
                         dark:border-white/10 dark:bg-white/5"
            >
              {/* stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* quote */}
              <p className="mt-4 text-sm text-zinc-700 dark:text-white/80">
                “{t.quote}”
              </p>

              {/* user */}
              <div className="mt-6">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-zinc-500 dark:text-white/60">
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* trust line */}
        <p className="mt-10 text-center text-xs text-zinc-500 dark:text-white/60">
          ⭐ 4.8/5 average rating from 10,000+ users
        </p>
      </div>
    </section>
  );
}
