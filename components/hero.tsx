import { games } from "@/src/data/games";
import { studio } from "@/src/data/studio";
import { ArrowDownIcon, MailIcon } from "./ui/icons";
import { PixelSprite, PixelSparkle, UNU_FACE } from "./ui/pixel";

/**
 * Decorative glossy handheld, drawn in SVG: silver shell, aqua screen showing
 * the pixel UnU face, D-pad and two soft buttons. aria-hidden; it says nothing factual.
 */
function Handheld() {
  return (
    <div className="animate-float relative mx-auto w-[min(78vw,300px)]" aria-hidden>
      <svg viewBox="0 0 240 380" className="w-full drop-shadow-[0_24px_40px_rgba(23,50,63,0.22)]">
        <defs>
          <linearGradient id="hh-shell" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#eef2f5" />
            <stop offset="1" stopColor="#d9e1e7" />
          </linearGradient>
          <linearGradient id="hh-screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e8f6f9" />
            <stop offset="1" stopColor="#bfe3e6" />
          </linearGradient>
          <linearGradient id="hh-gloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="hh-btn" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#8fd1cb" />
            <stop offset="1" stopColor="#3f908a" />
          </radialGradient>
        </defs>
        {/* shell */}
        <rect x="4" y="4" width="232" height="372" rx="34" fill="url(#hh-shell)" stroke="#c4cfd7" strokeWidth="1.5" />
        <path d="M18 40 Q18 14 46 14 H194 Q222 14 222 40 V120 Q120 96 18 128Z" fill="url(#hh-gloss)" opacity="0.7" />
        {/* screen bezel + screen */}
        <rect x="26" y="34" width="188" height="160" rx="18" fill="#c9d6dd" />
        <rect x="36" y="44" width="168" height="140" rx="12" fill="url(#hh-screen)" />
        {/* faint pixel grid on the screen */}
        <g stroke="#9fcfd2" strokeOpacity="0.35" strokeWidth="0.6">
          {Array.from({ length: 13 }, (_, i) => (
            <line key={`v${i}`} x1={36 + i * 14} y1="44" x2={36 + i * 14} y2="184" />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <line key={`h${i}`} x1="36" y1={44 + i * 14} x2="204" y2={44 + i * 14} />
          ))}
        </g>
        <path d="M44 52 H196 Q190 92 44 104Z" fill="#fff" opacity="0.35" />
        {/* D-pad */}
        <g transform="translate(64 262)">
          <rect x="-12" y="-36" width="24" height="72" rx="6" fill="#b6c3cc" />
          <rect x="-36" y="-12" width="72" height="24" rx="6" fill="#b6c3cc" />
          <rect x="-10" y="-34" width="20" height="68" rx="5" fill="#cdd7de" />
          <rect x="-34" y="-10" width="68" height="20" rx="5" fill="#cdd7de" />
        </g>
        {/* A / B */}
        <circle cx="178" cy="246" r="17" fill="url(#hh-btn)" />
        <circle cx="146" cy="276" r="17" fill="url(#hh-btn)" />
        <ellipse cx="174" cy="240" rx="7" ry="4" fill="#fff" opacity="0.6" />
        <ellipse cx="142" cy="270" rx="7" ry="4" fill="#fff" opacity="0.6" />
        {/* start / select */}
        <rect x="92" y="318" width="24" height="7" rx="3.5" fill="#b6c3cc" />
        <rect x="124" y="318" width="24" height="7" rx="3.5" fill="#b6c3cc" />
        {/* speaker grille */}
        <g stroke="#b6c3cc" strokeWidth="3" strokeLinecap="round">
          <line x1="180" y1="330" x2="200" y2="310" />
          <line x1="190" y1="340" x2="210" y2="320" />
          <line x1="200" y1="350" x2="216" y2="334" />
        </g>
      </svg>
      {/* pixel face placed over the screen area */}
      <div className="absolute left-[15%] top-[11.6%] grid h-[36.8%] w-[70%] place-items-center">
        <PixelSprite rows={UNU_FACE} palette={{ X: "#17323f" }} className="w-[46%]" />
      </div>
      <PixelSparkle className="absolute -left-4 top-6 h-4 w-4 text-teal opacity-70" />
      <PixelSparkle className="absolute -right-3 top-1/3 h-3 w-3 text-[#6aa9c4] opacity-80" />
      <PixelSparkle className="absolute -right-6 bottom-10 h-5 w-5 text-[#7fb08f] opacity-70" />
    </div>
  );
}

export function Hero() {
  const firstGame = games[0];
  return (
    <section id="top" aria-labelledby="hero-title" className="relative pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="container grid items-center gap-14 md:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold text-body">
            <span className="h-2 w-2 rounded-[2px] bg-teal" aria-hidden />
            Independent game studio · since {studio.founded.label}
          </p>
          <h1 id="hero-title" className="mt-6 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            {studio.name}
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-xl leading-relaxed text-body sm:text-2xl">{studio.tagline}</p>
          {firstGame && (
            <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Our first game, <strong className="font-bold text-ink">{firstGame.title}</strong>, is{" "}
              {firstGame.status.toLowerCase()}.
            </p>
          )}
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#games" className="btn btn-primary">
              See our games
              <ArrowDownIcon className="h-4 w-4" />
            </a>
            <a href={`mailto:${studio.email}`} className="btn btn-secondary">
              <MailIcon className="h-4 w-4" />
              Say hello
            </a>
          </div>
        </div>
        <Handheld />
      </div>
    </section>
  );
}
