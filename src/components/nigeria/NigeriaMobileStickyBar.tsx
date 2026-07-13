"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";

const GREEN_700 = "#0d9488";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";

interface NigeriaMobileStickyBarProps {
  label?: string;
  /** Show after this fraction of document scroll (0–1). Default 0.5 */
  showAfterScrollRatio?: number;
  onOpenForm?: () => void;
}

/** Mobile-only sticky CTA after ~50% scroll — opens the lead form popup. */
export function NigeriaMobileStickyBar({
  label = "Get My Cost Estimate",
  showAfterScrollRatio = 0.5,
  onOpenForm,
}: NigeriaMobileStickyBarProps) {
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
        borderColor: alpha("#171717", 0.08),
        zIndex: 1200,
        display: { xs: "block", lg: "none" },
      }}
    >
      <Button
        variant="contained"
        fullWidth
        onClick={onOpenForm}
        sx={{
          py: 1.5,
          background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
          "&:hover": {
            background: `linear-gradient(135deg, ${GREEN_700} 0%, #0f766e 100%)`,
          },
        }}
      >
        {label}
      </Button>
    </Box>
  );
}
