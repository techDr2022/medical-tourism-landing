"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { SectionContainer } from "../ui/SectionContainer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#1c7c7f";
const GREEN_700 = "#0d9488";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";

const COORDINATION_ITEMS = [
  "Hospital confirmation",
  "Admission scheduling",
  "Medical visa documentation guidance",
  "Airport pickup planning",
  "Hotel or serviced apartment booking",
  "Local assistance during hospital stay",
  "Post-discharge coordination",
];

export function CoordinationSection() {
  return (
    <SectionContainer id="services">
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="overline"
            sx={{
              color: "#171717",
              fontWeight: 600,
              letterSpacing: 1.5,
              fontSize: "0.8125rem",
              display: "block",
              mb: 1.5,
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.75rem", md: "2rem" },
              fontWeight: 700,
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Complete End-to-End Support
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              color: alpha("#171717", 0.7),
              maxWidth: 800,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Once you decide to proceed, we coordinate:
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mb: 5 }}>
          {COORDINATION_ITEMS.map((item) => (
            <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: "#ffffff",
                  border: `1px solid ${alpha("#171717", 0.1)}`,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 16px rgba(16, 185, 129, 0.15)",
                    borderColor: alpha(GREEN_600, 0.3),
                  },
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: alpha(GREEN_600, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    mt: 0.25,
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      fontSize: 18,
                      color: GREEN_600,
                    }}
                  />
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "0.9375rem",
                    color: alpha("#171717", 0.8),
                    lineHeight: 1.6,
                    fontWeight: 500,
                  }}
                >
                  {item}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            p: 4,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(GREEN_600, 0.08)} 0%, ${alpha(GREEN_700, 0.05)} 100%)`,
            border: `1px solid ${alpha(GREEN_600, 0.2)}`,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              color: alpha("#171717", 0.9),
              lineHeight: 1.7,
              fontWeight: 600,
            }}
          >
            You deal with{" "}
            <Box component="span" sx={{ color: GREEN_600 }}>
              one dedicated coordination team
            </Box>
            .
          </Typography>
        </Box>
      </Box>
    </SectionContainer>
  );
}
