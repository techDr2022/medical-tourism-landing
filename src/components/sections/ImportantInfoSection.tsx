"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#1c7c7f";

export function ImportantInfoSection() {
  return (
    <Box
      sx={{
        py: 3,
        px: 2,
        background: `linear-gradient(135deg, ${alpha(GREEN_600, 0.08)} 0%, ${alpha("#06b6d4", 0.05)} 100%)`,
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: alpha(GREEN_600, 0.2),
        backdropFilter: "blur(10px)",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          maxWidth: 720,
          mx: "auto",
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          position: "relative",
          zIndex: 1,
        }}
      >
        <InfoOutlinedIcon
          sx={{ fontSize: 22, color: GREEN_600, flexShrink: 0, mt: 0.25 }}
        />
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            lineHeight: 1.6,
            fontSize: "0.9rem",
          }}
        >
          <strong>Important Information:</strong> We are a medical travel coordination service. We do not provide medical diagnosis or treatment. All medical services are delivered by licensed hospitals and doctors in India. Our services are exclusively for international patients travelling to India for medical treatment.
        </Typography>
      </Box>
    </Box>
  );
}
