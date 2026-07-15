"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/contact";
import { NIGERIA_WHATSAPP_DEFAULT_MESSAGE } from "@/constants/nigeria";
import {
  trackAdsConversion,
  trackAfricaWhatsAppClick,
} from "@/lib/adsTracking";

interface WhatsAppFloatingButtonProps {
  /** Digits only or with country code; defaults to site WhatsApp number. */
  phoneNumber?: string;
  prefilledMessage?: string;
  /** GTM / Ads event_category. Defaults to Nigeria for backward compatibility. */
  eventCategory?: string;
}

/**
 * Floating WhatsApp CTA for ads market landing pages.
 * Africa uses `africa_whatsapp_click`; Nigeria keeps `whatsapp_click`.
 */
export function WhatsAppFloatingButton({
  phoneNumber,
  prefilledMessage = NIGERIA_WHATSAPP_DEFAULT_MESSAGE,
  eventCategory = "nigeria_lead_form",
}: WhatsAppFloatingButtonProps) {
  const number =
    phoneNumber?.replace(/\D/g, "") ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ||
    DEFAULT_WHATSAPP_NUMBER;

  const href = `https://wa.me/${number}?text=${encodeURIComponent(prefilledMessage)}`;

  const handleClick = () => {
    if (eventCategory === "africa_lead_form") {
      trackAfricaWhatsAppClick({ source: "floating_button" });
      return;
    }
    trackAdsConversion("whatsapp_click", { source: "floating_button" }, eventCategory);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        right: { xs: 16, md: 24 },
        bottom: { xs: 104, lg: 24 },
        zIndex: 1300,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            border: "2px solid #25D366",
            animation: "ngWaPulse 2s ease-out infinite",
            "@keyframes ngWaPulse": {
              "0%": { transform: "scale(0.85)", opacity: 0.7 },
              "100%": { transform: "scale(1.35)", opacity: 0 },
            },
          }}
        />
        <IconButton
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp about treatment cost in India"
          onClick={handleClick}
          sx={{
            position: "relative",
            width: 56,
            height: 56,
            bgcolor: "#25D366",
            color: "#fff",
            boxShadow: "0 4px 14px rgba(37, 211, 102, 0.45)",
            "&:hover": {
              bgcolor: "#1ebe57",
              transform: "scale(1.08)",
              boxShadow: "0 6px 20px rgba(37, 211, 102, 0.55)",
            },
          }}
        >
          <WhatsAppIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
