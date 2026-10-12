import { ImageResponse } from "next/og";
import { UNU_FACE } from "@/components/ui/pixel";

/**
 * Serves /apple-touch-icon.png: 180×180 home-screen icon, same glossy tile + pixel
 * face as the favicon. Rendered once at build time.
 */
export const dynamic = "force-static";
const size = { width: 180, height: 180 };

export function GET() {
  const px = 9;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #e9f7fb 0%, #bfe3ea 55%, #9fd3d6 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {UNU_FACE.map((row, y) => (
            <div key={y} style={{ display: "flex" }}>
              {Array.from(row).map((c, x) => (
                <div key={x} style={{ width: px, height: px, background: c === "X" ? "#17323f" : "transparent" }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
