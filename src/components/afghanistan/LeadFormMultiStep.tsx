"use client";

import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
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
  AFGHANISTAN_CITIES,
  AFGHANISTAN_WHATSAPP_PREFIXES,
  BUDGET_BANDS,
  PATIENT_RELATION_OPTIONS,
  REPORT_STATUS_OPTIONS,
  TREATMENT_OPTIONS,
  leadIntentScoreFromReportStatus,
  type AfghanistanWhatsAppPrefix,
  type BudgetBand,
  type TreatmentOption,
} from "@/constants/afghanistan";
import { getUtmParamsFromUrl, trackAdsConversion } from "@/lib/adsTracking";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/contact";
import { MAX_FILE_BYTES } from "@/lib/fileUpload";
import { validateName } from "@/lib/formValidation";
import {
  buildWhatsAppHospitalOptionsUrl,
  filesToPayload,
  normalizeWhatsAppWithPrefix,
  submitLead,
} from "@/lib/afghanistanLeadSubmit";

import { AF, afCtaSx } from "@/constants/afghanistanTheme";

const STEPS = ["Medical intent", "Logistics", "Contact"];
const ADS_EVENT_CATEGORY = "afghanistan_lead_form";
/** Afghanistan form allows up to 10MB per file (same as Nigeria). */
const AFGHANISTAN_MAX_FILE_BYTES = 10 * 1024 * 1024;

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
  const [whatsappPrefix, setWhatsappPrefix] =
    useState<AfghanistanWhatsAppPrefix>("+93");
  const [whatsappLocal, setWhatsappLocal] = useState("");
  const [consent, setConsent] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      if (!city) return "Please select your city in Afghanistan.";
      if (!budgetBand) return "Please select an approximate budget band.";
      return null;
    }
    const nameError = validateName(fullName);
    if (nameError) return nameError;
    if (!fullName.trim()) return "Please enter your full name.";
    if (!normalizeWhatsAppWithPrefix(whatsappPrefix, whatsappLocal)) {
      return "Enter a valid WhatsApp number for the selected country code.";
    }
    if (!consent) {
      return "Please agree to be contacted via WhatsApp/call to continue.";
    }
    for (const file of files) {
      if (file.size > AFGHANISTAN_MAX_FILE_BYTES) {
        return `"${file.name}" exceeds 10MB. Please upload a smaller file.`;
      }
      if (file.size > MAX_FILE_BYTES && MAX_FILE_BYTES < AFGHANISTAN_MAX_FILE_BYTES) {
        // contact API may still accept; keep Afghanistan UX at 10MB as specified
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
      trackAdsConversion(
        "form_start",
        { treatment, lead_intent_score: intentScore },
        ADS_EVENT_CATEGORY
      );
    }

    setActiveStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setError(null);
    setActiveStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateStep(2);
    if (validationError) {
      setError(validationError);
      return;
    }

    const whatsapp = normalizeWhatsAppWithPrefix(whatsappPrefix, whatsappLocal);
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
        whatsapp_prefix: whatsappPrefix,
        treatment,
        treatmentOther: treatment === "Other" ? treatmentOther.trim() : undefined,
        reportStatus,
        lead_intent_score: intentScore,
        patientFor,
        city,
        budget_band: budgetBand,
        consent,
        ...utm,
        source_page: "/afghanistan",
        files: filePayload,
      });

      trackAdsConversion(
        "form_submit",
        {
          treatment: treatmentLabel,
          budget_band: budgetBand,
          lead_intent_score: intentScore,
        },
        ADS_EVENT_CATEGORY
      );

      const businessNumber =
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || DEFAULT_WHATSAPP_NUMBER;

      window.location.assign(
        buildWhatsAppHospitalOptionsUrl(businessNumber, treatmentLabel, budgetBand)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      id="lead-form"
      component="form"
      onSubmit={handleSubmit}
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
        sx={{
          fontSize: { xs: "1.125rem", md: "1.25rem" },
          fontWeight: 700,
          mb: 0.5,
          color: AF.text,
        }}
      >
        Get your 3 hospital options
      </Typography>
      <Typography sx={{ mb: 2.5, color: AF.muted, fontSize: "0.9375rem" }}>
        3 short steps — we prioritize patients who already have reports or a diagnosis.
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

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
            <InputLabel id="af-treatment-label">Treatment needed</InputLabel>
            <Select
              labelId="af-treatment-label"
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
                  label={
                    opt.value === "reports_ready"
                      ? "Yes, reports ready"
                      : opt.value === "no_diagnosis"
                        ? "Still consulting a doctor"
                        : opt.label
                  }
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
                <FormControlLabel
                  key={opt}
                  value={opt}
                  control={<Radio />}
                  label={
                    opt === "Myself"
                      ? "Myself"
                      : opt === "My Parent"
                        ? "Parent"
                        : opt === "My Spouse"
                          ? "Spouse"
                          : opt === "My Child"
                            ? "Child"
                            : "Other family"
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel id="af-city-label">Your city in Afghanistan</InputLabel>
            <Select
              labelId="af-city-label"
              label="Your city in Afghanistan"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {AFGHANISTAN_CITIES.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel id="af-budget-label">Approximate budget available</InputLabel>
            <Select
              labelId="af-budget-label"
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
            <Typography
              variant="caption"
              sx={{ mt: 1, color: alpha("#171717", 0.6), lineHeight: 1.5 }}
            >
              We use this to match you with 3 suitable hospital options — not shared with
              hospitals until you choose.
            </Typography>
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

          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { sm: "flex-start" },
            }}
          >
            <FormControl sx={{ minWidth: { xs: "100%", sm: 180 } }} required>
              <InputLabel id="af-prefix-label">Country code</InputLabel>
              <Select
                labelId="af-prefix-label"
                label="Country code"
                value={whatsappPrefix}
                onChange={(e) =>
                  setWhatsappPrefix(e.target.value as AfghanistanWhatsAppPrefix)
                }
              >
                {AFGHANISTAN_WHATSAPP_PREFIXES.map((p) => (
                  <MenuItem key={p.code} value={p.code}>
                    {p.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="WhatsApp number"
              value={whatsappLocal}
              onChange={(e) => {
                const next = e.target.value.replace(/[^\d\s]/g, "");
                setWhatsappLocal(next);
              }}
              fullWidth
              required
              placeholder="70 123 4567"
              helperText="Default Afghanistan (+93). Switch if you use a Pakistan, Iran, or other WhatsApp number."
              inputProps={{ inputMode: "tel", "aria-label": "WhatsApp number" }}
            />
          </Box>

          <MedicalFileUpload
            files={files}
            onChange={setFiles}
            disabled={isSubmitting}
            buttonLabel="Upload medical report / diagnosis (optional but speeds up matching)"
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
          <Button type="button" variant="contained" onClick={handleNext} sx={afCtaSx}>
            Continue
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : null}
            sx={afCtaSx}
          >
            {isSubmitting ? "Submitting…" : "Get My Hospital Options"}
          </Button>
        )}
      </Box>

      {intentScore === "low" && activeStep >= 0 && reportStatus === "researching" && (
        <Typography
          variant="caption"
          sx={{ display: "block", mt: 2, color: AF.primary }}
        >
          You can still get hospital options — sharing reports later will speed up precise matching.
        </Typography>
      )}
    </Box>
  );
}
