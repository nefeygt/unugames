import { team } from "@/src/data/team";
import { cn } from "@/lib/utils";
import { LinkedInIcon } from "./ui/icons";
import { PixelAvatar } from "./ui/pixel-avatar";
import { SectionHeading } from "./ui/section-heading";

/**
 * Layout (all classes are static strings so Tailwind can see them):
 * - Mobile: one column, no offsets.
 * - Tablet (sm–lg): 4-column grid, each card spans 2 → two columns. The right column drops a little;
 *   an odd last card is centred across both columns.
 * - Desktop (lg+): 6-column grid, each card spans 2 → three per row. The middle card of each full row
 *   dips (a gentle V), and a short last row is centred by starting it one or two columns in, so there is
 *   never an orphaned empty slot.
 */
function placement(i: number, n: number) {
  const classes: string[] = [];
  const lastRowSize = n % 3;
  const inLastRow = lastRowSize !== 0 && i >= n - lastRowSize;
  const isOddLast = n % 2 === 1 && i === n - 1;

  // Tablet: stagger the right column; centre an odd last card (and undo that at lg).
  if (isOddLast) classes.push("sm:col-start-2", "lg:col-start-auto");
  else if (i % 2 === 1) classes.push("sm:max-lg:mt-8");

  // Desktop: centre a short last row; dip the middle card of full rows.
  if (inLastRow && i === n - lastRowSize) classes.push(lastRowSize === 2 ? "lg:col-start-2" : "lg:col-start-3");
  if (!inLastRow && i % 3 === 1) classes.push("lg:mt-10");

  return classes;
}

export function Team() {
  if (team.length === 0) return null; // Hidden until real people are listed.
  return (
    <section id="team" aria-labelledby="team-title" className="py-20 sm:py-28">
      <div className="container">
        <SectionHeading index={3} eyebrow="Team" id="team-title" title="The people behind UnU" />
        <ul className="grid items-start gap-5 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
          {team.map((m, i) => (
            <li
              key={m.name}
              className={cn(
                "glass gloss group relative rounded-[22px] p-5 transition-[transform,box-shadow] duration-300 hover:shadow-lift motion-safe:hover:-translate-y-1 sm:col-span-2 sm:p-6",
                placement(i, team.length),
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
