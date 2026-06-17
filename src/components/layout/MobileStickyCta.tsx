"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import { alpha } from "@mui/material/styles";

interface MobileStickyCtaProps {
  label: string;
  href?: string;
}

export function MobileStickyCta({ label, href = "/lead-form" }: MobileStickyCtaProps) {
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
        pointerEvents: "none",
        "& > *": {
          pointerEvents: "auto",
        },
      }}
    >
      <Button
        component={Link}
        href={href}
        variant="contained"
        fullWidth
        sx={{ py: 1.5 }}
      >
        {label}
      </Button>
    </Box>
  );
}
