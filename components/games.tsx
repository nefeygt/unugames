import { games, type Game } from "@/src/data/games";
import { platformLabel } from "@/src/data/studio";
import { ScreenshotCarousel } from "./screenshot-carousel";
import { ArrowUpRightIcon } from "./ui/icons";
import { PixelSparkle } from "./ui/pixel";
import { SectionHeading } from "./ui/section-heading";

/** Real screenshots in a phone-framed carousel; falls back to soft CSS cover art. */
function GameMedia({ game }: { game: Game }) {
  if (game.screenshots?.length) {
    return <ScreenshotCarousel screenshots={game.screenshots} label={`${game.title} screenshots`} />;
  }
  return (
    <div className="relative grid h-48 w-full place-items-center overflow-hidden rounded-[22px] bg-[linear-gradient(160deg,#e8f6f9,#cfe8e6)] ring-1 ring-white" aria-hidden>
      <PixelSparkle className="h-10 w-10 text-teal opacity-60" />
    </div>
  );
}

function GameCard({ game }: { game: Game }) {
  return (
    <article
      id={`game-${game.slug}`}
      aria-labelledby={`game-${game.slug}-title`}
      className="glass gloss rounded-lg p-5 sm:p-8"
    >
      <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
        <GameMedia game={game} />
        <div className="min-w-0 flex-1">
          <p className="inline-flex items-center gap-2 rounded-full bg-teal-soft px-3 py-1 text-sm font-bold text-teal">
            <span className="h-1.5 w-1.5 rounded-[1px] bg-current" aria-hidden />
            {game.status}
          </p>
          <h3 id={`game-${game.slug}-title`} className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {game.title}
          </h3>
          <p className="mt-3 max-w-prose text-pretty text-lg leading-relaxed">{game.description}</p>

          <div className="mt-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-muted">Platforms</h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {game.platforms.map((p) => (
                <li key={p.name} className="rounded-full border border-[#a9bcc6] bg-white/70 px-3 py-1 text-sm font-semibold text-ink">
                  {platformLabel(p)}
                </li>
              ))}
            </ul>
          </div>

          {game.storeUrl && (
            <a href={game.storeUrl} className="btn btn-primary mt-7" target="_blank" rel="noopener noreferrer">
              View store page
              <ArrowUpRightIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Games() {
  return (
    <section id="games" aria-labelledby="games-title" className="py-20 sm:py-28">
      <div className="container">
        <SectionHeading index={1} eyebrow="Games" id="games-title" title="What we're making" />
        {games.length > 0 ? (
          <div className="grid gap-6">
            {games.map((g) => (
              <GameCard key={g.slug} game={g} />
            ))}
          </div>
        ) : (
          // Honest empty state while no game is announced.
          <p className="glass rounded-lg p-8 text-lg">No games announced yet. Check back soon.</p>
        )}
      </div>
    </section>
  );
}
