import { team } from "@/src/data/team";
import { PixelAvatar } from "./ui/pixel-avatar";
import { SectionHeading } from "./ui/section-heading";

export function Team() {
  if (team.length === 0) return null; // Hidden until real people are listed.
  return (
    <section id="team" aria-labelledby="team-title" className="py-20 sm:py-28">
      <div className="container">
        <SectionHeading index={3} eyebrow="Team" id="team-title" title="The people behind UnU" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <li key={m.name} className="glass gloss flex items-center gap-4 rounded p-4 transition-shadow duration-300 hover:shadow-lift sm:p-5">
              <PixelAvatar name={m.name} className="h-14 w-14 shrink-0" />
              <div className="relative min-w-0">
                <p className="text-lg font-extrabold text-ink">{m.name}</p>
                <p className="text-[0.95rem] text-body">{m.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
