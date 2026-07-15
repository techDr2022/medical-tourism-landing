"use client";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useTranslation } from "@/i18n/LanguageProvider";

interface HeaderProps {
  ctaHref?: string;
  /** When set, header CTAs open via click instead of navigating. */
  onCtaClick?: () => void;
  /** `overlay` = transparent bar for full-bleed heroes */
  variant?: "default" | "overlay";
}

const GREEN_600 = "#1c7c7f";
const GREEN_700 = "#0d9488";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";

export function Header({ ctaHref = "/lead-form", onCtaClick, variant = "default" }: HeaderProps) {
  const { t } = useTranslation();

  const navItems = [
    { label: t("common.nav.whyIndia"), id: "why-india" },
    { label: t("common.nav.hospitals"), id: "hospitals" },
    { label: t("common.nav.services"), id: "services" },
    { label: t("common.nav.pricing"), id: "pricing" },
    { label: t("common.nav.process"), id: "process" },
    { label: t("common.nav.contact"), id: "contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const ctaProps = onCtaClick
    ? { onClick: onCtaClick }
    : { component: NextLink, href: ctaHref };

  const isOverlay = variant === "overlay";

  return (
    <Box
      component="header"
      className="sticky-header"
      sx={{
        position: isOverlay ? "absolute" : "sticky",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 1100,
        backgroundColor: "transparent",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: isOverlay ? "transparent" : "rgba(255, 255, 255, 0.98)",
          backdropFilter: isOverlay ? "none" : "blur(20px)",
          WebkitBackdropFilter: isOverlay ? "none" : "blur(20px)",
          borderBottom: isOverlay
            ? `1px solid ${alpha("#fff", 0.12)}`
            : `1px solid ${alpha("#171717", 0.08)}`,
          color: isOverlay ? "#fff" : "#171717",
          boxShadow: isOverlay ? "none" : "0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1280,
            mx: "auto",
            width: "100%",
            px: { xs: 2, lg: 3 },
            minHeight: { xs: 64, lg: 80 },
          }}
        >
          <Link
            href="/"
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              mr: { xs: 1.5, md: 4 },
              ...(isOverlay && {
                filter: "brightness(0) invert(1)",
              }),
            }}
          >
            <Box
              component="img"
              src="/logos/new-logo.png"
              alt={t("common.brand")}
              sx={{
                height: { xs: 32, md: 38 },
                width: "auto",
                display: "block",
              }}
            />
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: 3,
              justifyContent: "center",
            }}
          >
            {navItems.map((item) => (
              <Box
                key={item.id}
                component="button"
                onClick={() => scrollToSection(item.id)}
                sx={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: isOverlay ? alpha("#fff", 0.82) : alpha("#171717", 0.7),
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  transition: "color 0.2s ease",
                  padding: 0,
                  "&:hover": {
                    color: isOverlay ? "#fff" : GREEN_600,
                  },
                }}
              >
                {item.label}
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, sm: 1.5 },
              alignItems: "center",
              marginLeft: "auto",
              flexShrink: 0,
            }}
          >
            <LanguageSwitcher light={isOverlay} />
            <Button
              {...ctaProps}
              variant="contained"
              size="small"
              sx={{
                display: { xs: "inline-flex", lg: "none" },
                px: { xs: 1.5, sm: 2 },
                py: 1,
                fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                fontWeight: 600,
                minWidth: 0,
                background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                boxShadow: "0 2px 8px rgba(22, 163, 74, 0.3)",
                "&:hover": {
                  background: `linear-gradient(135deg, ${GREEN_700} 0%, #0f766e 100%)`,
                  boxShadow: "0 4px 12px rgba(22, 163, 74, 0.4)",
                },
              }}
            >
              {t("common.cta.requestEstimate")}
            </Button>
            <Button
              {...ctaProps}
              variant="contained"
              sx={{
                display: { xs: "none", lg: "inline-flex" },
                background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
                "&:hover": {
                  background: `linear-gradient(135deg, ${GREEN_700} 0%, #0f766e 100%)`,
                  boxShadow: "0 6px 16px rgba(22, 163, 74, 0.4)",
                },
              }}
            >
              {t("common.cta.getFreeConsultation")}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
