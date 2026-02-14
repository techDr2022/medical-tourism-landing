"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
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

const SPECIALTIES = [
  "Cardiac",
  "Orthopaedic",
  "Spine",
  "Oncology",
  "Neurosurgery",
  "Transplant",
  "Fertility",
  "General Surgery",
];

export function MetricsCard() {
  return (
    <Box
      sx={{
        overflow: "hidden",
        borderRadius: 3,
        backgroundColor: "#ffffff",
        border: `1px solid ${alpha("#171717", 0.08)}`,
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 16px 48px rgba(16, 185, 129, 0.12)",
          borderColor: alpha(GREEN_600, 0.2),
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: `linear-gradient(135deg, ${alpha(GREEN_600, 0.08)} 0%, ${alpha(GREEN_700, 0.05)} 100%)`,
          borderBottom: `1px solid ${alpha("#171717", 0.06)}`,
        }}
      >
        <Typography
          sx={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            letterSpacing: 0.5,
            color: "#171717",
          }}
        >
          Service Overview
        </Typography>
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 1.5,
            backgroundColor: GREEN_600,
            color: "#fff",
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          ACTIVE
        </Box>
      </Box>

      {/* Metrics */}
      <Box sx={{ p: 2.5 }}>
        <Grid container spacing={2}>
          {METRICS.map((metric) => (
            <Grid key={metric.label} size={{ xs: 12, sm: 4 }}>
              <Box
                sx={{
                  py: 1.5,
                  px: 2,
                  borderRadius: 2,
                  backgroundColor: alpha("#171717", 0.02),
                  border: `1px solid ${alpha("#171717", 0.06)}`,
                  height: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    background: `linear-gradient(135deg, ${GREEN_600} 0%, ${GREEN_700} 100%)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {metric.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "#171717",
                    mt: 0.5,
                  }}
                >
                  {metric.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: alpha("#171717", 0.6),
                    mt: 0.25,
                  }}
                >
                  {metric.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Specialties */}
        <Box
          sx={{
            mt: 2.5,
            pt: 2,
            borderTop: `1px solid ${alpha("#171717", 0.08)}`,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: 0.5,
              color: alpha("#171717", 0.5),
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Specialties
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {SPECIALTIES.map((specialty) => (
              <Box
                key={specialty}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1.5,
                  backgroundColor: alpha(GREEN_600, 0.08),
                  border: `1px solid ${alpha(GREEN_600, 0.15)}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "#171717",
                  }}
                >
                  {specialty}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
