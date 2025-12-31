import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { TaxonomyType } from "@/types/slider";

export interface CardCategory1Props {
  className?: string;
  taxonomy: TaxonomyType;
  size?: "large" | "normal";
}

const CardCategory1: FC<CardCategory1Props> = ({
  className = "",
  size = "normal",
  taxonomy,
}) => {
  const { count, name, href = "/", thumbnail } = taxonomy;

  const imgSize = size === "large" ? 80 : 48;

  return (
    <Link
      href={href}
      className={`nc-CardCategory1 flex items-center ${className}`}
      data-nc-id="CardCategory1"
    >
      <div className="flex-shrink-0 mr-4">
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={name}
            width={imgSize}
            height={imgSize}
            className="rounded-lg object-cover"
          />
        )}
      </div>

      <div>
        <h2
          className={`${
            size === "large" ? "text-lg" : "text-base"
          } font-semibold text-neutral-900 dark:text-neutral-100`}
        >
          {name}
        </h2>
        <span
          className={`${
            size === "large" ? "text-sm" : "text-xs"
          } block mt-[2px] text-neutral-500 dark:text-neutral-400`}
        >
          {count} Articles
        </span>
      </div>
    </Link>
  );
};

export default CardCategory1;
