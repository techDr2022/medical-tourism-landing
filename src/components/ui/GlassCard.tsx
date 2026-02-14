"use client";

import Card from "@mui/material/Card";
import { alpha } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";

interface GlassCardProps {
  children: React.ReactNode;
  variant?: "default" | "highlighted";
  component?: React.ElementType;
  sx?: SxProps<Theme>;
}

const GREEN_600 = "#10b981";
const GREEN_50 = "#f0fdf4";

export function GlassCard({
  children,
  variant = "default",
  component = "div",
  sx,
}: GlassCardProps) {
  return (
    <Card
      component={component}
      variant="outlined"
      sx={{
        borderRadius: 3,
        p: { xs: 3, lg: 4 },
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${alpha("#171717", 0.1)}`,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
          borderColor: alpha(GREEN_600, 0.2),
        },
        ...(variant === "highlighted" && {
          borderColor: alpha(GREEN_600, 0.3),
          background: `linear-gradient(135deg, ${alpha(GREEN_50, 0.9)} 0%, rgba(255, 255, 255, 0.9) 100%)`,
          boxShadow: "0 8px 32px -4px rgba(22, 163, 74, 0.25)",
          "&:hover": {
            boxShadow: "0 12px 40px -4px rgba(22, 163, 74, 0.3)",
          },
        }),
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}
