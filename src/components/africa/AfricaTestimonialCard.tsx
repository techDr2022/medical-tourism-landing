"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import {
  AFRICA_COUNTRY_META,
  type AfricaTestimonial,
} from "@/constants/africa";
import { AF } from "@/constants/africaTheme";

export function AfricaTestimonialCard({ testimonial }: { testimonial: AfricaTestimonial }) {
  const { flag } = AFRICA_COUNTRY_META[testimonial.country];

  return (
    <Box
      sx={{
        height: "100%",
        p: 3,
        borderRadius: 3,
        border: `1px solid ${alpha(AF.ink, 0.1)}`,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: alpha(AF.primary, 0.12),
            color: AF.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "1.125rem",
          }}
          aria-hidden
        >
          {testimonial.patientName.charAt(0)}
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, color: AF.text, fontSize: "0.9375rem" }}>
            {testimonial.patientName}
          </Typography>
          <Typography variant="body2" sx={{ color: AF.muted, fontSize: "0.8125rem" }}>
            {flag} {testimonial.city}, {testimonial.country}
          </Typography>
        </Box>
      </Box>

      <Typography
        component="blockquote"
        sx={{
          m: 0,
          fontSize: "0.9375rem",
          lineHeight: 1.6,
          color: alpha(AF.text, 0.88),
          fontStyle: "italic",
          flexGrow: 1,
        }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </Typography>

      <Typography variant="body2" sx={{ color: alpha(AF.text, 0.55), fontSize: "0.8125rem" }}>
        {testimonial.treatmentType} · {testimonial.doctorName} · {testimonial.hospitalName}
      </Typography>
    </Box>
  );
}
