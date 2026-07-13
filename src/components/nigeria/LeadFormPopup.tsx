"use client";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { alpha } from "@mui/material/styles";
import { LeadFormMultiStep } from "./LeadFormMultiStep";

interface LeadFormPopupProps {
  open: boolean;
  onClose: () => void;
  initialTreatment?: string;
}

/** Dialog wrapper for the Nigeria multi-step qualifying form. */
export function LeadFormPopup({ open, onClose, initialTreatment = "" }: LeadFormPopupProps) {
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
          boxShadow: "0 24px 48px rgba(0, 0, 0, 0.15)",
          overflow: "hidden",
          m: { xs: 1.5, sm: 2 },
          maxHeight: { xs: "calc(100% - 24px)", sm: "90vh" },
        },
      }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)" },
        },
      }}
    >
      <IconButton
        aria-label="Close form"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          zIndex: 2,
          color: "text.secondary",
          bgcolor: alpha("#fff", 0.9),
          "&:hover": { color: "#171717", bgcolor: alpha("#171717", 0.06) },
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ p: { xs: 1.5, sm: 2 }, pt: { xs: 5, sm: 2.5 } }}>
        <LeadFormMultiStep
          key={initialTreatment || "popup-default"}
          initialTreatment={initialTreatment}
          variant="embedded"
        />
      </DialogContent>
    </Dialog>
  );
}
