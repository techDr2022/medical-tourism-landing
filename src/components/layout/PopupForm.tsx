"use client";

import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { getRecaptchaToken } from "@/lib/recaptcha";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#10b981";
const GREEN_700 = "#0d9488";

interface FormData {
  name: string;
  country: string;
  whatsapp: string;
  email: string;
  medicalCondition: string;
}

interface PopupFormProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export function PopupForm({ open, onClose, title = "Request a Treatment Estimate" }: PopupFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    country: "",
    whatsapp: "",
    email: "",
    medicalCondition: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (submitStatus.type) setSubmitStatus({ type: null, message: "" });
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setSubmitStatus({ type: null, message: "" });
      setFormData({ name: "", country: "", whatsapp: "", email: "", medicalCondition: "" });
      onClose();
    }
  };

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
          // Proceed without token so form still works if reCAPTCHA misconfigured or script fails
          recaptchaToken = undefined;
        }
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          files: [],
          ...(recaptchaToken && { recaptchaToken }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you! We've received your inquiry and will respond within 24–48 hours.",
      });
      setFormData({ name: "", country: "", whatsapp: "", email: "", medicalCondition: "" });

      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
        handleClose();
      }, 2500);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 24px 48px rgba(0, 0, 0, 0.15)",
          overflow: "hidden",
        },
      }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)" },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: "1.25rem",
          color: "#171717",
          borderBottom: `1px solid ${alpha("#171717", 0.08)}`,
          py: 2,
          pr: 6,
        }}
      >
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        disabled={isSubmitting}
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
          color: "text.secondary",
          "&:hover": { color: "#171717", bgcolor: alpha("#171717", 0.06) },
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ pt: 3, pb: 3, px: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {submitStatus.type && (
            <Alert
              severity={submitStatus.type}
              onClose={() => setSubmitStatus({ type: null, message: "" })}
              sx={{ borderRadius: 2 }}
            >
              {submitStatus.message}
            </Alert>
          )}

          <TextField
            fullWidth
            required
            label="Full Name"
            placeholder="Your full name"
            variant="outlined"
            size="small"
            value={formData.name}
            onChange={handleInputChange("name")}
            disabled={isSubmitting}
          />
          <TextField
            fullWidth
            required
            label="Country"
            placeholder="Your country"
            variant="outlined"
            size="small"
            value={formData.country}
            onChange={handleInputChange("country")}
            disabled={isSubmitting}
          />
          <TextField
            fullWidth
            required
            label="WhatsApp / Phone number"
            placeholder="+254 700 000 000 or +91 98765 43210"
            type="tel"
            variant="outlined"
            size="small"
            value={formData.whatsapp}
            onChange={handleInputChange("whatsapp")}
            disabled={isSubmitting}
          />
          <TextField
            fullWidth
            required
            label="Email"
            placeholder="your@email.com"
            type="email"
            variant="outlined"
            size="small"
            value={formData.email}
            onChange={handleInputChange("email")}
            disabled={isSubmitting}
          />
          <TextField
            fullWidth
            required
            label="Medical Condition"
            placeholder="Brief description of your medical condition"
            multiline
            rows={3}
            variant="outlined"
            size="small"
            value={formData.medicalCondition}
            onChange={handleInputChange("medicalCondition")}
            disabled={isSubmitting}
            inputProps={{ style: { resize: "none" } }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isSubmitting}
            sx={{
              mt: 1,
              py: 1.5,
              background: `linear-gradient(135deg, ${GREEN_600} 0%, ${GREEN_700} 100%)`,
              boxShadow: "0 4px 14px rgba(22, 163, 74, 0.4)",
              "&:hover": {
                background: `linear-gradient(135deg, ${GREEN_700} 0%, #0f766e 100%)`,
                boxShadow: "0 6px 20px rgba(22, 163, 74, 0.5)",
              },
              "&:disabled": { background: alpha(GREEN_600, 0.5) },
            }}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : undefined}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>

          <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
            Your details remain confidential. We respond within 24–48 hours.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
