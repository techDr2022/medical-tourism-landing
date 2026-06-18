import { ImageResponse } from "next/og";
import { SITE } from "@/lib/seo";

export const runtime = "edge";
export const alt = SITE.defaultTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #ecfdf5 0%, #ffffff 45%, #f0fdfa 100%)",
          color: "#0f172a",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "32px",
            fontSize: 28,
            fontWeight: 700,
            color: "#0d9488",
          }}
        >
          MedicalToursIndia
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 980,
          }}
        >
          Medical Travel to India
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            lineHeight: 1.4,
            color: "#334155",
            maxWidth: 900,
          }}
        >
          Coordinated hospital access, treatment estimates, and travel support for international
          patients.
        </div>
      </div>
    ),
    size
  );
}
