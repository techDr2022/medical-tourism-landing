"use client";

import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";

const GREEN_50 = "#f0fdf4";
const GREEN_100 = "#dcfce7";
const CYAN_50 = "#ecfeff";

export function AuroraBackground() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: -1,
        backgroundColor: "#fafafa",
      }}
    >
      {/* Main gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "60%",
          background: `linear-gradient(180deg, ${alpha(GREEN_50, 0.4)} 0%, ${alpha(CYAN_50, 0.2)} 50%, transparent 100%)`,
        }}
      />
      {/* Secondary gradient accent */}
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(GREEN_100, 0.3)} 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />
      {/* Tertiary gradient accent */}
      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(CYAN_50, 0.25)} 0%, transparent 70%)`,
          filter: "blur(50px)",
        }}
      />
    </Box>
  );
}
