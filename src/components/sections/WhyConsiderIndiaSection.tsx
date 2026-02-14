"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { SectionContainer } from "../ui/SectionContainer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#10b981";

const REASONS = [
  "Internationally accredited hospitals",
  "Experienced multidisciplinary specialists",
  "Advanced surgical and diagnostic facilities",
  "Structured international patient departments",
  "Transparent pre-travel cost estimates",
];

interface WhyConsiderIndiaSectionProps {
  /** "default" = generic; "kenya" = Kenya-specific closing line */
  audience?: "default" | "kenya";
}

export function WhyConsiderIndiaSection({ audience = "default" }: WhyConsiderIndiaSectionProps) {
  const closingLine =
    audience === "kenya"
      ? "Many patients from Kenya travel to India for planned procedures due to hospital infrastructure and specialist availability."
      : "Many international patients travel to India for planned procedures due to hospital infrastructure and specialist availability.";

  return (
    <SectionContainer id="why-india">
      <Box
        sx={{
          maxWidth: 1000,
          mx: "auto",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* India Map Background */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: { xs: "-20%", md: "-10%", lg: "0%" },
            transform: "translateY(-50%)",
            width: { xs: "400px", md: "500px", lg: "600px" },
            height: { xs: "400px", md: "500px", lg: "600px" },
            opacity: 0.08,
            zIndex: 0,
            pointerEvents: "none",
            "& svg": {
              width: "100%",
              height: "100%",
            },
          }}
        >
          <svg
            viewBox="0 0 1000 1200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* India map outline - simplified but recognizable shape */}
            <path
              d="M500 50 
                 L650 100 L750 150 L800 220 
                 L780 300 L750 400 L700 500 
                 L650 600 L600 700 L550 800 
                 L500 900 L450 1000 L400 1100 
                 L350 1050 L300 950 L250 850 
                 L200 750 L180 650 L200 550 
                 L250 450 L300 350 L350 250 
                 L400 150 L450 100 Z"
              stroke={GREEN_600}
              strokeWidth="12"
              fill="none"
              opacity="0.15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M500 80 
                 L620 120 L720 180 L760 250 
                 L740 330 L710 420 L660 510 
                 L610 600 L560 690 L520 780 
                 L500 870 L480 780 L440 690 
                 L390 600 L340 510 L290 420 
                 L260 330 L240 250 L280 180 
                 L380 120 Z"
              stroke="#0d9488"
              strokeWidth="8"
              fill="none"
              opacity="0.12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Southern tip detail */}
            <path
              d="M500 850 L480 900 L460 950 L480 1000 L500 1050 L520 1000 L540 950 L520 900 Z"
              stroke={GREEN_600}
              strokeWidth="6"
              fill="none"
              opacity="0.2"
            />
          </svg>
        </Box>
        <Box sx={{ textAlign: "center", mb: 5, position: "relative", zIndex: 1 }}>
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
            Why Choose India
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
                background: `linear-gradient(135deg, ${GREEN_600} 0%, #0d9488 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Why Consider India
            </Box>{" "}
            <Box component="span" sx={{ color: "#171717" }}>
              for Treatment?
            </Box>
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 2,
            border: `1px solid ${alpha("#171717", 0.1)}`,
            p: { xs: 3, md: 4 },
            mb: 4,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: "1rem",
              color: alpha("#171717", 0.8),
              mb: 3,
              fontWeight: 500,
            }}
          >
            India is recognised for:
          </Typography>

          <Grid container spacing={2}>
            {REASONS.map((reason) => (
              <Grid key={reason} size={{ xs: 12, sm: 6 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    py: 1.5,
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      fontSize: 24,
                      color: GREEN_600,
                      flexShrink: 0,
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.9375rem",
                      color: alpha("#171717", 0.8),
                      lineHeight: 1.6,
                    }}
                  >
                    {reason}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: alpha("#171717", 0.7),
            fontSize: "0.9375rem",
            lineHeight: 1.7,
            position: "relative",
            zIndex: 1,
          }}
        >
          {closingLine}
        </Typography>
      </Box>
    </SectionContainer>
  );
}
