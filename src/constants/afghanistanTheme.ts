/**
 * Afghanistan page tokens — aligned with site medical teal for a clear,
 * professional look (same family as Nigeria / main site).
 */
export const AF = {
  primary: "#1c7c7f",
  primaryDark: "#0d9488",
  gradientStart: "#10b981",
  gradientEnd: "#0d9488",
  text: "#0f172a",
  muted: "rgba(15, 23, 42, 0.7)",
  mutedSoft: "rgba(15, 23, 42, 0.55)",
  line: "rgba(15, 23, 42, 0.1)",
  white: "#ffffff",
  softBg: "#f0fdfa",
} as const;

export const afCtaSx = {
  px: 3.25,
  py: 1.4,
  fontSize: "0.9375rem",
  fontWeight: 600,
  borderRadius: 1.5,
  background: `linear-gradient(135deg, ${AF.gradientStart} 0%, ${AF.gradientEnd} 100%)`,
  boxShadow: "0 8px 22px rgba(16, 185, 129, 0.28)",
  "&:hover": {
    background: `linear-gradient(135deg, ${AF.gradientStart} 0%, ${AF.gradientEnd} 100%)`,
    filter: "brightness(0.96)",
    boxShadow: "0 10px 26px rgba(16, 185, 129, 0.35)",
  },
} as const;
