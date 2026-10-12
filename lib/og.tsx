import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { games } from "@/src/data/games";
import { studio } from "@/src/data/studio";

/**
 * Social share card, rendered to PNG at build time by next/og (Satori).
 * The logo is the real brand/unugames-logo.svg embedded as a data URI (outlined paths,
 * so it renders exactly like the file). Background: sky gradient, bubbles, glass panel.
 */
export const ogSize = { width: 1200, height: 630 };

const LOGO_W = 640; // rendered width of the 658×124 lockup
const logoSvg = fs.readFileSync(path.join(process.cwd(), "brand/unugames-logo.svg"), "utf8");
const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

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
          { l: 70, t: 400, s: 120 },
          { l: 1000, t: 50, s: 150 },
          { l: 1070, t: 440, s: 70 },
          { l: 160, t: 60, s: 50 },
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
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "64px 80px",
            borderRadius: 40,
            background: "rgba(255,255,255,0.6)",
            border: "2px solid rgba(255,255,255,0.95)",
            boxShadow: "0 30px 60px -30px rgba(23,50,63,0.35)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori only understands <img> */}
          <img src={logoSrc} width={LOGO_W} height={Math.round((LOGO_W * 124) / 658)} alt="UnU Games" />
          <div style={{ fontSize: 40, color: "#2c4a58", marginTop: 40 }}>{studio.tagline}</div>
          {firstGame && (
            <div style={{ display: "flex", marginTop: 18, fontSize: 28, color: "#1b6662" }}>
              {`First game: ${firstGame.title} · ${firstGame.status.toLowerCase()}`}
            </div>
          )}
        </div>
      </div>
    ),
    ogSize,
  );
}
