"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { alpha } from "@mui/material/styles";
import { SectionContainer } from "../ui/SectionContainer";
import {
  getYoutubeEmbedUrl,
  getYoutubeWatchUrl,
  YOUTUBE_PATIENT_TESTIMONIALS,
  type YoutubePatientTestimonial,
} from "@/constants/youtubeTestimonials";

const GREEN_600 = "#1c7c7f";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";

function YoutubeEmbed({ video, index }: { video: YoutubePatientTestimonial; index: number }) {
  const title = `International patient testimonial video ${index + 1}`;

  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "#0f172a",
        border: `1px solid ${alpha("#171717", 0.1)}`,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          bgcolor: "#000",
        }}
      >
        <Box
          component="iframe"
          src={getYoutubeEmbedUrl(video)}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          px: 2,
          py: 1.5,
          bgcolor: "rgba(255, 255, 255, 0.96)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
          <PlayCircleOutlineIcon sx={{ fontSize: 20, color: GREEN_600, flexShrink: 0 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: "#171717", lineHeight: 1.4 }}
          >
            Patient story {index + 1}
          </Typography>
        </Box>
        <Link
          href={getYoutubeWatchUrl(video)}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ fontSize: "0.75rem", color: GREEN_600, whiteSpace: "nowrap", flexShrink: 0 }}
        >
          Watch on YouTube
        </Link>
      </Box>
    </Box>
  );
}

export function YouTubePatientTestimonialsSection() {
  return (
    <SectionContainer variant="alt" id="patient-videos">
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
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
            Video testimonials
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
            Patient Experiences at Our{" "}
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Partner Hospitals
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.0625rem" },
              color: alpha("#171717", 0.72),
              maxWidth: 680,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Hear directly from international patients treated at our accredited hospital partners
            across India.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {YOUTUBE_PATIENT_TESTIMONIALS.map((video, index) => (
            <Grid key={video.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <YoutubeEmbed video={video} index={index} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </SectionContainer>
  );
}
