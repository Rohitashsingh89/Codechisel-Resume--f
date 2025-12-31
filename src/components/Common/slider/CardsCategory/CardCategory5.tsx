import React, { FC } from "react";
import { TaxonomyType } from "@/types/slider";
import Link from "next/link";
import Image from "next/image";
import convertNumbThousand from "@/utils/convertNumbThousand";

export interface CardCategory5Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const CardCategory5: FC<CardCategory5Props> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, href = "/", thumbnail } = taxonomy;
  return (
    <Link
      href={href}
      className={`nc-CardCategory5 flex flex-col ${className}`}
      data-nc-id="CardCategory5"
    >
      <div className="group relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden rounded-2xl">
        <Image
          fill
          alt=""
          src={thumbnail || ""}
          className="rounded-2xl object-cover"
          sizes="(max-width: 400px) 100vw, 400px"
        />
        <span className="bg-opacity-10 absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-20"></span>
      </div>

      <div className="mt-4 truncate px-3">
        <h2
          className={`truncate text-base font-medium text-neutral-900 sm:text-lg dark:text-neutral-100`}
        >
          {name}
        </h2>
        <span
          className={`text-neutral-6000 mt-2 block text-sm dark:text-neutral-400`}
        >
          {convertNumbThousand(count)} properties
        </span>
      </div>
    </Link>
  );
};

export default CardCategory5;
