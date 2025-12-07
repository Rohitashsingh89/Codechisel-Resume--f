import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl leading-tight font-bold text-black sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight dark:text-white">
                  Practice DSA with Real Interview-Level Problems
                </h1>
                <p className="text-body-color dark:text-body-color-dark mb-12 text-base leading-relaxed! sm:text-lg md:text-xl">
                  A free, open-source platform to solve hundreds of curated
                  coding problems. Categorized by difficulty and topics,
                  designed to help you crack top tech interviews like at Google,
                  Amazon, and more.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <Link
                    href="/problems"
                    className="bg-primary hover:bg-primary/80 rounded-xs px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out"
                  >
                    🚀 View Problems
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-block rounded-xs bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            {" "}
            <defs>
              {" "}
              <radialGradient
                id="devPulseFill"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(320 140) scale(200)"
              >
                {" "}
                <stop
                  offset="0%"
                  stopColor="var(--color-primary)"
                  stopOpacity="0.45"
                />{" "}
                <stop offset="35%" stopColor="var(--color-primary)" stopOpacity="0.25" />{" "}
                <stop
                  offset="100%"
                  stopColor="var(--color-primary)"
                  stopOpacity="0"
                />{" "}
              </radialGradient>{" "}
              <linearGradient
                id="devPulseRing"
                x1="220"
                y1="40"
                x2="420"
                y2="340"
                gradientUnits="userSpaceOnUse"
              >
                {" "}
                <stop
                  offset="0%"
                  stopColor="var(--color-primary)"
                  stopOpacity="0.7"
                />{" "}
                <stop
                  offset="100%"
                  stopColor="var(--color-primary)"
                  stopOpacity="0.3"
                />{" "}
              </linearGradient>{" "}
            </defs>{" "}
            <g opacity="0.9">
              {" "}
              <circle
                cx="320"
                cy="140"
                r="200"
                fill="url(#devPulseFill)"
              />{" "}
              <circle
                cx="320"
                cy="140"
                r="150"
                fill="none"
                stroke="url(#devPulseRing)"
                strokeWidth="1.25"
                vectorEffect="non-scaling-stroke"
              />{" "}
              <circle
                cx="320"
                cy="140"
                r="100"
                fill="none"
                stroke="url(#devPulseRing)"
                strokeWidth="1.25"
                strokeOpacity="0.7"
                vectorEffect="non-scaling-stroke"
              />{" "}
              <circle
                cx="320"
                cy="140"
                r="3.5"
                fill="var(--color-primary)"
                opacity="0.95"
              />{" "}
            </g>{" "}
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            {" "}
            <defs>
              {" "}
              <linearGradient
                id="meshStroke"
                x1="0"
                y1="0"
                x2="364"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                {" "}
                <stop
                  offset="0%"
                  stopColor="var(--color-primary)"
                  stopOpacity="0.7"
                />{" "}
                <stop
                  offset="100%"
                  stopColor="var(--color-primary)"
                  stopOpacity="0.5"
                />{" "}
              </linearGradient>{" "}
              <radialGradient
                id="meshFade"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(182 100) scale(210)"
              >
                {" "}
                <stop offset="65%" stopColor="white" stopOpacity="1" />{" "}
                <stop offset="100%" stopColor="white" stopOpacity="0" />{" "}
              </radialGradient>{" "}
              <mask id="meshMask">
                {" "}
                <rect width="364" height="201" fill="url(#meshFade)" />{" "}
              </mask>{" "}
            </defs>{" "}
            <g
              mask="url(#meshMask)"
              stroke="url(#meshStroke)"
              fill="none"
              strokeWidth="1.1"
              vectorEffect="non-scaling-stroke"
            >
              {" "}
              <path
                d="M0 42 C60 14 120 74 182 42 S302 14 364 42"
                strokeOpacity="0.65"
              />{" "}
              <path
                d="M0 80 C60 52 120 112 182 80 S302 52 364 80"
                strokeOpacity="0.5"
              />{" "}
              <path
                d="M0 118 C60 90 120 150 182 118 S302 90 364 118"
                strokeOpacity="0.4"
              />{" "}
              <path
                d="M0 156 C60 128 120 188 182 156 S302 128 364 156"
                strokeOpacity="0.3"
              />{" "}
            </g>{" "}
          </svg>
        </div>
      </section>
    </>
  );
};

export default Hero;
