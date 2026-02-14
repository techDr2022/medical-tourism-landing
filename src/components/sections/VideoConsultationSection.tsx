"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { SectionContainer } from "../ui/SectionContainer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#10b981";
const GREEN_700 = "#0d9488";

const ASSIST_ITEMS = [
  "Secure sharing of medical reports",
  "Appointment scheduling",
  "Time zone coordination between Kenya and India",
  "Preliminary treatment plan and estimated hospital stay",
];

export function VideoConsultationSection() {
  return (
    <SectionContainer>
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Box
            sx={{
              display: "inline-flex",
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: alpha(GREEN_600, 0.1),
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <VideoCallIcon
              sx={{
                fontSize: 40,
                color: GREEN_600,
              }}
            />
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.75rem", md: "2rem" },
              fontWeight: 700,
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${GREEN_600} 0%, ${GREEN_700} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Speak to the Doctor Before You Travel
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
            Before confirming travel, you may request a video consultation with the hospital specialist.
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 3,
            border: `1px solid ${alpha("#171717", 0.1)}`,
            p: { xs: 3, md: 4 },
            mb: 4,
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
              mb: 2,
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
      </Box>
    </SectionContainer>
  );
}
