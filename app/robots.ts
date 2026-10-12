import type { MetadataRoute } from "next";
import { studio } from "@/src/data/studio";

export const dynamic = "force-static"; // required for `output: "export"`

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${studio.url}/sitemap.xml`,
  };
}
