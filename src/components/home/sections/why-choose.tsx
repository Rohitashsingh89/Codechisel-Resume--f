import Image from "next/image";
import Container from "./container";
import Button from "./button";

const points = [
  "Expert-Designed Tools",
  "Recruiter-Approved Templates",
  "Intuitive Experience",
  "Time-Saving Efficiency",
];

export default function WhyChoose() {
  return (
    <section className="bg-white dark:bg-slate-950 transition-colors">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-0 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Why Choose Our Platform?
            </h2>

            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              Elevate your career with our intuitive CV builder, designed by industry experts to
              simplify the resume creation process. Our platform offers step-by-step tools,
              recruiter-approved templates, and tailored guidance to ensure your CV stands out.
            </p>

            {/* Points */}
            <ul className="mt-6 space-y-3">
              {points.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
                >
                  <span className="mt-1 h-5 w-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs flex items-center justify-center">
                    ✓
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-7">
              <Button href="#templates">Try it now</Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-[28px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800" />
            <Image
              src="/images/hero/why-ch.png"
              alt="Why choose illustration"
              width={900}
              height={650}
              className="relative rounded-2xl w-full h-auto"
            />
          </div>

        </div>
      </div>

      {/* Divider */}
      {/* <div className="h-10 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800" /> */}
    </section>
  );
}
