"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Container from "./container";
import Button from "./button";

type Tab = "cv" | "cover" | "resume";

export default function Templates() {
  const [tab, setTab] = useState<Tab>("cv");
  const [idx, setIdx] = useState(0);

  const items = useMemo(() => {
    // Use same set for demo; you can split per tab.
    return [
      { src: "/images/templates/aspire-professional-resume-template.avif", alt: "Template 1" },
      { src: "/images/templates/basic-resume-template.avif", alt: "Template 2" },
      { src: "/images/templates/hybrid-resume-template.avif", alt: "Template 3" },
      { src: "/images/templates/simple-resume-template.avif", alt: "Template 4" },
    ];
  }, []);

  const visible = items.slice(idx, idx + 4);

  return (
    <section id="templates" className="bg-white">
      <Container className="py-14">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">Our Creative Templates</h2>
          <p className="mt-2 text-slate-600">
            Unlock Your Potential with Intuitive Tools to Effortlessly Craft a Standout CV
          </p>

          <div className="mt-6 inline-flex rounded-full bg-slate-50 border border-slate-200 p-1">
            <button
              onClick={() => setTab("cv")}
              className={`px-4 py-2 text-sm rounded-full transition ${
                tab === "cv" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-white"
              }`}
            >
              CV Example
            </button>
            <button
              onClick={() => setTab("cover")}
              className={`px-4 py-2 text-sm rounded-full transition ${
                tab === "cover" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-white"
              }`}
            >
              Cover Letter Examples
            </button>
            <button
              onClick={() => setTab("resume")}
              className={`px-4 py-2 text-sm rounded-full transition ${
                tab === "resume" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-white"
              }`}
            >
              Resume Example
            </button>
          </div>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visible.map((t) => (
              <div
                key={t.src}
                className="rounded-2xl bg-white border border-slate-100 shadow-soft overflow-hidden"
              >
                <div className="relative aspect-[3/4]">
                  <Image src={t.src} alt={t.alt} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setIdx((v) => Math.max(0, v - 1))}
              className="h-10 w-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50"
              aria-label="Previous"
            >
              ←
            </button>
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3].map((d) => (
                <span
                  key={d}
                  className={`h-2 w-2 rounded-full ${
                    d === (idx % 4) ? "bg-slate-900" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIdx((v) => Math.min(items.length - 4, v + 1))}
              className="h-10 w-10 rounded-full border border-slate-200 bg-slate-900 text-white hover:bg-slate-800"
              aria-label="Next"
            >
              →
            </button>
          </div>

          <div className="mt-8 text-center">
            <Button href="/templates">Browse all templates</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
