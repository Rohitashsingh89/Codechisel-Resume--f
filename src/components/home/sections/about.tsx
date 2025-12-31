import Image from "next/image";
import Container from "./container";
import Button from "./button";

export default function About() {
  return (
    <section
      id="about"
      className="bg-white dark:bg-slate-950 transition-colors"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-0 py-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-[28px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800" />
            <Image
              src="/images/hero/about.png"
              alt="About illustration"
              width={900}
              height={650}
              className="relative rounded-2xl w-full h-auto"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              About Us
            </h2>

            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              We are dedicated to empowering job seekers to achieve their career goals with confidence.
              As a leading CV maker platform, we combine cutting-edge technology with industry insights
              from hiring professionals to deliver an intuitive and effective experience.
            </p>

            {/* List */}
            <ul className="mt-5 space-y-3 text-slate-700 dark:text-slate-300">
              {[
                "User-Centric Design",
                "Expertly Crafted Templates",
                "Professional Insights",
                "Commitment to Success",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-5 w-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs flex items-center justify-center">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-7">
              <Button href="#templates" className="px-6">
                Try it now
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
