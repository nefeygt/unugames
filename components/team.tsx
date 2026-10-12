import { team } from "@/src/data/team";
import { cn } from "@/lib/utils";
import { LinkedInIcon } from "./ui/icons";
import { PixelAvatar } from "./ui/pixel-avatar";
import { SectionHeading } from "./ui/section-heading";

/**
 * Staggered offsets give the grid a loose, hand-placed feel on wider screens.
 * Mobile is a plain single column. Offsets are margins (not transforms) so cards never overlap.
 */
const OFFSET_2COL = ["", "sm:max-lg:mt-10"]; // 2 columns: every second card drops
const OFFSET_3COL = ["", "lg:mt-12", "lg:mt-5"]; // 3 columns: middle drops most, right a little

export function Team() {
  if (team.length === 0) return null; // Hidden until real people are listed.
  return (
    <section id="team" aria-labelledby="team-title" className="py-20 sm:py-28">
      <div className="container">
        <SectionHeading index={3} eyebrow="Team" id="team-title" title="The people behind UnU" />
        <ul className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {team.map((m, i) => (
            <li
              key={m.name}
              className={cn(
                "glass gloss group relative rounded-[22px] p-5 transition-[transform,box-shadow] duration-300 hover:shadow-lift motion-safe:hover:-translate-y-1 sm:p-6",
                OFFSET_2COL[i % 2],
                OFFSET_3COL[i % 3],
              )}
            >
              <div className="relative flex items-start gap-4">
                <PixelAvatar name={m.name} index={i} className="h-16 w-16" />
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="text-xl font-extrabold tracking-tight text-ink">{m.name}</h3>
                  <p className="mt-2">
                    {/* 10px corners (not a full pill) so a role that wraps to two lines still looks tidy */}
                    <span className="inline-block rounded-[10px] bg-teal-soft px-2.5 py-1 text-xs font-bold leading-snug text-teal">
                      {m.role}
                    </span>
                  </p>
                </div>
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} on LinkedIn (opens in a new tab)`}
                    className="-mr-1 -mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full text-teal transition-colors hover:bg-white/80 hover:text-teal-hover"
                  >
                    <LinkedInIcon className="h-5 w-5" />
                  </a>
                )}
              </div>
              {m.blurb && <p className="relative mt-4 text-[0.95rem] leading-relaxed text-body">{m.blurb}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
