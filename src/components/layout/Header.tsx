"use client";

import NextLink from "next/link";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";

interface HeaderProps {
  onCtaClick: () => void;
}

const GREEN_600 = "#10b981";
const GREEN_700 = "#0d9488";

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
            gap: 0.5,
            mr: { xs: 2, md: 4 },
          }}
        >
          <Typography 
            variant="h6" 
            fontWeight={700}
            sx={{
              fontSize: { xs: "1.125rem", md: "1.25rem" },
            }}
          >
            Medical
            <Box component="span" sx={{ color: GREEN_600 }}>Tours</Box>
            <Box component="span" sx={{ color: GREEN_600, ml: 0.25 }}>India</Box>
          </Typography>
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
          <Link
            component={NextLink}
            href="/landing-page/kenya"
            underline="none"
            sx={{
              color: alpha("#171717", 0.7),
              fontSize: "0.9375rem",
              fontWeight: 500,
              transition: "color 0.2s ease",
              "&:hover": {
                color: GREEN_600,
              },
            }}
          >
            For Kenya
          </Link>
        </Box>

        {/* CTA Buttons */}
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
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
              background: `linear-gradient(135deg, ${GREEN_600} 0%, ${GREEN_700} 100%)`,
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
