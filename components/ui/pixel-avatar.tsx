import { PixelSprite } from "./pixel";

/**
 * Procedural 5×5 mirrored pixel avatar derived from a name. Same name, same
 * avatar, every build — no photos needed. Purely decorative.
 */
const TONES = [
  { bg: "#dcf2f0", fg: "#1b6662" }, // aqua / teal
  { bg: "#ddeef8", fg: "#2b5f80" }, // sky / deep sky
  { bg: "#e4f0e8", fg: "#3d6b4f" }, // mist / moss
  { bg: "#e7ebef", fg: "#3f5563" }, // silver / slate
];

function hash(str: string) {
  // FNV-1a — tiny, stable, good enough for picking pixels.
  let h = 0x811c9dc5;
  for (const ch of str.normalize("NFC")) {
    h ^= ch.codePointAt(0)!;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

export function PixelAvatar({ name, className }: { name: string; className?: string }) {
  const h = hash(name);
  const tone = TONES[h % TONES.length];
  // 15 bits → left 3 columns of a 5×5 grid, mirrored to the right.
  const rows = Array.from({ length: 5 }, (_, y) => {
    const left = Array.from({ length: 3 }, (_, x) => ((h >>> (y * 3 + x + 2)) & 1 ? "X" : "."));
    return [...left, left[1], left[0]].join("");
  });
  // Pad with a 1-pixel frame so the figure sits centered in the tile.
  const framed = [".......", ...rows.map((r) => `.${r}.`), "......."];
  return (
    <span
      className={`relative inline-grid place-items-center overflow-hidden rounded-[14px] ${className ?? ""}`}
      style={{ background: tone.bg }}
      aria-hidden
    >
      <PixelSprite rows={framed} palette={{ X: tone.fg }} className="relative h-[72%] w-[72%]" />
      <span className="absolute inset-x-1 top-0.5 h-1/2 rounded-t-[12px] rounded-b-[50%] bg-gradient-to-b from-white/70 to-white/0" />
    </span>
  );
}
