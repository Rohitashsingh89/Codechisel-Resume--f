"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
  initial?: number; // initial left width in percent
  minLeft?: number; // px
  minRight?: number; // px
  className?: string;
  onChange?: (leftPercent: number) => void;
};

const HANDLE_WIDTH_PX = 8;
const HIT_SLOP_PX = 8;

export default function ResumeResizableTwoColumn({
  left,
  right,
  initial = 50,
  minLeft = 360,
  minRight = 360,
  className = "",
  onChange,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const [leftPct, setLeftPct] = useState(initial);
  const [dragging, setDragging] = useState(false);

  const clampPercent = useCallback(
    (pct: number, containerW: number) => {
      const minLP = (minLeft / containerW) * 100;
      const minRP = (minRight / containerW) * 100;
      return Math.max(minLP, Math.min(pct, 100 - minRP));
    },
    [minLeft, minRight],
  );

  const pointToPercent = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return leftPct;
      const rect = el.getBoundingClientRect();
      const w = rect.width || 1;
      const raw = ((clientX - rect.left) / w) * 100;
      return clampPercent(raw, w);
    },
    [leftPct, clampPercent],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    if (handleRef.current) handleRef.current.setPointerCapture?.(e.pointerId);
    setDragging(true);
    const pct = pointToPercent(e.clientX);
    setLeftPct(pct);
    onChange?.(pct);
  };

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!dragging) return;
      const pct = pointToPercent(e.clientX);
      setLeftPct(pct);
      onChange?.(pct);
    },
    [dragging, pointToPercent, onChange],
  );

  const onPointerUp = useCallback(() => setDragging(false), []);

  useEffect(() => {
    if (!dragging) return;
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [dragging, onPointerMove, onPointerUp]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(() => {
      const w = el.getBoundingClientRect().width || 1;
      setLeftPct((p) => clampPercent(p, w));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [clampPercent]);

  const leftStyle = {
    flexBasis: `calc(${leftPct}% - ${HANDLE_WIDTH_PX / 2}px)`,
  };
  const rightStyle = {
    flexBasis: `calc(${100 - leftPct}% - ${HANDLE_WIDTH_PX / 2}px)`,
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex h-full min-h-[300px] w-full ${className}`}
      style={{ minWidth: minLeft + minRight + HANDLE_WIDTH_PX }}
    >
      <div
        className="no-scrollbar min-w-0 shrink-0 overflow-auto border-r border-gray-300 dark:border-gray-700"
        style={{ ...leftStyle, marginRight: "8px" }}
      >
        {left}
      </div>

      <div
        ref={handleRef}
        role="separator"
        tabIndex={0}
        aria-orientation="vertical"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(leftPct)}
        onPointerDown={onPointerDown}
        onDoubleClick={() => {
          setLeftPct(initial);
          onChange?.(initial);
        }}
        className="z-10 shrink-0 cursor-col-resize select-none"
        style={{
          width: HANDLE_WIDTH_PX,
          margin: `0 -${HIT_SLOP_PX}px`,
          padding: `0 ${HIT_SLOP_PX}px`,
          touchAction: "none",
        }}
      >
        <div
          className="mx-auto h-full rounded"
          style={{
            width: 0,
            background: dragging ? "var(--color-primary, #6366f1)" : "#d1d5db",
            transition: dragging ? "none" : "background-color 120ms ease",
          }}
        />
      </div>

      <div
        className="no-scrollbar min-w-0 shrink-0 overflow-auto border-l border-gray-300 dark:border-gray-700"
        style={{ ...rightStyle }}
      >
        {right}
      </div>
    </div>
  );
}
