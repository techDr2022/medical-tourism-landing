"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { MetricsCard } from "@/components/sections/MetricsCard";
import { alpha } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PopupForm } from "@/components/layout/PopupForm";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { VideoConsultationSection } from "@/components/sections/VideoConsultationSection";
import { HospitalLogo } from "@/components/sections/HospitalsSection";
import { RequestFormSection } from "@/components/sections/RequestFormSection";
import { HOSPITALS } from "@/constants";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { AuroraBackground } from "@/components/layout/AuroraBackground";

const GREEN_600 = "#1c7c7f";
const GREEN_700 = "#0d9488";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";

const WHY_INDIA_BULLETS = [
  "Internationally accredited hospitals",
  "Experienced multidisciplinary specialists",
  "Advanced surgical and diagnostic facilities",
  "Dedicated international patient departments",
  "Structured cost estimates before travel",
];

const COMMON_PROCEDURES = [
  "Cardiac procedures",
  "Orthopaedic and joint replacement surgeries",
  "Spine procedures",
  "Cancer treatment",
  "Neurosurgical procedures",
  "Organ transplant coordination",
  "Fertility treatments",
  "General surgical procedures",
];

const PACKAGE_CATEGORIES = [
  {
    title: "Cardiac Procedures",
    items: [
      { name: "Angioplasty (1 Stent)", price: "from USD 4,400" },
      { name: "Bypass Surgery (CABG)", price: "from USD 5,500" },
    ],
  },
  {
    title: "Orthopaedic Procedures",
    items: [
      { name: "Total Knee Replacement", price: "from USD 5,500" },
      { name: "Total Hip Replacement", price: "from USD 6,200" },
    ],
  },
  {
    title: "Neurosurgery",
    items: [{ name: "Spinal Fusion", price: "from USD 8,200" }],
  },
  {
    title: "Transplant Procedures",
    items: [
      { name: "Kidney Transplant", price: "from USD 13,000" },
      { name: "Liver Transplant", price: "from USD 27,000" },
    ],
  },
];

const COORDINATION_ITEMS = [
  "Hospital admission scheduling",
  "Medical visa documentation guidance",
  "Airport pickup planning",
  "Hotel or serviced apartment booking",
  "Local assistance during hospital stay",
  "Post-discharge communication",
];

const TRANSPARENCY_POINTS = [
  "We do not charge patients for coordination",
  "No commission added to hospital bills",
  "Treatment invoices are issued directly by the hospital",
  "Written estimates provided before travel",
];

const PROCESS_STEPS = [
  "Submit your medical reports",
  "Receive hospital options and cost estimate",
  "Optional video consultation",
  "Confirm hospital and travel dates",
  "Visa and accommodation coordination",
  "Treatment in India",
  "Return travel after discharge",
];

const FINAL_CTA_BENEFITS = [
  "Hospital options",
  "Preliminary treatment estimate",
  "Video consultation scheduling",
  "Travel coordination guidance",
];

export default function ForKenyaPage() {
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
          overflowY: "visible",
        }}
      >
        <Box component="main">
          {/* SECTION 1 – HERO */}
          <Box
            component="section"
            sx={{
              position: "relative",
              py: { xs: 8, md: 10, lg: 12 },
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 253, 244, 0.4) 100%)",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "radial-gradient(circle at 15% 40%, rgba(34, 197, 94, 0.06) 0%, transparent 45%)",
                pointerEvents: "none",
              },
            }}
          >
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
              <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="overline"
                    sx={{
                      display: "block",
                      mb: 1.5,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: 1.8,
                      color: alpha("#171717", 0.5),
                    }}
                  >
                    For patients from Kenya
                  </Typography>
                  <Typography
                    component="h1"
                    sx={{
                      mb: 2,
                      fontSize: { xs: "1.875rem", sm: "2.25rem", md: "2.5rem", lg: "2.75rem" },
                      fontWeight: 700,
                      letterSpacing: "-0.025em",
                      lineHeight: 1.15,
                      color: "#171717",
                    }}
                  >
                    Medical Treatment in India
                  </Typography>
                  <Typography
                    sx={{
                      mb: 3,
                      fontSize: { xs: "1.0625rem", md: "1.125rem" },
                      fontWeight: 600,
                      color: GREEN_600,
                      lineHeight: 1.4,
                    }}
                  >
                    Complete hospital & travel coordination — at no service fee
                  </Typography>
                  <Typography
                    sx={{
                      mb: 3,
                      fontSize: { xs: "1rem", md: "1.0625rem" },
                      lineHeight: 1.7,
                      color: alpha("#171717", 0.78),
                      maxWidth: 520,
                    }}
                  >
                    We connect patients from Kenya with accredited hospitals in India and coordinate
                    the full journey — from medical review to safe return home. You focus on your
                    health; we handle hospital, visa, and travel.
                  </Typography>
                  <Box
                    sx={{
                      mb: 4,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1.5,
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        px: 2,
                        py: 1.25,
                        borderRadius: 2,
                        backgroundColor: alpha(GREEN_600, 0.12),
                        border: `1px solid ${alpha(GREEN_600, 0.25)}`,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "#171717",
                        }}
                      >
                        <Box component="span" sx={{ color: GREEN_600 }}>50+</Box> hospitals
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        px: 2,
                        py: 1.25,
                        borderRadius: 2,
                        backgroundColor: alpha(GREEN_600, 0.12),
                        border: `1px solid ${alpha(GREEN_600, 0.25)}`,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "#171717",
                        }}
                      >
                        No service fee
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        px: 2,
                        py: 1.25,
                        borderRadius: 2,
                        backgroundColor: alpha(GREEN_600, 0.12),
                        border: `1px solid ${alpha(GREEN_600, 0.25)}`,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "#171717",
                        }}
                      >
                        End-to-end coordination
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => setPopupOpen(true)}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                        boxShadow: "0 4px 14px rgba(22, 163, 74, 0.35)",
                        borderRadius: 2,
                        transition: "all 0.25s ease",
                        "&:hover": {
                          background: `linear-gradient(135deg, ${GREEN_700} 0%, #0f766e 100%)`,
                          boxShadow: "0 6px 20px rgba(22, 163, 74, 0.45)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      Request Treatment Estimate
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => {
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        borderRadius: 2,
                        borderColor: alpha("#171717", 0.18),
                        color: "#171717",
                        backgroundColor: "#fff",
                        transition: "all 0.25s ease",
                        "&:hover": {
                          borderColor: GREEN_600,
                          color: GREEN_600,
                          backgroundColor: alpha(GREEN_600, 0.04),
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      Upload Medical Reports
                    </Button>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
                    <MetricsCard />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* SECTION 2 – WHY INDIA */}
          <SectionContainer id="why-india" variant="alt">
            <Box sx={{ maxWidth: 1000, mx: "auto" }}>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: GREEN_600,
                    fontWeight: 600,
                    letterSpacing: 1.5,
                    fontSize: "0.8125rem",
                    display: "block",
                    mb: 1.5,
                  }}
                >
                  Why Choose India
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "1.75rem", md: "2rem" },
                    fontWeight: 700,
                    mb: 2,
                    lineHeight: 1.2,
                    color: "#171717",
                  }}
                >
                  Why Consider India for Medical Treatment?
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: 2,
                  border: `1px solid ${alpha("#171717", 0.1)}`,
                  p: { xs: 3, md: 4 },
                  mb: 3,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    color: alpha("#171717", 0.8),
                    mb: 3,
                    fontWeight: 500,
                  }}
                >
                  India is recognised for:
                </Typography>
                <Grid container spacing={2}>
                  {WHY_INDIA_BULLETS.map((reason) => (
                    <Grid key={reason} size={{ xs: 12, sm: 6 }}>
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, py: 1.5 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: 24, color: GREEN_600, flexShrink: 0, mt: 0.25 }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "0.9375rem", color: alpha("#171717", 0.8), lineHeight: 1.6 }}
                        >
                          {reason}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  color: alpha("#171717", 0.7),
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                }}
              >
                Hospitals in India regularly treat patients travelling from Kenya, including
                Nairobi, Mombasa, Kisumu, and other regions.
              </Typography>
            </Box>
          </SectionContainer>

          {/* SECTION 3 – HOSPITAL COLLABORATIONS */}
          <SectionContainer id="hospitals">
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="overline"
                sx={{
                  color: GREEN_600,
                  fontWeight: 600,
                  letterSpacing: 1.5,
                  fontSize: "0.8125rem",
                  display: "block",
                  mb: 1.5,
                }}
              >
                Official Partners
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                  fontWeight: 700,
                  mb: 2,
                  color: "#171717",
                }}
              >
                Official Hospital Network
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: alpha("#171717", 0.7),
                  maxWidth: 560,
                  mx: "auto",
                  mb: 2,
                  lineHeight: 1.6,
                }}
              >
                We operate under formal collaborations and working arrangements with major
                hospital groups in India, including:
              </Typography>
            </Box>
            <Grid
              container
              spacing={{ xs: 2, sm: 3, md: 3 }}
              sx={{ maxWidth: 1000, mx: "auto", justifyContent: "center", justifyItems: "stretch" }}
            >
              {HOSPITALS.map((hospital) => (
                <HospitalLogo key={hospital.name} hospital={hospital} />
              ))}
            </Grid>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mt: 3,
                mb: 1,
                fontSize: { xs: "1.0625rem", md: "1.125rem" },
                fontWeight: 600,
                color: GREEN_600,
              }}
            >
              50+ hospitals in India
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: alpha("#171717", 0.7),
                mt: 2,
                maxWidth: 560,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Patients are treated directly by the selected hospital and its licensed medical team.
              Hospital billing is issued directly by the hospital. We act as your coordination
              partner.
            </Typography>
          </SectionContainer>

          {/* SECTION 4 – VIDEO CONSULTATION (uses shared component with image) */}
          <VideoConsultationSection />

          {/* SECTION 5 – COMMON PROCEDURES */}
          <SectionContainer>
            <Box sx={{ textAlign: "center", mb: 5 }}>
              <Typography
                variant="overline"
                sx={{
                  color: "#171717",
                  fontWeight: 600,
                  letterSpacing: 1.5,
                  fontSize: "0.8125rem",
                  display: "block",
                  mb: 1.5,
                }}
              >
                Medical Services
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "1.75rem", md: "2rem" },
                  fontWeight: 700,
                  mb: 2,
                  lineHeight: 1.2,
                  color: "#171717",
                }}
              >
                Treatments Commonly Coordinated
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1rem",
                  color: alpha("#171717", 0.7),
                  maxWidth: 720,
                  mx: "auto",
                }}
              >
                We assist Kenyan patients seeking:
              </Typography>
            </Box>
            <Grid container spacing={2} sx={{ maxWidth: 960, mx: "auto" }}>
              {COMMON_PROCEDURES.map((treatment) => (
                <Grid key={treatment} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: `1px solid ${alpha("#171717", 0.1)}`,
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 253, 244, 0.4) 100%)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      "&:hover": {
                        borderColor: alpha(GREEN_600, 0.3),
                        boxShadow: "0 8px 24px rgba(22, 163, 74, 0.2)",
                      },
                    }}
                  >
                    <CheckCircleOutlineIcon
                      sx={{ fontSize: 20, color: GREEN_600, flexShrink: 0, mt: 0.25 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: alpha("#171717", 0.8), lineHeight: 1.6 }}
                    >
                      {treatment}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: alpha("#171717", 0.7),
                mt: 4,
                maxWidth: 720,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Each case is reviewed individually and matched with a suitable hospital based on
              medical evaluation.
            </Typography>
          </SectionContainer>

          {/* SECTION 6 – TRANSPARENT PACKAGE ESTIMATES */}
          <SectionContainer variant="alt" id="pricing">
            <Box sx={{ maxWidth: 1200, mx: "auto" }}>
              <Box sx={{ textAlign: "center", mb: 6 }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "#171717",
                    fontWeight: 600,
                    letterSpacing: 1.5,
                    fontSize: "0.8125rem",
                    display: "block",
                    mb: 1.5,
                  }}
                >
                  Pricing Transparency
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "1.75rem", md: "2rem" },
                    fontWeight: 700,
                    mb: 3,
                    lineHeight: 1.2,
                    color: "#171717",
                  }}
                >
                  Indicative Hospital Package Ranges
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    color: alpha("#171717", 0.7),
                    maxWidth: 900,
                    mx: "auto",
                    lineHeight: 1.7,
                  }}
                >
                  Patients from Kenya often request cost clarity before travel. Based on official
                  hospital tariff plans:
                </Typography>
              </Box>
              <Grid container spacing={3}>
                {PACKAGE_CATEGORIES.map((category) => (
                  <Grid key={category.title} size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        p: 4,
                        height: "100%",
                        borderRadius: 3,
                        backgroundColor: "#ffffff",
                        border: `1px solid ${alpha("#171717", 0.1)}`,
                        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                        "&:hover": {
                          boxShadow: "0 8px 24px rgba(16, 185, 129, 0.15)",
                          borderColor: alpha(GREEN_600, 0.3),
                        },
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: "1.125rem",
                          fontWeight: 700,
                          mb: 3,
                          color: "#171717",
                          pb: 2,
                          borderBottom: `2px solid ${alpha(GREEN_600, 0.2)}`,
                        }}
                      >
                        {category.title}
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {category.items.map((item) => (
                          <Box
                            key={item.name}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              gap: 2,
                              py: 1.5,
                              borderBottom: `1px solid ${alpha("#171717", 0.05)}`,
                              "&:last-child": { borderBottom: "none" },
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                fontSize: "0.9375rem",
                                color: alpha("#171717", 0.8),
                                lineHeight: 1.5,
                              }}
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                fontSize: "0.9375rem",
                                fontWeight: 700,
                                color: GREEN_600,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.price}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  color: alpha("#171717", 0.7),
                  mt: 4,
                  maxWidth: 800,
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                Final estimates are confirmed after medical evaluation by the treating hospital
                specialist. Hospital invoices are issued directly by the hospital.
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  textAlign: "center",
                  color: alpha("#171717", 0.6),
                  mt: 2,
                  fontWeight: 600,
                }}
              >
                Packages – Multiple Specialities
              </Typography>
            </Box>
          </SectionContainer>

          {/* SECTION 7 – END-TO-END SUPPORT */}
          <SectionContainer id="services">
            <Box sx={{ maxWidth: 1000, mx: "auto" }}>
              <Box sx={{ textAlign: "center", mb: 6 }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "#171717",
                    fontWeight: 600,
                    letterSpacing: 1.5,
                    fontSize: "0.8125rem",
                    display: "block",
                    mb: 1.5,
                  }}
                >
                  Our Services
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "1.75rem", md: "2rem" },
                    fontWeight: 700,
                    mb: 2,
                    lineHeight: 1.2,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Complete Coordination Support
                  </Box>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    color: alpha("#171717", 0.7),
                    maxWidth: 800,
                    mx: "auto",
                    lineHeight: 1.7,
                  }}
                >
                  Once treatment is confirmed, we coordinate:
                </Typography>
              </Box>
              <Grid container spacing={2} sx={{ mb: 5 }}>
                {COORDINATION_ITEMS.map((item) => (
                  <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        backgroundColor: "#ffffff",
                        border: `1px solid ${alpha("#171717", 0.1)}`,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                        "&:hover": {
                          borderColor: alpha(GREEN_600, 0.3),
                          boxShadow: "0 4px 16px rgba(16, 185, 129, 0.15)",
                        },
                      }}
                    >
                      <CheckCircleIcon
                        sx={{ fontSize: 22, color: GREEN_600, flexShrink: 0, mt: 0.25 }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "0.9375rem",
                          color: alpha("#171717", 0.8),
                          lineHeight: 1.6,
                          fontWeight: 500,
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${alpha(GREEN_600, 0.08)} 0%, ${alpha(GREEN_700, 0.05)} 100%)`,
                  border: `1px solid ${alpha(GREEN_600, 0.2)}`,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    color: alpha("#171717", 0.9),
                    lineHeight: 1.7,
                    fontWeight: 600,
                  }}
                >
                  You deal with{" "}
                  <Box component="span" sx={{ color: GREEN_600 }}>
                    one dedicated coordination contact
                  </Box>{" "}
                  throughout your journey.
                </Typography>
              </Box>
            </Box>
          </SectionContainer>

          {/* SECTION 8 – TRANSPARENCY */}
          <SectionContainer variant="alt">
            <Box sx={{ textAlign: "center", mb: 5 }}>
              <Typography
                variant="overline"
                sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5, fontSize: "0.8125rem" }}
              >
                Transparency
              </Typography>
              <Typography
                variant="h2"
                sx={{ mt: 1, mb: 4, fontSize: { xs: "1.5rem", md: "1.75rem" }, color: "#171717" }}
              >
                No Service Fee & No Hidden Charges
              </Typography>
            </Box>
            <Grid container spacing={2} sx={{ maxWidth: 800, mx: "auto" }}>
              {TRANSPARENCY_POINTS.map((point) => (
                <Grid key={point} size={{ xs: 12, sm: 6 }}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: `1px solid ${alpha("#171717", 0.1)}`,
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 253, 244, 0.4) 100%)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      "&:hover": {
                        borderColor: alpha(GREEN_600, 0.3),
                        boxShadow: "0 8px 24px rgba(22, 163, 74, 0.2)",
                      },
                    }}
                  >
                    <CheckCircleOutlineIcon
                      sx={{ fontSize: 20, color: GREEN_600, flexShrink: 0, mt: 0.25 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: alpha("#171717", 0.8), lineHeight: 1.6 }}
                    >
                      {point}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Typography
              variant="body2"
              sx={{
                mt: 4,
                textAlign: "center",
                color: alpha("#171717", 0.7),
                maxWidth: 720,
                mx: "auto",
              }}
            >
              Our role is coordination, not medical treatment.
            </Typography>
          </SectionContainer>

          {/* SECTION 9 – HOW IT WORKS */}
          <SectionContainer id="process">
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                variant="overline"
                sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5 }}
              >
                Simple Steps
              </Typography>
              <Typography
                variant="h2"
                sx={{ mt: 1, fontSize: { xs: "1.5rem", md: "1.75rem" }, color: "#171717" }}
              >
                Simple Process
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "stretch", md: "flex-start" },
                gap: { xs: 0, md: 1 },
                maxWidth: 960,
                mx: "auto",
              }}
            >
              {PROCESS_STEPS.map((step, index) => (
                <Box
                  key={step}
                  sx={{
                    flex: { md: 1 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    position: "relative",
                    px: { xs: 2, md: 1 },
                    pb: { xs: 3, md: 0 },
                    "&:not(:last-child)": {
                      "&::after": {
                        content: '""',
                        display: { xs: "none", md: "block" },
                        position: "absolute",
                        top: 24,
                        left: "calc(50% + 32px)",
                        right: "-14px",
                        height: 3,
                        background: `linear-gradient(90deg, ${GRADIENT_START} 0%, ${alpha(GRADIENT_START, 0.3)} 50%, transparent 100%)`,
                        borderRadius: 2,
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "1rem",
                      mb: 1.5,
                      flexShrink: 0,
                      boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ fontSize: { xs: "0.9rem", md: "0.85rem" }, lineHeight: 1.4 }}
                  >
                    {step}
                  </Typography>
                </Box>
              ))}
            </Box>
          </SectionContainer>

          {/* SECTION 10 – IMPORTANT INFORMATION */}
          <Box
            sx={{
              py: 3,
              px: 2,
              background: `linear-gradient(135deg, ${alpha(GREEN_600, 0.08)} 0%, ${alpha("#06b6d4", 0.05)} 100%)`,
              borderTop: `1px solid ${alpha(GREEN_600, 0.2)}`,
              borderBottom: `1px solid ${alpha(GREEN_600, 0.2)}`,
            }}
          >
            <Box sx={{ maxWidth: 720, mx: "auto", display: "flex", alignItems: "flex-start", gap: 2 }}>
              <InfoOutlinedIcon sx={{ fontSize: 22, color: GREEN_600, flexShrink: 0, mt: 0.25 }} />
              <Typography
                variant="body2"
                sx={{ color: alpha("#171717", 0.8), lineHeight: 1.6, fontSize: "0.9rem" }}
              >
                <strong>Important Information:</strong> We are a medical travel coordination
                service. We do not provide medical diagnosis or treatment. All medical services are
                delivered by licensed hospitals and doctors in India. This service is exclusively
                for patients residing outside India, including Kenya.
              </Typography>
            </Box>
          </Box>

          {/* FINAL CTA SECTION */}
          <SectionContainer variant="alt">
            <Box
              sx={{
                maxWidth: 680,
                mx: "auto",
                p: { xs: 4, md: 6 },
                borderRadius: 3,
                background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(240,253,244,0.35) 100%)",
                border: `1px solid ${alpha(GREEN_600, 0.2)}`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  display: "block",
                  textAlign: "center",
                  mb: 1.5,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: 1.8,
                  color: GREEN_600,
                }}
              >
                Get started
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  textAlign: "center",
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                  fontWeight: 700,
                  lineHeight: 1.25,
                  color: "#171717",
                  mb: 2,
                }}
              >
                Start Your Medical Journey from
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Kenya to India
                </Box>
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "1rem",
                  color: alpha("#171717", 0.78),
                  lineHeight: 1.6,
                  mb: 4,
                }}
              >
                Submit your medical reports to receive:
              </Typography>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                {FINAL_CTA_BENEFITS.map((benefit) => (
                  <Grid key={benefit} size={{ xs: 12, sm: 6 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        py: 1,
                        px: 2,
                        borderRadius: 2,
                        backgroundColor: "rgba(255,255,255,0.8)",
                        border: `1px solid ${alpha("#171717", 0.06)}`,
                      }}
                    >
                      <CheckCircleIcon
                        sx={{ fontSize: 22, color: GREEN_600, flexShrink: 0 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: "#171717",
                          fontSize: "0.9375rem",
                        }}
                      >
                        {benefit}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Box
                sx={{
                  textAlign: "center",
                  mb: 4,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: alpha(GREEN_600, 0.1),
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: alpha("#171717", 0.8),
                  }}
                >
                  Our team typically responds within 24–48 hours
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setPopupOpen(true)}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                    boxShadow: "0 4px 14px rgba(22, 163, 74, 0.35)",
                    "&:hover": {
                      background: `linear-gradient(135deg, ${GREEN_700} 0%, #0f766e 100%)`,
                      boxShadow: "0 6px 20px rgba(22, 163, 74, 0.45)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Request Treatment Estimate
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setPopupOpen(true)}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    borderRadius: 2,
                    borderColor: alpha("#171717", 0.2),
                    color: "#171717",
                    backgroundColor: "#fff",
                    "&:hover": {
                      borderColor: GREEN_600,
                      color: GREEN_600,
                      backgroundColor: alpha(GREEN_600, 0.04),
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Speak to a Coordinator
                </Button>
              </Box>
            </Box>
          </SectionContainer>

          <RequestFormSection />
        </Box>

        <Footer />

        <MobileStickyCta onClick={() => setPopupOpen(true)} label="Request Treatment Estimate" />

        <PopupForm open={popupOpen} onClose={() => setPopupOpen(false)} />

        <Box sx={{ height: 80, display: { xs: "block", lg: "none" } }} />
      </Box>
    </>
  );
}
