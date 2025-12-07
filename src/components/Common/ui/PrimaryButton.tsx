"use client";

import React, { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  loadingText?: string;
  fullWidth?: boolean; // full width
  padding?: string; // optional padding override
}

const sizeClasses: Record<string, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  loading = false,
  size = "md",
  className = "",
  disabled,
  loadingText,
  fullWidth = false,
  padding,
  ...props
}) => {
  const baseStyles =
    "bg-primary hover:bg-primary/90 rounded-md font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50";

  // If padding is provided, use it; otherwise, use sizeClasses
  const paddingClass = padding || sizeClasses[size];

  const combinedClasses = `${baseStyles} ${paddingClass} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  return (
    <button
      type={props.type || "button"}
      className={combinedClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? loadingText || "Loading..." : children}
    </button>
  );
};

export default PrimaryButton;
