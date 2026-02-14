"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import { MetricsCard } from "./MetricsCard";

interface HeroSectionProps {
  onCtaClick: () => void;
  onUploadClick?: () => void;
  /** "default" = generic international; "kenya" = Kenya-focused copy */
  audience?: "default" | "kenya";
}

const GREEN_600 = "#10b981";
const GREEN_700 = "#0d9488";

export function HeroSection({ onCtaClick, onUploadClick, audience = "default" }: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);
  const isKenya = audience === "kenya";

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 244, 0.5) 100%)",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Content Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography
                component="h1"
                sx={{
                  mb: 3,
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  color: "#171717",
                }}
              >
                Get Complete Medical Treatment Coordination
                <Box component="span" sx={{ display: "block", mt: 0.5 }}>
                  for{" "}
                  <Box component="span" sx={{ color: GREEN_600 }}>
                    {isKenya ? "Patients from Kenya" : "International Patients"}
                  </Box>{" "}
                  <Box component="span" sx={{ color: GREEN_600 }}>Predictably</Box>
                </Box>
              </Typography>
              
              <Typography
                sx={{
                  mb: 3,
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  lineHeight: 1.7,
                  color: alpha("#171717", 0.7),
                }}
              >
                Hospital coordination, medical visa guidance, and complete travel support built exclusively for international patients seeking treatment in India.
              </Typography>

              {/* Credibility Indicators */}
              <Box sx={{ mb: 4, display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.8125rem",
                    color: alpha("#171717", 0.6),
                  }}
                >
                  <Box component="span" sx={{ fontWeight: 600, color: GREEN_600 }}>50+</Box> hospitals in India
                </Typography>
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    backgroundColor: alpha("#171717", 0.3),
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.8125rem",
                    color: alpha("#171717", 0.6),
                  }}
                >
                  {isKenya ? "Kenya-based support" : "Dedicated support"}
                </Typography>
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    backgroundColor: alpha("#171717", 0.3),
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.8125rem",
                    color: alpha("#171717", 0.6),
                  }}
                >
                  No service fee
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={onCtaClick}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${GREEN_600} 0%, ${GREEN_700} 100%)`,
                    boxShadow: "0 4px 14px rgba(22, 163, 74, 0.4)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      background: `linear-gradient(135deg, ${GREEN_700} 0%, #0f766e 100%)`,
                      boxShadow: "0 6px 20px rgba(22, 163, 74, 0.5)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Book Free Strategy Call
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    document.getElementById("process")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderColor: alpha("#171717", 0.2),
                    borderWidth: 1,
                    color: "#171717",
                    backgroundColor: "#ffffff",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      borderColor: GREEN_600,
                      color: GREEN_600,
                      backgroundColor: alpha(GREEN_600, 0.05),
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  See How It Works →
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Metrics Card Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MetricsCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
