import { FC } from "react";
import { Star } from "lucide-react";
import { TestimonialType } from "@/types/slider";

interface Props {
  testimonial: TestimonialType;
}

const TestimonialCard: FC<Props> = ({ testimonial }) => {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition sm:p-6 lg:p-7 dark:border-white/10 dark:bg-white/5">
      {/* top */}
      <div>
        {/* stars */}
        <div className="flex items-center gap-1">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4"
            />
          ))}
        </div>

        {/* quote */}
        <p className="mt-4 text-sm break-words whitespace-normal text-zinc-700 dark:text-white/80">
          “{testimonial.quote}”
        </p>
      </div>

      {/* user */}
      <div className="mt-6 border-t border-zinc-100 pt-4 dark:border-white/10">
        <p className="text-sm leading-none font-medium">{testimonial.name}</p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-white/60">
          {testimonial.role}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
