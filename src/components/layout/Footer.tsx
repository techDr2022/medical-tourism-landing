"use client";

import NextLink from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "919032292171";
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "info@techdr.in";
const WHATSAPP_DISPLAY =
  WHATSAPP.length >= 12 ? `+${WHATSAPP.slice(0, 2)} ${WHATSAPP.slice(2)}` : `+${WHATSAPP}`;

const TRUST_METRICS = [
  { value: "50+", label: "Hospitals in India" },
  { value: "Worldwide", label: "Global support" },
  { value: "24/7", label: "Patient coordinators" },
];

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: { xs: 6, md: 8 },
        backgroundColor: "#0f172a",
        color: "#ffffff",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
        {/* Trust Metrics */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 3, sm: 2, md: 4 }}
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: "none", sm: "block" },
                borderColor: "rgba(255, 255, 255, 0.2)",
                alignSelf: "stretch",
                minHeight: 40,
              }}
            />
          }
          sx={{
            alignItems: "center",
            justifyContent: "center",
            mb: 6,
            py: 1,
          }}
        >
          {TRUST_METRICS.map((metric) => (
            <Box key={metric.value} sx={{ textAlign: "center", minWidth: { sm: 120 } }}>
              <Typography
                component="span"
                sx={{
                  display: "block",
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mb: 0.5,
                  color: "#ffffff",
                }}
              >
                {metric.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                {metric.label}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 4 }} />

        {/* Company Info */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          sx={{ flexWrap: "wrap", gap: 3 }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                fontSize: "1.125rem",
                mb: 1,
                color: "#ffffff",
              }}
            >
              MedicalToursIndia.com
            </Typography>
            <Stack spacing={0.5} sx={{ mt: 1 }}>
              <Link
                component="a"
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{
                  color: "rgba(255, 255, 255, 0.95)",
                  fontSize: "0.875rem",
                  "&:hover": { color: "#ffffff" },
                }}
              >
                WhatsApp: {WHATSAPP_DISPLAY}
              </Link>
              <Typography
                component="a"
                href={`tel:${WHATSAPP}`}
                sx={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  "&:hover": { color: "#ffffff" },
                }}
              >
                Phone: {WHATSAPP_DISPLAY}
              </Typography>
              <Link
                component="a"
                href={`mailto:${CONTACT_EMAIL}`}
                underline="hover"
                sx={{
                  color: "rgba(255, 255, 255, 0.95)",
                  fontSize: "0.875rem",
                  "&:hover": { color: "#ffffff" },
                }}
              >
                Email: {CONTACT_EMAIL}
              </Link>
            </Stack>
          </Box>
          <Box sx={{ maxWidth: { xs: "100%", md: 420 }, flex: { md: "1 1 auto" } }}>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: 1.7,
                fontSize: "0.875rem",
              }}
            >
              We act as a medical travel coordination service connecting patients with licensed
              hospitals in India. All medical decisions are made between the patient and treating
              hospital.
            </Typography>
          </Box>
        </Stack>

        {/* Legal links */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3, justifyContent: { xs: "center", md: "flex-start" } }}
        >
          <Link
            component={NextLink}
            href="/privacy"
            underline="hover"
            sx={{
              color: "rgba(255, 255, 255, 0.78)",
              fontSize: "0.8125rem",
              "&:hover": { color: "#ffffff" },
            }}
          >
            Privacy Policy
          </Link>
          <Link
            component={NextLink}
            href="/terms"
            underline="hover"
            sx={{
              color: "rgba(255, 255, 255, 0.78)",
              fontSize: "0.8125rem",
              "&:hover": { color: "#ffffff" },
            }}
          >
            Terms &amp; Disclaimer
          </Link>
        </Stack>

        {/* Copyright */}
        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255, 255, 255, 0.78)",
              fontSize: "0.8125rem",
            }}
          >
            © {new Date().getFullYear()} MedicalToursIndia.com. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
