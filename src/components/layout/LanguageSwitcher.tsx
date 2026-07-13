"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "@/i18n/LanguageProvider";
import { getLocalesForPath, type LocaleCode } from "@/i18n/config";

interface LanguageSwitcherProps {
  /** Match header overlay hero styles */
  light?: boolean;
}

export function LanguageSwitcher({ light = false }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const { locale, setLocale, t } = useTranslation();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const orderedLocales = useMemo(() => getLocalesForPath(pathname), [pathname]);
  const current = orderedLocales.find((l) => l.code === locale) ?? orderedLocales[0];

  const marketHint = pathname?.startsWith("/nigeria")
    ? "Nigeria"
    : pathname?.startsWith("/afghanistan")
      ? "Afghanistan"
      : null;

  return (
    <>
      <Button
        size="small"
        aria-label={t("common.language")}
        aria-haspopup="listbox"
        aria-expanded={Boolean(anchor)}
        onClick={(e) => setAnchor(e.currentTarget)}
        startIcon={<LanguageIcon sx={{ fontSize: 18 }} />}
        endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 18 }} />}
        sx={{
          minWidth: 0,
          px: { xs: 1, sm: 1.25 },
          py: 0.75,
          fontSize: "0.8125rem",
          fontWeight: 600,
          textTransform: "none",
          color: light ? alpha("#fff", 0.92) : alpha("#171717", 0.75),
          border: `1px solid ${light ? alpha("#fff", 0.35) : alpha("#171717", 0.15)}`,
          borderRadius: 1.5,
          "&:hover": {
            backgroundColor: light ? alpha("#fff", 0.1) : alpha("#1c7c7f", 0.06),
            borderColor: light ? "#fff" : "#1c7c7f",
          },
        }}
      >
        <Box component="span">{current.shortLabel}</Box>
      </Button>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 200,
              borderRadius: 2,
              boxShadow: "0 8px 28px rgba(15, 23, 42, 0.14)",
            },
          },
        }}
      >
        {marketHint && (
          <Box sx={{ px: 2, pt: 1.25, pb: 0.5 }}>
            <Typography
              sx={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: alpha("#171717", 0.45),
              }}
            >
              {marketHint} languages
            </Typography>
          </Box>
        )}

        {orderedLocales.map((item, index) => {
          const showDivider =
            marketHint &&
            index > 0 &&
            ((marketHint === "Nigeria" &&
              item.code === "ar" &&
              orderedLocales[index - 1]?.code === "ig") ||
              (marketHint === "Afghanistan" &&
                item.code === "ar" &&
                orderedLocales[index - 1]?.code === "ps"));

          return (
            <Box key={item.code}>
              {showDivider && <Divider sx={{ my: 0.5 }} />}
              <MenuItem
                selected={item.code === locale}
                onClick={() => {
                  setLocale(item.code as LocaleCode);
                  setAnchor(null);
                }}
                sx={{ py: 1.1 }}
              >
                <Typography
                  sx={{ fontSize: "0.875rem", fontWeight: item.code === locale ? 700 : 500 }}
                >
                  {item.label}
                </Typography>
              </MenuItem>
            </Box>
          );
        })}
      </Menu>
    </>
  );
}
