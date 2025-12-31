import React, { FC } from "react";
import { TaxonomyType } from "@/types/slider";
import convertNumbThousand from "@/utils/convertNumbThousand";
import Link from "next/link";
import Image from "next/image";

export interface CardCategory4Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const CardCategory4: FC<CardCategory4Props> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, href = "/", thumbnail, listingType } = taxonomy;
  return (
    <Link
      href={href}
      className={`nc-CardCategory4 flex flex-col ${className}`}
      data-nc-id="CardCategory4"
    >
      <div className="group relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden rounded-2xl">
        <Image
          src={thumbnail || ""}
          className="object-cover w-full h-full rounded-2xl"
          fill
          alt="archive"
          sizes="(max-width: 400px) 100vw, 400px"
        />
        <span className="opacity-0 group-hover:opacity-20 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="mt-4 px-2 truncate text-center">
        <h2
          className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
        >
          {name}
        </h2>
        <span
          className={`block mt-2 text-sm text-neutral-6000 dark:text-neutral-400`}
        >
          {convertNumbThousand(count || 0)}
          {` `}
          {(!listingType || listingType === "stay") && "properties"}
          {listingType === "car" && "cars"}
          {listingType === "experiences" && "experiences"}
        </span>
      </div>
    </Link>
  );
};

export default CardCategory4;
