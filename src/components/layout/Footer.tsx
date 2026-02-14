"use client";

import NextLink from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

const TRUST_METRICS = [
  { value: "50+", label: "Hospitals in India" },
  { value: "Kenya-first", label: "Global support" },
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
                }}
              >
                {metric.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  color: "rgba(255, 255, 255, 0.7)",
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
                color: "#fff",
              }}
            >
              MedicalToursIndia.com
            </Typography>
            <Stack spacing={0.5} sx={{ mt: 1 }}>
              <Link
                component={NextLink}
                href="/landing-page/kenya"
                underline="hover"
                sx={{
                  color: "rgba(255, 255, 255, 0.85)",
                  fontSize: "0.875rem",
                  "&:hover": { color: "#fff" },
                }}
              >
                For patients in Kenya →
              </Link>
              <Link
                component="a"
                href="https://wa.me/919032292171"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{
                  color: "rgba(255, 255, 255, 0.85)",
                  fontSize: "0.875rem",
                  "&:hover": { color: "#fff" },
                }}
              >
                WhatsApp: +91 9032292171
              </Link>
              <Typography
                component="a"
                href="tel:+919032292171"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  "&:hover": { color: "rgba(255, 255, 255, 0.9)" },
                }}
              >
                Phone: +91 9032292171
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ maxWidth: { xs: "100%", md: 420 }, flex: { md: "1 1 auto" } }}>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
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

        {/* Copyright */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255, 255, 255, 0.5)",
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
