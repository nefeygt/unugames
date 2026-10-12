import type { Platform } from "./studio";

/**
 * GAMES — one entry per game. The Games section renders straight from this list,
 * so adding a game means adding one object here.
 */
export type Game = {
  /** Stable id, also used as the card's anchor (#game-<slug>). */
  slug: string;
  title: string;
  /** One honest line about what the game is. */
  description: string;
  /** Real status as a short label, e.g. "In development". No percentages. */
  status: string;
  platforms: Platform[];
  /**
   * Optional real in-game capture placed in /public/games. Portrait phone shots
   * look best (the card frames them like a phone). Omit it to show the CSS cover art.
   */
  screenshot?: { src: string; width: number; height: number; alt: string };
  /**
   * Optional public store page. Only add it once the listing is public
   * (Google Play open testing or production); internal-testing links 404 for visitors.
   */
  storeUrl?: string;
};

export const games: Game[] = [
  {
    slug: "glyph",
    title: "Glyph",
    description:
      "Doodles drift down a night-dark page, each carrying a glowing rune. Draw the rune with one finger, and every doodle carrying it bursts into light.",
    status: "In development",
    platforms: [
      { name: "Android", planned: true },
      { name: "iOS", planned: true },
    ],
    screenshot: {
      src: "/games/glyph.webp",
      width: 540,
      height: 1170,
      alt: "Glyph gameplay: a glowing cyan rune shaped like an upward chevron is drawn on a dark page while two purple doodles carrying the same rune drift down from above.",
    },
  },
];
