"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { alpha } from "@mui/material/styles";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuroraBackground } from "@/components/layout/AuroraBackground";

const GREEN_600 = "#1c7c7f";
const GREEN_700 = "#0d9488";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "919032292171";
const WHATSAPP_DISPLAY =
  WHATSAPP.length >= 12 ? `+${WHATSAPP.slice(0, 2)} ${WHATSAPP.slice(2)}` : `+${WHATSAPP}`;

const NEXT_STEPS = [
  "Our coordination team reviews your medical details",
  "We match you with suitable hospital options",
  "You receive a preliminary treatment estimate",
  "We help schedule a video consultation if needed",
];

export default function ThankYouPage() {
  return (
    <>
      <AuroraBackground />
      <Header ctaHref="/" />

      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, md: 3 },
          py: { xs: 10, md: 12 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 560,
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: alpha("#171717", 0.1),
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 244, 0.4) 100%)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: "50%",
              bgcolor: alpha(GREEN_600, 0.1),
              mb: 2,
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: 40, color: GREEN_600 }} />
          </Box>

          <Typography variant="overline" sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5 }}>
            Inquiry Received
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            sx={{ mt: 1, mb: 2, fontSize: { xs: "1.5rem", md: "1.75rem" } }}
          >
            Thank You for Your Submission
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            We have received your medical travel inquiry. Our coordination team will review your details
            and respond within 24–48 hours.
          </Typography>

          <Box
            sx={{
              textAlign: "left",
              p: 2.5,
              borderRadius: 2,
              bgcolor: alpha(GREEN_600, 0.05),
              border: `1px solid ${alpha(GREEN_600, 0.12)}`,
              mb: 3,
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1.5, color: GREEN_700 }}>
              What happens next
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              {NEXT_STEPS.map((step) => (
                <Typography
                  key={step}
                  component="li"
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.75 }}
                >
                  {step}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
            <Button
              component={Link}
              href="/"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                boxShadow: "0 4px 14px rgba(22, 163, 74, 0.4)",
                "&:hover": {
                  background: `linear-gradient(135deg, ${GREEN_700} 0%, #0f766e 100%)`,
                },
              }}
            >
              Back to Home
            </Button>
            <Button
              component="a"
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              size="large"
              fullWidth
              startIcon={<WhatsAppIcon />}
              sx={{
                borderColor: GREEN_600,
                borderWidth: 2,
                color: GREEN_600,
                "&:hover": {
                  borderColor: GREEN_700,
                  color: GREEN_700,
                  bgcolor: alpha(GREEN_600, 0.08),
                },
              }}
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </Button>
          </Box>

          <Typography variant="caption" color="text.disabled" sx={{ display: "block", mt: 2 }}>
            A confirmation email has been sent to the address you provided.
          </Typography>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
