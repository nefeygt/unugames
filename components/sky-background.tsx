/**
 * Fixed decorative backdrop: an airy gradient sky, a few large soft bokeh blooms,
 * and glassy bubbles that rise very slowly. Pure CSS/SVG, no JS. Motion stops
 * entirely under prefers-reduced-motion (see globals.css).
 */

// Hand-placed so the layout is stable between builds. x = % from left,
// size in px, dur = seconds per full rise, delay is negative so bubbles start mid-flight.
const BUBBLES = [
  { x: 6, size: 46, dur: 110, delay: -20, drift: 30 },
  { x: 14, size: 18, dur: 80, delay: -55, drift: -20 },
  { x: 23, size: 30, dur: 95, delay: -10, drift: 25 },
  { x: 35, size: 14, dur: 70, delay: -40, drift: 15 },
  { x: 47, size: 60, dur: 130, delay: -90, drift: -35 },
  { x: 58, size: 22, dur: 85, delay: -30, drift: 20 },
  { x: 68, size: 38, dur: 105, delay: -70, drift: -25 },
  { x: 77, size: 16, dur: 75, delay: -5, drift: 18 },
  { x: 86, size: 52, dur: 120, delay: -45, drift: -30 },
  { x: 94, size: 24, dur: 90, delay: -80, drift: 12 },
];

function Bubble({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden focusable="false">
      <defs>
        <radialGradient id="bubble-fill" cx="50%" cy="55%" r="50%">
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="96%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#bfe3ea" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bubble-fill)" />
      <ellipse cx="34" cy="30" rx="14" ry="8" fill="#fff" opacity="0.7" transform="rotate(-30 34 30)" />
      <circle cx="68" cy="72" r="4" fill="#fff" opacity="0.45" />
    </svg>
  );
}

export function SkyBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* sky */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#d4eaf6_0%,#e3f2f7_32%,#eef6f2_62%,#e6f1ea_100%)]" />
      {/* soft sun haze, top right */}
      <div className="absolute -right-[10vw] -top-[18vh] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),rgba(255,255,255,0)_65%)]" />
      {/* bokeh blooms */}
      <div className="absolute left-[-8%] top-[35%] h-[40vh] w-[40vh] rounded-full bg-[radial-gradient(circle,rgba(191,227,234,0.55),rgba(191,227,234,0)_70%)]" />
      <div className="absolute right-[8%] top-[62%] h-[34vh] w-[34vh] rounded-full bg-[radial-gradient(circle,rgba(205,232,214,0.6),rgba(205,232,214,0)_70%)]" />
      <div className="absolute left-[38%] top-[8%] h-[22vh] w-[22vh] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.6),rgba(255,255,255,0)_70%)]" />
      {/* faint horizon line of hills */}
      <svg className="absolute inset-x-0 bottom-0 h-[22vh] w-full" viewBox="0 0 1440 220" preserveAspectRatio="none">
        <path d="M0 150 C 240 95 420 120 640 140 S 1080 90 1440 130 V220 H0Z" fill="#dcebe0" opacity="0.7" />
        <path d="M0 185 C 300 150 560 175 820 170 S 1220 150 1440 175 V220 H0Z" fill="#d3e6d8" opacity="0.6" />
      </svg>
      {/* rising bubbles */}
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          className="animate-bubble absolute top-full"
          style={
            {
              left: `${b.x}%`,
              "--dur": `${b.dur}s`,
              "--delay": `${b.delay}s`,
              "--drift": `${b.drift}px`,
            } as React.CSSProperties
          }
        >
          <Bubble size={b.size} />
        </div>
      ))}
    </div>
  );
}
