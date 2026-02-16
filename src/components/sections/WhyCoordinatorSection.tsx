"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SectionContainer } from "../ui/SectionContainer";
import { GlassCard } from "../ui/GlassCard";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const GREEN_600 = "#1c7c7f";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";

const BENEFITS = [
  "Compare multiple hospital options",
  "Structured cost clarity before travel",
  "Video consultation arranged efficiently",
  "Travel and accommodation support",
  "Single point of communication",
];

export function WhyCoordinatorSection() {
  return (
    <SectionContainer variant="alt">
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="overline"
          sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5 }}
        >
          Coordinator vs Direct Contact
        </Typography>
        <Typography
          variant="h2"
          component="span"
          sx={{
            mt: 1,
            mb: 3,
            fontSize: { xs: "1.5rem", md: "1.75rem" },
            maxWidth: 720,
            mx: "auto",
            display: "block",
          }}
        >
          Why{" "}
          <Box
            component="span"
            sx={{
              background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Work With a Medical Travel Coordinator
          </Box>{" "}
          Instead of Contacting Hospitals Directly?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 720, mx: "auto" }}>
          A coordinator streamlines your journey and gives you one clear point of contact instead of managing multiple hospitals yourself.
        </Typography>
      </Box>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <GlassCard>
          <Box component="ul" sx={{ m: 0, p: 0, pl: 2.5 }}>
            {BENEFITS.map((benefit) => (
              <Box
                key={benefit}
                component="li"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  mb: 1.5,
                  "&:last-of-type": { mb: 0 },
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 20, color: GREEN_600, mt: 0.25, flexShrink: 0 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {benefit}
                </Typography>
              </Box>
            ))}
          </Box>
        </GlassCard>
      </Box>
    </SectionContainer>
  );
}
