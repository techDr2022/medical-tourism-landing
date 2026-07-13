"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import { alpha } from "@mui/material/styles";
import {
  formatMoney,
  type CurrencyMode,
  type NigeriaTreatmentCard,
} from "@/constants/nigeria";

const GREEN_600 = "#1c7c7f";
const GREEN_700 = "#0d9488";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";

/** Shared shape for Nigeria / Afghanistan (and future market) treatment cards. */
export type TreatmentCardData = Pick<
  NigeriaTreatmentCard,
  "id" | "title" | "description" | "startingFromUsd" | "formTreatmentValue" | "iconSrc"
>;

interface TreatmentCardProps {
  treatment: TreatmentCardData;
  /** Defaults to USD when omitted (Afghanistan page is USD-only). */
  currency?: CurrencyMode;
  onGetQuote: (treatmentValue: string) => void;
}

export function TreatmentCard({
  treatment,
  currency = "USD",
  onGetQuote,
}: TreatmentCardProps) {
  return (
    <Box
      sx={{
        height: "100%",
        p: 3,
        borderRadius: 3,
        border: `1px solid ${alpha("#171717", 0.1)}`,
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 244, 0.35) 100%)",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          borderColor: alpha(GREEN_600, 0.35),
          boxShadow: "0 8px 24px rgba(22, 163, 74, 0.12)",
        },
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: alpha(GREEN_600, 0.1),
          color: GREEN_600,
          flexShrink: 0,
        }}
      >
        {treatment.iconSrc ? (
          <Box
            component="img"
            src={treatment.iconSrc}
            alt=""
            aria-hidden
            sx={{ width: 36, height: 36, objectFit: "contain", display: "block" }}
          />
        ) : (
          <PsychologyOutlinedIcon sx={{ fontSize: 32 }} />
        )}
      </Box>

      <Typography sx={{ fontWeight: 700, fontSize: "1.0625rem", color: "#171717" }}>
        {treatment.title}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: alpha("#171717", 0.72), lineHeight: 1.55, flexGrow: 1 }}
      >
        {treatment.description}
      </Typography>

      <Typography sx={{ fontWeight: 700, color: GREEN_600, fontSize: "0.9375rem" }}>
        Starting from {formatMoney(treatment.startingFromUsd, currency)}
        {currency === "NGN" ? (
          <Typography component="span" variant="caption" sx={{ ml: 0.75, color: alpha("#171717", 0.5) }}>
            (approx.)
          </Typography>
        ) : null}
      </Typography>

      <Button
        variant="contained"
        onClick={() => onGetQuote(treatment.formTreatmentValue)}
        sx={{
          mt: 0.5,
          alignSelf: "flex-start",
          background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
          "&:hover": {
            background: `linear-gradient(135deg, ${GREEN_700} 0%, #0f766e 100%)`,
          },
        }}
      >
        Get Exact Quote
      </Button>
    </Box>
  );
}
