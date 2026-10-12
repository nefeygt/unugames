"use client";

import { useEffect, useRef, useState } from "react";
import { socialLinks, studio } from "@/src/data/studio";
import { team } from "@/src/data/team";
import { cn } from "@/lib/utils";
import { CloseIcon, MailIcon, MenuIcon } from "./ui/icons";
import { Logo } from "./ui/logo";
import { PixelCursor } from "./ui/pixel";

/** Section links; Team is dropped automatically if team.ts is empty. */
const NAV_LINKS = [
  { label: "Games", href: "#games" },
  { label: "About", href: "#about" },
  ...(team.length ? [{ label: "Team", href: "#team" }] : []),
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const social = socialLinks();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={cn(
          "mx-auto max-w-[1160px] rounded-[22px] transition-[background-color,box-shadow,border-color] duration-300",
          scrolled || open ? "glass glass-strong" : "border border-transparent",
        )}
      >
        <nav className="flex h-14 items-center justify-between gap-3 pl-3 pr-2 sm:pl-4" aria-label="Primary">
          <Logo href="#top" />

          <ul className="hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="menu-item">
                  <PixelCursor className="menu-cursor text-teal" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-1 md:flex">
            {social.map((s) => (
              // Shown from lg up; between md and lg the header has no room (they stay in contact + footer).
              <a key={s.href} href={s.href} className="menu-item hidden text-sm lg:inline-flex" target="_blank" rel="noopener noreferrer">
                {s.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
            <a href={`mailto:${studio.email}`} className="btn btn-primary min-h-[40px] px-4 py-2 text-sm">
              <MailIcon className="h-4 w-4" />
              Say hello
            </a>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-white/70 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile menu: a vertical "console menu" list. */}
        <div id="mobile-menu" hidden={!open} className="border-t border-white/90 px-3 pb-4 pt-2 md:hidden">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)} className="menu-item flex w-full py-3 text-lg">
                  <PixelCursor className="menu-cursor text-teal" />
                  {link.label}
                </a>
              </li>
            ))}
            {social.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="menu-item flex w-full py-3 text-lg" target="_blank" rel="noopener noreferrer">
                  <PixelCursor className="menu-cursor text-teal" />
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <a href={`mailto:${studio.email}`} className="btn btn-primary mt-3 w-full">
            <MailIcon className="h-4 w-4" />
            {studio.email}
          </a>
        </div>
      </div>
    </header>
  );
}
