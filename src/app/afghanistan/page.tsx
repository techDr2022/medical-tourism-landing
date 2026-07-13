/**
 * /afghanistan — Google Ads lead-qualification landing page (Afghan patients → India)
 *
 * ============================================================================
 * TODO BEFORE ADS LAUNCH — resolve every item below. Do NOT launch ads until
 * CRITICAL items (1–2) are confirmed with ops / business owner.
 * ============================================================================
 * 1. VISA PROCESS ANSWER (CRITICAL)
 * 2. PAYMENT METHOD ANSWER (CRITICAL)
 * 3. REAL PRICING FIGURES
 * 4. REAL TESTIMONIALS (≥2–3 verifiable Afghan patient stories)
 * 5. DARI / PASHTO SUPPORT confirmation
 * 6. TRUST STRIP — replace [Hospital Name/Group] and [X]
 * 7. FORM SUBMISSION — NEXT_PUBLIC_AFGHANISTAN_LEAD_WEBHOOK_URL
 * 8. WHATSAPP BUSINESS NUMBER — NEXT_PUBLIC_WHATSAPP_NUMBER
 * 9. FAMILY ATTENDANT answer confirmation
 * ============================================================================
 */

"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import {
  FAQAccordion,
  HowItWorks,
  LeadFormPopup,
  MobileStickyBar,
  TestimonialCard,
  TreatmentCard,
  WhatsAppFloatingButton,
} from "@/components/afghanistan";
import { HospitalsSection } from "@/components/sections/HospitalsSection";
import {
  AFGHANISTAN_TESTIMONIALS,
  AFGHANISTAN_TREATMENT_CARDS,
  AFGHANISTAN_TRUST_STRIP,
  AFGHANISTAN_VISA_PAYMENT_FAQ,
  AFGHANISTAN_WHATSAPP_DEFAULT_MESSAGE,
  formatUsd,
} from "@/constants/afghanistan";
import { AF, afCtaSx } from "@/constants/afghanistanTheme";
import { useTranslation } from "@/i18n/LanguageProvider";

function AfghanistanPageInner() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const treatmentFromQuery = searchParams.get("treatment") ?? "";
  const [selectedTreatment, setSelectedTreatment] = useState(treatmentFromQuery);
  const [formOpen, setFormOpen] = useState(false);

  const openForm = useCallback((treatmentValue = "") => {
    if (treatmentValue) setSelectedTreatment(treatmentValue);
    setFormOpen(true);
  }, []);

  const closeForm = useCallback(() => setFormOpen(false), []);

  useEffect(() => {
    if (treatmentFromQuery) {
      setSelectedTreatment(treatmentFromQuery);
      setFormOpen(true);
    }
  }, [treatmentFromQuery]);

  // TODO: replace placeholders before ads
  const trustStrip = `${AFGHANISTAN_TRUST_STRIP.hospitalName} · ${AFGHANISTAN_TRUST_STRIP.accreditation} · ${AFGHANISTAN_TRUST_STRIP.patientCountLabel} Afghan patients assisted · ${AFGHANISTAN_TRUST_STRIP.hospitalNetworkLabel}`;

  return (
    <>
      <Header onCtaClick={() => openForm()} />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#fff",
          color: AF.text,
          overflowX: "clip",
        }}
      >
        <Box component="main">
          {/* HERO — light, readable, brand + one message + one CTA */}
          <Box
            component="section"
            id="contact"
            sx={{
              position: "relative",
              minHeight: { xs: "68vh", md: 560 },
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              backgroundColor: "#c5d4d6",
            }}
          >
            <Box
              component="img"
              src="/logos/banner.png"
              alt="Patient family consulting with a doctor in India"
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: { xs: "55% 40%", md: "38% 42%" },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: {
                  xs: `linear-gradient(
                    180deg,
                    rgba(248, 252, 252, 0.88) 0%,
                    rgba(248, 252, 252, 0.82) 55%,
                    rgba(248, 252, 252, 0.7) 100%
                  )`,
                  md: `linear-gradient(
                    90deg,
                    rgba(248, 252, 252, 0.94) 0%,
                    rgba(248, 252, 252, 0.82) 28%,
                    rgba(248, 252, 252, 0.35) 48%,
                    transparent 62%
                  )`,
                },
                pointerEvents: "none",
              }}
            />

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: { xs: 6, md: 8 } }}>
              <Box sx={{ maxWidth: { xs: 400, md: 440 } }}>
                <Typography
                  component="p"
                  sx={{
                    mb: 1.5,
                    fontSize: { xs: "1.125rem", md: "1.375rem" },
                    fontWeight: 700,
                    color: AF.primary,
                    letterSpacing: "-0.02em",
                  }}
                >
                  MedicalToursIndia
                </Typography>

                <Typography
                  component="h1"
                  data-speakable
                  sx={{
                    mb: 1.5,
                    fontSize: { xs: "1.625rem", sm: "1.875rem", md: "2.25rem" },
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.15,
                    color: AF.text,
                  }}
                >
                  {t("afghanistan.headline")}
                </Typography>

                <Typography
                  data-speakable
                  sx={{
                    mb: 1.5,
                    fontSize: { xs: "0.9375rem", md: "1.0625rem" },
                    lineHeight: 1.55,
                    color: alpha(AF.text, 0.72),
                  }}
                >
                  {t("afghanistan.subheadline")}
                </Typography>

                <Typography
                  sx={{
                    mb: 2.5,
                    fontSize: "0.8125rem",
                    color: alpha(AF.text, 0.55),
                  }}
                >
                  {t("afghanistan.languageNote")}
                </Typography>

                <Button variant="contained" size="large" onClick={() => openForm()} sx={afCtaSx}>
                  {t("afghanistan.primaryCta")}
                </Button>
              </Box>
            </Container>
          </Box>

          {/* Trust strip */}
          <Box
            sx={{
              py: 1.75,
              px: 2,
              borderBottom: `1px solid ${AF.line}`,
              backgroundColor: "#fff",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: { xs: "0.75rem", md: "0.8125rem" },
                color: AF.mutedSoft,
                lineHeight: 1.5,
                maxWidth: 900,
                mx: "auto",
              }}
            >
              {trustStrip}
            </Typography>
          </Box>

          {/* 1. Visa & payment — clear FAQ first */}
          <SectionContainer id="before-you-decide">
            <FAQAccordion
              items={AFGHANISTAN_VISA_PAYMENT_FAQ}
              overline={t("afghanistan.faqOverline")}
              title={t("afghanistan.faqTitle")}
              subtitle={t("afghanistan.faqSubtitle")}
              idPrefix="afghan-visa-faq"
              defaultExpandedFirst
            />
          </SectionContainer>

          {/* 2. How it works */}
          <SectionContainer id="why-us" variant="alt">
            <HowItWorks />
          </SectionContainer>

          {/* 3. Hospitals */}
          <HospitalsSection />

          {/* 4. Treatments */}
          <SectionContainer id="services" variant="alt">
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="overline"
                sx={{ color: AF.primary, fontWeight: 600, letterSpacing: 1.5 }}
              >
                {t("afghanistan.treatmentsOverline")}
              </Typography>
              <Typography
                component="h2"
                sx={{
                  mt: 1,
                  mb: 1.5,
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                  fontWeight: 700,
                }}
              >
                {t("afghanistan.treatmentsTitle")}
              </Typography>
              <Typography variant="body2" sx={{ maxWidth: 520, mx: "auto", color: AF.muted }}>
                {t("afghanistan.treatmentsSubtitle")}
              </Typography>
            </Box>
            <Grid container spacing={2.5}>
              {AFGHANISTAN_TREATMENT_CARDS.map((card) => (
                <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <TreatmentCard
                    treatment={card}
                    currency="USD"
                    onGetQuote={(value) => openForm(value)}
                  />
                </Grid>
              ))}
            </Grid>
          </SectionContainer>

          {/* 5. Stories */}
          <SectionContainer id="stories">
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="overline"
                sx={{ color: AF.primary, fontWeight: 600, letterSpacing: 1.5 }}
              >
                {t("afghanistan.storiesOverline")}
              </Typography>
              <Typography
                component="h2"
                sx={{ mt: 1, fontSize: { xs: "1.5rem", md: "1.75rem" }, fontWeight: 700 }}
              >
                {t("afghanistan.storiesTitle")}
              </Typography>
            </Box>
            <Grid container spacing={2.5}>
              {AFGHANISTAN_TESTIMONIALS.map((t) => (
                <Grid key={`${t.city}-${t.treatmentType}`} size={{ xs: 12, md: 4 }}>
                  <TestimonialCard
                    patientName={t.patientName}
                    city={t.city}
                    treatmentType={t.treatmentType}
                    hospitalName={t.hospitalName}
                    doctorName={t.doctorName}
                    photoOrVideoUrl={t.photoOrVideoUrl}
                    quote={t.quote}
                    isPlaceholder={t.isPlaceholder}
                  />
                </Grid>
              ))}
            </Grid>
          </SectionContainer>

          {/* Final CTA */}
          <SectionContainer variant="alt">
            <Box sx={{ textAlign: "center", maxWidth: 520, mx: "auto" }}>
              <Typography
                component="h2"
                sx={{ fontSize: { xs: "1.375rem", md: "1.625rem" }, fontWeight: 700, mb: 1.25 }}
              >
                {t("afghanistan.finalTitle")}
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: AF.muted }}>
                {t("afghanistan.finalBody")}
              </Typography>
              <Button variant="contained" size="large" onClick={() => openForm()} sx={afCtaSx}>
                {t("afghanistan.primaryCta")}
              </Button>
              <Typography
                variant="caption"
                sx={{ display: "block", mt: 2, color: AF.mutedSoft }}
              >
                Packages from {formatUsd(2500)} — exact quotes after report review
              </Typography>
            </Box>
          </SectionContainer>
        </Box>

        <Footer />
      </Box>

      <LeadFormPopup
        open={formOpen}
        onClose={closeForm}
        initialTreatment={selectedTreatment}
      />
      <WhatsAppFloatingButton
        prefilledMessage={AFGHANISTAN_WHATSAPP_DEFAULT_MESSAGE}
        eventCategory="afghanistan_lead_form"
      />
      <MobileStickyBar label={t("afghanistan.stickyCta")} onOpenForm={() => openForm()} />
      <Box sx={{ height: 80, display: { xs: "block", lg: "none" } }} />
    </>
  );
}

export default function AfghanistanPage() {
  return (
    <Suspense fallback={null}>
      <AfghanistanPageInner />
    </Suspense>
  );
}
