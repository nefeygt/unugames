/**
 * npm run brand:export
 *
 * Regenerates every raster brand asset from the SVG sources in /brand:
 *   brand/png/*                    PNG exports (logo, mark sizes, mark on white)
 *   app/favicon.ico                16/32/48 px (PNG-in-ICO)
 *   app/icon.svg                   copy of the mark (Next.js picks it up automatically)
 *   app/apple-icon.png             180×180, full-bleed square (iOS rounds the corners itself)
 *   public/icon-192.png, -512.png  referenced from the web manifest (app/manifest.ts)
 *   public/brand/*.svg             copies served to the site (header/footer logo, contact tile)
 *
 * Renderer: @resvg/resvg-js, so output matches the SVGs exactly (all text is outlined; no fonts used).
 */
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = (...parts) => path.join(root, ...parts);
const read = (rel) => fs.readFileSync(p(rel), "utf8");

const logo = read("brand/unugames-logo.svg");
const mark = read("brand/unugames-mark.svg");
const mono = read("brand/unugames-logo-mono.svg");

/** Render an SVG string to a PNG buffer at the given width (height follows the viewBox). */
function png(svg, width, background) {
  return new Resvg(svg, { fitTo: { mode: "width", value: width }, ...(background ? { background } : {}) }).render().asPng();
}

/** Pack PNG buffers into a .ico container (PNG-compressed entries, supported by all current browsers). */
function ico(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, e); // width
    header.writeUInt8(size >= 256 ? 0 : size, e + 1); // height
    header.writeUInt8(0, e + 2); // palette colours
    header.writeUInt8(0, e + 3); // reserved
    header.writeUInt16LE(1, e + 4); // colour planes
    header.writeUInt16LE(32, e + 6); // bits per pixel
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((i) => i.data)]);
}

/**
 * Square-cornered variant of the mark for iOS, which applies its own corner mask.
 * The inner-glow rim (stroke-opacity .22) is dropped: on a square it would read as a frame.
 */
const fullBleedMark = mark.replace('rx="16"', 'rx="0"').replace(/<rect x="1\.25"[^>]*\/>\s*/, "");
if (fullBleedMark === mark) throw new Error("Full-bleed mark variant failed: brand/unugames-mark.svg structure changed.");

const outputs = [
  ["brand/png/unugames-logo.png", () => png(logo, 2048)],
  ["brand/png/unugames-mark-1024.png", () => png(mark, 1024)],
  ["brand/png/unugames-mark-400.png", () => png(mark, 400)],
  ["brand/png/unugames-mark-on-white-512.png", () => png(mark, 512, "#ffffff")],
  ["app/favicon.ico", () => ico([16, 32, 48].map((size) => ({ size, data: png(mark, size) })))],
  ["app/icon.svg", () => mark],
  ["app/apple-icon.png", () => png(fullBleedMark, 180)],
  ["public/icon-192.png", () => png(mark, 192)],
  ["public/icon-512.png", () => png(mark, 512)],
  ["public/brand/unugames-logo.svg", () => logo],
  ["public/brand/unugames-mark.svg", () => mark],
  ["public/brand/unugames-logo-mono.svg", () => mono],
];

for (const [rel, make] of outputs) {
  fs.mkdirSync(path.dirname(p(rel)), { recursive: true });
  const data = make();
  fs.writeFileSync(p(rel), data);
  console.log(`${rel.padEnd(42)} ${(Buffer.byteLength(data) / 1024).toFixed(1).padStart(7)} KB`);
}
