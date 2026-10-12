/**
 * node scripts/linkedin-banner.mjs
 *
 * Builds the LinkedIn company-page cover (1128x191, exported at 2x = 2256x382) from brand/unugames-logo.svg
 * and the site's colour tokens. Output: brand/linkedin-banner.svg and brand/png/unugames-linkedin-banner{,@2x}.png
 * Content stays centred: the page logo covers the bottom-left on desktop and mobile crops the sides.
 * No claims on it: only the name and the tagline from src/data/studio.ts.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const { Resvg } = await import(process.env.RESVG_PATH || "@resvg/resvg-js");
const FONT = process.env.BANNER_FONT; // optional TTF (Nunito Sans SemiBold) so the tagline matches the logo
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = (...parts) => path.join(root, ...parts);

const logoSvg = fs.readFileSync(p("brand/unugames-logo.svg"), "utf8");
const inner = logoSvg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/<title>[\s\S]*?<\/title>/, "");

const W = 1128, H = 191;
const LOGO_W = 658, LOGO_H = 124, S = 0.56;
const lx = (W - LOGO_W * S) / 2, ly = 28;

const bubble = (cx, cy, r, o = 0.55) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#bub)" opacity="${o}"/><circle cx="${cx}" cy="${cy}" r="${r - 0.75}" fill="none" stroke="#ffffff" stroke-opacity=".85" stroke-width="1.5"/>
   <ellipse cx="${cx - r * 0.35}" cy="${cy - r * 0.45}" rx="${r * 0.32}" ry="${r * 0.18}" fill="#ffffff" opacity=".8" transform="rotate(-30 ${cx - r * 0.35} ${cy - r * 0.45})"/>`;
const px = (x, y, c = "#bfe3df", o = 0.7) => `<rect x="${x}" y="${y}" width="9" height="9" rx="2" fill="${c}" opacity="${o}"/>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <title>UnU Games, LinkedIn cover</title>
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ddeef8"/><stop offset=".6" stop-color="#f8faf8"/><stop offset="1" stop-color="#e4f0e8"/>
    </linearGradient>
    <linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".0"/><stop offset="1" stop-color="#ffffff" stop-opacity=".55"/>
    </linearGradient>
    <radialGradient id="bub" cx=".35" cy=".3" r=".8">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".9"/><stop offset="1" stop-color="#cfe9f2" stop-opacity=".25"/>
    </radialGradient>
    <linearGradient id="glassfill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".78"/><stop offset="1" stop-color="#ffffff" stop-opacity=".45"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <rect y="95" width="${W}" height="96" fill="url(#band)"/>
  <!-- bubbles -->
  ${bubble(88, 56, 26, 0.5)}${bubble(188, 132, 14, 0.5)}${bubble(268, 40, 10, 0.5)}${bubble(330, 150, 19, 0.45)}
  ${bubble(842, 150, 22, 0.5)}${bubble(930, 44, 13, 0.5)}${bubble(1040, 112, 28, 0.5)}${bubble(1090, 36, 9, 0.5)}
  <!-- pixel nods -->
  ${px(188, 38)}${px(197, 38)}${px(188, 47)}${px(215, 74, "#c9e6f2")}${px(224, 74, "#c9e6f2")}
  ${px(905, 92)}${px(914, 92)}${px(914, 101)}${px(968, 140, "#c9e6f2")}${px(977, 131, "#c9e6f2")}${px(986, 140, "#c9e6f2")}
  <!-- glass panel behind the lockup -->
  <rect x="${lx - 34}" y="14" width="${LOGO_W * S + 68}" height="${H - 28}" rx="26" fill="url(#glassfill)" stroke="#ffffff" stroke-opacity=".9" stroke-width="1.5"/>
  <path d="M${lx - 24} 40C${lx - 24} 24 ${lx - 14} 17 ${lx + 6} 17H${lx + LOGO_W * S - 6}C${lx + LOGO_W * S + 14} 17 ${lx + LOGO_W * S + 24} 24 ${lx + LOGO_W * S + 24} 40C${lx + LOGO_W * S * 0.6} 30 ${lx + LOGO_W * S * 0.3} 30 ${lx - 24} 44Z" fill="#ffffff" opacity=".35"/>
  <g transform="translate(${lx} ${ly}) scale(${S})">${inner}</g>
  <text x="${W / 2}" y="${ly + LOGO_H * S + 38}" text-anchor="middle" font-family="Nunito Sans, Segoe UI, Arial, sans-serif" font-weight="600" font-size="19" letter-spacing="1.2" fill="#2c4a58">Small games with an arcade soul.</text>
</svg>`;

fs.writeFileSync(p("brand/linkedin-banner.svg"), svg);
const out = (w) => new Resvg(svg, { fitTo: { mode: "width", value: w }, font: FONT ? { fontFiles: [FONT], loadSystemFonts: false, defaultFontFamily: "Nunito Sans" } : { loadSystemFonts: true } }).render().asPng();
fs.writeFileSync(p("brand/png/unugames-linkedin-banner.png"), out(W));
fs.writeFileSync(p("brand/png/unugames-linkedin-banner@2x.png"), out(W * 2));
console.log("ok", W, H);
