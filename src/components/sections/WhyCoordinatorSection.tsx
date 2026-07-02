"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { alpha } from "@mui/material/styles";
import { SectionContainer } from "../ui/SectionContainer";

const GREEN_600 = "#1c7c7f";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";

const COORDINATOR_BENEFITS = [
  {
    icon: CompareArrowsOutlinedIcon,
    label: "Compare multiple hospital options",
    detail: "We shortlist accredited hospitals matched to your case",
  },
  {
    icon: RequestQuoteOutlinedIcon,
    label: "Structured cost clarity before travel",
    detail: "Official hospital estimates — no surprises after you land",
  },
  {
    icon: VideocamOutlinedIcon,
    label: "Video consultation arranged efficiently",
    detail: "Speak to the specialist before booking flights",
  },
  {
    icon: FlightOutlinedIcon,
    label: "Travel and accommodation support",
    detail: "Visa guidance, airport pickup, and stay near hospital",
  },
  {
    icon: SupportAgentOutlinedIcon,
    label: "Single point of communication",
    detail: "One coordinator handles everything — not five hospital inboxes",
  },
] as const;

const DIRECT_CONTACT_PAIN_POINTS = [
  "Contact each hospital separately",
  "Compare estimates and packages on your own",
  "Coordinate visa, travel, and appointments yourself",
  "No one person accountable for your full journey",
] as const;

export function WhyCoordinatorSection() {
  return (
    <SectionContainer variant="alt">
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        <Box sx={{ textAlign: "center", mb: { xs: 3.5, md: 4.5 } }}>
          <Typography
            variant="overline"
            sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5 }}
          >
            Coordinator vs Direct Contact
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1,
              mb: 1.5,
              fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.75rem" },
              fontWeight: 700,
              lineHeight: 1.3,
              maxWidth: 720,
              mx: "auto",
            }}
          >
            Why{" "}
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Work With a Coordinator
            </Box>{" "}
            Instead of Hospitals Directly?
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto", lineHeight: 1.65 }}
          >
            A coordinator streamlines your journey and gives you one clear point of contact instead
            of managing multiple hospitals yourself.
          </Typography>
        </Box>

        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          {/* Direct contact column */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                height: "100%",
                p: { xs: 2.5, md: 3 },
                borderRadius: 3,
                bgcolor: alpha("#171717", 0.03),
                border: `1px solid ${alpha("#171717", 0.08)}`,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: alpha("#171717", 0.55),
                  mb: 2,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  fontSize: "0.75rem",
                }}
              >
                Contacting hospitals directly
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                {DIRECT_CONTACT_PAIN_POINTS.map((point) => (
                  <Box
                    key={point}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.25,
                      py: 1,
                      px: 1.25,
                      borderRadius: 2,
                      bgcolor: alpha("#171717", 0.02),
                    }}
                  >
                    <CloseRoundedIcon
                      sx={{ fontSize: 18, color: alpha("#171717", 0.35), mt: 0.15, flexShrink: 0 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: alpha("#171717", 0.55), lineHeight: 1.5 }}
                    >
                      {point}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Coordinator column */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                height: "100%",
                p: { xs: 2.5, md: 3 },
                borderRadius: 3,
                bgcolor: "#ffffff",
                border: `2px solid ${alpha(GREEN_600, 0.25)}`,
                boxShadow: "0 8px 28px rgba(16, 185, 129, 0.12)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: GREEN_600,
                  mb: 2,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  fontSize: "0.75rem",
                }}
              >
                With our coordinator — free
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                {COORDINATOR_BENEFITS.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <Box
                      key={benefit.label}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.5,
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: alpha(GREEN_600, 0.04),
                        border: `1px solid ${alpha(GREEN_600, 0.1)}`,
                      }}
                    >
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 1.5,
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: alpha(GREEN_600, 0.12),
                          color: GREEN_600,
                        }}
                      >
                        <Icon sx={{ fontSize: 20 }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.75 }}>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 700, color: "#171717", lineHeight: 1.4, flex: 1 }}
                          >
                            {benefit.label}
                          </Typography>
                          <CheckRoundedIcon
                            sx={{ fontSize: 18, color: GREEN_600, flexShrink: 0, mt: 0.1 }}
                          />
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{ color: alpha("#171717", 0.6), lineHeight: 1.45, mt: 0.25, display: "block" }}
                        >
                          {benefit.detail}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            textAlign: "center",
            px: 2,
            py: 1.5,
            borderRadius: 2,
            bgcolor: alpha(GREEN_600, 0.06),
            border: `1px dashed ${alpha(GREEN_600, 0.25)}`,
          }}
        >
          <Typography variant="body2" sx={{ color: alpha("#171717", 0.75), fontWeight: 500 }}>
            Zero coordination fees — hospitals bill you directly for treatment.
          </Typography>
        </Box>
      </Box>
    </SectionContainer>
  );
}
