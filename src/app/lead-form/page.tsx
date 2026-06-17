"use client";

import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuroraBackground } from "@/components/layout/AuroraBackground";
import { RequestFormSection } from "@/components/sections/RequestFormSection";

export default function LeadFormPage() {
  const router = useRouter();

  return (
    <>
      <AuroraBackground />
      <Header onCtaClick={() => router.push("/lead-form")} />

      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          bgcolor: "transparent",
          color: "text.primary",
          overflowX: "hidden",
          pt: { xs: 3, md: 5 },
        }}
      >
        <Box sx={{ px: { xs: 2, md: 3 }, mb: 2, textAlign: "center" }}>
          <Typography variant="overline" sx={{ letterSpacing: 1.5 }}>
            Lead Form
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, mt: 1 }}>
            Request a Treatment Estimate
          </Typography>
        </Box>

        <RequestFormSection />
      </Box>

      <Footer />
    </>
  );
}
