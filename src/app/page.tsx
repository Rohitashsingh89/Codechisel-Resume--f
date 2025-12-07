import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/(landing-page)/Contact";
import Features from "@/components/(landing-page)/Features";
import Hero from "@/components/(landing-page)/Hero";
import Testimonials from "@/components/(landing-page)/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Chisel",
  description: "This is Home for Code Chisel",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      {/* <Video /> */}
      {/* <Brands /> */}
      {/* <AboutSectionOne /> */}
      {/* <AboutSectionTwo /> */}
      <Testimonials />
      {/* <Pricing /> */}
      {/* <Blog /> */}
      <Contact />
    </>
  );
}
