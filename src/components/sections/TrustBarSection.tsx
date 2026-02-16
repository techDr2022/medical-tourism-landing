"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#1c7c7f";

const TRUST_ITEMS = [
  "Formal hospital collaborations",
  "Video consultation before travel",
  "Medical visa guidance",
  "Dedicated patient coordinator",
  "No hidden service charges",
];

export function TrustBarSection() {
  return (
    <Box
      sx={{
        py: { xs: 2.5, sm: 3 },
        background: `linear-gradient(135deg, ${alpha(GREEN_600, 0.08)} 0%, ${alpha("#06b6d4", 0.05)} 100%)`,
        borderTop: `1px solid ${alpha(GREEN_600, 0.15)}`,
        borderBottom: `1px solid ${alpha(GREEN_600, 0.15)}`,
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
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 2, sm: 3 },
          }}
        >
          {TRUST_ITEMS.map((item) => (
            <Box
              key={item}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: 2,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${alpha(GREEN_600, 0.1)}`,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(22, 163, 74, 0.15)",
                },
              }}
            >
              <CheckCircleIcon
                sx={{
                  fontSize: 20,
                  color: GREEN_600,
                  flexShrink: 0,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                  fontWeight: 500,
                  color: "#171717",
                  whiteSpace: { xs: "normal", sm: "nowrap" },
                }}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
