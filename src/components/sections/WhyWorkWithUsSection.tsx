"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SectionContainer } from "../ui/SectionContainer";
import { GlassCard } from "../ui/GlassCard";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#10b981";

const BENEFITS = [
  "Single point of communication",
  "Comparison across major hospital groups",
  "Coordinated documentation",
  "Travel and accommodation assistance",
  "Structured planning support",
];

export function WhyWorkWithUsSection() {
  return (
    <SectionContainer>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="overline"
          sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5 }}
        >
          Our Advantage
        </Typography>
        <Typography variant="h2" sx={{ mt: 1, mb: 3, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
          Why Work With a Medical Travel Coordinator?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 720, mx: "auto" }}>
          Direct hospital contact can be time-consuming when comparing multiple institutions. We simplify complex cross-border medical travel.
        </Typography>
      </Box>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <GlassCard>
          <Typography variant="body1" paragraph>
            We provide:
          </Typography>
          <Box component="ul" sx={{ m: 0, p: 0, pl: 2.5, mb: 3 }}>
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
