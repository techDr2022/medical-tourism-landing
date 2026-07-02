"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import { SectionContainer } from "../ui/SectionContainer";
import {
  FEATURED_PATIENT_TESTIMONIALS,
  PATIENT_ORIGIN_COUNTRIES,
} from "@/constants/patientSocialProof";

const GREEN_600 = "#1c7c7f";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";

export function PatientSocialProofSection() {
  return (
    <SectionContainer id="patient-stories">
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 4, md: 5 },
            px: { xs: 1, sm: 0 },
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: GREEN_600,
              fontWeight: 600,
              letterSpacing: 1.5,
              fontSize: "0.8125rem",
              display: "block",
              mb: 2,
            }}
          >
            Patients like you, from around the world
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: { xs: 1.5, sm: 2 },
              mb: 2.5,
            }}
          >
            {PATIENT_ORIGIN_COUNTRIES.map((country) => (
              <Box
                key={country.name}
                title={country.name}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.75,
                  py: 1,
                  borderRadius: 999,
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                  border: `1px solid ${alpha(GREEN_600, 0.15)}`,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                }}
              >
                <Box
                  component="span"
                  aria-hidden
                  sx={{ fontSize: "1.5rem", lineHeight: 1 }}
                >
                  {country.flag}
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#171717", fontSize: "0.875rem" }}
                >
                  {country.name}
                </Typography>
              </Box>
            ))}
            <Box
              sx={{
                px: 1.75,
                py: 1,
                borderRadius: 999,
                bgcolor: alpha(GREEN_600, 0.08),
                border: `1px dashed ${alpha(GREEN_600, 0.35)}`,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: GREEN_600, fontSize: "0.875rem" }}
              >
                +30 countries
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.35rem", sm: "1.6rem", md: "1.85rem" },
              fontWeight: 700,
              lineHeight: 1.3,
              maxWidth: 720,
              mx: "auto",
            }}
          >
            Patients from Nigeria, Kenya, UAE, Iraq &{" "}
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              30+ countries
            </Box>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1.5, maxWidth: 560, mx: "auto", lineHeight: 1.6 }}
          >
            Real families who travelled for treatment — and came home safely.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {FEATURED_PATIENT_TESTIMONIALS.map((testimonial) => (
            <Grid key={`${testimonial.name}-${testimonial.country}`} size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  height: "100%",
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "rgba(255, 255, 255, 0.95)",
                  border: `1px solid ${alpha("#171717", 0.08)}`,
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex", gap: 0.25, mb: 2 }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} sx={{ fontSize: "1rem", color: "#fbbf24" }} />
                  ))}
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    flex: 1,
                    fontStyle: "italic",
                    color: "#374151",
                    lineHeight: 1.7,
                    mb: 2.5,
                  }}
                >
                  &ldquo;{testimonial.text}&rdquo;
                </Typography>

                <Box
                  sx={{
                    pt: 2,
                    borderTop: `1px solid ${alpha("#171717", 0.08)}`,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                    <Box component="span" aria-hidden sx={{ fontSize: "1.25rem", lineHeight: 1 }}>
                      {testimonial.flag}
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#171717" }}>
                      {testimonial.name}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: GREEN_600, fontWeight: 600 }}>
                    {testimonial.country} · {testimonial.treatment}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </SectionContainer>
  );
}
