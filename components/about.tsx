import { games } from "@/src/data/games";
import { platformLabel, studio } from "@/src/data/studio";
import { SectionHeading } from "./ui/section-heading";

export function About() {
  const firstGame = games[0];
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 sm:py-28">
      <div className="container grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <div>
          <SectionHeading index={2} eyebrow="About" id="about-title" title="Why nostalgic games" className="mb-8 sm:mb-8" />
          <div className="max-w-prose space-y-5 text-lg leading-relaxed">
            <p>
              {studio.name} is an independent game studio founded in {studio.founded.label}. We make small, nostalgic
              games with a retro-arcade spirit.
            </p>
            {/* Source: Glyph's own design docs (plan.md, "Where it comes from"). */}
            <p>
              Our first game began on the blank pages of a primary-school notebook. One of our co-founders often finished
              morning reading time early and filled the spare pages with battlefields and symbols.
              {firstGame && (
                <>
                  {" "}
                  <strong className="font-bold text-ink">{firstGame.title}</strong> turns those symbols into play.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Fact sheet — every row comes straight from src/data/studio.ts. */}
        <aside aria-label="Studio facts" className="glass gloss self-start rounded-lg p-6 sm:p-8">
          <dl className="relative grid gap-5">
            <div>
              <dt className="text-sm font-bold uppercase tracking-[0.12em] text-muted">Founded</dt>
              <dd className="mt-1 text-lg font-semibold text-ink">{studio.founded.label}</dd>
            </div>
            {firstGame && (
              <div>
                <dt className="text-sm font-bold uppercase tracking-[0.12em] text-muted">First game</dt>
                <dd className="mt-1 text-lg font-semibold text-ink">
                  {firstGame.title} <span className="font-normal text-body">· {firstGame.status.toLowerCase()}</span>
                </dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-bold uppercase tracking-[0.12em] text-muted">Platforms</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {studio.platforms.map((p) => (
                    <li key={p.name} className="rounded-full border border-[#a9bcc6] bg-white/70 px-3 py-1 text-sm font-semibold text-ink">
                      {platformLabel(p)}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
