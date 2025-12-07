"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function usePreviousRoute() {
  const pathname = usePathname();
  const [prev, setPrev] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const last = sessionStorage.getItem("prev_route");
    setPrev(last);

    sessionStorage.setItem("prev_route", pathname);
  }, [pathname]);

  return prev;
}
