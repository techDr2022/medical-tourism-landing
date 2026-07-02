"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { alpha } from "@mui/material/styles";
import { SectionContainer } from "../ui/SectionContainer";
import { LeadForm } from "../LeadForm";

const GREEN_600 = "#1c7c7f";

const BENEFITS = [
  "Suitable hospital options",
  "Preliminary package estimate",
  "Video consultation scheduling",
  "Travel guidance support",
];

export function RequestFormSection() {
  return (
    <SectionContainer id="contact">
      <Grid container spacing={6} alignItems="center">
        <Grid size={{ xs: 12, lg: 5 }}>
          <Typography
            variant="overline"
            sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5 }}
          >
            Get Started
          </Typography>
          <Typography variant="h2" sx={{ mt: 1, mb: 2, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
            Request a Treatment Estimate Within 24–48 Hours
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Share your details to receive:
          </Typography>
          <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
            {BENEFITS.map((item) => (
              <Box
                key={item}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 1.5,
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 22, color: GREEN_600, flexShrink: 0 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              color: "text.secondary",
              fontWeight: 500,
            }}
          >
            Our coordination team responds within 24–48 hours.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Box
            sx={{
              p: 4,
              borderRadius: 3,
              border: "1px solid",
              borderColor: alpha("#171717", 0.1),
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 244, 0.3) 100%)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <LeadForm />
          </Box>
        </Grid>
      </Grid>
    </SectionContainer>
  );
}
