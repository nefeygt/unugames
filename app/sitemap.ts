import type { MetadataRoute } from "next";
import { studio } from "@/src/data/studio";

export const dynamic = "force-static"; // required for `output: "export"`

/** Bump when legal pages change. */
const LEGAL_UPDATED = "2026-10-13";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${studio.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${studio.url}/privacy/`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${studio.url}/terms/`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.3 },
  ];
}
