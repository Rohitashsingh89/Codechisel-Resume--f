"use client";
import React from "react";

const SectionCard = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded border border-gray-300 p-4 dark:border-gray-700 dark:bg-gray-800">
    {children}
  </div>
);

export default React.memo(SectionCard);
