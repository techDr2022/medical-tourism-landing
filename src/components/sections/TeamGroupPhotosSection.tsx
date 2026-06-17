"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { SectionContainer } from "../ui/SectionContainer";

const GREEN_600 = "#1c7c7f";

const FOUNDERS = [
  {
    name: "Raviteja Pendari",
    title: "Co-Founder & Head of Patient Care Operations",
    credential: "MBA in Healthcare Management",
    bio: "9+ years in hospital operations and patient care coordination.",
    photo: "/logos/Raviteja%20Pendari.png",
  },
  {
    name: "Abhista Gorityala",
    title: "Co-Founder & Head of Hospital Partnerships",
    credential: "MBA in Healthcare Management",
    bio: "5+ years of experience building and managing a network of accredited hospitals, personally facilitating coordination between patients, doctors, and hospital teams throughout treatment.",
    photo: "/logos/Abhista%20Gorityala.png",
  },
];

const GROUP_PHOTOS = ["/logos/16369.jpg", "/logos/team-photo.png", "/logos/team-photo2.png"];

export function TeamGroupPhotosSection() {
  return (
    <SectionContainer variant="alt">
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="overline"
          sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5, fontSize: "0.8125rem" }}
        >
          Our Team
        </Typography>
        <Typography variant="h2" sx={{ mt: 1, fontSize: { xs: "1.5rem", md: "1.75rem" }, color: "#171717" }}>
          Meet the People Behind Your Care Journey
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ maxWidth: 960, mx: "auto", mb: 6 }}>
        {FOUNDERS.map((founder) => (
          <Grid key={founder.name} size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                height: "100%",
                borderRadius: 3,
                overflow: "hidden",
                border: `1px solid ${alpha("#171717", 0.1)}`,
                backgroundColor: "#ffffff",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
              }}
            >
              <Box
                component="img"
                src={founder.photo}
                alt={founder.name}
                sx={{
                  width: "100%",
                  height: { xs: 280, sm: 320 },
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                }}
              />
              <Box sx={{ p: { xs: 2.5, md: 3 } }}>
                <Typography
                  variant="h3"
                  sx={{ fontSize: "1.125rem", fontWeight: 700, color: "#171717", mb: 0.5 }}
                >
                  {founder.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: GREEN_600, mb: 1.5, lineHeight: 1.5 }}
                >
                  {founder.title}
                </Typography>
                <Typography variant="body2" sx={{ color: alpha("#171717", 0.75), lineHeight: 1.7 }}>
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      fontWeight: 700,
                      color: GREEN_600,
                      backgroundColor: alpha(GREEN_600, 0.1),
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      mr: 0.5,
                    }}
                  >
                    {founder.credential}
                  </Box>
                  {founder.bio}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontSize: { xs: "1.125rem", md: "1.25rem" },
          fontWeight: 700,
          color: "#171717",
          mb: 3,
        }}
      >
        Our Team Group Photos
      </Typography>

      <Grid container spacing={2.5} sx={{ maxWidth: 1000, mx: "auto", justifyContent: "center" }}>
        {GROUP_PHOTOS.map((photo, index) => (
          <Grid key={photo} size={{ xs: 12, md: 6, lg: 4 }}>
            <Box
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: `1px solid ${alpha("#171717", 0.1)}`,
                boxShadow: "0 10px 32px rgba(0, 0, 0, 0.12)",
              }}
            >
              <Box
                component="img"
                src={photo}
                alt={`Our team group photo ${index + 1}`}
                sx={{
                  width: "100%",
                  height: { xs: 240, sm: 320, md: 340 },
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
}
