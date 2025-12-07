import AboutSectionOne from "@/components/(landing-page)/About/AboutSectionOne";
import AboutSectionTwo from "@/components/(landing-page)/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | Code Chisel",
  description: "Code Chisel is an online platform to practice coding problems, prepare for tech interviews, and sharpen your problem-solving skills.",
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description="Code Chisel is your companion on the journey to mastering data structures, algorithms, and coding interviews. Built by developers, for developers — it's fast, focused, and built to help you level up."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
