"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { SectionContainer } from "../ui/SectionContainer";
import { PROCESS_STEPS } from "@/constants";

const GREEN_600 = "#1c7c7f";
const GREEN_700 = "#0d9488";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";

export function ProcessSection() {
  return (
    <SectionContainer variant="alt" id="process">
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="overline"
          sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5 }}
        >
          Simple Steps
        </Typography>
        <Typography variant="h2" sx={{ mt: 1, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
          How the Process Works
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "flex-start" },
          gap: { xs: 0, md: 1 },
          maxWidth: 960,
          mx: "auto",
        }}
      >
        {PROCESS_STEPS.map((step, index) => (
          <Box
            key={step}
            sx={{
              flex: { md: 1 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              px: { xs: 2, md: 1 },
              pb: { xs: 3, md: 0 },
              "&:not(:last-child)": {
                "&::after": {
                  content: '""',
                  display: { xs: "none", md: "block" },
                  position: "absolute",
                  top: 24,
                  left: "calc(50% + 32px)",
                  right: "-14px",
                  height: 3,
                  background: `linear-gradient(90deg, ${GRADIENT_START} 0%, ${alpha(GRADIENT_START, 0.3)} 50%, transparent 100%)`,
                  borderRadius: 2,
                },
              },
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "1rem",
                mb: 1.5,
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0 6px 16px rgba(22, 163, 74, 0.4)",
                },
              }}
            >
              {index + 1}
            </Box>
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{
                fontSize: { xs: "0.9rem", md: "0.85rem" },
                lineHeight: 1.4,
              }}
            >
              {step}
            </Typography>
          </Box>
        ))}
      </Box>
    </SectionContainer>
  );
}
