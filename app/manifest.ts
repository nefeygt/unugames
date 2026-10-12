import type { MetadataRoute } from "next";
import { studio } from "@/src/data/studio";

export const dynamic = "force-static"; // required for `output: "export"`

/** Web app manifest → /manifest.webmanifest. Icons come from `npm run brand:export`. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: studio.name,
    short_name: studio.name,
    description: studio.tagline,
    start_url: "/",
    display: "browser",
    background_color: "#f8faf8", // --bg-warm
    theme_color: "#ddeef8", // --bg-sky
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
