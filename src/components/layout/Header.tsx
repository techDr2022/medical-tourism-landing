"use client";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";

interface HeaderProps {
  onCtaClick: () => void;
}

const GREEN_600 = "#1c7c7f";
const GREEN_700 = "#0d9488";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";

const NAV_ITEMS = [
  { label: "Why India", id: "why-india" },
  { label: "Hospitals", id: "hospitals" },
  { label: "Services", id: "services" },
  { label: "Pricing", id: "pricing" },
  { label: "Process", id: "process" },
  { label: "Contact", id: "contact" },
];

export function Header({ onCtaClick }: HeaderProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <Box
      component="header"
      className="sticky-header"
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 1100,
        backgroundColor: "transparent",
        display: "block",
      }}
      sx={{
        position: "sticky",
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
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${alpha("#171717", 0.08)}`,
          color: "#171717",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
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
            mr: { xs: 2, md: 4 },
          }}
        >
          <Box
            component="img"
            src="/logos/new-logo.png"
            alt="Medical Tours India"
            sx={{
              height: { xs: 32, md: 38 },
              width: "auto",
              display: "block",
            }}
          />
        </Link>

        {/* Navigation Links */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            gap: 3,
            justifyContent: "center",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <Box
              key={item.id}
              component="button"
              onClick={() => scrollToSection(item.id)}
              sx={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: alpha("#171717", 0.7),
                fontSize: "0.9375rem",
                fontWeight: 500,
                transition: "color 0.2s ease",
                padding: 0,
                "&:hover": {
                  color: GREEN_600,
                },
              }}
            >
              {item.label}
            </Box>
          ))}
        </Box>

        {/* CTA Buttons – pushed to right corner */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            alignItems: "center",
            marginLeft: "auto",
            flexShrink: 0,
          }}
        >
          {/* Mobile: single form CTA, right-aligned */}
          <Button
            variant="contained"
            size="small"
            onClick={onCtaClick}
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
            Request Estimate
          </Button>
          {/* Desktop: full CTAs */}
          <Button
            variant="outlined"
            onClick={onCtaClick}
            sx={{
              display: { xs: "none", lg: "inline-flex" },
              borderColor: alpha("#171717", 0.2),
              color: "#171717",
              "&:hover": {
                borderColor: GREEN_600,
                backgroundColor: alpha(GREEN_600, 0.05),
              },
            }}
          >
            Talk to Expert
          </Button>
          <Button
            variant="contained"
            onClick={onCtaClick}
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
            Get Free Consultation
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
    </Box>
  );
}
