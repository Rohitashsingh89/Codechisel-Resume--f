"use client";

import React, { FC, useEffect, useState } from "react";
import Heading from "../shared/Heading";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import PrevBtn from "../shared/PrevBtn";
import NextBtn from "../shared/NextBtn";
import { useWindowSize } from "react-use";
import { variants } from "@/utils/animationVariants";
import { TestimonialType } from "@/types/slider";
import TestimonialCard from "../CardsCategory/TestimonialCard";

interface Props {
  heading?: string;
  subHeading?: string;
  testimonials: TestimonialType[];
  itemPerRow?: 1 | 2 | 3;
}

const SectionSliderTestimonials: FC<Props> = ({
  heading = "Loved by job seekers",
  subHeading = "Real stories from professionals who landed interviews",
  testimonials,
  itemPerRow = 3,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [items, setItems] = useState(1);

  const width = useWindowSize().width;

  useEffect(() => {
    if (width < 640) return setItems(1);
    if (width < 1024) return setItems(2);
    setItems(itemPerRow);
  }, [width, itemPerRow]);

  const changeIndex = (val: number) => {
    setDirection(val > currentIndex ? 1 : -1);
    setCurrentIndex(val);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      currentIndex < testimonials.length - 1 &&
      changeIndex(currentIndex + 1),
    onSwipedRight: () =>
      currentIndex > 0 && changeIndex(currentIndex - 1),
    trackMouse: true,
  });

  if (!items) return null;

  return (
    <section className="relative py-24 container mx-auto px-4 py-10 sm:px-0">
      <Heading desc={subHeading} isCenter>
        {heading}
      </Heading>

      <MotionConfig
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="relative mt-14" {...handlers}>
          <div className="overflow-hidden">
            <motion.ul className="whitespace-nowrap -mx-2 xl:-mx-4">
              <AnimatePresence initial={false} custom={direction}>
                {testimonials.map((item, index) => (
                  <motion.li
                    key={item.id}
                    className="inline-block px-2 xl:px-4"
                    custom={direction}
                    initial={{ x: `${(currentIndex - 1) * -100}%` }}
                    animate={{ x: `${currentIndex * -100}%` }}
                    variants={variants(200, 1)}
                    style={{
                      width: `calc(100% / ${items})`,
                    }}
                  >
                    <TestimonialCard testimonial={item} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>

          {currentIndex > 0 && (
            <PrevBtn
              onClick={() => changeIndex(currentIndex - 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -left-3 xl:-left-6 top-1/2 -translate-y-1/2 z-[1]"
            />
          )}

          {testimonials.length > currentIndex + items && (
            <NextBtn
              onClick={() => changeIndex(currentIndex + 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -right-3 xl:-right-6 top-1/2 -translate-y-1/2 z-[1]"
            />
          )}
        </div>
      </MotionConfig>
    </section>
  );
};

export default SectionSliderTestimonials;
