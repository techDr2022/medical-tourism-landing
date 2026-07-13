"use client";

import Box from "@mui/material/Box";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBarSection } from "@/components/sections/TrustBarSection";
import { WhyConsiderIndiaSection } from "@/components/sections/WhyConsiderIndiaSection";
import { WhyCoordinatorSection } from "@/components/sections/WhyCoordinatorSection";
import { HospitalsSection } from "@/components/sections/HospitalsSection";
import { MedicalVisaSection } from "@/components/sections/MedicalVisaSection";
import { VideoConsultationSection } from "@/components/sections/VideoConsultationSection";
import { TreatmentsSection } from "@/components/sections/TreatmentsSection";
import { CoordinationSection } from "@/components/sections/CoordinationSection";
import { TransparencySection } from "@/components/sections/TransparencySection";
import { PatientSocialProofSection } from "@/components/sections/PatientSocialProofSection";
import { PackageEstimatesSection } from "@/components/sections/PackageEstimatesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ImportantInfoSection } from "@/components/sections/ImportantInfoSection";
import { YouTubePatientTestimonialsSection } from "@/components/sections/YouTubePatientTestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { AuroraBackground } from "@/components/layout/AuroraBackground";
import { useTranslation } from "@/i18n/LanguageProvider";

export function HomePageClient() {
  const { t } = useTranslation();

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
          <HeroSection />
          <YouTubePatientTestimonialsSection />
          <TrustBarSection />
          <WhyConsiderIndiaSection />
          <WhyCoordinatorSection />
          <HospitalsSection />
          <PatientSocialProofSection />
          <MedicalVisaSection />
          <VideoConsultationSection />
          <TreatmentsSection />
          <CoordinationSection />
          <TransparencySection />
          <PackageEstimatesSection />
          <ProcessSection />
          <FaqSection />
          <ImportantInfoSection />
        </Box>

        <Footer />
      </Box>

      <MobileStickyCta label={t("common.cta.mobileSticky")} />
      <Box sx={{ height: 80, display: { xs: "block", lg: "none" } }} />
    </>
  );
}
