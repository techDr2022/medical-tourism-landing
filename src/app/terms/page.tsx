import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageWrapper } from "@/components/layout/LegalPageWrapper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { TermsContent } from "./TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service & Disclaimer | Medical Travel to India",
  description:
    "Terms of Service and Medical Disclaimer for MedicalToursIndia.com. Important information about our coordination service.",
  openGraph: {
    title: "Terms of Service & Disclaimer | Medical Travel to India",
    url: "https://medicaltoursindia.com/terms",
  },
  alternates: {
    canonical: "https://medicaltoursindia.com/terms",
  },
};

export default function TermsPage() {
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
            Terms of Service &amp; Disclaimer
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </Typography>
          <TermsContent />
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
