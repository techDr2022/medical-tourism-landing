"use client";

import { useEffect, useRef, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { MedicalFileUpload } from "@/components/ui/MedicalFileUpload";
import {
  BUDGET_BANDS,
  NIGERIA_CITIES,
  PATIENT_RELATION_OPTIONS,
  REPORT_STATUS_OPTIONS,
  TREATMENT_OPTIONS,
  leadIntentScoreFromReportStatus,
  type BudgetBand,
  type TreatmentOption,
} from "@/constants/nigeria";
import {
  getUtmParamsFromUrl,
  trackAdsConversion,
  trackLeadSubmitAndWait,
} from "@/lib/adsTracking";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/contact";
import { MAX_FILE_BYTES } from "@/lib/fileUpload";
import { validateName } from "@/lib/formValidation";
import {
  buildWhatsAppEstimateUrl,
  filesToPayload,
  normalizeNigerianWhatsApp,
  submitLead,
} from "@/lib/nigeriaLeadSubmit";

const GREEN_600 = "#1c7c7f";
const GREEN_700 = "#0d9488";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";
const STEPS = ["Medical intent", "Logistics", "Contact"];
/** Nigeria form allows up to 10MB per file (stricter than global 5MB helper message). */
const NIGERIA_MAX_FILE_BYTES = 10 * 1024 * 1024;

export interface LeadFormMultiStepProps {
  /** Pre-select treatment (from TreatmentCard / query param). */
  initialTreatment?: string;
  onStepChange?: (step: number) => void;
  /** `embedded` = no card chrome (for dialog). Default = standalone card. */
  variant?: "card" | "embedded";
}

export function LeadFormMultiStep({
  initialTreatment = "",
  onStepChange,
  variant = "card",
}: LeadFormMultiStepProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [treatment, setTreatment] = useState<TreatmentOption | "">("");
  const [treatmentOther, setTreatmentOther] = useState("");
  const [reportStatus, setReportStatus] = useState("");
  const [patientFor, setPatientFor] = useState("");
  const [city, setCity] = useState("");
  const [budgetBand, setBudgetBand] = useState<BudgetBand | "">("");
  const [fullName, setFullName] = useState("");
  const [whatsappLocal, setWhatsappLocal] = useState("");
  const [consent, setConsent] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** Prevents a second conversion push if submit is invoked twice before redirect. */
  const leadSubmitFiredRef = useRef(false);

  const [utm, setUtm] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });

  useEffect(() => {
    setUtm(getUtmParamsFromUrl());
  }, []);

  useEffect(() => {
    if (!initialTreatment) return;
    const match = TREATMENT_OPTIONS.find(
      (t) => t.toLowerCase() === initialTreatment.toLowerCase()
    );
    if (match) {
      setTreatment(match);
      return;
    }
    // Fuzzy: "cardiac" → Cardiac Surgery, etc.
    const fuzzy = TREATMENT_OPTIONS.find((t) =>
      t.toLowerCase().includes(initialTreatment.toLowerCase())
    );
    if (fuzzy) setTreatment(fuzzy);
  }, [initialTreatment]);

  useEffect(() => {
    onStepChange?.(activeStep);
  }, [activeStep, onStepChange]);

  const intentScore = leadIntentScoreFromReportStatus(
    reportStatus as (typeof REPORT_STATUS_OPTIONS)[number]["value"] | ""
  );

  const validateStep = (step: number): string | null => {
    if (step === 0) {
      if (!treatment) return "Please select the treatment you need.";
      if (treatment === "Other" && !treatmentOther.trim()) {
        return "Please specify the treatment you need.";
      }
      if (!reportStatus) return "Please tell us about your medical reports / diagnosis.";
      return null;
    }
    if (step === 1) {
      if (!patientFor) return "Please tell us who this treatment is for.";
      if (!city) return "Please select your city in Nigeria.";
      if (!budgetBand) return "Please select an approximate budget band.";
      return null;
    }
    const nameError = validateName(fullName);
    if (nameError) return nameError;
    if (!fullName.trim()) return "Please enter your full name.";
    if (!normalizeNigerianWhatsApp(`+234${whatsappLocal}`)) {
      return "Enter a valid Nigerian WhatsApp number (e.g. 801 234 5678).";
    }
    if (!consent) {
      return "Please agree to be contacted via WhatsApp/call to continue.";
    }
    for (const file of files) {
      if (file.size > NIGERIA_MAX_FILE_BYTES) {
        return `"${file.name}" exceeds 10MB. Please upload a smaller file.`;
      }
      // Also respect API ceiling if lower
      if (file.size > MAX_FILE_BYTES && MAX_FILE_BYTES < NIGERIA_MAX_FILE_BYTES) {
        // contact API may still accept; keep Nigeria UX at 10MB as specified
      }
    }
    return null;
  };

  const handleNext = () => {
    const validationError = validateStep(activeStep);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);

    if (activeStep === 0) {
      trackAdsConversion("form_start", {
        treatment,
        lead_intent_score: intentScore,
      });
    }

    setActiveStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setError(null);
    setActiveStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    if (isSubmitting || leadSubmitFiredRef.current) return;

    const validationError = validateStep(2);
    if (validationError) {
      setError(validationError);
      return;
    }

    const whatsapp = normalizeNigerianWhatsApp(`+234${whatsappLocal}`);
    if (!whatsapp || !intentScore || !budgetBand || !treatment) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const treatmentLabel =
        treatment === "Other" ? `Other: ${treatmentOther.trim()}` : treatment;

      const filePayload = await filesToPayload(files);

      await submitLead({
        fullName: fullName.trim(),
        whatsapp,
        treatment,
        treatmentOther: treatment === "Other" ? treatmentOther.trim() : undefined,
        reportStatus,
        lead_intent_score: intentScore,
        patientFor,
        city,
        budget_band: budgetBand,
        consent,
        ...utm,
        source_page: "/nigeria",
        files: filePayload,
      });

      // One conversion event after successful save, then brief wait so GTM can
      // fire Ads tags before WhatsApp navigation unloads the page.
      const businessNumber =
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || DEFAULT_WHATSAPP_NUMBER;
      const whatsappUrl = buildWhatsAppEstimateUrl(
        businessNumber,
        treatmentLabel,
        budgetBand
      );

      if (!leadSubmitFiredRef.current) {
        leadSubmitFiredRef.current = true;
        await trackLeadSubmitAndWait();
      }

      window.location.assign(whatsappUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      id="lead-form"
      role="form"
      aria-label="Treatment cost estimate request"
      sx={
        variant === "embedded"
          ? { p: 0, backgroundColor: "transparent" }
          : {
              p: { xs: 2.5, md: 3.5 },
              borderRadius: 3,
              backgroundColor: "#ffffff",
              border: `1px solid ${alpha("#171717", 0.1)}`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }
      }
    >
      <Typography
        component="h2"
        sx={{ fontSize: { xs: "1.125rem", md: "1.25rem" }, fontWeight: 700, mb: 0.5, color: "#171717" }}
      >
        Get your written cost estimate
      </Typography>
      <Typography variant="body2" sx={{ mb: 2.5, color: alpha("#171717", 0.7) }}>
        3 short steps — we prioritize patients who already have reports or a diagnosis.
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Hidden CRM fields */}
      <input type="hidden" name="lead_intent_score" value={intentScore} />
      <input type="hidden" name="budget_band" value={budgetBand} />
      <input type="hidden" name="utm_source" value={utm.utm_source} />
      <input type="hidden" name="utm_medium" value={utm.utm_medium} />
      <input type="hidden" name="utm_campaign" value={utm.utm_campaign} />
      <input type="hidden" name="utm_term" value={utm.utm_term} />
      <input type="hidden" name="utm_content" value={utm.utm_content} />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {activeStep === 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <FormControl fullWidth required>
            <InputLabel id="treatment-label">Treatment needed</InputLabel>
            <Select
              labelId="treatment-label"
              label="Treatment needed"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value as TreatmentOption)}
            >
              {TREATMENT_OPTIONS.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {treatment === "Other" && (
            <TextField
              label="Please specify"
              value={treatmentOther}
              onChange={(e) => setTreatmentOther(e.target.value)}
              fullWidth
              required
            />
          )}

          <FormControl component="fieldset" required>
            <FormLabel sx={{ mb: 1, color: "#171717", fontWeight: 600, fontSize: "0.875rem" }}>
              Do you have medical reports or a diagnosis already?
            </FormLabel>
            <RadioGroup
              value={reportStatus}
              onChange={(e) => setReportStatus(e.target.value)}
            >
              {REPORT_STATUS_OPTIONS.map((opt) => (
                <FormControlLabel
                  key={opt.value}
                  value={opt.value}
                  control={<Radio />}
                  label={opt.label}
                  sx={{ alignItems: "flex-start", mb: 0.5 }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      )}

      {activeStep === 1 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <FormControl component="fieldset" required>
            <FormLabel sx={{ mb: 1, color: "#171717", fontWeight: 600, fontSize: "0.875rem" }}>
              Who is this treatment for?
            </FormLabel>
            <RadioGroup
              value={patientFor}
              onChange={(e) => setPatientFor(e.target.value)}
            >
              {PATIENT_RELATION_OPTIONS.map((opt) => (
                <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel id="city-label">Your city in Nigeria</InputLabel>
            <Select
              labelId="city-label"
              label="Your city in Nigeria"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {NIGERIA_CITIES.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel id="budget-label">Approximate budget available</InputLabel>
            <Select
              labelId="budget-label"
              label="Approximate budget available"
              value={budgetBand}
              onChange={(e) => setBudgetBand(e.target.value as BudgetBand)}
            >
              {BUDGET_BANDS.map((b) => (
                <MenuItem key={b} value={b}>
                  {b}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {activeStep === 2 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            label="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
            required
            autoComplete="name"
          />

          <TextField
            label="WhatsApp number"
            value={whatsappLocal}
            onChange={(e) => {
              const next = e.target.value.replace(/[^\d\s]/g, "");
              setWhatsappLocal(next);
            }}
            fullWidth
            required
            placeholder="801 234 5678"
            helperText="Nigerian mobile number — WhatsApp preferred"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography sx={{ fontWeight: 600, color: "#171717" }}>+234</Typography>
                </InputAdornment>
              ),
            }}
            inputProps={{ inputMode: "tel", "aria-label": "WhatsApp number with +234 prefix" }}
          />

          <MedicalFileUpload
            files={files}
            onChange={setFiles}
            disabled={isSubmitting}
            buttonLabel="Upload medical report / diagnosis (optional but speeds up your quote)"
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: -1 }}>
            PDF, JPG, or PNG — max 10MB per file.
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
              />
            }
            label="I agree to be contacted via WhatsApp/call regarding my treatment inquiry"
            sx={{ alignItems: "flex-start", "& .MuiFormControlLabel-label": { fontSize: "0.875rem" } }}
          />
        </Box>
      )}

      <Box
        sx={{
          mt: 3,
          display: "flex",
          gap: 1.5,
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: "space-between",
        }}
      >
        <Button
          type="button"
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0 || isSubmitting}
          sx={{ visibility: activeStep === 0 ? "hidden" : "visible" }}
        >
          Back
        </Button>

        {activeStep < STEPS.length - 1 ? (
          <Button
            type="button"
            variant="contained"
            onClick={handleNext}
            sx={{
              background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
              "&:hover": {
                background: `linear-gradient(135deg, ${GREEN_700} 0%, #0f766e 100%)`,
              },
            }}
          >
            Continue
          </Button>
        ) : (
          <Button
            type="button"
            variant="contained"
            disabled={isSubmitting}
            onClick={() => void handleSubmit()}
            startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : null}
            sx={{
              background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
              "&:hover": {
                background: `linear-gradient(135deg, ${GREEN_700} 0%, #0f766e 100%)`,
              },
            }}
          >
            {isSubmitting ? "Submitting…" : "Get My Cost Estimate"}
          </Button>
        )}
      </Box>

      {intentScore === "low" && activeStep >= 0 && reportStatus === "researching" && (
        <Typography
          variant="caption"
          sx={{ display: "block", mt: 2, color: alpha(GREEN_600, 0.9) }}
        >
          You can still get an estimate — sharing reports later will speed up a precise quote.
        </Typography>
      )}
    </Box>
  );
}
