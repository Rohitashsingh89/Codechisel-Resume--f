'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

// Draggable, responsive two-column splitter using Pointer Events.
// Enforces min widths for both panes and exposes a keyboard-friendly separator role.

const HANDLE_WIDTH_PX = 8; // visible handle width
const HIT_SLOP_PX = 8;     // extra hit area, without shifting layout

export default function ResizableTwoColumn({
  left,
  right,
  initial = 50,     // initial left width in percent
  minLeft = 320,    // px
  minRight = 320,   // px
  className = '',
  onChange,         // optional: (leftPercent:number) => void
}) {
  const containerRef = useRef(null);
  const handleRef = useRef(null);
  const [leftPct, setLeftPct] = useState(initial);
  const [dragging, setDragging] = useState(false);

  const clampPercent = useCallback((pct, containerW) => {
    const minLP = (minLeft / containerW) * 100;
    const minRP = (minRight / containerW) * 100;
    return Math.max(minLP, Math.min(pct, 100 - minRP));
  }, [minLeft, minRight]);

  const pointToPercent = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return leftPct;
    const rect = el.getBoundingClientRect();
    const w = rect.width || 1;
    const raw = ((clientX - rect.left) / w) * 100;
    return clampPercent(raw, w);
  }, [leftPct, clampPercent]);

  // Start drag (Pointer Events unify mouse/touch/pen)
  const onPointerDown = (e) => {
    if (handleRef.current) {
      handleRef.current.setPointerCapture?.(e.pointerId);
    }
    setDragging(true);
    const pct = pointToPercent(e.clientX);
    setLeftPct(pct);
    onChange?.(pct);
  };

  // Move and end handlers
  const onPointerMove = useCallback((e) => {
    if (!dragging) return;
    const pct = pointToPercent(e.clientX);
    setLeftPct(pct);
    onChange?.(pct);
  }, [dragging, pointToPercent, onChange]);

  const onPointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    // Listen on window so we keep resizing even if pointer exits the handle area
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [dragging, onPointerMove, onPointerUp]);

  // Keep percentage stable across container resizes while min px still enforced
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

  // Compute flex-basis for left/right, subtracting half handle width to keep total at 100%
  const leftStyle  = { flexBasis: `calc(${leftPct}% - ${HANDLE_WIDTH_PX / 2}px)` };
  const rightStyle = { flexBasis: `calc(${100 - leftPct}% - ${HANDLE_WIDTH_PX / 2}px)` };

  return (
    <div
      ref={containerRef}
      className={`relative flex w-full h-full min-h-[300px] ${className}`}
      style={{ minWidth: minLeft + minRight + HANDLE_WIDTH_PX }} // hard floor to avoid impossible constraints
    >
      <div className="shrink-0 min-w-0 overflow-auto" style={leftStyle}>
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
        onDoubleClick={() => { setLeftPct(initial); onChange?.(initial); }}
        className="z-10 shrink-0 cursor-col-resize select-none"
        style={{
          // Invisible hit slop extends clickable area without shifting layout
          width: HANDLE_WIDTH_PX,
          margin: `0 -${HIT_SLOP_PX}px`,
          padding: `0 ${HIT_SLOP_PX}px`,
          touchAction: 'none', // ensure pointer events aren’t hijacked by scrolling
        }}
      >
        <div
          className="h-full mx-auto rounded"
          style={{
            width: 2,
            background: dragging ? 'var(--color-primary, #6366f1)' : '#d1d5db',
            transition: dragging ? 'none' : 'background-color 120ms ease',
          }}
        />
      </div>

      <div className="shrink-0 min-w-0 overflow-auto" style={rightStyle}>
        {right}
      </div>
    </div>
  );
}
