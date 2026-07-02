"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import FlightLandOutlinedIcon from "@mui/icons-material/FlightLandOutlined";
import { alpha } from "@mui/material/styles";
import { SectionContainer } from "../ui/SectionContainer";

const GREEN_600 = "#1c7c7f";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";

const VISA_ITEMS = [
  {
    icon: DescriptionOutlinedIcon,
    title: "Hospital invitation letter",
    description:
      "We coordinate the official medical invitation from your chosen hospital — the document embassies require for an India medical visa.",
  },
  {
    icon: SupportAgentOutlinedIcon,
    title: "Step-by-step visa guidance",
    description:
      "Our team walks you through the application, documents checklist, and embassy process — especially for patients travelling from Africa and the Middle East.",
  },
  {
    icon: FlightLandOutlinedIcon,
    title: "Airport pickup on arrival",
    description:
      "Land in India with pickup already arranged. We coordinate transfer from the airport to your hotel or hospital.",
  },
] as const;

export function MedicalVisaSection() {
  return (
    <SectionContainer variant="alt" id="medical-visa">
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
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
            Travel without the stress
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              fontWeight: 700,
              lineHeight: 1.25,
              mb: 1.5,
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
              We Handle Your Medical Visa
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.0625rem" },
              color: alpha("#171717", 0.72),
              maxWidth: 640,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            First time travelling to India for treatment? Visa paperwork is often the biggest worry.
            We guide you from invitation letter to landing — at no extra coordination fee.
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          {VISA_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    height: "100%",
                    p: 3,
                    borderRadius: 3,
                    bgcolor: "rgba(255, 255, 255, 0.95)",
                    border: `1px solid ${alpha(GREEN_600, 0.12)}`,
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: alpha(GREEN_600, 0.1),
                      color: GREEN_600,
                      mb: 2,
                    }}
                  >
                    <Icon sx={{ fontSize: 26 }} />
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "#171717", mb: 1, lineHeight: 1.35 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: alpha("#171717", 0.72), lineHeight: 1.65 }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </SectionContainer>
  );
}
