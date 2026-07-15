"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import type { SvgIconComponent } from "@mui/icons-material";
import { NIGERIA_TRUST_POINTS } from "@/constants/nigeria";
import { NG } from "@/constants/nigeriaTheme";

const ICONS: Record<(typeof NIGERIA_TRUST_POINTS)[number]["id"], SvgIconComponent> = {
  visa: AssignmentTurnedInOutlinedIcon,
  payment: AccountBalanceOutlinedIcon,
  coordinator: WhatsAppIcon,
};

/**
 * Visa / payment / coordinator assurances — one job: set expectations clearly.
 */
export function TrustPointsSection() {
  return (
    <Box
      component="section"
      id="trust"
      aria-labelledby="nigeria-trust-heading"
      sx={{
        py: { xs: 5, md: 7 },
        px: { xs: 2, sm: 3 },
        background: `linear-gradient(180deg, ${NG.softBg} 0%, #fff 100%)`,
        borderTop: `1px solid ${alpha(NG.ink, 0.06)}`,
        borderBottom: `1px solid ${alpha(NG.ink, 0.06)}`,
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        <Box sx={{ textAlign: "center", mb: { xs: 3.5, md: 4.5 } }}>
          <Typography
            variant="overline"
            sx={{
              color: NG.primary,
              fontWeight: 600,
              letterSpacing: 1.5,
              fontFamily: NG.fontSans,
            }}
          >
            How we work with you
          </Typography>
          <Typography
            id="nigeria-trust-heading"
            component="h2"
            sx={{
              mt: 1,
              fontFamily: NG.fontDisplay,
              fontSize: { xs: "1.5rem", md: "1.75rem" },
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: NG.text,
              lineHeight: 1.2,
            }}
          >
            Visa, payment, and a real coordinator
          </Typography>
          <Typography
            sx={{
              mt: 1.25,
              mx: "auto",
              maxWidth: 480,
              fontFamily: NG.fontSans,
              fontSize: "0.9375rem",
              color: NG.muted,
              lineHeight: 1.55,
            }}
          >
            Three things Nigerian families ask before sending reports — answered upfront.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: { xs: 3, md: 0 },
          }}
        >
          {NIGERIA_TRUST_POINTS.map((point, index) => {
            const Icon = ICONS[point.id];
            return (
              <Box
                key={point.id}
                sx={{
                  px: { xs: 0, md: 3.5 },
                  py: { xs: 0, md: 0.5 },
                  borderLeft: {
                    xs: "none",
                    md: index === 0 ? "none" : `1px solid ${alpha(NG.ink, 0.1)}`,
                  },
                  borderTop: {
                    xs: index === 0 ? "none" : `1px solid ${alpha(NG.ink, 0.1)}`,
                    md: "none",
                  },
                  pt: { xs: index === 0 ? 0 : 3, md: 0 },
                  animation: `nigeriaTrustIn 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${0.08 * index}s both`,
                  "@keyframes nigeriaTrustIn": {
                    from: { opacity: 0, transform: "translateY(12px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                  },
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
                    color: NG.primary,
                    backgroundColor: alpha(NG.primary, 0.1),
                  }}
                >
                  <Icon sx={{ fontSize: 24 }} aria-hidden />
                </Box>
                <Typography
                  component="h3"
                  sx={{
                    mb: 0.75,
                    fontFamily: NG.fontDisplay,
                    fontSize: { xs: "1.0625rem", md: "1.125rem" },
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: NG.text,
                    lineHeight: 1.3,
                  }}
                >
                  {point.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: NG.fontSans,
                    fontSize: "0.9375rem",
                    color: NG.muted,
                    lineHeight: 1.55,
                  }}
                >
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
