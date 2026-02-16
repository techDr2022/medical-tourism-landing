"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { SectionContainer } from "../ui/SectionContainer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#1c7c7f";
const GREEN_700 = "#0d9488";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";

const ASSIST_ITEMS = [
  "Secure sharing of medical reports",
  "Appointment scheduling",
  "Time zone coordination with India",
  "Preliminary treatment plan and estimated hospital stay",
];

const VIDEO_IMAGE_SRC = "/logos/16369.jpg";

export function VideoConsultationSection() {
  return (
    <SectionContainer>
      <Grid
        container
        spacing={{ xs: 4, md: 6 }}
        alignItems="center"
        sx={{ maxWidth: 1100, mx: "auto" }}
      >
        {/* Image – left on desktop, top on mobile */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              position: "relative",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)",
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                background: `linear-gradient(135deg, ${alpha(GREEN_600, 0.15)} 0%, transparent 60%)`,
                pointerEvents: "none",
              },
            }}
          >
            <Box
              component="img"
              src={VIDEO_IMAGE_SRC}
              alt="Video consultation with a specialist before you travel"
              sx={{
                width: "100%",
                height: { xs: 280, sm: 340, md: 420 },
                objectFit: "cover",
                display: "block",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                py: 1.5,
                px: 2,
                borderRadius: 2,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <VideoCallIcon sx={{ fontSize: 28, color: GREEN_600 }} />
              <Typography variant="body2" fontWeight={600} color="#171717">
                Speak to the specialist before you travel
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Content – right on desktop, below image on mobile */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography
            variant="overline"
            sx={{
              color: GREEN_600,
              fontWeight: 600,
              letterSpacing: 1.5,
              fontSize: "0.8125rem",
              display: "block",
              mb: 1.5,
            }}
          >
            Pre-travel consultation
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
              Speak to the Specialist{" "}
            </Box>
            <Box component="span" sx={{ color: "#171717" }}>
              Before You Travel
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              color: alpha("#171717", 0.7),
              lineHeight: 1.7,
              mb: 3,
            }}
          >
            Before confirming travel, you may request a video consultation with the hospital
            specialist.
          </Typography>

          <Box
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: 3,
              border: `1px solid ${alpha("#171717", 0.1)}`,
              p: { xs: 3, md: 4 },
              mb: 3,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "1.125rem",
                fontWeight: 700,
                mb: 3,
                color: "#171717",
              }}
            >
              We coordinate:
            </Typography>
            <Grid container spacing={2}>
              {ASSIST_ITEMS.map((item) => (
                <Grid key={item} size={{ xs: 12, sm: 6 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      py: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        backgroundColor: alpha(GREEN_600, 0.1),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        mt: 0.25,
                      }}
                    >
                      <CheckCircleIcon sx={{ fontSize: 18, color: GREEN_600 }} />
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "0.9375rem",
                        color: alpha("#171717", 0.8),
                        lineHeight: 1.6,
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(GREEN_600, 0.08)} 0%, ${alpha(GREEN_700, 0.05)} 100%)`,
              border: `1px solid ${alpha(GREEN_600, 0.2)}`,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", md: "1.125rem" },
                color: alpha("#171717", 0.9),
                lineHeight: 1.7,
                mb: 1,
              }}
            >
              This allows you to{" "}
              <Box component="span" sx={{ color: GREEN_600, fontWeight: 600 }}>
                speak directly with the treating doctor
              </Box>{" "}
              before making travel decisions.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                color: alpha("#171717", 0.7),
                fontStyle: "italic",
              }}
            >
              All medical advice is provided by the hospital specialist.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </SectionContainer>
  );
}
