import { ImageResponse } from "next/og";
import { UNU_FACE as UNU } from "@/components/ui/pixel";
import { games } from "@/src/data/games";
import { studio } from "@/src/data/studio";

/**
 * Social share card drawn with plain JSX/CSS and rendered to PNG at build time
 * by next/og (Satori). No photos: sky gradient, bubbles, glass panel, pixel face.
 */
export const ogSize = { width: 1200, height: 630 };

const PX = 14; // size of one face pixel

export function renderOgImage() {
  const firstGame = games[0];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #d4eaf6 0%, #e3f2f7 40%, #eef6f2 75%, #e6f1ea 100%)",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* bubbles */}
        {[
          { l: 70, t: 380, s: 120 },
          { l: 990, t: 60, s: 150 },
          { l: 1060, t: 430, s: 70 },
          { l: 180, t: 70, s: 50 },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: b.l,
              top: b.t,
              width: b.s,
              height: b.s,
              borderRadius: 999,
              border: "2px solid rgba(255,255,255,0.85)",
              background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.08) 45%, rgba(191,227,234,0.35) 100%)",
            }}
          />
        ))}
        {/* glass panel */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 56,
            padding: "56px 72px",
            borderRadius: 40,
            background: "rgba(255,255,255,0.6)",
            border: "2px solid rgba(255,255,255,0.95)",
            boxShadow: "0 30px 60px -30px rgba(23,50,63,0.35)",
          }}
        >
          {/* logo tile with pixel face */}
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(160deg, #e9f7fb 0%, #bfe3ea 55%, #9fd3d6 100%)",
              border: "3px solid #8fbfc4",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {UNU.map((row, y) => (
                <div key={y} style={{ display: "flex" }}>
                  {Array.from(row).map((c, x) => (
                    <div key={x} style={{ width: PX, height: PX, background: c === "X" ? "#17323f" : "transparent" }} />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 560 }}>
            <div style={{ fontSize: 88, fontWeight: 800, color: "#17323f", letterSpacing: -2 }}>{studio.name}</div>
            <div style={{ fontSize: 36, color: "#2c4a58", marginTop: 12, lineHeight: 1.3 }}>{studio.tagline}</div>
            {firstGame && (
              <div style={{ display: "flex", marginTop: 28, fontSize: 26, color: "#1b6662", fontWeight: 700 }}>
                {`First game: ${firstGame.title} · ${firstGame.status.toLowerCase()}`}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
