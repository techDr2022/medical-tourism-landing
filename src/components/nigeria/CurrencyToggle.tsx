"use client";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import type { CurrencyMode } from "@/constants/nigeria";

const GREEN_600 = "#1c7c7f";

interface CurrencyToggleProps {
  value: CurrencyMode;
  onChange: (currency: CurrencyMode) => void;
}

export function CurrencyToggle({ value, onChange }: CurrencyToggleProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
      <Typography variant="body2" sx={{ color: alpha("#171717", 0.65), fontSize: "0.8125rem" }}>
        Show prices in
      </Typography>
      <ToggleButtonGroup
        exclusive
        size="small"
        value={value}
        onChange={(_, next: CurrencyMode | null) => {
          if (next) onChange(next);
        }}
        aria-label="Currency toggle"
        sx={{
          "& .MuiToggleButton-root": {
            px: 1.5,
            py: 0.5,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.8125rem",
            borderColor: alpha("#171717", 0.15),
            "&.Mui-selected": {
              backgroundColor: alpha(GREEN_600, 0.12),
              color: GREEN_600,
              borderColor: alpha(GREEN_600, 0.4),
              "&:hover": { backgroundColor: alpha(GREEN_600, 0.18) },
            },
          },
        }}
      >
        <ToggleButton value="USD">USD</ToggleButton>
        <ToggleButton value="NGN">NGN (approx.)</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
