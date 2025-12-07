"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastPath = pathname;

    const handler = () => {
      const nextPath = window.location.pathname;

      const blocked = ["/signin", "/login"];

      if (!blocked.includes(lastPath)) {
        sessionStorage.setItem("prev_route", lastPath);
      }

      lastPath = nextPath;
    };

    window.addEventListener("next:navigation-start", handler);

    return () => {
      window.removeEventListener("next:navigation-start", handler);
    };
  }, [pathname]);

  return null;
}
