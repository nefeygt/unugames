import { cn } from "@/lib/utils";

/**
 * Tiny pixel-art renderer. A sprite is a list of equal-length rows; each character
 * maps to a fill color in `palette`, and "." is transparent. Rendered as crisp SVG
 * rects so it stays sharp at any size and weighs a few hundred bytes.
 */
export function PixelSprite({
  rows,
  palette,
  className,
  title,
}: {
  rows: readonly string[];
  palette: Record<string, string>;
  className?: string;
  /** Pass a title only when the sprite carries meaning; otherwise it is hidden from AT. */
  title?: string;
}) {
  const w = rows[0]?.length ?? 0;
  const h = rows.length;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      shapeRendering="crispEdges"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {rows.flatMap((row, y) =>
        Array.from(row).map((ch, x) =>
          ch === "." || !palette[ch] ? null : <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={palette[ch]} />,
        ),
      )}
    </svg>
  );
}

/* ---- Sprites ------------------------------------------------------------ */

/** The "UnU" face: two U eyes and a small n mouth. Also used in the logo. */
export const UNU_FACE = [
  "X.X.....X.X",
  "X.X.....X.X",
  "XXX.....XXX",
  "...........",
  "....XXX....",
  "....X.X....",
] as const;

/** Console-menu cursor ▸ */
const CURSOR = ["X..", "XX.", "XXX", "XX.", "X.."] as const;

/** Four-point sparkle */
const SPARKLE = ["..X..", "..X..", "XX.XX", "..X..", "..X.."] as const;

export function PixelCursor({ className }: { className?: string }) {
  return <PixelSprite rows={CURSOR} palette={{ X: "currentColor" }} className={cn("h-2.5 w-1.5", className)} />;
}

export function PixelSparkle({ className }: { className?: string }) {
  return <PixelSprite rows={SPARKLE} palette={{ X: "currentColor" }} className={cn("h-3 w-3", className)} />;
}

/** A short row of fading pixels, used as a divider accent under headings. */
export function PixelDivider({ className }: { className?: string }) {
  const opacities = [1, 1, 0.75, 0.55, 0.35, 0.2];
  return (
    <svg viewBox="0 0 22 2" className={cn("h-1.5 w-[66px]", className)} shapeRendering="crispEdges" aria-hidden focusable="false">
      {opacities.map((o, i) => (
        <rect key={i} x={i * 4} y={0} width={2} height={2} fill="currentColor" opacity={o} />
      ))}
    </svg>
  );
}
