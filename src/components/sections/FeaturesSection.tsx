"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { SectionContainer } from "../ui/SectionContainer";
import FlightIcon from "@mui/icons-material/Flight";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#1c7c7f";

const FEATURES = [
  {
    icon: VideoCallIcon,
    title: "Pre-Travel Medical Evaluation & Video Consultation",
    items: [
      "Secure transfer of medical reports",
      "Scheduling of video appointments",
      "Time-zone coordination",
      "Access details for consultation",
      "Collection of preliminary treatment plan and estimated hospital stay",
    ],
    note: "All medical advice is provided directly by the hospital specialist.",
  },
  {
    icon: FlightIcon,
    title: "Complete End-to-End Medical Travel Support",
    items: [
      "Hospital and specialist selection",
      "Cost comparison between partner hospitals",
      "Medical visa documentation guidance",
      "Travel planning assistance",
      "Airport pickup coordination",
      "Accommodation near hospital",
      "Local transport coordination",
      "Dedicated patient support during hospital stay",
      "Post-discharge follow-up communication",
    ],
    note: "Our objective is to ensure a structured and smooth experience for international patients.",
  },
];

export function FeaturesSection() {
  return (
    <SectionContainer>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="overline"
          sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5 }}
        >
          Why Choose India
        </Typography>
        <Typography variant="h2" sx={{ mt: 1, mb: 3, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
          Why Patients Travel to India for Treatment
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 720, mx: "auto" }}>
          India has become a preferred destination for international patients due to internationally accredited hospitals, dedicated international patient departments, multidisciplinary medical teams, advanced surgical and diagnostic technology, structured pre-treatment cost estimates, and efficient scheduling for planned procedures. Hospitals in India follow internationally recognised clinical protocols and quality standards.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {FEATURES.map(({ icon: Icon, title, items, note }) => (
          <Grid key={title} size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 2,
                border: "1px solid",
                borderColor: alpha("#171717", 0.08),
                backgroundColor: "#fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                transition: "all 0.2s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 1.5,
                  backgroundColor: alpha(GREEN_600, 0.1),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Icon sx={{ fontSize: 28, color: GREEN_600 }} />
              </Box>
              <Typography variant="h3" sx={{ mb: 2, fontSize: "1.25rem" }}>
                {title}
              </Typography>
              <Box component="ul" sx={{ m: 0, p: 0, pl: 2.5, mb: 2 }}>
                {items.map((item) => (
                  <Box
                    key={item}
                    component="li"
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1,
                      mb: 1,
                      "&:last-of-type": { mb: 0 },
                    }}
                  >
                    <CheckCircleOutlineIcon
                      sx={{ fontSize: 18, color: GREEN_600, mt: 0.25, flexShrink: 0 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Typography variant="caption" color="text.disabled" sx={{ fontStyle: "italic" }}>
                {note}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
}
