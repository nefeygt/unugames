import { cn } from "@/lib/utils";
import { PixelSprite } from "./pixel";

/**
 * Pixel avatar made from a member's initials on a soft tinted tile. Each card gets a
 * different tint, tile shape and small rotation (≤ ±2°) from its position, so the grid
 * feels hand-placed without any photos. Decorative: the name is always real text next to it.
 */

// 5-row pixel letters (A–Z), 3 px wide except M, N, W which need 4–5 px to read. "X" = lit pixel.
const FONT: Record<string, readonly string[]> = {
  A: ["XXX", "X.X", "XXX", "X.X", "X.X"], B: ["XX.", "X.X", "XX.", "X.X", "XX."],
  C: ["XXX", "X..", "X..", "X..", "XXX"], D: ["XX.", "X.X", "X.X", "X.X", "XX."],
  E: ["XXX", "X..", "XX.", "X..", "XXX"], F: ["XXX", "X..", "XX.", "X..", "X.."],
  G: ["XXX", "X..", "X.X", "X.X", "XXX"], H: ["X.X", "X.X", "XXX", "X.X", "X.X"],
  I: ["XXX", ".X.", ".X.", ".X.", "XXX"], J: ["..X", "..X", "..X", "X.X", "XXX"],
  K: ["X.X", "X.X", "XX.", "X.X", "X.X"], L: ["X..", "X..", "X..", "X..", "XXX"],
  M: ["X...X", "XX.XX", "X.X.X", "X...X", "X...X"], N: ["X..X", "XX.X", "X.XX", "X..X", "X..X"],
  O: ["XXX", "X.X", "X.X", "X.X", "XXX"], P: ["XXX", "X.X", "XXX", "X..", "X.."],
  Q: ["XXX", "X.X", "X.X", "XXX", "..X"], R: ["XX.", "X.X", "XX.", "X.X", "X.X"],
  S: ["XXX", "X..", "XXX", "..X", "XXX"], T: ["XXX", ".X.", ".X.", ".X.", ".X."],
  U: ["X.X", "X.X", "X.X", "X.X", "XXX"], V: ["X.X", "X.X", "X.X", "X.X", ".X."],
  W: ["X...X", "X...X", "X.X.X", "XX.XX", "X...X"], X: ["X.X", "X.X", ".X.", "X.X", "X.X"],
  Y: ["X.X", "X.X", ".X.", ".X.", ".X."], Z: ["XXX", "..X", ".X.", "X..", "XXX"],
};

// Turkish letters folded to the alphabet above.
const FOLD: Record<string, string> = { Ç: "C", Ğ: "G", İ: "I", I: "I", Ö: "O", Ş: "S", Ü: "U" };

/** "Ece" → "EC", "Ada Lovelace" → "AL". */
export function initials(name: string) {
  const words = name.trim().split(/\s+/);
  const raw = words.length > 1 ? words[0][0] + words[words.length - 1][0] : name.slice(0, 2);
  return [...raw.toLocaleUpperCase("tr")].map((c) => FOLD[c] ?? c).join("");
}

// Token tints: --teal-soft, --bg-aqua, --bg-mist, --bg-sky. Letters stay teal/ink (≥ 5:1).
const TILES = [
  { bg: "#d6eeeb", fg: "#1b6662", shape: "rounded-[16px]", rotate: -2 },
  { bg: "#ddeef8", fg: "#17323f", shape: "rounded-[24px_10px_24px_10px]", rotate: 1.5 },
  { bg: "#e4f0e8", fg: "#1b6662", shape: "rounded-[50%]", rotate: -1 },
  { bg: "#dcf2f0", fg: "#17323f", shape: "rounded-[10px_26px_10px_26px]", rotate: 2 },
  { bg: "#d6eeeb", fg: "#17323f", shape: "rounded-[22px]", rotate: -1.5 },
] as const;

export function tileStyle(index: number) {
  return TILES[index % TILES.length];
}

export function PixelAvatar({ name, index, className }: { name: string; index: number; className?: string }) {
  const tile = tileStyle(index);
  const letters = [...initials(name)].map((c) => FONT[c]).filter(Boolean);
  // Two letters side by side with a one-pixel gap, framed by one pixel of padding.
  const rows = Array.from({ length: 5 }, (_, y) => `.${letters.map((l) => l[y]).join(".")}.`);
  const framed = [".".repeat(rows[0].length), ...rows, ".".repeat(rows[0].length)];
  return (
    <span
      aria-hidden
      className={cn("relative inline-grid shrink-0 place-items-center overflow-hidden shadow-glow ring-1 ring-white", tile.shape, className)}
      style={{ background: tile.bg, transform: `rotate(${tile.rotate}deg)` }}
    >
      <PixelSprite rows={framed} palette={{ X: tile.fg }} className="relative w-[64%]" />
      {/* soft gloss across the top of the tile */}
      <span className="absolute inset-x-1.5 top-1 h-[42%] rounded-[inherit] bg-gradient-to-b from-white/75 to-white/0" />
    </span>
  );
}
