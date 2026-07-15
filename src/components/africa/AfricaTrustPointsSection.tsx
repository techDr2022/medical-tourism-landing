"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import PriceCheckOutlinedIcon from "@mui/icons-material/PriceCheckOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import type { SvgIconComponent } from "@mui/icons-material";
import { AFRICA_TRUST_POINTS } from "@/constants/africa";
import { AF } from "@/constants/africaTheme";

const ICONS: Record<(typeof AFRICA_TRUST_POINTS)[number]["id"], SvgIconComponent> = {
  pricing: PriceCheckOutlinedIcon,
  visa: AssignmentTurnedInOutlinedIcon,
  coordinator: WhatsAppIcon,
};

export function AfricaTrustPointsSection() {
  return (
    <Box
      component="section"
      id="trust"
      aria-labelledby="africa-trust-heading"
      sx={{
        py: { xs: 5, md: 7 },
        px: { xs: 2, sm: 3 },
        background: `linear-gradient(180deg, ${AF.softBg} 0%, #fff 100%)`,
        borderTop: `1px solid ${alpha(AF.ink, 0.06)}`,
        borderBottom: `1px solid ${alpha(AF.ink, 0.06)}`,
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        <Box sx={{ textAlign: "center", mb: { xs: 3.5, md: 4.5 } }}>
          <Typography
            variant="overline"
            sx={{ color: AF.primary, fontWeight: 600, letterSpacing: 1.5 }}
          >
            Why patients trust us
          </Typography>
          <Typography
            id="africa-trust-heading"
            component="h2"
            sx={{
              mt: 1,
              fontFamily: AF.fontDisplay,
              fontSize: { xs: "1.5rem", md: "1.75rem" },
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Transparent pricing, visa help, and a real person on WhatsApp
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: { xs: 3, md: 0 },
          }}
        >
          {AFRICA_TRUST_POINTS.map((point, index) => {
            const Icon = ICONS[point.id];
            return (
              <Box
                key={point.id}
                sx={{
                  px: { xs: 0, md: 3.5 },
                  borderLeft: {
                    xs: "none",
                    md: index === 0 ? "none" : `1px solid ${alpha(AF.ink, 0.1)}`,
                  },
                  borderTop: {
                    xs: index === 0 ? "none" : `1px solid ${alpha(AF.ink, 0.1)}`,
                    md: "none",
                  },
                  pt: { xs: index === 0 ? 0 : 3, md: 0 },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    mb: 1.75,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 1.5,
                    color: AF.primary,
                    backgroundColor: alpha(AF.primary, 0.1),
                  }}
                >
                  <Icon sx={{ fontSize: 24 }} aria-hidden />
                </Box>
                <Typography
                  component="h3"
                  sx={{
                    mb: 0.75,
                    fontFamily: AF.fontDisplay,
                    fontSize: "1.0625rem",
                    fontWeight: 700,
                    color: AF.text,
                  }}
                >
                  {point.title}
                </Typography>
                <Typography sx={{ fontSize: "0.9375rem", color: AF.muted, lineHeight: 1.55 }}>
                  {point.body}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
