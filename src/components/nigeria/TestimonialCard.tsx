"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#1c7c7f";

export interface TestimonialCardProps {
  patientName: string;
  /** Preferred city label (any market). */
  city?: string;
  /** @deprecated Prefer `city` — kept for Nigeria page callers. */
  cityInNigeria?: string;
  treatmentType: string;
  hospitalName: string;
  doctorName: string;
  photoOrVideoUrl?: string;
  quote: string;
  /** Data flag for ops — not rendered as visible placeholder UI. */
  isPlaceholder?: boolean;
}

export function TestimonialCard({
  patientName,
  city,
  cityInNigeria,
  treatmentType,
  hospitalName,
  doctorName,
  photoOrVideoUrl,
  quote,
}: TestimonialCardProps) {
  const cityLabel = city ?? cityInNigeria ?? "";
  return (
    <Box
      sx={{
        height: "100%",
        p: 3,
        borderRadius: 3,
        border: `1px solid ${alpha("#171717", 0.1)}`,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      {photoOrVideoUrl ? (
        <Box
          component="img"
          src={photoOrVideoUrl}
          alt={`${patientName} — ${treatmentType}`}
          sx={{
            width: "100%",
            height: 160,
            objectFit: "cover",
            borderRadius: 2,
            mb: 0.5,
          }}
        />
      ) : (
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: alpha(GREEN_600, 0.12),
            color: GREEN_600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "1.125rem",
          }}
          aria-hidden
        >
          {patientName.charAt(0)}
        </Box>
      )}

      <Typography
        component="blockquote"
        sx={{
          m: 0,
          fontSize: "0.9375rem",
          lineHeight: 1.6,
          color: alpha("#171717", 0.88),
          fontStyle: "italic",
          flexGrow: 1,
        }}
      >
        “{quote}”
      </Typography>

      <Box>
        <Typography sx={{ fontWeight: 700, color: "#171717", fontSize: "0.9375rem" }}>
          {patientName}
        </Typography>
        <Typography variant="body2" sx={{ color: alpha("#171717", 0.65), fontSize: "0.8125rem" }}>
          {cityLabel} · {treatmentType}
        </Typography>
        <Typography variant="body2" sx={{ color: alpha("#171717", 0.55), fontSize: "0.8125rem", mt: 0.25 }}>
          {doctorName} · {hospitalName}
        </Typography>
      </Box>
    </Box>
  );
}
