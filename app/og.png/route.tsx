import { renderOgImage } from "@/lib/og";

/**
 * Serves /og.png — the Open Graph / Twitter share card, rendered to a real .png
 * file at build time (a route folder named "og.png" exports as out/og.png, which
 * every static host serves with the right content type).
 */
export const dynamic = "force-static";

export function GET() {
  return renderOgImage();
}
