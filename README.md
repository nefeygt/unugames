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

Name, legal name, founding date, tagline, domain, email, planned platforms, and social links.

- **LinkedIn / Crunchbase:** set `social.linkedin` / `social.crunchbase`. The links then appear in the
  header, contact section and footer, and are added to the JSON-LD `sameAs` automatically.
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
  screenshot: {                        // optional, real in-game capture in /public/games
    src: "/games/my-game.webp", width: 540, height: 1170, alt: "What the screenshot shows",
  },
  storeUrl: "https://play.google.com/…", // optional, only once the listing is public
}
```

Screenshots: export a portrait capture to WebP (≈ 540 px wide is plenty) and put it in `public/games/`.
Without a screenshot the card shows simple CSS cover art. Google Play *internal testing* links only
work for listed testers, so add `storeUrl` once Glyph is in open testing or production.

### Team — `src/data/team.ts`

`{ name, role }` per person — nothing else. Avatars are generated pixel art from the name (no photos).
The Team section and its nav link disappear if the list is empty.

### Legal pages — `app/privacy/page.tsx`, `app/terms/page.tsx`

They describe what this site actually does (no forms, cookies, analytics or third-party requests).
If you add any of those, update the privacy policy. Bump the `updated` date on the page **and**
`LEGAL_UPDATED` in `app/sitemap.ts`. Have both pages reviewed before launch.

---

## Structure

```
app/
  layout.tsx              fonts, metadata (title, OG, Twitter, canonical), JSON-LD Organization
  page.tsx                Hero → Games → About → Team → Contact
  privacy/  terms/        legal pages
  sitemap.ts  robots.ts   → /sitemap.xml, /robots.txt
  icon.svg                favicon
  og.png/route.tsx        → /og.png share card (1200×630), drawn in JSX/CSS at build time
  apple-touch-icon.png/   → /apple-touch-icon.png (180×180)
  globals.css             design tokens (CSS variables) + contrast notes
components/               one file per section; ui/ holds shared pieces (glass, pixel art, logo)
lib/og.tsx                share-card drawing
src/data/                 studio.ts, games.ts, team.ts  ← edit these
public/games/             real game screenshots
```

## Design notes

- Palette and contrast ratios are documented at the top of `app/globals.css`. Every text color passes
  WCAG AA against the darkest painted backdrop; check again if you change a color.
- All visuals are CSS/SVG (sky, bubbles, handheld, pixel motifs, avatars). The only raster images
  are real game screenshots and the generated share/touch icons.
- Ambient motion is slow and switches off completely under `prefers-reduced-motion`.
- Nunito Sans is self-hosted at build time by `next/font`, so visitors never contact Google.
