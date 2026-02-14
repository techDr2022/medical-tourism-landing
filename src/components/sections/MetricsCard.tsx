"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Chip from "@mui/material/Chip";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#10b981";
const GREEN_700 = "#0d9488";

const METRICS = [
  {
    label: "Response Time",
    value: "24-48h",
    description: "Treatment estimates",
  },
  {
    label: "Patient Support",
    value: "24/7",
    description: "Dedicated coordinators",
  },
  {
    label: "Service Fee",
    value: "0%",
    description: "No hidden charges",
  },
];

export function MetricsCard() {
  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 3,
        backgroundColor: "#ffffff",
        border: `1px solid ${alpha("#171717", 0.1)}`,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        position: "relative",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      {/* LIVE Badge */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
        <Typography
          variant="overline"
          sx={{
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: 1.5,
            color: alpha("#171717", 0.5),
            textTransform: "uppercase",
          }}
        >
          Service Overview
        </Typography>
        <Chip
          label="ACTIVE"
          size="small"
          sx={{
            backgroundColor: GREEN_600,
            color: "#ffffff",
            fontWeight: 600,
            fontSize: "0.7rem",
            height: 24,
          }}
        />
      </Box>

      {/* Metrics */}
      <Grid container spacing={3}>
        {METRICS.map((metric) => (
          <Grid key={metric.label} size={{ xs: 12, sm: 4 }}>
            <Box>
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${GREEN_600} 0%, ${GREEN_700} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 0.5,
                }}
              >
                {metric.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#171717",
                  mb: 0.25,
                }}
              >
                {metric.label}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.75rem",
                  color: alpha("#171717", 0.6),
                }}
              >
                {metric.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Service Categories */}
      <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${alpha("#171717", 0.1)}` }}>
        <Typography
          variant="caption"
          sx={{
            fontSize: "0.75rem",
            color: alpha("#171717", 0.6),
            display: "block",
            textAlign: "center",
          }}
        >
          Cardiac · Orthopaedic · Spine · Oncology · Neurosurgery · Transplant · Fertility · General Surgery
        </Typography>
      </Box>
    </Box>
  );
}
