"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { Screenshot } from "@/src/data/glyph-screenshots";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "./ui/icons";

/** True when the visitor asked for reduced motion (updates live if they change it). */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

const SWIPE_PX = 40;

/**
 * Accessible screenshot carousel framed like a phone.
 * - Prev/next buttons, dot buttons, ←/→ keys (when the carousel has focus), touch swipe.
 * - role="region" + aria-roledescription="carousel"; a polite live region announces "Image 2 of 5".
 * - One screenshot: renders the image only, no controls.
 * - Autoplay is off by default, never runs under prefers-reduced-motion, pauses on hover/focus,
 *   and gets a visible pause button when enabled (WCAG 2.2.2).
 * - The box has a fixed aspect ratio, so nothing shifts while images load; only the first is eager.
 */
export function ScreenshotCarousel({
  screenshots,
  label,
  autoplay = false,
  intervalMs = 6000,
}: {
  screenshots: Screenshot[];
  /** Accessible name, e.g. "Glyph screenshots". */
  label: string;
  autoplay?: boolean;
  intervalMs?: number;
}) {
  const count = screenshots.length;
  const multiple = count > 1;
  const [index, setIndex] = useState(0);
  const [announce, setAnnounce] = useState(false); // stay quiet until the visitor interacts
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
      setAnnounce(true);
    },
    [count],
  );

  const autoplayActive = autoplay && multiple && !reducedMotion && !paused && !hovering;
  useEffect(() => {
    if (!autoplayActive) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => window.clearInterval(id);
  }, [autoplayActive, count, intervalMs]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!multiple) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(count - 1);
    }
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse") return; // mouse users have the buttons
    pointerStart.current = { x: e.clientX, y: e.clientY };
  }
  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || !multiple) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
  }

  const current = screenshots[index];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={multiple ? 0 : undefined}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
      className="mx-auto flex w-[min(66vw,240px)] shrink-0 flex-col items-center rounded-[34px]"
    >
      {/* Phone frame */}
      <div className="relative w-full rounded-[30px] bg-[linear-gradient(160deg,#ffffff,#d9e1e7)] p-2 shadow-lift ring-1 ring-[#c4cfd7]">
        <div
          className="relative aspect-[540/1170] w-full touch-pan-y select-none overflow-hidden rounded-[23px] bg-[#0b0b10]"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (pointerStart.current = null)}
        >
          {screenshots.map((s, i) => {
            const active = i === index;
            return (
              <div
                key={s.src}
                role={multiple ? "group" : undefined}
                aria-roledescription={multiple ? "slide" : undefined}
                aria-label={multiple ? `${i + 1} of ${count}` : undefined}
                aria-hidden={!active}
                inert={!active}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500 ease-out",
                  active ? "opacity-100" : "opacity-0",
                )}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="240px"
                  priority={i === 0}
                  loading={i === 0 ? undefined : "lazy"}
                  draggable={false}
                  className="object-contain"
                />
              </div>
            );
          })}
          {/* glass reflection over the "phone" */}
          <span
            className="pointer-events-none absolute inset-0 rounded-[23px] bg-[linear-gradient(125deg,rgba(255,255,255,0.18),rgba(255,255,255,0)_38%)]"
            aria-hidden
          />
        </div>
      </div>

      <p className="mt-3 min-h-[2.75rem] text-pretty text-center text-sm leading-snug text-body">{current.caption}</p>

      {multiple && (
        <div className="mt-2 flex items-center gap-1">
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous screenshot" className="carousel-btn">
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <div className="flex items-center">
            {screenshots.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show image ${i + 1} of ${count}`}
                aria-current={i === index ? "true" : undefined}
                className="group grid h-7 w-6 place-items-center rounded-full"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full border-[1.5px] transition-[width,background-color] duration-300",
                    i === index ? "w-5 border-teal bg-teal" : "w-2 border-muted bg-transparent group-hover:bg-muted",
                  )}
                />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(index + 1)} aria-label="Next screenshot" className="carousel-btn">
            <ChevronRightIcon className="h-5 w-5" />
          </button>
          {autoplay && !reducedMotion && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              className="carousel-btn ml-1"
            >
              {paused ? <PlayIcon className="h-4 w-4" /> : <PauseIcon className="h-4 w-4" />}
            </button>
          )}
        </div>
      )}

      {/* Screen-reader announcement, only after the visitor changes the image. */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {multiple && announce ? `Image ${index + 1} of ${count}` : ""}
      </p>
    </div>
  );
}
