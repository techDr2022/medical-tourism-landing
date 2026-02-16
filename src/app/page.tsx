"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PopupForm } from "@/components/layout/PopupForm";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBarSection } from "@/components/sections/TrustBarSection";
import { WhyConsiderIndiaSection } from "@/components/sections/WhyConsiderIndiaSection";
import { WhyCoordinatorSection } from "@/components/sections/WhyCoordinatorSection";
import { HospitalsSection } from "@/components/sections/HospitalsSection";
import { VideoConsultationSection } from "@/components/sections/VideoConsultationSection";
import { TreatmentsSection } from "@/components/sections/TreatmentsSection";
import { CoordinationSection } from "@/components/sections/CoordinationSection";
import { TransparencySection } from "@/components/sections/TransparencySection";
import { PackageEstimatesSection } from "@/components/sections/PackageEstimatesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ImportantInfoSection } from "@/components/sections/ImportantInfoSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { RequestFormSection } from "@/components/sections/RequestFormSection";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { AuroraBackground } from "@/components/layout/AuroraBackground";

export default function Home() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <AuroraBackground />
      <Header onCtaClick={() => setPopupOpen(true)} />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "transparent",
          color: "text.primary",
          overflowX: "hidden",
          // Ensure no overflow that breaks sticky
          overflowY: "visible",
        }}
      >
        <Box component="main">
        <HeroSection onCtaClick={() => setPopupOpen(true)} />
        <TrustBarSection />
        <WhyConsiderIndiaSection />
        <WhyCoordinatorSection />
        <HospitalsSection />
        <VideoConsultationSection />
        <TreatmentsSection />
        <CoordinationSection />
        <TransparencySection />
        <PackageEstimatesSection />
        <ProcessSection />
        <TestimonialsSection />
        <ImportantInfoSection />
        <RequestFormSection />
      </Box>

      <Footer />

      <MobileStickyCta onClick={() => setPopupOpen(true)} label="Request a Treatment Estimate" />

      <PopupForm open={popupOpen} onClose={() => setPopupOpen(false)} />

      <Box sx={{ height: 80, display: { xs: "block", lg: "none" } }} />
      </Box>
    </>
  );
}
