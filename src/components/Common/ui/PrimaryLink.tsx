"use client";

import Link from "next/link";
import React, { AnchorHTMLAttributes } from "react";

interface PrimaryLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  loadingText?: string;
  disabled?: boolean; // For styling only
}

// const sizeClasses: Record<string, string> = {
//   sm: "px-4 py-2 text-sm",
//   md: "px-6 py-3 text-base",
//   lg: "px-8 py-4 text-lg",
// };

const PrimaryLink: React.FC<PrimaryLinkProps> = ({
  children,
  href,
  loading = false,
  size = "md",
  className = "",
  disabled,
  loadingText,
  ...props
}) => {
  const baseStyles =
    "ease-in-up shadow-btn hover:shadow-btn-hover bg-primary hover:bg-primary/90 hidden rounded-xs px-8 py-3 text-base font-medium text-white transition duration-300 md:block md:px-9 lg:px-6 xl:px-9";

  const combinedClasses = `${baseStyles} ${className} ${
    disabled || loading ? "cursor-not-allowed opacity-50 hover:bg-primary" : ""
  }`;

  return (
    <Link href={disabled ? "#" : href} className={combinedClasses} {...props}>
      {loading ? loadingText || "Loading..." : children}
    </Link>
  );
};

export default PrimaryLink;
