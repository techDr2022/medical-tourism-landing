import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageWrapper } from "@/components/layout/LegalPageWrapper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { PrivacyContent } from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Medical Travel to India",
  description:
    "Privacy Policy for MedicalToursIndia.com. How we collect, use, and protect your personal and health information.",
  openGraph: {
    title: "Privacy Policy | Medical Travel to India",
    url: "https://medicaltoursindia.com/privacy",
  },
  alternates: {
    canonical: "https://medicaltoursindia.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPageWrapper>
      <Box
        sx={{
          minHeight: "100vh",
          pt: { xs: 10, sm: 12 },
          pb: 8,
          backgroundColor: "#f8fafc",
        }}
      >
        <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#171717",
              mb: 1,
            }}
          >
            Privacy Policy
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </Typography>
          <PrivacyContent />
          <Box sx={{ mt: 4 }}>
            <Link
              href="/"
              style={{
                color: "#1c7c7f",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9375rem",
              }}
            >
              ← Back to home
            </Link>
          </Box>
        </Container>
      </Box>
    </LegalPageWrapper>
  );
}
