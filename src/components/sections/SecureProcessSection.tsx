"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { SectionContainer } from "../ui/SectionContainer";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#1c7c7f";

const SECURITY_POINTS = [
  "Medical reports shared only with selected hospitals",
  "Confidential handling of patient information",
  "No unauthorised distribution of medical records",
  "Communication through designated coordinators",
];

export function SecureProcessSection() {
  return (
    <SectionContainer>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="overline"
          sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5 }}
        >
          Security
        </Typography>
        <Typography variant="h2" sx={{ mt: 1, mb: 3, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
          Secure & Confidential Process
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ maxWidth: 800, mx: "auto" }}>
        {SECURITY_POINTS.map((point) => (
          <Grid key={point} size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: alpha("#171717", 0.08),
                backgroundColor: "#fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                transition: "all 0.2s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  borderColor: alpha(GREEN_600, 0.2),
                },
              }}
            >
              <CheckCircleOutlineIcon
                sx={{ fontSize: 20, color: GREEN_600, flexShrink: 0, mt: 0.25 }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {point}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
}
