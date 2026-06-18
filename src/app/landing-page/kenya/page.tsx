"use client";

import Box from "@mui/material/Box";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBarSection } from "@/components/sections/TrustBarSection";
import { WhyConsiderIndiaSection } from "@/components/sections/WhyConsiderIndiaSection";
import { HospitalsSection } from "@/components/sections/HospitalsSection";
import { VideoConsultationSection } from "@/components/sections/VideoConsultationSection";
import { TreatmentsSection } from "@/components/sections/TreatmentsSection";
import { CoordinationSection } from "@/components/sections/CoordinationSection";
import { TransparencySection } from "@/components/sections/TransparencySection";
import { PackageEstimatesSection } from "@/components/sections/PackageEstimatesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ImportantInfoSection } from "@/components/sections/ImportantInfoSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { RequestFormSection } from "@/components/sections/RequestFormSection";
import { TeamGroupPhotosSection } from "@/components/sections/TeamGroupPhotosSection";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { AuroraBackground } from "@/components/layout/AuroraBackground";

export default function KenyaPage() {
  return (
    <>
      <AuroraBackground />
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "transparent",
          color: "text.primary",
          overflowX: "clip",
          overflowY: "visible",
        }}
      >
        <Box component="main">
          <HeroSection audience="kenya" />
          <TrustBarSection />
          <WhyConsiderIndiaSection audience="kenya" />
          <HospitalsSection />
          <VideoConsultationSection />
          <TreatmentsSection />
          <CoordinationSection />
          <TransparencySection />
          <PackageEstimatesSection />
          <ProcessSection />
          <TestimonialsSection />
          <FaqSection />
          <ImportantInfoSection />
          <TeamGroupPhotosSection />
          <RequestFormSection />
        </Box>

        <Footer />
      </Box>

      <MobileStickyCta label="Request a Treatment Estimate" />
      <Box sx={{ height: 80, display: { xs: "block", lg: "none" } }} />
    </>
  );
}
