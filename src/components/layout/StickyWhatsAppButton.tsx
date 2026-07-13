"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { alpha } from "@mui/material/styles";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/contact";
import { useTranslation } from "@/i18n/LanguageProvider";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || DEFAULT_WHATSAPP_NUMBER;

/** Sticky WhatsApp CTA with animated hint bubble. */
export function StickyWhatsAppButton() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const showTimer = window.setTimeout(() => setShowBubble(true), 1200);
    return () => window.clearTimeout(showTimer);
  }, []);

  // Ads market pages use WhatsAppFloatingButton with market-specific prefill + tracking
  if (pathname === "/nigeria" || pathname === "/afghanistan") {
    return null;
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t("common.whatsappDefaultMessage")
  )}`;

  return (
    <Box
      sx={{
        position: "fixed",
        right: { xs: 16, md: 24 },
        bottom: { xs: 104, lg: 24 },
        zIndex: 1300,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "flex-end",
        gap: 1.25,
      }}
    >
      {!dismissed && (
        <Box
          component="a"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setDismissed(true)}
          sx={{
            display: "block",
            position: "relative",
            maxWidth: { xs: 200, sm: 220 },
            px: { xs: 1.75, sm: 2 },
            py: { xs: 1.25, sm: 1.5 },
            borderRadius: 2.5,
            bgcolor: "#ffffff",
            color: "#171717",
            textDecoration: "none",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            border: `1px solid ${alpha("#25D366", 0.2)}`,
            opacity: showBubble ? 1 : 0,
            transform: showBubble ? "translateX(0)" : "translateX(12px)",
            transition: "opacity 0.45s ease, transform 0.45s ease",
            animation: showBubble ? "waBubbleFloat 3s ease-in-out infinite" : "none",
            "@keyframes waBubbleFloat": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-4px)" },
            },
            "&::after": {
              content: '""',
              position: "absolute",
              right: { xs: 18, sm: -6 },
              bottom: { xs: -6, sm: 14 },
              width: 12,
              height: 12,
              bgcolor: "#ffffff",
              borderRight: `1px solid ${alpha("#25D366", 0.2)}`,
              borderBottom: `1px solid ${alpha("#25D366", 0.2)}`,
              transform: { xs: "rotate(45deg)", sm: "rotate(-45deg)" },
            },
          }}
        >
          <IconButton
            size="small"
            aria-label="Dismiss WhatsApp message"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDismissed(true);
            }}
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              p: 0.25,
              color: alpha("#171717", 0.45),
              "&:hover": { color: "#171717", bgcolor: alpha("#171717", 0.06) },
            }}
          >
            <CloseIcon sx={{ fontSize: 14 }} />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              lineHeight: 1.4,
              pr: 2,
              fontSize: { xs: "0.75rem", sm: "0.8125rem" },
            }}
          >
            {t("common.whatsappBubble")}
          </Typography>
        </Box>
      )}

      <Box sx={{ position: "relative", flexShrink: 0 }}>
        <Box
          sx={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            border: "2px solid #25D366",
            animation: "waPulseRing 2s ease-out infinite",
            "@keyframes waPulseRing": {
              "0%": { transform: "scale(0.85)", opacity: 0.7 },
              "100%": { transform: "scale(1.35)", opacity: 0 },
            },
          }}
        />
        <IconButton
          component="a"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("common.whatsappAria")}
          sx={{
            position: "relative",
            width: 56,
            height: 56,
            bgcolor: "#25D366",
            color: "#fff",
            boxShadow: "0 4px 14px rgba(37, 211, 102, 0.45)",
            animation: "waButtonBounce 2.5s ease-in-out infinite",
            "@keyframes waButtonBounce": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-3px)" },
            },
            transition: "background-color 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              bgcolor: "#1ebe57",
              animation: "none",
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
