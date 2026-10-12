/**
 * STUDIO FACTS — the only claims the site is allowed to make.
 *
 * Every piece of copy that states a fact about the studio reads from this file
 * (or from games.ts / team.ts). If a value is `null`, the UI hides whatever
 * depends on it instead of showing filler. Edit here, rebuild, done.
 */

export type Platform = {
  name: string;
  /** `true` = shown as "<name> (planned)". Nothing ships yet, so all are planned. */
  planned: boolean;
};

export const studio = {
  name: "UnU Games",

  /**
   * Legal name used in the footer © line and the legal pages: "UnU Games" (confirmed).
   * No Inc./LLC/Ltd. form is claimed.
   * TODO: add the country of registration (and governing law in app/terms) once the studio is registered.
   */
  legalName: "UnU Games",
  /** Country of registration — deliberately unset: the studio is not registered yet. */
  country: null as string | null,

  /** Where the team is based. City + country only; never a street address. */
  headquarters: { city: "Ankara", country: "Turkey", countryCode: "TR" },

  /** ISO "YYYY-MM" for JSON-LD, plus a human label. */
  founded: { iso: "2025-03", label: "March 2025" },

  /** The one-line description, used as tagline and meta description. */
  tagline: "Small, nostalgic games with a retro-arcade spirit.",

  /** Production URL. Used for canonical links, sitemap, Open Graph and JSON-LD. */
  url: "https://www.unugames.studio",
  domain: "unugames.studio",

  email: "hello@unugames.studio",

  /** Studio-level platform plans. No platform is released yet. */
  platforms: [
    { name: "Android", planned: true },
    { name: "iOS", planned: true },
    { name: "PlayStation 5", planned: true },
    { name: "Xbox", planned: true },
  ] satisfies Platform[],

  /**
   * Company profiles. Shown in the header, contact section and footer (new tab,
   * rel="noopener noreferrer") and listed in the JSON-LD `sameAs`. Set to null to hide one.
   */
  social: {
    linkedin: "https://www.linkedin.com/company/unugames/" as string | null,
    crunchbase: "https://www.crunchbase.com/organization/unu-games" as string | null,
  },
} as const;

/** "Android (planned)" or "Android" — the one place planned labels are produced. */
export function platformLabel(p: Platform) {
  return p.planned ? `${p.name} (planned)` : p.name;
}

/** Social links that actually exist, in display order. */
export function socialLinks() {
  const links: { label: string; href: string }[] = [];
  if (studio.social.linkedin) links.push({ label: "LinkedIn", href: studio.social.linkedin });
  if (studio.social.crunchbase) links.push({ label: "Crunchbase", href: studio.social.crunchbase });
  return links;
}
