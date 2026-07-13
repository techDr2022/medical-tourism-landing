/**
 * /nigeria — Google Ads lead-qualification landing page (Nigerian patients → India)
 *
 * ============================================================================
 * TODO BEFORE ADS LAUNCH — resolve every item below:
 * ============================================================================
 * 1. PRICING
 *    - Replace hero flagship price ($6,500 heart surgery) with the real cheapest
 *      flagship procedure + price from hospital packages.
 *    - Fill South Africa & UAE columns in CostComparisonTable (currently flagged
 *      incomplete; India/UK use repo procedurePricing anchors).
 *    - Confirm Cancer / IVF “starting from” floors in treatment cards.
 *    - Update USD→NGN approximate rate (NGN_PER_USD_APPROX in constants/nigeria.ts).
 *
 * 2. HOSPITAL / TRUST STRIP
 *    - Verify Apollo/JCI patient-count figures and 200+ accredited hospitals claim with ops.
 *
 * 3. TESTIMONIALS
 *    - Replace all PLACEHOLDER TestimonialCard entries with ≥3 real, verifiable
 *      Nigerian patient stories (name permission, city, treatment, hospital, doctor).
 *
 * 4. FORM SUBMISSION ENDPOINT
 *    - Provide CRM webhook / Zoho / HubSpot form ID / API URL.
 *    - Set NEXT_PUBLIC_NIGERIA_LEAD_WEBHOOK_URL (see submitLead in
 *      src/lib/nigeriaLeadSubmit.ts). Soft-success without endpoint is for QA only.
 *
 * 5. WHATSAPP BUSINESS NUMBER
 *    - Live number: +91 63032 25006 (DEFAULT_WHATSAPP_NUMBER / NEXT_PUBLIC_WHATSAPP_NUMBER)
 *
 * 6. PAYMENT / ESCROW MODEL
 *    - Confirm “pay the hospital directly — we do not collect treatment fees”
 *      is accurate. If you collect deposits/escrow, replace trust point + FAQ copy.
 *
 * 7. META PIXEL
 *    - Add real Meta Pixel ID in layout comment / GTM when running FB/IG ads.
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
  CostComparisonTable,
  CurrencyToggle,
  FAQAccordion,
  LeadFormPopup,
  NigeriaMobileStickyBar,
  TestimonialCard,
  TreatmentCard,
  WhatsAppFloatingButton,
} from "@/components/nigeria";
import { HospitalsSection } from "@/components/sections/HospitalsSection";
import {
  NIGERIA_TESTIMONIALS,
  NIGERIA_TREATMENT_CARDS,
  NIGERIA_TRUST_STRIP,
  type CurrencyMode,
} from "@/constants/nigeria";
import { NG } from "@/constants/nigeriaTheme";
import { useTranslation } from "@/i18n/LanguageProvider";

const GREEN_600 = NG.primary;
const GREEN_700 = NG.primaryDark;
const GRADIENT_START = NG.gradientStart;
const GRADIENT_END = NG.gradientEnd;

function NigeriaPageInner() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const treatmentFromQuery = searchParams.get("treatment") ?? "";
  const [currency, setCurrency] = useState<CurrencyMode>("USD");
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

  const trustStrip = `${NIGERIA_TRUST_STRIP.accreditation} · ${NIGERIA_TRUST_STRIP.patientCountLabel} Nigerian patients treated since ${NIGERIA_TRUST_STRIP.sinceYear} · ${NIGERIA_TRUST_STRIP.hospitalNetworkLabel}`;

  return (
    <>
      <Header onCtaClick={() => openForm()} />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#fff",
          color: "text.primary",
          overflowX: "clip",
          overflowY: "visible",
          fontFamily: NG.fontSans,
        }}
      >
        <Box component="main">
          {/* HERO — full-bleed consult photo; brand + offer left, family right */}
          <Box
            component="section"
            id="contact"
            sx={{
              position: "relative",
              minHeight: { xs: "78vh", md: 600 },
              display: "flex",
              alignItems: { xs: "flex-end", md: "center" },
              overflow: "hidden",
              backgroundColor: NG.ink,
            }}
          >
            <Box
              component="img"
              src="/logos/banner.png"
              alt="Nigerian family consulting with a doctor in India about medical treatment"
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: { xs: "68% 30%", md: "52% 36%" },
                animation: "nigeriaHeroZoom 18s ease-out forwards",
                "@keyframes nigeriaHeroZoom": {
                  from: { transform: "scale(1.06)" },
                  to: { transform: "scale(1)" },
                },
              }}
            />

            {/* Teal cinematic veil — keeps photo vivid on the right */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: {
                  xs: `linear-gradient(
                    180deg,
                    rgba(11, 61, 63, 0.35) 0%,
                    rgba(11, 61, 63, 0.55) 42%,
                    rgba(11, 61, 63, 0.9) 100%
                  )`,
                  md: `linear-gradient(
                    100deg,
                    rgba(11, 61, 63, 0.95) 0%,
                    rgba(11, 61, 63, 0.84) 26%,
                    rgba(11, 61, 63, 0.4) 50%,
                    rgba(11, 61, 63, 0.12) 70%,
                    transparent 86%
                  )`,
                },
                pointerEvents: "none",
              }}
            />

            {/* Soft light bloom behind copy */}
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                left: { xs: "-10%", md: "-5%" },
                top: { xs: "40%", md: "18%" },
                width: { xs: "90%", md: "46%" },
                height: { xs: "55%", md: "64%" },
                background:
                  "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.22) 0%, transparent 70%)",
                pointerEvents: "none",
                animation: "nigeriaBloom 2.4s ease-out both",
                "@keyframes nigeriaBloom": {
                  from: { opacity: 0 },
                  to: { opacity: 1 },
                },
              }}
            />

            <Container
              maxWidth="lg"
              sx={{
                position: "relative",
                zIndex: 1,
                pt: { xs: 9, md: 8 },
                pb: { xs: 5, md: 8 },
              }}
            >
              <Box sx={{ maxWidth: { xs: "100%", md: 560 } }}>
                <Typography
                  component="h1"
                  data-speakable
                  sx={{
                    mb: 2,
                    fontFamily: NG.fontDisplay,
                    fontSize: { xs: "1.625rem", sm: "2rem", md: "2.5rem" },
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    lineHeight: 1.12,
                    color: NG.white,
                    maxWidth: 560,
                    animation: "nigeriaHeroIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
                    "@keyframes nigeriaHeroIn": {
                      from: { opacity: 0, transform: "translateY(18px)" },
                      to: { opacity: 1, transform: "translateY(0)" },
                    },
                  }}
                >
                  {t("nigeria.headline")}
                </Typography>

                <Typography
                  data-speakable
                  sx={{
                    mb: 3.25,
                    maxWidth: 460,
                    fontFamily: NG.fontSans,
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.55,
                    color: "rgba(255,255,255,0.78)",
                    animation: "nigeriaHeroIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both",
                  }}
                >
                  {t("nigeria.subheadline")}
                </Typography>

                <Box
                  sx={{
                    animation: "nigeriaHeroIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both",
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => openForm()}
                    sx={{
                      px: 3.5,
                      py: 1.5,
                      fontSize: "0.975rem",
                      fontFamily: NG.fontSans,
                      fontWeight: 600,
                      borderRadius: 1.5,
                      color: NG.white,
                      background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                      boxShadow: "0 12px 32px rgba(16, 185, 129, 0.35)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                        filter: "brightness(1.05)",
                        boxShadow: "0 14px 36px rgba(16, 185, 129, 0.45)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {t("nigeria.primaryCta")}
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>

          {/* Trust line — outside hero so first viewport stays uncluttered */}
          <Box
            sx={{
              py: 1.75,
              px: 2,
              borderBottom: `1px solid ${alpha("#171717", 0.08)}`,
              backgroundColor: "#fff",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: { xs: "0.75rem", md: "0.8125rem" },
                color: alpha("#171717", 0.6),
                lineHeight: 1.5,
                maxWidth: 900,
                mx: "auto",
              }}
            >
              {trustStrip}
            </Typography>
          </Box>

          {/* COST COMPARISON */}
          <SectionContainer id="why-india" variant="alt">
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography
                variant="overline"
                sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5 }}
              >
                Cost comparison
              </Typography>
              <Typography
                component="h2"
                variant="h2"
                sx={{ mt: 1, mb: 1.5, fontSize: { xs: "1.5rem", md: "1.75rem" } }}
              >
                What treatment typically costs — India vs other markets
              </Typography>
              <Typography
                variant="body2"
                sx={{ maxWidth: 640, mx: "auto", color: alpha("#171717", 0.7), mb: 2 }}
              >
                Side-by-side package floors so you can see savings before you WhatsApp your
                reports.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CurrencyToggle value={currency} onChange={setCurrency} />
              </Box>
            </Box>
            <CostComparisonTable currency={currency} />
          </SectionContainer>

          <HospitalsSection />

          {/* TREATMENT CARDS */}
          <SectionContainer id="services">
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="overline"
                sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5 }}
              >
                Treatments
              </Typography>
              <Typography
                component="h2"
                variant="h2"
                sx={{ mt: 1, mb: 1.5, fontSize: { xs: "1.5rem", md: "1.75rem" } }}
              >
                Common treatments Nigerian patients request
              </Typography>
              <Typography
                variant="body2"
                sx={{ maxWidth: 560, mx: "auto", color: alpha("#171717", 0.7) }}
              >
                Tap Get Exact Quote to open the estimate form with that treatment pre-selected.
              </Typography>
            </Box>
            <Grid container spacing={2.5}>
              {NIGERIA_TREATMENT_CARDS.map((card) => (
                <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <TreatmentCard
                    treatment={card}
                    currency={currency}
                    onGetQuote={(value) => openForm(value)}
                  />
                </Grid>
              ))}
            </Grid>
          </SectionContainer>

          {/* TESTIMONIALS — TODO: swap sample quotes for permissioned real stories before ads */}
          <SectionContainer id="pricing" variant="alt">
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="overline"
                sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5 }}
              >
                Patient stories
              </Typography>
              <Typography
                component="h2"
                variant="h2"
                sx={{ mt: 1, fontSize: { xs: "1.5rem", md: "1.75rem" } }}
              >
                Nigerians treated in India
              </Typography>
            </Box>
            <Grid container spacing={2.5}>
              {NIGERIA_TESTIMONIALS.map((t) => (
                <Grid key={`${t.cityInNigeria}-${t.treatmentType}`} size={{ xs: 12, md: 4 }}>
                  <TestimonialCard
                    patientName={t.patientName}
                    cityInNigeria={t.cityInNigeria}
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

          {/* FAQ */}
          <SectionContainer id="process">
            <FAQAccordion />
          </SectionContainer>

          {/* Final CTA */}
          <SectionContainer variant="alt">
            <Box sx={{ textAlign: "center", maxWidth: 560, mx: "auto" }}>
              <Typography
                component="h2"
                sx={{ fontSize: { xs: "1.375rem", md: "1.625rem" }, fontWeight: 700, mb: 1.5 }}
              >
                Ready for a written cost estimate?
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: alpha("#171717", 0.7) }}>
                Upload reports when you have them — high-intent leads get priority review.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => openForm()}
                sx={{
                  background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                  "&:hover": {
                    background: `linear-gradient(135deg, ${GREEN_700} 0%, #0f766e 100%)`,
                  },
                }}
              >
                Send My Reports — Get Cost Estimate on WhatsApp
              </Button>
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
      <WhatsAppFloatingButton />
      <NigeriaMobileStickyBar label={t("nigeria.stickyCta")} onOpenForm={() => openForm()} />
      <Box sx={{ height: 80, display: { xs: "block", lg: "none" } }} />
    </>
  );
}

export default function NigeriaPage() {
  return (
    <Suspense fallback={null}>
      <NigeriaPageInner />
    </Suspense>
  );
}
