/**
 * GLYPH SCREENSHOTS — real in-game captures only (no mockups, no edited UI).
 * Files live in /public/games. Order here = order in the carousel; the first one
 * loads eagerly, the rest lazily. To add one, export a portrait capture to WebP
 * (~540 px wide) as /public/games/glyph-N.webp and add an entry below.
 *
 * Source: real runs on two Android phones, drawn through the game's own touch path.
 * Captures 2–6 have the top status strip cropped off to remove an internal debug path
 * line ("…://glyph/live"); nothing else is altered.
 */
export type Screenshot = {
  src: string;
  alt: string;
  caption: string;
};

export const glyphScreenshots: Screenshot[] = [
  {
    src: "/games/glyph.webp",
    alt: "Glyph gameplay: a glowing cyan rune shaped like an upward chevron is drawn on a dark page while two purple doodles carrying the same rune drift down from above.",
    caption: "Draw the rune a doodle carries.",
  },
  {
    src: "/games/glyph-2.webp",
    alt: "Glyph gameplay at wave 15: a drawn arch rune glows gold inside a ring while the doodle carrying it bursts, with PERFECT and CHAIN ×2 tags above.",
    caption: "A clean stroke earns a perfect, and bursts can chain.",
  },
  {
    src: "/games/glyph-3.webp",
    alt: "Glyph gameplay at wave 14: a pink zigzag rune is drawn and the doodle carrying the same rune breaks apart, while a doodle with a lightning rune drifts above.",
    caption: "Every doodle carrying that rune bursts into light.",
  },
  {
    src: "/games/glyph-4.webp",
    alt: "Glyph gameplay at wave 14: a purple lightning-bolt rune is drawn and a beam of light runs up to the doodle carrying the same bolt.",
    caption: "Later waves bring more runes to read at once.",
  },
  {
    src: "/games/glyph-5.webp",
    alt: "Glyph title screen: an arcade-style INSERT COIN box with 'tap to play' beneath it on a dark grid.",
    caption: "Insert coin, arcade-style.",
  },
  {
    src: "/games/glyph-6.webp",
    alt: "Glyph game-over screen showing a score of 345, a best score of 345 and a NEW BEST badge, with a continue button.",
    caption: "Game over, with your best score kept.",
  },
];
