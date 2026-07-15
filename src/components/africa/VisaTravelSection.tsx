"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import FlightLandOutlinedIcon from "@mui/icons-material/FlightLandOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import type { SvgIconComponent } from "@mui/icons-material";
import { AFRICA_VISA_TRAVEL_POINTS } from "@/constants/africa";
import { AF } from "@/constants/africaTheme";

const ICONS: Record<(typeof AFRICA_VISA_TRAVEL_POINTS)[number]["id"], SvgIconComponent> = {
  visa: AssignmentTurnedInOutlinedIcon,
  pickup: FlightLandOutlinedIcon,
  attendant: HotelOutlinedIcon,
  food: RestaurantOutlinedIcon,
  language: TranslateOutlinedIcon,
  accreditation: VerifiedOutlinedIcon,
};

export function VisaTravelSection() {
  return (
    <Box
      component="section"
      id="visa-travel"
      aria-labelledby="africa-visa-heading"
      sx={{
        py: { xs: 5, md: 7 },
        px: { xs: 2, sm: 3 },
        backgroundColor: "#fff",
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        <Box sx={{ textAlign: "center", mb: { xs: 3.5, md: 4.5 } }}>
          <Typography
            variant="overline"
            sx={{ color: AF.primary, fontWeight: 600, letterSpacing: 1.5 }}
          >
            Visa & travel
          </Typography>
          <Typography
            id="africa-visa-heading"
            component="h2"
            sx={{
              mt: 1,
              fontFamily: AF.fontDisplay,
              fontSize: { xs: "1.5rem", md: "1.75rem" },
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            We handle the logistics — you focus on recovery
          </Typography>
          <Typography
            sx={{
              mt: 1.25,
              mx: "auto",
              maxWidth: 520,
              fontSize: "0.9375rem",
              color: AF.muted,
              lineHeight: 1.55,
            }}
          >
            Medical visa, airport pickup, attendant accommodation, dietary needs, and
            language support — arranged before you fly.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" },
            gap: { xs: 2.5, md: 3 },
          }}
        >
          {AFRICA_VISA_TRAVEL_POINTS.map((point, index) => {
            const Icon = ICONS[point.id];
            return (
              <Box
                key={point.id}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${alpha(AF.ink, 0.08)}`,
                  backgroundColor: alpha(AF.softBg, 0.5),
                  animation: `africaVisaIn 0.6s ease ${0.06 * index}s both`,
                  "@keyframes africaVisaIn": {
                    from: { opacity: 0, transform: "translateY(10px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    mb: 1.5,
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
