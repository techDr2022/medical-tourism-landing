"use client";

import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { alpha } from "@mui/material/styles";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { RecaptchaNotice } from "@/components/ui/RecaptchaNotice";
import {
  AFRICA_COUNTRIES_SERVED,
  AFRICA_COUNTRY_META,
  QUALIFICATION_REPORT_OPTIONS,
  QUALIFICATION_TRAVEL_OPTIONS,
  QUALIFICATION_TREATMENTS,
} from "@/constants/africa";
import { AF } from "@/constants/africaTheme";
import {
  getUtmParamsFromUrl,
  trackAdsConversion,
  trackAfricaLeadFormConversionAndWait,
} from "@/lib/adsTracking";
import { submitAfricaLeadEmail } from "@/lib/africaLeadSubmit";
import { redirectToThankYou } from "@/lib/gclid";

const EVENT_CATEGORY = "africa_lead_form";
const STEPS = ["About you", "Your case", "Confirm"] as const;

interface AfricaLeadDrawerProps {
  open: boolean;
  onClose: () => void;
  initialTreatment?: string;
}

/**
 * High-converting side drawer lead form — multi-step, email via Resend.
 * Distinct from on-page sections: edge panel, teal header, progressive steps.
 */
export function AfricaLeadDrawer({
  open,
  onClose,
  initialTreatment = "",
}: AfricaLeadDrawerProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [treatment, setTreatment] = useState(initialTreatment);
  const [travelTimeline, setTravelTimeline] = useState("");
  const [reportStatus, setReportStatus] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setTreatment(initialTreatment);
      setStep(0);
      setError(null);
      trackAdsConversion("form_start", { source: "side_drawer" }, EVENT_CATEGORY);
    }
  }, [open, initialTreatment]);

  const cities = country
    ? [...(AFRICA_COUNTRY_META[country as keyof typeof AFRICA_COUNTRY_META]?.cities ?? []), "Other"]
    : [];

  const validateStep = (s: number): string | null => {
    if (s === 0) {
      if (!name.trim()) return "Please enter your full name.";
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return "Please enter a valid email.";
      }
      if (!whatsapp.trim()) return "Please enter your WhatsApp number with country code.";
      if (!country) return "Please select your country.";
      return null;
    }
    if (s === 1) {
      if (!treatment) return "Please select a treatment option.";
      if (!travelTimeline) return "Please tell us your travel timeline.";
      if (!reportStatus) return "Please tell us about your medical reports.";
      return null;
    }
    if (!consent) return "Please agree to be contacted to continue.";
    return null;
  };

  const goNext = () => {
    const err = validateStep(step);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, 2));
  };

  const goBack = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    const err = validateStep(2);
    if (err) {
      setError(err);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      let recaptchaToken: string | undefined;
      if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        if (!executeRecaptcha) {
          throw new Error("Security verification is loading. Please try again.");
        }
        recaptchaToken = await executeRecaptcha("africa_drawer_submit");
      }

      const utm = getUtmParamsFromUrl();
      await submitAfricaLeadEmail({
        name: name.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        country,
        city,
        treatment: treatment || undefined,
        travelTimeline: travelTimeline || undefined,
        reportStatus: reportStatus || undefined,
        message: message.trim() || undefined,
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        utm_term: utm.utm_term,
        utm_content: utm.utm_content,
        ...(recaptchaToken && { recaptchaToken }),
      });

      await trackAfricaLeadFormConversionAndWait();
      onClose();
      redirectToThankYou();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#fff",
    },
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 440 },
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f7fffb",
        },
      }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(8, 40, 42, 0.55)", backdropFilter: "blur(4px)" },
        },
      }}
    >
      {/* Conversion header */}
      <Box
        sx={{
          position: "relative",
          px: 2.5,
          pt: 2.5,
          pb: 2,
          background: `linear-gradient(145deg, ${AF.ink} 0%, ${AF.primaryDark} 55%, ${AF.primary} 100%)`,
          color: AF.white,
          flexShrink: 0,
        }}
      >
        <IconButton
          aria-label="Close enquiry form"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: alpha("#fff", 0.85),
            "&:hover": { bgcolor: alpha("#fff", 0.12), color: "#fff" },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          sx={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: alpha("#fff", 0.7),
            mb: 0.75,
            pr: 4,
          }}
        >
          Free written estimate
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontFamily: AF.fontDisplay,
            fontSize: "1.35rem",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
            mb: 1.25,
            pr: 3,
          }}
        >
          Get your treatment cost &amp; visa plan
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {[
            "Transparent hospital pricing — no hidden fees",
            "Medical visa invitation letter support",
            "Reply by email within 24 hours",
          ].map((line) => (
            <Box key={line} sx={{ display: "flex", alignItems: "flex-start", gap: 0.75 }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 16, mt: 0.15, color: AF.gradientStart }} />
              <Typography sx={{ fontSize: "0.8125rem", color: alpha("#fff", 0.88), lineHeight: 1.4 }}>
                {line}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Step progress */}
      <Box sx={{ px: 2.5, pt: 2, pb: 1, flexShrink: 0 }}>
        <Box sx={{ display: "flex", gap: 0.75, mb: 1 }}>
          {STEPS.map((_, i) => (
            <Box
              key={STEPS[i]}
              sx={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                bgcolor: i <= step ? AF.primary : alpha(AF.ink, 0.12),
                transition: "background-color 0.25s ease",
              }}
            />
          ))}
        </Box>
        <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600, color: AF.primaryDark }}>
          Step {step + 1} of 3 — {STEPS[step]}
        </Typography>
      </Box>

      {/* Form body */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2.5,
          pb: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.75,
        }}
      >
        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {step === 0 && (
          <>
            <TextField
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              autoFocus
              sx={fieldSx}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              placeholder="you@email.com"
              sx={fieldSx}
            />
            <TextField
              label="WhatsApp (with country code)"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              fullWidth
              required
              placeholder="+234 801 234 5678"
              sx={fieldSx}
            />
            <FormControl fullWidth required sx={fieldSx}>
              <InputLabel>Country</InputLabel>
              <Select
                label="Country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setCity("");
                }}
              >
                {AFRICA_COUNTRIES_SERVED.map((c) => (
                  <MenuItem key={c} value={c}>
                    {AFRICA_COUNTRY_META[c].flag} {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {cities.length > 0 && (
              <FormControl fullWidth sx={fieldSx}>
                <InputLabel>City</InputLabel>
                <Select label="City" value={city} onChange={(e) => setCity(e.target.value)}>
                  {cities.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </>
        )}

        {step === 1 && (
          <>
            <FormControl fullWidth required sx={fieldSx}>
              <InputLabel>Treatment needed</InputLabel>
              <Select
                label="Treatment needed"
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
              >
                <MenuItem value="Not sure yet">Not sure yet</MenuItem>
                {QUALIFICATION_TREATMENTS.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth required sx={fieldSx}>
              <InputLabel>When do you want to travel?</InputLabel>
              <Select
                label="When do you want to travel?"
                value={travelTimeline}
                onChange={(e) => setTravelTimeline(e.target.value)}
              >
                {QUALIFICATION_TRAVEL_OPTIONS.map((o) => (
                  <MenuItem key={o.value} value={o.value}>
                    {o.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth required sx={fieldSx}>
              <InputLabel>Do you have medical reports?</InputLabel>
              <Select
                label="Do you have medical reports?"
                value={reportStatus}
                onChange={(e) => setReportStatus(e.target.value)}
              >
                {QUALIFICATION_REPORT_OPTIONS.map((o) => (
                  <MenuItem key={o.value} value={o.value}>
                    {o.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Anything else? (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              multiline
              minRows={2}
              sx={fieldSx}
            />
          </>
        )}

        {step === 2 && (
          <>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "#fff",
                border: `1px solid ${alpha(AF.ink, 0.1)}`,
              }}
            >
              <Typography sx={{ fontWeight: 700, mb: 1.25, fontSize: "0.9375rem" }}>
                Review your enquiry
              </Typography>
              {(
                [
                  ["Name", name],
                  ["Email", email],
                  ["WhatsApp", whatsapp],
                  ["Country", country + (city ? ` · ${city}` : "")],
                  ["Treatment", treatment || "Not sure yet"],
                  [
                    "Travel",
                    QUALIFICATION_TRAVEL_OPTIONS.find((o) => o.value === travelTimeline)?.label ??
                      travelTimeline,
                  ],
                  [
                    "Reports",
                    QUALIFICATION_REPORT_OPTIONS.find((o) => o.value === reportStatus)?.label ??
                      reportStatus,
                  ],
                ] as const
              ).map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                    py: 0.6,
                    borderBottom: `1px solid ${alpha(AF.ink, 0.06)}`,
                  }}
                >
                  <Typography sx={{ fontSize: "0.8125rem", color: AF.muted }}>{label}</Typography>
                  <Typography
                    sx={{
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      textAlign: "right",
                      maxWidth: "60%",
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  sx={{ color: AF.primary, "&.Mui-checked": { color: AF.primary } }}
                />
              }
              label={
                <Typography sx={{ fontSize: "0.8125rem", color: AF.text }}>
                  I agree to be contacted by email and WhatsApp about this enquiry.
                </Typography>
              }
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: AF.muted }}>
              <LockOutlinedIcon sx={{ fontSize: 14 }} />
              <Typography sx={{ fontSize: "0.7rem" }}>
                Your details are only used to prepare your estimate. No spam.
              </Typography>
            </Box>
          </>
        )}
      </Box>

      {/* Sticky footer actions */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          borderTop: `1px solid ${alpha(AF.ink, 0.08)}`,
          bgcolor: "#fff",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          {step > 0 && (
            <Button
              variant="outlined"
              onClick={goBack}
              disabled={isSubmitting}
              startIcon={<ArrowBackIcon />}
              sx={{
                flex: 1,
                py: 1.25,
                borderColor: alpha(AF.ink, 0.2),
                color: AF.text,
              }}
            >
              Back
            </Button>
          )}
          {step < 2 ? (
            <Button
              variant="contained"
              onClick={goNext}
              sx={{
                flex: 2,
                py: 1.25,
                fontWeight: 700,
                background: `linear-gradient(135deg, ${AF.gradientStart} 0%, ${AF.gradientEnd} 100%)`,
              }}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitting}
              sx={{
                flex: 2,
                py: 1.35,
                fontWeight: 700,
                fontSize: "0.95rem",
                background: `linear-gradient(135deg, ${AF.gradientStart} 0%, ${AF.gradientEnd} 100%)`,
                boxShadow: "0 8px 22px rgba(16, 185, 129, 0.3)",
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Send my enquiry"
              )}
            </Button>
          )}
        </Box>
        <RecaptchaNotice />
      </Box>
    </Drawer>
  );
}
