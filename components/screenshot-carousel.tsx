"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Screenshot } from "@/src/data/glyph-screenshots";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "./ui/icons";

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

const wrap = (i: number, n: number) => ((i % n) + n) % n;

/**
 * Screenshot gallery: phone-framed slides on a horizontal scroll-snap track.
 * - The current slide is centred; neighbours peek in at the sides (dimmed) to hint there is more.
 * - Swipe / trackpad scroll come for free from the native scroller; buttons and ←/→ keys loop at the ends.
 * - Controls are ≥ 44×44 px. Dots sit under the frame; a polite live region announces "Image 2 of 6".
 * - Images: the first loads eagerly, the next is preloaded, the rest only once you get near them.
 *   Every slide has a fixed aspect-ratio box (object-fit: contain), so nothing shifts or crops.
 * - No autoplay. Smooth scrolling is turned off under prefers-reduced-motion.
 */
export function ScreenshotCarousel({ screenshots, label }: { screenshots: Screenshot[]; label: string }) {
  const count = screenshots.length;
  const multiple = count > 1;
  const [index, setIndex] = useState(0);
  const [announce, setAnnounce] = useState(false); // quiet until the visitor interacts
  // Slides allowed to render their image: current ± 1 (wrapping), accumulated as the visitor moves.
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0, wrap(1, count)]));
  const reducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const settle = useRef(0);
  const indexRef = useRef(0);
  indexRef.current = index;

  useEffect(() => {
    setLoaded((prev) => {
      const next = new Set(prev);
      [index - 1, index, index + 1].forEach((i) => next.add(wrap(i, count)));
      return next.size === prev.size ? prev : next;
    });
  }, [index, count]);

  /** Scroll the track so slide i is centred (horizontal only; the page never jumps). */
  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      const slide = slideRefs.current[wrap(i, count)];
      if (!track || !slide) return;
      // Update state right away so buttons/keys/dots never depend on scroll events firing.
      setIndex(wrap(i, count));
      setAnnounce(true);
      track.scrollTo({
        left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [count, reducedMotion],
  );

  /** Swipes / trackpad: follow whichever slide is closest to the centre once the scroll settles. */
  function onScroll() {
    window.clearTimeout(settle.current);
    settle.current = window.setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      const centre = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      slideRefs.current.forEach((s, i) => {
        if (!s) return;
        const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - centre);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      if (best !== indexRef.current) {
        setIndex(best);
        setAnnounce(true);
      }
    }, 80);
  }
  useEffect(() => () => window.clearTimeout(settle.current), []);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!multiple) return;
    const keys: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: count - 1 };
    if (e.key in keys) {
      e.preventDefault();
      goTo(keys[e.key]);
    }
  }

  const current = screenshots[index];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={multiple ? 0 : undefined}
      onKeyDown={onKeyDown}
      className="w-full min-w-0 rounded-[28px]"
    >
      <div className="relative">
        {/* Track: slides are a fixed width; side padding lets the first/last slide centre too. */}
        <div
          ref={trackRef}
          onScroll={multiple ? onScroll : undefined}
          tabIndex={-1}
          className={cn(
            "relative flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            multiple && "-my-4 snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain py-7 sm:gap-6",
            multiple ? "px-[calc(50%_-_var(--slide)_/_2)]" : "justify-center py-3",
            "[--slide:min(74vw,300px)] lg:[--slide:340px]",
          )}
        >
          {screenshots.map((s, i) => {
            const active = i === index;
            return (
              <div
                key={s.src}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                role={multiple ? "group" : undefined}
                aria-roledescription={multiple ? "slide" : undefined}
                aria-label={multiple ? `${i + 1} of ${count}` : undefined}
                aria-hidden={multiple && !active ? true : undefined}
                className={cn(
                  "w-[var(--slide)] shrink-0 snap-center transition-[opacity,transform] duration-300 ease-out",
                  multiple && !active && "scale-[0.92] opacity-45",
                )}
              >
                {/* Phone frame */}
                <div className="rounded-[34px] bg-[linear-gradient(160deg,#ffffff,#d9e1e7)] p-2.5 shadow-lift ring-1 ring-[#c4cfd7]">
                  <div className="relative aspect-[540/1170] w-full overflow-hidden rounded-[26px] bg-[#0b0b10]">
                    {loaded.has(i) && (
                      <Image
                        src={s.src}
                        alt={s.alt}
                        fill
                        sizes="(min-width: 1024px) 340px, 300px"
                        priority={i === 0}
                        draggable={false}
                        className="select-none object-contain"
                      />
                    )}
                    <span
                      className="pointer-events-none absolute inset-0 rounded-[26px] bg-[linear-gradient(125deg,rgba(255,255,255,0.16),rgba(255,255,255,0)_38%)]"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {multiple && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous screenshot"
              className="carousel-btn absolute left-0 top-1/2 -translate-y-1/2 sm:left-2 !bg-white/90 shadow-soft hover:!bg-white"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next screenshot"
              className="carousel-btn absolute right-0 top-1/2 -translate-y-1/2 sm:right-2 !bg-white/90 shadow-soft hover:!bg-white"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {current.caption && (
        <p className="mx-auto mt-2 min-h-[2.75rem] max-w-[22rem] text-pretty text-center text-[0.95rem] leading-snug text-body">
          {current.caption}
        </p>
      )}

      {multiple && (
        <div className="mt-1 flex justify-center">
          {screenshots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1} of ${count}`}
              aria-current={i === index ? "true" : undefined}
              className="group grid h-11 w-11 place-items-center rounded-full"
            >
              <span
                className={cn(
                  "block h-2.5 rounded-full border-[1.5px] transition-[width,background-color] duration-300",
                  i === index ? "w-6 border-teal bg-teal" : "w-2.5 border-muted bg-transparent group-hover:bg-muted",
                )}
              />
            </button>
          ))}
        </div>
      )}

      {/* Screen-reader announcement, only after the visitor changes the image. */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {multiple && announce ? `Image ${index + 1} of ${count}` : ""}
      </p>
    </div>
  );
}
