"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SectionContainer } from "../ui/SectionContainer";
import { GlassCard } from "../ui/GlassCard";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#10b981";

const PRIVACY_POINTS = [
  "Patient reports are shared securely with hospitals",
  "We do not provide medical diagnosis",
  "We do not influence clinical decisions",
  "All treatments are delivered by licensed hospitals and specialists",
  "We do not charge patients for coordination services",
];

export function DataPrivacySection() {
  return (
    <SectionContainer variant="alt">
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="overline"
          sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5 }}
        >
          Transparency
        </Typography>
        <Typography variant="h2" sx={{ mt: 1, mb: 3, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
          Data Privacy & Transparency
        </Typography>
      </Box>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <GlassCard>
          <Box component="ul" sx={{ m: 0, p: 0, pl: 2.5, mb: 2 }}>
            {PRIVACY_POINTS.map((point) => (
              <Box
                key={point}
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
                  {point}
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography variant="body1" sx={{ mt: 3, fontWeight: 500 }}>
            Our role is strictly facilitation and coordination.
          </Typography>
        </GlassCard>
      </Box>
    </SectionContainer>
  );
}
