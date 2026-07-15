"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { alpha } from "@mui/material/styles";
import {
  QUALIFICATION_REPORT_OPTIONS,
  QUALIFICATION_TRAVEL_OPTIONS,
  QUALIFICATION_TREATMENTS,
  type QualificationTreatment,
} from "@/constants/africa";
import { AF } from "@/constants/africaTheme";
import { getAfricaCountryFromUrl } from "@/lib/africaUtm";
import {
  buildQualificationWhatsAppUrl,
} from "@/lib/africaLeadSubmit";
import { getUtmParamsFromUrl, trackAdsConversion } from "@/lib/adsTracking";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/contact";

const EVENT_CATEGORY = "africa_lead_form";

interface QualificationBlockProps {
  /** Pre-select treatment from treatment cards or query param. */
  initialTreatment?: string;
}

/**
 * 3-question qualification before WhatsApp handoff — filters browsers from real patients.
 */
export function QualificationBlock({ initialTreatment = "" }: QualificationBlockProps) {
  const [step, setStep] = useState(0);
  const [treatment, setTreatment] = useState<QualificationTreatment | "">("");
  const [treatmentOther, setTreatmentOther] = useState("");
  const [reportStatus, setReportStatus] = useState("");
  const [travelTimeline, setTravelTimeline] = useState("");
  const [country, setCountry] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCountry(getAfricaCountryFromUrl());
  }, []);

  useEffect(() => {
    if (!initialTreatment) return;
    const match = QUALIFICATION_TREATMENTS.find(
      (t) => t.toLowerCase() === initialTreatment.toLowerCase()
    );
    if (match) {
      setTreatment(match);
      return;
    }
    const fuzzy = QUALIFICATION_TREATMENTS.find((t) =>
      t.toLowerCase().includes(initialTreatment.toLowerCase())
    );
    if (fuzzy) setTreatment(fuzzy);
  }, [initialTreatment]);

  const treatmentLabel =
    treatment === "Other" && treatmentOther.trim()
      ? treatmentOther.trim()
      : treatment;

  const validateStep = (s: number): string | null => {
    if (s === 0) {
      if (!treatment) return "Please select the treatment you're looking for.";
      if (treatment === "Other" && !treatmentOther.trim()) {
        return "Please specify your treatment.";
      }
      return null;
    }
    if (s === 1) {
      if (!reportStatus) return "Please tell us about your medical reports.";
      return null;
    }
    if (s === 2) {
      if (!travelTimeline) return "Please tell us your travel timeline.";
      return null;
    }
    return null;
  };

  const handleNext = () => {
    const err = validateStep(step);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    handleWhatsAppHandoff();
  };

  const handleWhatsAppHandoff = async () => {
    const err = validateStep(2);
    if (err) {
      setError(err);
      return;
    }

    const utm = getUtmParamsFromUrl();

    trackAdsConversion(
      "whatsapp_click",
      {
        source: "qualification_block",
        treatment: treatmentLabel,
        report_status: reportStatus,
        travel_timeline: travelTimeline,
        country: country ?? "general",
        utm_campaign: utm.utm_campaign,
      },
      EVENT_CATEGORY
    );

    const phone =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || DEFAULT_WHATSAPP_NUMBER;
    const url = buildQualificationWhatsAppUrl(phone, {
      treatment: treatmentLabel,
      reportStatus,
      travelTimeline,
      country,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const stepLabels = [
    "What treatment are you looking for?",
    "Do you have a medical report or diagnosis already?",
    "Are you looking to travel within the next 1–3 months?",
  ];

  return (
    <Box
      component="section"
      id="qualify"
      aria-labelledby="africa-qualify-heading"
      sx={{
        py: { xs: 5, md: 7 },
        px: { xs: 2, sm: 3 },
        background: `linear-gradient(180deg, ${AF.softBg} 0%, #fff 100%)`,
      }}
    >
      <Box sx={{ maxWidth: 560, mx: "auto" }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="overline"
            sx={{ color: AF.primary, fontWeight: 600, letterSpacing: 1.5 }}
          >
            Quick check
          </Typography>
          <Typography
            id="africa-qualify-heading"
            component="h2"
            sx={{
              mt: 1,
              mb: 1,
              fontFamily: AF.fontDisplay,
              fontSize: { xs: "1.375rem", md: "1.625rem" },
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Check if you&apos;re a good fit
          </Typography>
          <Typography sx={{ color: AF.muted, fontSize: "0.9375rem", lineHeight: 1.55 }}>
            Three short questions so we can help you faster on WhatsApp.
          </Typography>
        </Box>

        <Box
          sx={{
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: 3,
            border: `1px solid ${alpha(AF.ink, 0.1)}`,
            backgroundColor: "#fff",
            boxShadow: "0 8px 32px rgba(11, 61, 63, 0.06)",
          }}
        >
          {/* Step indicator */}
          <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  bgcolor: i <= step ? AF.primary : alpha(AF.ink, 0.1),
                  transition: "background-color 0.3s ease",
                }}
              />
            ))}
          </Box>

          <Typography
            component="h3"
            sx={{
              mb: 2.5,
              fontFamily: AF.fontDisplay,
              fontSize: "1.0625rem",
              fontWeight: 600,
              color: AF.text,
            }}
          >
            {stepLabels[step]}
          </Typography>

          {step === 0 && (
            <FormControl fullWidth>
              <InputLabel id="africa-treatment-label">Treatment</InputLabel>
              <Select
                labelId="africa-treatment-label"
                label="Treatment"
                value={treatment}
                onChange={(e) => setTreatment(e.target.value as QualificationTreatment)}
              >
                {QUALIFICATION_TREATMENTS.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
              {treatment === "Other" && (
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Please specify"
                  value={treatmentOther}
                  onChange={(e) => setTreatmentOther(e.target.value)}
                />
              )}
            </FormControl>
          )}

          {step === 1 && (
            <FormControl component="fieldset">
              <RadioGroup
                value={reportStatus}
                onChange={(e) => setReportStatus(e.target.value)}
              >
                {QUALIFICATION_REPORT_OPTIONS.map((opt) => (
                  <FormControlLabel
                    key={opt.value}
                    value={opt.value}
                    control={<Radio sx={{ color: AF.primary, "&.Mui-checked": { color: AF.primary } }} />}
                    label={opt.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}

          {step === 2 && (
            <FormControl component="fieldset">
              <RadioGroup
                value={travelTimeline}
                onChange={(e) => setTravelTimeline(e.target.value)}
              >
                {QUALIFICATION_TRAVEL_OPTIONS.map((opt) => (
                  <FormControlLabel
                    key={opt.value}
                    value={opt.value}
                    control={<Radio sx={{ color: AF.primary, "&.Mui-checked": { color: AF.primary } }} />}
                    label={opt.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}

          {error && (
            <Typography sx={{ mt: 2, color: "error.main", fontSize: "0.875rem" }}>
              {error}
            </Typography>
          )}

          <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
            {step > 0 && (
              <Button
                variant="outlined"
                onClick={() => {
                  setError(null);
                  setStep(step - 1);
                }}
                sx={{ flex: 1, borderColor: alpha(AF.ink, 0.2), color: AF.text }}
              >
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
              startIcon={step === 2 ? <WhatsAppIcon /> : undefined}
              sx={{
                flex: 2,
                py: 1.25,
                background:
                  step === 2
                    ? AF.whatsapp
                    : `linear-gradient(135deg, ${AF.gradientStart} 0%, ${AF.gradientEnd} 100%)`,
                "&:hover": {
                  background:
                    step === 2
                      ? AF.whatsappHover
                      : `linear-gradient(135deg, ${AF.primaryDark} 0%, #0f766e 100%)`,
                },
              }}
            >
              {step === 2 ? "Continue on WhatsApp" : "Next"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
