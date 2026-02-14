"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";

interface MobileStickyCtaProps {
  onClick: () => void;
  label: string;
}

export function MobileStickyCta({ onClick, label }: MobileStickyCtaProps) {
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
        borderTop: "1px solid",
        borderColor: alpha("#171717", 0.08),
        zIndex: 1100,
        display: { xs: "block", lg: "none" },
      }}
    >
      <Button variant="contained" fullWidth onClick={onClick} sx={{ py: 1.5 }}>
        {label}
      </Button>
    </Box>
  );
}
