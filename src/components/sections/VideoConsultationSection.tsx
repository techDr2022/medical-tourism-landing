"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { SectionContainer } from "../ui/SectionContainer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#1c7c7f";
const GREEN_700 = "#0d9488";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";

const COORDINATION_ITEMS = [
  {
    icon: LockOutlinedIcon,
    label: "Secure sharing of medical reports",
    detail: "Encrypted transfer to the hospital specialist only",
  },
  {
    icon: EventAvailableOutlinedIcon,
    label: "Appointment scheduling",
    detail: "We book your video consult at a time that works for you",
  },
  {
    icon: PublicOutlinedIcon,
    label: "Time zone coordination with India",
    detail: "No confusion — we align your local time with IST",
  },
  {
    icon: AssignmentOutlinedIcon,
    label: "Preliminary treatment plan and estimated hospital stay",
    detail: "Know what to expect before you book flights",
  },
] as const;

const CONSULTATION_PHOTO = "/logos/16369.jpg";
const TEAM_PHOTOS = ["/logos/team-photo2.png"];

function SectionPhoto({
  src,
  alt,
  height,
}: {
  src: string;
  alt: string;
  height: { xs: number; sm?: number; md: number };
}) {
  return (
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
        src={src}
        alt={alt}
        sx={{
          width: "100%",
          height,
          objectFit: "cover",
          display: "block",
        }}
      />
    </Box>
  );
}

export function VideoConsultationSection() {
  return (
    <SectionContainer>
      <Grid
        container
        spacing={{ xs: 4, md: 6 }}
        alignItems="center"
        sx={{ maxWidth: 1100, mx: "auto" }}
      >
        {/* Photos – left on desktop, top on mobile */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <SectionPhoto
              src={CONSULTATION_PHOTO}
              alt="Patient video consultation with hospital specialist before travel"
              height={{ xs: 220, sm: 260, md: 240 }}
            />

            <Box
              sx={{
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
                Pre-travel video consultation
              </Typography>
            </Box>

            {TEAM_PHOTOS.map((photo, index) => (
              <SectionPhoto
                key={photo}
                src={photo}
                alt={`Our team group photo ${index + 1}`}
                height={{ xs: 220, sm: 260, md: 200 }}
              />
            ))}

            <Box
              sx={{
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
                Our team group photos
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
              mb: 3,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "1.0625rem",
                fontWeight: 700,
                mb: 2,
                color: "#171717",
              }}
            >
              We coordinate:
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {COORDINATION_ITEMS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Box
                    key={item.label}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      p: 2,
                      borderRadius: 2.5,
                      bgcolor: "#ffffff",
                      border: `1px solid ${alpha(GREEN_600, 0.12)}`,
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        borderColor: alpha(GREEN_600, 0.3),
                        boxShadow: "0 4px 16px rgba(16, 185, 129, 0.1)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(135deg, ${alpha(GREEN_600, 0.12)} 0%, ${alpha(GREEN_700, 0.08)} 100%)`,
                        color: GREEN_600,
                        position: "relative",
                      }}
                    >
                      <Icon sx={{ fontSize: 22 }} />
                      <Box
                        component="span"
                        sx={{
                          position: "absolute",
                          top: -6,
                          right: -6,
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          bgcolor: GREEN_600,
                          color: "#fff",
                          fontSize: "0.625rem",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          lineHeight: 1,
                        }}
                      >
                        {index + 1}
                      </Box>
                    </Box>
                    <Box sx={{ minWidth: 0, pt: 0.25 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: "#171717",
                          lineHeight: 1.4,
                          mb: 0.5,
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: alpha("#171717", 0.6),
                          lineHeight: 1.5,
                          display: "block",
                        }}
                      >
                        {item.detail}
                      </Typography>
                    </Box>
                    <CheckCircleIcon
                      sx={{
                        fontSize: 20,
                        color: alpha(GREEN_600, 0.35),
                        flexShrink: 0,
                        mt: 0.5,
                        display: { xs: "none", sm: "block" },
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
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
