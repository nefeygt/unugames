/**
 * node scripts/post-gif.mjs
 * Builds the looping 1200x627 GIF for the first LinkedIn post: brand lockup, rising bubbles, twinkling pixel blocks.
 * Output: brand/png/unugames-post.gif (+ a still frame). No claims beyond the name, tagline and "GLYPH in development".
 * Env: RESVG_PATH / GIFENC_PATH (optional module paths), BANNER_FONT (Nunito Sans SemiBold TTF).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const { Resvg } = await import(process.env.RESVG_PATH || "@resvg/resvg-js");
const { GIFEncoder, quantize, applyPalette } = await import(process.env.GIFENC_PATH || "gifenc");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const logoSvg = fs.readFileSync(path.join(root, "brand/unugames-logo.svg"), "utf8");
const inner = logoSvg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/<title>[\s\S]*?<\/title>/, "");
const FONT = process.env.BANNER_FONT;

const W = 1200, H = 627, N = 30, FPS = 15;
const LW = 658, LH = 124, S = 1.1;
const lx = (W - LW * S) / 2;

// [x, baseY phase (0..1), radius, loops per cycle]
const bubbles = [[110,.05,34,1],[260,.55,16,2],[420,.3,24,1],[610,.8,12,2],[760,.15,30,1],[920,.65,18,2],[1060,.4,40,1],[1140,.9,14,2],[40,.7,20,1],[340,.95,10,2],[860,.5,12,1]];
const pixels = [[150,150],[170,150],[150,170],[1010,120],[1030,140],[230,470],[250,470],[250,490],[960,470],[980,450],[1000,470]];

const bubble = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#bub)" opacity=".6"/><circle cx="${cx}" cy="${cy}" r="${r - 1}" fill="none" stroke="#fff" stroke-opacity=".9" stroke-width="2"/><ellipse cx="${cx - r * .35}" cy="${cy - r * .45}" rx="${r * .32}" ry="${r * .18}" fill="#fff" opacity=".85" transform="rotate(-30 ${cx - r * .35} ${cy - r * .45})"/>`;

function frame(i) {
  const t = i / N;
  let b = "";
  for (const [x, ph, r, k] of bubbles) {
    const P = H + 2 * r;
    const y = H + r - (((ph + t * k) % 1) * P);
    b += bubble(x + Math.sin(2 * Math.PI * (t * k + ph)) * 8, y, r);
  }
  let p = "";
  pixels.forEach(([x, y], j) => {
    const o = 0.35 + 0.4 * (0.5 + 0.5 * Math.sin(2 * Math.PI * (t + j * 0.13)));
    p += `<rect x="${x}" y="${y}" width="18" height="18" rx="4" fill="${j % 2 ? "#c9e6f2" : "#bfe3df"}" opacity="${o.toFixed(2)}"/>`;
  });
  const bob = Math.sin(2 * Math.PI * t) * 7;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ddeef8"/><stop offset=".6" stop-color="#f8faf8"/><stop offset="1" stop-color="#e4f0e8"/></linearGradient>
    <radialGradient id="bub" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#cfe9f2" stop-opacity=".25"/></radialGradient>
    <linearGradient id="gl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".82"/><stop offset="1" stop-color="#fff" stop-opacity=".5"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  ${b}${p}
  <rect x="${lx - 60}" y="${150 + bob * .4}" width="${LW * S + 120}" height="${LH * S + 250}" rx="44" fill="url(#gl)" stroke="#fff" stroke-opacity=".95" stroke-width="2.5"/>
  <g transform="translate(${lx} ${195 + bob}) scale(${S})">${inner}</g>
  <text x="${W / 2}" y="${195 + LH * S + 82}" text-anchor="middle" font-family="Nunito Sans, Segoe UI, Arial, sans-serif" font-weight="600" font-size="34" letter-spacing="1.6" fill="#2c4a58">Small games with an arcade soul.</text>
  <text x="${W / 2}" y="${195 + LH * S + 134}" text-anchor="middle" font-family="Nunito Sans, Segoe UI, Arial, sans-serif" font-weight="600" font-size="24" letter-spacing="1.2" fill="#4d6573">First game: GLYPH, in development</text>
</svg>`;
}

const gif = GIFEncoder();
let still;
for (let i = 0; i < N; i++) {
  const r = new Resvg(frame(i), { font: FONT ? { fontFiles: [FONT], loadSystemFonts: false, defaultFontFamily: "Nunito Sans" } : { loadSystemFonts: true } }).render();
  if (i === 0) still = r.asPng();
  const palette = quantize(r.pixels, 128);
  gif.writeFrame(applyPalette(r.pixels, palette), W, H, { palette, delay: Math.round(1000 / FPS) });
}
gif.finish();
fs.writeFileSync(path.join(root, "brand/png/unugames-post.gif"), gif.bytes());
fs.writeFileSync(path.join(root, "brand/png/unugames-post-still.png"), still);
console.log("ok", gif.bytes().length, "bytes");
