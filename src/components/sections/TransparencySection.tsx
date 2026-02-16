"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { SectionContainer } from "../ui/SectionContainer";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#1c7c7f";

const TRANSPARENCY_POINTS = [
  "We do not charge patients for coordination",
  "No hidden service fees",
  "Hospital invoices are issued directly by the hospital",
  "Written treatment estimate shared before travel",
];

export function TransparencySection() {
  return (
    <SectionContainer variant="alt">
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="overline"
          sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5 }}
        >
          Transparency
        </Typography>
        <Typography variant="h2" sx={{ mt: 1, mb: 3, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
          Transparency & No Service Fee
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ maxWidth: 800, mx: "auto" }}>
        {TRANSPARENCY_POINTS.map((point) => (
          <Grid key={point} size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: alpha("#171717", 0.1),
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 253, 244, 0.4) 100%)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(22, 163, 74, 0.2)",
                  borderColor: alpha(GREEN_600, 0.3),
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(240, 253, 244, 0.6) 100%)",
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
      <Typography variant="body2" color="text.secondary" sx={{ mt: 4, textAlign: "center", maxWidth: 720, mx: "auto" }}>
        Our role is coordination, not medical treatment.
      </Typography>
    </SectionContainer>
  );
}
