import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import Heading from "@/components/Common/slider/shared/Heading";

export interface SectionHowItWorkProps {
  className?: string;
  data?: {
    id: number;
    title: string;
    desc: string;
    img: string | StaticImageData;
    imgDark?: StaticImageData;
    badgeText?: string;
    isAtsPass?: boolean;
  }[];
}

const DEMO_DATA: SectionHowItWorkProps["data"] = [
  {
    id: 1,
    img: "/images/hero/HIW1.png",
    title: "Choose a template",
    desc: "Pick from clean, modern templates designed to pass applicant tracking systems.",
    badgeText: "ATS-optimized",
  },
  {
    id: 2,
    img: "/images/hero/HIW2.png",
    title: "Fill details & tailor with AI",
    desc: "Add your experience, skills, and projects. Instantly tailor your resume for each job.",
    badgeText: "ATS Pass  Auto keyword optimization",
    isAtsPass: true,
  },
  {
    id: 3,
    img: "/images/hero/HIW3.png",
    title: "Download & apply",
    desc: "Export your resume as a perfectly formatted PDF and start applying with confidence.",
    badgeText: "One-click PDF export",
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionHowItWork ${className}`}
      data-nc-id="SectionHowItWork"
    >
      <Heading
        isCenter
        desc="Create a professional, ATS-friendly resume in just a few simple steps."
      >
        How it work
      </Heading>
      <div className="relative mt-20 grid gap-20 md:grid-cols-3">
        {/* Horizontal line (md and up) */}
        <Image
          className="absolute inset-x-0 top-10 hidden md:block"
          src="/images/hero/VectorHIW.svg"
          alt=""
          width={1500}
          height={200}
        />

        {/* Vertical line (below md) */}
        <div className="absolute -top-10 left-1/2 h-[1320px] -translate-x-1/2 overflow-hidden md:hidden">
          <Image
            src="/images/hero/VectorHIW-vertical.svg"
            alt=""
            width={105}
            height={1000}
            className="h-full object-contain"
          />
        </div>

        {data.map((item) => (
          <div
            key={item.id}
            className="relative mx-auto flex max-w-xs flex-col items-center"
          >
            {item.imgDark ? (
              <>
                <Image
                  alt=""
                  src={item.img}
                  width={180}
                  height={180}
                  className="mx-auto mb-8 block max-w-[180px] dark:hidden"
                />

                <Image
                  alt=""
                  src={item.imgDark}
                  width={180}
                  height={180}
                  className="mx-auto mb-8 hidden max-w-[180px] dark:block"
                />
              </>
            ) : (
              <Image
                alt=""
                src={item.img}
                width={180}
                height={180}
                className="mx-auto mb-8 max-w-[180px]"
              />
            )}
            <div className="mt-auto text-center">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </span>
            </div>
            {/* Badge */}
            {item.badgeText && (
              <div className="mb-4 inline-block rounded-full px-3 py-1 text-center text-sm font-medium">
                {/* Split the text into two parts */}
                {item.isAtsPass ? (
                  <div className="mt-5 inline-flex items-center gap-2 text-xs text-primary">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5">
                      ATS Pass
                    </span>{" "}
                    <span className="text-primary">
                      Auto keyword optimization
                    </span>
                  </div>
                ) : (
                  <div className="mt-5 text-xs text-zinc-500 dark:text-white/80">
                    {item.badgeText}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;
