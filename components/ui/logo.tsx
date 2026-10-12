import Link from "next/link";
import { studio } from "@/src/data/studio";
import { cn } from "@/lib/utils";
import { PixelSprite, UNU_FACE } from "./pixel";

/**
 * Glossy aqua tile with the pixel "UnU" face. Shared by the header, footer,
 * favicon (app/icon.svg mirrors this drawing) and the generated OG image.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[11px]", className)} aria-hidden>
      <span className="absolute inset-0 bg-[linear-gradient(160deg,#e9f7fb_0%,#bfe3ea_55%,#9fd3d6_100%)]" />
      <span className="absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-2px_6px_rgba(31,111,107,0.18)] ring-1 ring-[#8fbfc4]" />
      <span className="absolute inset-x-[3px] top-[2px] h-[45%] rounded-t-[9px] rounded-b-[50%] bg-gradient-to-b from-white/80 to-white/0" />
      <PixelSprite rows={UNU_FACE} palette={{ X: "#17323f" }} className="relative w-[64%]" />
    </span>
  );
}

export function Logo({ href = "/", className }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-2.5 rounded-xl", className)}>
      <LogoMark className="transition-transform duration-300 group-hover:-rotate-3" />
      <span className="text-lg font-extrabold tracking-tight text-ink">{studio.name}</span>
    </Link>
  );
}
