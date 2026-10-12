# UnU Games — website

Marketing site for UnU Games. Next.js 15 (App Router) + TypeScript + Tailwind CSS 3, exported as a
plain static site. No server, no database, no cookies, no analytics, no third-party requests.

```bash
npm install
npm run dev       # http://localhost:3100
npm run build     # writes the static site to /out
npm run preview   # serves /out locally on :3200 to check the real export
```

Deploy by uploading `/out` to any static host (Cloudflare Pages, Netlify, Vercel, GitHub Pages…).

---

## Editing content

All facts live in three files under `src/data/`. The site never states anything that isn't in them.
If a value is `null` or a list is empty, whatever depends on it is hidden — no filler.

### Studio facts — `src/data/studio.ts`

Name, legal name, founding date, headquarters city, tagline, domain, email, planned platforms, and
company profiles.

- **LinkedIn / Crunchbase:** `social.linkedin` / `social.crunchbase` appear in the header, contact
  section and footer (new tab) and in the JSON-LD `sameAs`. Set one to `null` to hide it.
- **Headquarters:** `headquarters` is the city the team works from (Ankara, Turkey). It is shown in
  About and as the JSON-LD `location`. It is not a registered address; never add a street address.
- **Legal entity:** UnU Games is not incorporated, so `legalName` is plain "UnU Games". When it is
  registered, update `legalName` and `country` (it feeds the footer © line and the legal pages).
- **Domain:** change `url` and `domain` once; canonical links, sitemap, robots.txt, Open Graph and
  JSON-LD all follow.
- **Platforms:** `planned: true` renders as "Android (planned)". Flip to `false` only when it ships.

### Games — `src/data/games.ts`

One object per game. Adding a game = adding one entry:

```ts
{
  slug: "my-game",
  title: "My Game",
  description: "One honest line about the game.",
  status: "In development",            // real status, no percentages
  platforms: [{ name: "Android", planned: true }],
  screenshots: [                       // optional, real in-game captures in /public/games
    { src: "/games/my-game.webp", alt: "What the screenshot shows", caption: "Short caption" },
  ],
  storeUrl: "https://play.google.com/…", // optional, only once the listing is public
}
```

Screenshots: export a portrait phone capture (9:19.5) to WebP (≈ 540 px wide is plenty) and put it in
`public/games/`. Several screenshots become a carousel (buttons, dots, ←/→ keys, swipe, screen-reader
announcements; autoplay is off). One screenshot shows on its own with no controls. Without any, the
card shows simple CSS cover art. Glyph's list lives in `src/data/glyph-screenshots.ts`. Google Play *internal testing* links only
work for listed testers, so add `storeUrl` once Glyph is in open testing or production.

### Team — `src/data/team.ts`

`{ name, role, linkedin?, blurb? }` per person. No photos and no emails: avatars are pixel art built
from the initials. A LinkedIn icon appears on a card only when `linkedin` is set (add it only with the
person's consent). `blurb` is an optional one-liner about their focus (current ones are launch drafts; each person can rewrite theirs). The Team section and its nav
link disappear if the list is empty.

### Legal pages — `app/privacy/page.tsx`, `app/terms/page.tsx`

They describe what this site actually does (no forms, cookies, analytics or third-party requests).
If you add any of those, update the privacy policy. Bump the `updated` date on the page **and**
`LEGAL_UPDATED` in `app/sitemap.ts`. Have both pages reviewed before launch.

---

## Brand assets

The SVGs in `brand/` are the source of truth. Every letter is an outlined path, so no font is
needed and the SVGs and PNGs render the same everywhere.

| File | Use |
|---|---|
| `brand/unugames-logo.svg` | Full-colour lockup (mark + "UnU" + "Games"). For light backgrounds. |
| `brand/unugames-mark.svg` | Icon-only mark: glossy teal tile with a pixel "UnU" face. Works on light and dark. |
| `brand/unugames-logo-mono.svg` | Single colour via `currentColor` (ink by default). Set `color: #fff` for dark backgrounds. |
| `brand/png/*` | Exports: logo 2048 px wide, mark 1024 and 400 (LinkedIn/Crunchbase), mark on white 512. |
| `brand/explore/*` | The three original concepts (A face tile = chosen, B pixel letters, C glass bubble). |

Colours are the exact tokens from `app/globals.css` (teal `#1b6662` → teal-hover `#185b58` tile,
warm `#f8faf8` face, ink `#17323f` "UnU", teal "Games"). The mark is drawn on a 16-cell grid, so it
stays pixel-exact at 16, 32 and 48 px. "UnU" uses custom geometric letters; "Games" is Nunito Sans
ExtraBold (SIL Open Font License), converted to outlines.

After editing any SVG in `brand/`, regenerate everything derived from it:

```bash
npm run brand:export
```

That rewrites `brand/png/*`, `app/favicon.ico` (16/32/48), `app/icon.svg`, `app/apple-icon.png`
(180, square: iOS rounds it), `public/icon-192.png` + `public/icon-512.png` (web manifest,
`app/manifest.ts`) and the copies in `public/brand/` that the header, footer and contact section use.
The share card (`/og.png`) embeds `brand/unugames-logo.svg` at build time. Rendering uses
`@resvg/resvg-js` (dev dependency).

---

## Structure

```
app/
  layout.tsx              fonts, metadata (title, OG, Twitter, canonical), JSON-LD Organization
  page.tsx                Hero → Games → About → Team → Contact
  privacy/  terms/        legal pages
  sitemap.ts  robots.ts   → /sitemap.xml, /robots.txt
  favicon.ico icon.svg apple-icon.png   generated by `npm run brand:export`
  manifest.ts             → /manifest.webmanifest
  og.png/route.tsx        → /og.png share card (1200×630), built at build time with the logo SVG
  globals.css             design tokens (CSS variables) + contrast notes
components/               one file per section; ui/ holds shared pieces (glass, pixel art, logo)
lib/og.tsx                share-card drawing
brand/                    logo source SVGs, PNG exports, concepts   ← source of truth for the logo
scripts/brand-export.mjs  `npm run brand:export`
src/data/                 studio.ts, games.ts, team.ts  ← edit these
public/games/             real game screenshots
```

## Design notes

- Palette and contrast ratios are documented at the top of `app/globals.css`. Every text color passes
  WCAG AA against the darkest painted backdrop; check again if you change a color.
- All visuals are CSS/SVG (sky, bubbles, handheld, pixel motifs, avatars). The only raster images
  are real game screenshots and PNGs exported from the brand SVGs.
- Ambient motion is slow and switches off completely under `prefers-reduced-motion`.
- Nunito Sans is self-hosted at build time by `next/font`, so visitors never contact Google.
