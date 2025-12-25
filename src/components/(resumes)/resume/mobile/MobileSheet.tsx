// components/resume/MobileSheet.tsx
"use client";

import React, { useEffect, useRef } from "react";

export default function MobileSheet({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const firstOpenRef = useRef(false);
  // Body lock (cross‑browser + iOS)
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY || 0;
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverscroll = html.style.overscrollBehavior;
    html.style.overscrollBehavior = "none";

    const prevBody = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      body.style.position = prevBody.position;
      body.style.top = prevBody.top;
      body.style.left = prevBody.left;
      body.style.right = prevBody.right;
      body.style.width = prevBody.width;
      html.style.overscrollBehavior = prevHtmlOverscroll;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (!firstOpenRef.current) {
      firstOpenRef.current = true;
      panelRef.current?.focus();
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" aria-hidden={!open}>
      {/* Backdrop: block touch so page behind cannot scroll */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        onTouchMove={(e) => e.preventDefault()}
        style={{ touchAction: "none" }}
      />

      {/* Panel: FLEX COLUMN + constrained height */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={panelRef}
        tabIndex={-1}
        className="absolute inset-x-0 bottom-0 flex max-h-[90vh] w-full flex-col rounded-t-2xl bg-white shadow-2xl transition-transform duration-200 ease-out outline-none dark:bg-gray-900"
        style={{ transform: "translateY(0%)" }}
      >
        <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 active:scale-95 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Scrollable content: min-h-0 is CRITICAL in flex for scrolling */}
        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
