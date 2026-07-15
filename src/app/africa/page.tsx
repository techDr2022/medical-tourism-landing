/**
 * /africa — Conversion-focused landing page for African patients seeking treatment in India.
 *
 * Primary conversion: whatsapp_click (GTM / Google Ads)
 * Secondary conversion: lead_submit (secondary form)
 */

"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { alpha } from "@mui/material/styles";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import {
  AfricaCostComparisonTable,
  AfricaHero,
  AfricaLeadDrawer,
  AfricaMobileStickyBar,
  AfricaTestimonialCard,
  AfricaTrustPointsSection,
  QualificationBlock,
  VisaTravelSection,
} from "@/components/africa";
import {
  FAQAccordion,
  TreatmentCard,
  WhatsAppFloatingButton,
} from "@/components/nigeria";
import { HospitalsSection } from "@/components/sections/HospitalsSection";
import {
  AFRICA_HERO,
  AFRICA_TESTIMONIALS,
  AFRICA_TREATMENT_CARDS,
  AFRICA_TRUST_STRIP,
  AFRICA_WHATSAPP_DEFAULT_MESSAGE,
  AFRICA_FAQ,
} from "@/constants/africa";
import { AF } from "@/constants/africaTheme";
import { getAfricaCountryFromUrl } from "@/lib/africaUtm";
import { trackAdsConversion } from "@/lib/adsTracking";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/contact";
import type { AfricaCountry } from "@/constants/africa";

const EVENT_CATEGORY = "africa_lead_form";

function AfricaPageInner() {
  const searchParams = useSearchParams();
  const treatmentFromQuery = searchParams.get("treatment") ?? "";
  const [targetCountry, setTargetCountry] = useState<AfricaCountry | null>(null);
  const [selectedTreatment, setSelectedTreatment] = useState(treatmentFromQuery);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setTargetCountry(getAfricaCountryFromUrl());
  }, []);

  useEffect(() => {
    if (treatmentFromQuery) {
      setSelectedTreatment(treatmentFromQuery);
      setDrawerOpen(true);
    }
  }, [treatmentFromQuery]);

  const scrollToQualify = useCallback(() => {
    document.getElementById("qualify")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const openLeadDrawer = useCallback((treatmentValue = "") => {
    if (treatmentValue) setSelectedTreatment(treatmentValue);
    setDrawerOpen(true);
  }, []);

  const closeLeadDrawer = useCallback(() => setDrawerOpen(false), []);

  const phone =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || DEFAULT_WHATSAPP_NUMBER;
  const whatsappHref = `https://wa.me/${phone}?text=${encodeURIComponent(AFRICA_WHATSAPP_DEFAULT_MESSAGE)}`;

  const handleHeroWhatsApp = () => {
    trackAdsConversion("whatsapp_click", { source: "hero_cta" }, EVENT_CATEGORY);
  };

  const headline = targetCountry
    ? AFRICA_HERO.headlineWithCountry(targetCountry)
    : AFRICA_HERO.headline;

  const trustStrip = `${AFRICA_TRUST_STRIP.accreditation} · ${AFRICA_TRUST_STRIP.patientCountLabel} African patients treated since ${AFRICA_TRUST_STRIP.sinceYear} · ${AFRICA_TRUST_STRIP.hospitalNetworkLabel}`;

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#fff",
          color: "text.primary",
          overflowX: "clip",
          fontFamily: AF.fontSans,
        }}
      >
        <Box component="main">
          <AfricaHero
            headline={headline}
            targetCountry={targetCountry}
            whatsappHref={whatsappHref}
            onWhatsAppClick={handleHeroWhatsApp}
            onOpenForm={() => openLeadDrawer()}
            onHeaderCta={() => openLeadDrawer()}
          />

          {/* Trust strip */}
          <Box
            sx={{
              py: 1.75,
              px: 2,
              borderBottom: `1px solid ${alpha(AF.ink, 0.08)}`,
              backgroundColor: "#fff",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: { xs: "0.75rem", md: "0.8125rem" },
                color: alpha(AF.text, 0.6),
                lineHeight: 1.5,
                maxWidth: 900,
                mx: "auto",
              }}
            >
              {trustStrip}
            </Typography>
          </Box>

          {/* QUALIFICATION — critical filter before WhatsApp handoff */}
          <QualificationBlock initialTreatment={treatmentFromQuery} />

          {/* COST COMPARISON */}
          <SectionContainer id="why-india" variant="alt">
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography
                variant="overline"
                sx={{ color: AF.primary, fontWeight: 600, letterSpacing: 1.5 }}
              >
                Transparent pricing
              </Typography>
              <Typography
                component="h2"
                variant="h2"
                sx={{ mt: 1, mb: 1.5, fontSize: { xs: "1.5rem", md: "1.75rem" } }}
              >
                What treatment costs — India vs your region
              </Typography>
              <Typography
                variant="body2"
                sx={{ maxWidth: 640, mx: "auto", color: alpha(AF.text, 0.7) }}
              >
                Side-by-side package floors so you can plan with confidence — no hidden fees.
              </Typography>
            </Box>
            <AfricaCostComparisonTable targetCountry={targetCountry} />
          </SectionContainer>

          <AfricaTrustPointsSection />
          <VisaTravelSection />
          <HospitalsSection />

          {/* TREATMENTS */}
          <SectionContainer id="services">
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="overline"
                sx={{ color: AF.primary, fontWeight: 600, letterSpacing: 1.5 }}
              >
                Treatments
              </Typography>
              <Typography
                component="h2"
                variant="h2"
                sx={{ mt: 1, mb: 1.5, fontSize: { xs: "1.5rem", md: "1.75rem" } }}
              >
                Treatments African patients most often request
              </Typography>
              <Typography
                variant="body2"
                sx={{ maxWidth: 560, mx: "auto", color: alpha(AF.text, 0.7) }}
              >
                Tap a treatment to open a free cost-estimate enquiry.
              </Typography>
            </Box>
            <Grid container spacing={2.5}>
              {AFRICA_TREATMENT_CARDS.map((card) => (
                <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <TreatmentCard
                    treatment={{
                      id: card.id,
                      title: card.title,
                      description: card.description,
                      startingFromUsd: card.startingFromUsd,
                      formTreatmentValue: card.formTreatmentValue,
                      iconSrc: card.iconSrc,
                    }}
                    onGetQuote={(value) => {
                      openLeadDrawer(value);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </SectionContainer>

          {/* TESTIMONIALS */}
          <SectionContainer id="stories" variant="alt">
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="overline"
                sx={{ color: AF.primary, fontWeight: 600, letterSpacing: 1.5 }}
              >
                Patient stories
              </Typography>
              <Typography
                component="h2"
                variant="h2"
                sx={{ mt: 1, fontSize: { xs: "1.5rem", md: "1.75rem" } }}
              >
                African patients treated in India
              </Typography>
            </Box>
            <Grid container spacing={2.5}>
              {AFRICA_TESTIMONIALS.map((t) => (
                <Grid
                  key={`${t.country}-${t.patientName}`}
                  size={{ xs: 12, md: 4 }}
                >
                  <AfricaTestimonialCard testimonial={t} />
                </Grid>
              ))}
            </Grid>
          </SectionContainer>

          {/* FAQ */}
          <SectionContainer id="process">
            <FAQAccordion
              items={AFRICA_FAQ}
              title="Questions African patients ask us"
              subtitle="Straight answers on visas, pricing, payment, halal food, and what to expect."
              overline="Africa-specific FAQ"
              idPrefix="africa-faq"
            />
          </SectionContainer>

          {/* Final CTA */}
          <SectionContainer variant="alt">
            <Box sx={{ textAlign: "center", maxWidth: 560, mx: "auto" }}>
              <Typography
                component="h2"
                sx={{ fontSize: { xs: "1.375rem", md: "1.625rem" }, fontWeight: 700, mb: 1.5 }}
              >
                Ready to discuss your treatment?
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: alpha(AF.text, 0.7) }}>
                Open a free cost estimate enquiry, or start with a quick WhatsApp check.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 1.5,
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => openLeadDrawer()}
                  sx={{
                    background: `linear-gradient(135deg, ${AF.gradientStart} 0%, ${AF.gradientEnd} 100%)`,
                  }}
                >
                  Get free cost estimate
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<WhatsAppIcon />}
                  onClick={scrollToQualify}
                  sx={{
                    borderColor: AF.whatsapp,
                    color: AF.whatsappHover,
                    "&:hover": {
                      borderColor: AF.whatsappHover,
                      bgcolor: alpha(AF.whatsapp, 0.08),
                    },
                  }}
                >
                  Quick check on WhatsApp
                </Button>
              </Box>
            </Box>
          </SectionContainer>
        </Box>

        <Footer />
      </Box>

      <AfricaLeadDrawer
        open={drawerOpen}
        onClose={closeLeadDrawer}
        initialTreatment={selectedTreatment}
      />
      <WhatsAppFloatingButton
        prefilledMessage={AFRICA_WHATSAPP_DEFAULT_MESSAGE}
        eventCategory={EVENT_CATEGORY}
      />
      <AfricaMobileStickyBar />
      <Box sx={{ height: 80, display: { xs: "block", lg: "none" } }} />
    </>
  );
}

export default function AfricaPage() {
  return (
    <Suspense fallback={null}>
      <AfricaPageInner />
    </Suspense>
  );
}
