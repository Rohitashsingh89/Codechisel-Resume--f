// import ScrollUp from "@/components/Common/ScrollUp";
// import Contact from "@/components/(landing-page)/Contact";
// import Features from "@/components/(landing-page)/Features";
// import Hero from "@/components/(landing-page)/Hero";
// import Testimonials from "@/components/(landing-page)/Testimonials";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Code Chisel",
//   description: "This is Home for Code Chisel",
// };

// export default function Home() {
//   return (
//     <>
//       <ScrollUp />
//       <Hero />
//       <Features />
//       {/* <Video /> */}
//       {/* <Brands /> */}
//       {/* <AboutSectionOne /> */}
//       {/* <AboutSectionTwo /> */}
//       <Testimonials />
//       {/* <Pricing /> */}
//       {/* <Blog /> */}
//       <Contact />
//     </>
//   );
// }

import React from "react";
import { TaxonomyType } from "@/types/slider";
import BgGlassmorphism from "@/components/Common/BgGlassmorphism";
import SectionSliderNewCategories from "@/components/Common/slider/SectionSliderNewCategories";
import Features from "@/components/home/sections/features";
import HowItWorks from "@/components/home/sections/HowItWorks";
import ATSSection from "@/components/home/sections/ATSSection";
import PricingSection from "@/components/home/sections/PricingSection";
import FAQSection from "@/components/home/sections/faq";
import FinalCTASection from "@/components/home/sections/FinalCTASection";
import Hero from "@/components/home/sections/hero";
import SectionSliderTestimonials from "@/components/Common/slider/shared/SectionSliderTestimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Chisel",
  description: "This is Home for Code Chisel",
};

const FEATURED_TEMP: TaxonomyType[] = [
  {
    id: "1",
    href: "/resume/profile‒executive",
    name: "Executive Leadership",
    taxonomy: "experience",
    count: 12, // years or projects
    thumbnail: "/images/templates/aspire-professional-resume-template.avif", // professional portrait example :contentReference[oaicite:1]{index=1}
  },
  {
    id: "2",
    href: "/resume/profile‒manager",
    name: "Senior Manager",
    taxonomy: "experience",
    count: 8,
    thumbnail: "/images/templates/basic-resume-template.avif", // professional portrait :contentReference[oaicite:2]{index=2}
  },
  {
    id: "3",
    href: "/resume/team‒collaboration",
    name: "Team Collaboration",
    taxonomy: "skill",
    count: 10,
    thumbnail: "/images/templates/executive-resume-template.avif", // teamwork/office concept :contentReference[oaicite:3]{index=3}
  },
  {
    id: "4",
    href: "/resume/business‒strategy",
    name: "Business Strategy",
    taxonomy: "experience",
    count: 15,
    thumbnail: "/images/templates/functional-header-resume-template.avif", // business photo :contentReference[oaicite:4]{index=4}
  },
  {
    id: "5",
    href: "/resume/innovation",
    name: "Innovation & Growth",
    taxonomy: "achievement",
    count: 7,
    thumbnail: "/images/templates/general-resume-template.avif", // professional office portrait :contentReference[oaicite:5]{index=5}
  },
  {
    id: "6",
    href: "/resume/project‒delivery",
    name: "Project Delivery",
    taxonomy: "experience",
    count: 5,
    thumbnail: "/images/templates/hybrid-resume-template.avif", // business teamwork :contentReference[oaicite:6]{index=6}
  },
  {
    id: "7",
    href: "/resume/leadership",
    name: "Leadership Development",
    taxonomy: "skill",
    count: 9,
    thumbnail: "/images/templates/minimalist-resume-template.avif", // business leader image :contentReference[oaicite:7]{index=7}
  },
];

const TESTIMONIALS = [
  {
    id: "1",
    name: "Aman Sharma",
    role: "Software Engineer",
    quote:
      "I rebuilt my resume in 10 minutes and started getting interview calls within a week.",
    rating: 5,
  },
  {
    id: "2",
    name: "Neha Verma",
    role: "Fresher",
    quote:
      "The ATS-friendly templates made a huge difference. Much better than Word or Canva.",
    rating: 5,
  },
  {
    id: "3",
    name: "Rohit Singh",
    role: "Product Manager",
    quote:
      "Clean design, easy editing, and perfect formatting. Exactly what recruiters expect.",
    rating: 4,
  },
  {
    id: "4",
    name: "Rohitash Singh",
    role: "Product Manager",
    quote:
      "Clean design, easy editing, and perfect formatting. Exactly what recruiters expect.",
    rating: 4,
  },
];

const CodeChiselLandingModern = () => {
  return (
    <>
      <div className="min-h-screen bg-white text-zinc-900 transition-colors dark:bg-[#070814] dark:text-white">
        {/* Hero */}
        <Hero />

        <Features />

        <main className="nc-PageHome relative overflow-hidden">
          <BgGlassmorphism />
          <div className="relative container mx-auto mb-24 space-y-24 px-4 pt-10 sm:px-0 lg:mb-28 lg:space-y-28 lg:pt-16">
            {/* SECTION HERO */}
            {/* <SectionHero className="pt-10 lg:pt-16 lg:pb-16" /> */}

            {/* SECTION 1 */}
            <SectionSliderNewCategories
              categoryCardType="card3"
              itemPerRow={4}
              categories={FEATURED_TEMP}
            />
          </div>
        </main>

        <HowItWorks className="container mx-auto px-4 py-10 sm:px-0" />
        <ATSSection />
        {/* <TemplatesSection /> */}
        <PricingSection />
        <SectionSliderTestimonials testimonials={TESTIMONIALS} />
        <FinalCTASection />
        <FAQSection />
      </div>
    </>
  );
};

export default CodeChiselLandingModern;
