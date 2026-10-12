import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PixelCursor, PixelDivider } from "./pixel";

/** Section title with a console-menu style eyebrow ("▸ 01 · Games"). */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  id,
  className,
}: {
  index: number;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** id for the h2 so the section can use aria-labelledby. */
  id: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl sm:mb-12", className)}>
      <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-teal">
        <PixelCursor />
        <span className="tabular-nums">{String(index).padStart(2, "0")}</span>
        <span aria-hidden>·</span>
        {eyebrow}
      </p>
      <h2 id={id} className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <PixelDivider className="mt-4 text-teal" />
      {description && <p className="mt-5 text-pretty text-lg leading-relaxed">{description}</p>}
    </div>
  );
}
