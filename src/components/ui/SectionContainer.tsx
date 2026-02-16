"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { alpha } from "@mui/material/styles";

const GREEN_50 = "#f0fdf4";
const CYAN_50 = "#ecfeff";

interface SectionContainerProps {
  children: React.ReactNode;
  id?: string;
  variant?: "default" | "alt";
}

export function SectionContainer({ children, id, variant = "default" }: SectionContainerProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        py: { xs: 6, md: 10 },
        position: "relative",
        ...(variant === "alt" 
          ? {
              background: `linear-gradient(180deg, ${alpha(GREEN_50, 0.4)} 0%, ${alpha(CYAN_50, 0.2)} 50%, rgba(255, 255, 255, 0.8) 100%)`,
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: `linear-gradient(90deg, transparent 0%, ${alpha("#1c7c7f", 0.2)} 50%, transparent 100%)`,
              },
            }
          : {
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(10px)",
            }
        ),
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, lg: 3 }, position: "relative", zIndex: 1 }}>
        {children}
      </Container>
    </Box>
  );
}
