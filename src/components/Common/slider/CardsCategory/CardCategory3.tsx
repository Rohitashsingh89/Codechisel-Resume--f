import React, { FC } from "react";
import { TaxonomyType } from "@/types/slider";
import Link from "next/link";
import Image from "next/image";
import convertNumbThousand from "@/utils/convertNumbThousand";

export interface CardCategory3Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const CardCategory3: FC<CardCategory3Props> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, href = "/", thumbnail } = taxonomy;
  return (
    <Link href={href} className={`nc-CardCategory3 flex flex-col ${className}`}>
      <div className="group relative aspect-square w-full flex-shrink-0 overflow-hidden rounded-2xl sm:aspect-[5/6]">
        <Image
          src={thumbnail}
          alt={name}
          fill
          className="rounded-2xl bg-gray-100 object-contain"
        />

        <span className="bg-opacity-10 absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-20"></span>
      </div>

      <div className="mt-4 truncate">
        <h2
          className={`truncate text-base font-medium text-neutral-900 sm:text-lg dark:text-neutral-100`}
        >
          {name}
        </h2>
        <span
          className={`text-neutral-6000 mt-1.5 block text-sm dark:text-neutral-400`}
        >
          {convertNumbThousand(count || 0)} properties
        </span>
      </div>
    </Link>
  );
};

export default CardCategory3;
