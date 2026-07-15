"use client";

import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
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
import { getUtmParamsFromUrl, trackAfricaLeadSubmit } from "@/lib/adsTracking";
import { submitAfricaLeadEmail } from "@/lib/africaLeadSubmit";
import { redirectToThankYou } from "@/lib/gclid";

interface AfricaContactFormProps {
  initialTreatment?: string;
  /** Compact card for dialog; default is page section. */
  variant?: "section" | "embedded";
  onSuccess?: () => void;
}

export function AfricaContactForm({
  initialTreatment = "",
  variant = "section",
  onSuccess,
}: AfricaContactFormProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
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
    if (initialTreatment) setTreatment(initialTreatment);
  }, [initialTreatment]);

  const cities = country
    ? [...(AFRICA_COUNTRY_META[country as keyof typeof AFRICA_COUNTRY_META]?.cities ?? []), "Other"]
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!whatsapp.trim()) {
      setError("Please enter your WhatsApp number with country code.");
      return;
    }
    if (!country) {
      setError("Please select your country.");
      return;
    }
    if (!consent) {
      setError("Please agree to be contacted about your enquiry.");
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
        recaptchaToken = await executeRecaptcha("africa_submit");
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

      trackAfricaLeadSubmit({
        source: variant === "embedded" ? "popup_form" : "page_form",
      });

      onSuccess?.();
      redirectToThankYou();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formBody = (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            disabled={isSubmitting}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            disabled={isSubmitting}
            placeholder="you@email.com"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="WhatsApp (with country code)"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            fullWidth
            required
            disabled={isSubmitting}
            placeholder="+234 801 234 5678"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth required disabled={isSubmitting}>
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
        </Grid>
        {cities.length > 0 && (
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth disabled={isSubmitting}>
              <InputLabel>City</InputLabel>
              <Select label="City" value={city} onChange={(e) => setCity(e.target.value)}>
                {cities.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth disabled={isSubmitting}>
            <InputLabel>Treatment</InputLabel>
            <Select
              label="Treatment"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
            >
              <MenuItem value="">Not sure yet</MenuItem>
              {QUALIFICATION_TREATMENTS.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth disabled={isSubmitting}>
            <InputLabel>Travel timeline</InputLabel>
            <Select
              label="Travel timeline"
              value={travelTimeline}
              onChange={(e) => setTravelTimeline(e.target.value)}
            >
              <MenuItem value="">Select</MenuItem>
              {QUALIFICATION_TRAVEL_OPTIONS.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth disabled={isSubmitting}>
            <InputLabel>Medical reports</InputLabel>
            <Select
              label="Medical reports"
              value={reportStatus}
              onChange={(e) => setReportStatus(e.target.value)}
            >
              <MenuItem value="">Select</MenuItem>
              {QUALIFICATION_REPORT_OPTIONS.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <TextField
            label="Anything else we should know? (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            multiline
            minRows={3}
            disabled={isSubmitting}
          />
        </Grid>
      </Grid>

      <FormControlLabel
        control={
          <Checkbox
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            disabled={isSubmitting}
            sx={{ color: AF.primary, "&.Mui-checked": { color: AF.primary } }}
          />
        }
        label="I agree to be contacted by email and WhatsApp about my treatment enquiry."
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isSubmitting}
        sx={{
          py: 1.4,
          fontWeight: 700,
          background: `linear-gradient(135deg, ${AF.gradientStart} 0%, ${AF.gradientEnd} 100%)`,
          "&:hover": {
            background: `linear-gradient(135deg, ${AF.primaryDark} 0%, #0f766e 100%)`,
          },
        }}
      >
        {isSubmitting ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Send enquiry"
        )}
      </Button>
      <RecaptchaNotice />
    </Box>
  );

  if (variant === "embedded") {
    return formBody;
  }

  return (
    <Box
      component="section"
      id="enquiry-form"
      aria-labelledby="africa-form-heading"
      sx={{
        py: { xs: 5, md: 7 },
        px: { xs: 2, sm: 3 },
        background: `linear-gradient(180deg, ${AF.softBg} 0%, #fff 100%)`,
      }}
    >
      <Box sx={{ maxWidth: 720, mx: "auto" }}>
        <Box sx={{ textAlign: "center", mb: 3.5 }}>
          <Typography
            variant="overline"
            sx={{ color: AF.primary, fontWeight: 600, letterSpacing: 1.5 }}
          >
            Get in touch
          </Typography>
          <Typography
            id="africa-form-heading"
            component="h2"
            sx={{
              mt: 1,
              mb: 1,
              fontFamily: AF.fontDisplay,
              fontSize: { xs: "1.5rem", md: "1.75rem" },
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Send your details — we&apos;ll email you back
          </Typography>
          <Typography sx={{ color: AF.muted, fontSize: "0.9375rem", maxWidth: 480, mx: "auto" }}>
            Share your treatment need and contact info. Our coordinator replies with
            transparent pricing and medical visa next steps.
          </Typography>
        </Box>

        <Box
          sx={{
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: 3,
            border: `1px solid ${alpha(AF.ink, 0.1)}`,
            backgroundColor: "#fff",
            boxShadow: "0 8px 28px rgba(11, 61, 63, 0.06)",
          }}
        >
          {formBody}
        </Box>
      </Box>
    </Box>
  );
}
