"use client";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { AfricaContactForm } from "./AfricaContactForm";
import { AF } from "@/constants/africaTheme";

interface AfricaSecondaryFormProps {
  open: boolean;
  onClose: () => void;
  initialTreatment?: string;
}

/** Dialog wrapper — Africa enquiry form emails via Resend. */
export function AfricaSecondaryForm({
  open,
  onClose,
  initialTreatment = "",
}: AfricaSecondaryFormProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      scroll="body"
      PaperProps={{
        sx: {
          borderRadius: 3,
          m: { xs: 1.5, sm: 2 },
          maxHeight: { xs: "calc(100% - 24px)", sm: "90vh" },
        },
      }}
    >
      <IconButton
        aria-label="Close form"
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8, zIndex: 2 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ p: { xs: 2.5, sm: 3 }, pt: { xs: 5, sm: 3 } }}>
        <Typography
          component="h2"
          sx={{
            mb: 0.5,
            fontFamily: AF.fontDisplay,
            fontSize: "1.25rem",
            fontWeight: 700,
          }}
        >
          Send your enquiry
        </Typography>
        <Typography sx={{ mb: 2.5, color: AF.muted, fontSize: "0.9375rem" }}>
          We&apos;ll email you back with transparent pricing and next steps.
        </Typography>
        <AfricaContactForm
          key={initialTreatment || "popup-default"}
          variant="embedded"
          initialTreatment={initialTreatment}
          onSuccess={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
