"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { alpha } from "@mui/material/styles";
import { AFRICA_WHATSAPP_DEFAULT_MESSAGE } from "@/constants/africa";
import { AF } from "@/constants/africaTheme";
import { trackAfricaWhatsAppClick } from "@/lib/adsTracking";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/contact";

interface AfricaMobileStickyBarProps {
  showAfterScrollRatio?: number;
}

/** Mobile sticky bar — WhatsApp as primary conversion CTA. */
export function AfricaMobileStickyBar({
  showAfterScrollRatio = 0.35,
}: AfricaMobileStickyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setVisible(false);
        return;
      }
      setVisible(window.scrollY / scrollable >= showAfterScrollRatio);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterScrollRatio]);

  if (!visible) return null;

  const phone =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || DEFAULT_WHATSAPP_NUMBER;
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(AFRICA_WHATSAPP_DEFAULT_MESSAGE)}`;

  const handleClick = () => {
    trackAfricaWhatsAppClick({ source: "mobile_sticky_bar" });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        backgroundColor: alpha("#ffffff", 0.98),
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid",
        borderColor: alpha(AF.ink, 0.08),
        zIndex: 1200,
        display: { xs: "block", lg: "none" },
      }}
    >
      <Button
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        fullWidth
        startIcon={<WhatsAppIcon />}
        onClick={handleClick}
        sx={{
          py: 1.5,
          bgcolor: AF.whatsapp,
          "&:hover": { bgcolor: AF.whatsappHover },
        }}
      >
        Chat With Us on WhatsApp
      </Button>
    </Box>
  );
}
