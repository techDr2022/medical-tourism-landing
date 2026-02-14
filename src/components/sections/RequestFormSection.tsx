"use client";

import { useState } from "react";
import { getRecaptchaToken } from "@/lib/recaptcha";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import { SectionContainer } from "../ui/SectionContainer";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#10b981";
const GREEN_700 = "#0d9488";

const BENEFITS = [
  "Hospital options",
  "Preliminary treatment estimate",
  "Video consultation scheduling",
  "Travel coordination guidance",
];

interface FormData {
  name: string;
  country: string;
  whatsapp: string;
  email: string;
  medicalCondition: string;
}

export function RequestFormSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    country: "",
    whatsapp: "",
    email: "",
    medicalCondition: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.includes(",") ? result.split(",")[1] : result;
        resolve(base64 ?? "");
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const MAX_FILE_SIZE_MB = 8;
  const MAX_FILE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      let recaptchaToken: string | undefined;
      if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        try {
          recaptchaToken = await getRecaptchaToken("submit");
        } catch {
          recaptchaToken = undefined;
        }
      }

      const filesWithContent: { name: string; content: string }[] = [];
      for (const file of files) {
        if (file.size > MAX_FILE_BYTES) {
          setSubmitStatus({
            type: "error",
            message: `"${file.name}" is too large. Max ${MAX_FILE_SIZE_MB}MB per file.`,
          });
          setIsSubmitting(false);
          return;
        }
        const content = await fileToBase64(file);
        filesWithContent.push({ name: file.name, content });
      }

      const formDataToSend = {
        ...formData,
        ...(filesWithContent.length > 0 && { files: filesWithContent }),
        ...(recaptchaToken && { recaptchaToken }),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Success
      setSubmitStatus({
        type: "success",
        message: "Thank you! We've received your inquiry and will respond within 24-48 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        country: "",
        whatsapp: "",
        email: "",
        medicalCondition: "",
      });
      setFiles([]);

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SectionContainer id="contact">
      <Grid container spacing={6} alignItems="center">
        <Grid size={{ xs: 12, lg: 5 }}>
          <Typography
            variant="overline"
            sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5 }}
          >
            Get Started
          </Typography>
          <Typography variant="h2" sx={{ mt: 1, mb: 2, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
            Start Your Medical Journey to India
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Submit your medical reports to receive:
          </Typography>
          <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
            {BENEFITS.map((item) => (
              <Box
                key={item}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 1.5,
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 22, color: GREEN_600, flexShrink: 0 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              color: "text.secondary",
              fontWeight: 500,
            }}
          >
            Our coordination team responds within 24–48 hours.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Box
            sx={{
              p: 4,
              borderRadius: 3,
              border: "1px solid",
              borderColor: alpha("#171717", 0.1),
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 244, 0.3) 100%)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              {submitStatus.type && (
                <Alert
                  severity={submitStatus.type}
                  sx={{
                    borderRadius: 2,
                    "& .MuiAlert-message": {
                      width: "100%",
                    },
                  }}
                  onClose={() => setSubmitStatus({ type: null, message: "" })}
                >
                  {submitStatus.message}
                </Alert>
              )}

              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    required
                    label="Full Name"
                    placeholder="Your full name"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleInputChange("name")}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    required
                    label="Country"
                    placeholder="Your country"
                    variant="outlined"
                    value={formData.country}
                    onChange={handleInputChange("country")}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    required
                    label="WhatsApp / Phone number"
                    placeholder="+254 700 000 000 or +91 98765 43210"
                    type="tel"
                    variant="outlined"
                    value={formData.whatsapp}
                    onChange={handleInputChange("whatsapp")}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    placeholder="your@email.com"
                    type="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    required
                    label="Medical Condition"
                    placeholder="Brief description of your medical condition"
                    multiline
                    rows={3}
                    variant="outlined"
                    value={formData.medicalCondition}
                    onChange={handleInputChange("medicalCondition")}
                    inputProps={{ style: { resize: "none" } }}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid size={12}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{ py: 2 }}
                    disabled={isSubmitting}
                  >
                    {files.length > 0
                      ? `${files.length} file(s) selected`
                      : "Upload Reports"}
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      multiple
                      onChange={handleFileChange}
                    />
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  disabled={isSubmitting}
                  sx={{
                    flex: 1,
                    background: `linear-gradient(135deg, ${GREEN_600} 0%, ${GREEN_700} 100%)`,
                    boxShadow: "0 4px 14px rgba(22, 163, 74, 0.4)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      background: `linear-gradient(135deg, ${GREEN_700} 0%, #0f766e 100%)`,
                      boxShadow: "0 6px 20px rgba(22, 163, 74, 0.5)",
                      transform: "translateY(-2px)",
                    },
                    "&:disabled": {
                      background: alpha(GREEN_600, 0.5),
                    },
                  }}
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {isSubmitting ? "Sending..." : "Request Treatment Estimate"}
                </Button>
                <Button
                  variant="outlined"
                  type="button"
                  size="large"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  sx={{
                    flex: 1,
                    borderColor: GREEN_600,
                    borderWidth: 2,
                    color: GREEN_600,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      borderColor: GREEN_700,
                      color: GREEN_700,
                      backgroundColor: alpha(GREEN_600, 0.08),
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(22, 163, 74, 0.2)",
                    },
                    "&:disabled": {
                      borderColor: alpha(GREEN_600, 0.3),
                      color: alpha(GREEN_600, 0.3),
                    },
                  }}
                >
                  Speak to Our Coordinator
                </Button>
              </Box>
              <Typography variant="caption" color="text.disabled" sx={{ textAlign: "center" }}>
                Your medical details remain confidential.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </SectionContainer>
  );
}
