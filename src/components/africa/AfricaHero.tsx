"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { alpha } from "@mui/material/styles";
import { Header } from "@/components/layout/Header";
import {
  AFRICA_COUNTRIES_SERVED,
  AFRICA_HERO,
  type AfricaCountry,
} from "@/constants/africa";
import { AF } from "@/constants/africaTheme";

interface AfricaHeroProps {
  headline: string;
  targetCountry: AfricaCountry | null;
  whatsappHref: string;
  onWhatsAppClick: () => void;
  onOpenForm: () => void;
  onHeaderCta: () => void;
}

/**
 * Africa hero — white sticky nav, short photo strip, compact offer + WhatsApp CTA.
 * Sized so brand, headline, and primary CTA stay in the first viewport on short screens.
 */
export function AfricaHero({
  headline,
  targetCountry,
  whatsappHref,
  onWhatsAppClick,
  onOpenForm,
  onHeaderCta,
}: AfricaHeroProps) {
  const countryLine = targetCountry
    ? `Built for patients from ${targetCountry}`
    : AFRICA_COUNTRIES_SERVED.join(" · ");

  return (
    <>
      <Header onCtaClick={onHeaderCta} />

      <Box
        component="section"
        id="contact"
        sx={{ position: "relative", backgroundColor: "#fff" }}
      >
        {/* Short photographic strip */}
        <Box
          sx={{
            position: "relative",
            height: { xs: 100, sm: 140, md: 220 },
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src="/logos/banner.png"
            alt="African family with a doctor reviewing treatment options in India"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: { xs: "55% 24%", md: "48% 30%" },
              animation: "afHeroReveal 1s cubic-bezier(0.22, 1, 0.36, 1) both",
              "@keyframes afHeroReveal": {
                from: { opacity: 0.55, transform: "scale(1.04)" },
                to: { opacity: 1, transform: "scale(1)" },
              },
            }}
          />
        </Box>

        {/* Compact offer band */}
        <Box
          sx={{
            background: `
              radial-gradient(ellipse 80% 90% at 50% 0%, rgba(16, 185, 129, 0.1) 0%, transparent 55%),
              linear-gradient(180deg, #edfaf6 0%, #ffffff 85%)
            `,
            py: { xs: 2.25, md: 3.5 },
            borderBottom: `1px solid ${alpha(AF.ink, 0.06)}`,
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                textAlign: "center",
                animation: "afBandIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both",
                "@keyframes afBandIn": {
                  from: { opacity: 0, transform: "translateY(10px)" },
                  to: { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              <Typography
                component="p"
                sx={{
                  mb: 0.75,
                  fontFamily: AF.fontDisplay,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: AF.primary,
                }}
              >
                {AFRICA_HERO.brand}
              </Typography>

              <Typography
                component="h1"
                data-speakable
                sx={{
                  mb: 1.75,
                  fontFamily: AF.fontDisplay,
                  fontSize: { xs: "1.5rem", sm: "1.875rem", md: "2.375rem" },
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.12,
                  color: AF.text,
                }}
              >
                {headline}
              </Typography>

              <Button
                component="a"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="large"
                startIcon={<WhatsAppIcon />}
                onClick={onWhatsAppClick}
                sx={{
                  px: 3.5,
                  py: 1.35,
                  mb: 1.5,
                  fontSize: "0.975rem",
                  fontFamily: AF.fontSans,
                  fontWeight: 700,
                  borderRadius: 2,
                  bgcolor: AF.whatsapp,
                  boxShadow: "0 10px 24px rgba(37, 211, 102, 0.28)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    bgcolor: AF.whatsappHover,
                    boxShadow: "0 12px 28px rgba(37, 211, 102, 0.38)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {AFRICA_HERO.primaryCta}
              </Button>

              <Typography
                data-speakable
                sx={{
                  mb: 0.5,
                  fontFamily: AF.fontSans,
                  fontSize: { xs: "0.8125rem", md: "0.9375rem" },
                  fontWeight: 500,
                  lineHeight: 1.45,
                  color: AF.muted,
                  maxWidth: 460,
                  mx: "auto",
                }}
              >
                {AFRICA_HERO.subheadline}
              </Typography>

              <Typography
                sx={{
                  mb: 1,
                  fontFamily: AF.fontSans,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: AF.primaryDark,
                  lineHeight: 1.4,
                }}
              >
                {countryLine}
              </Typography>

              <Box>
                <Button
                  variant="text"
                  onClick={onOpenForm}
                  sx={{
                    color: AF.muted,
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                    "&:hover": {
                      color: AF.primaryDark,
                      bgcolor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {AFRICA_HERO.secondaryCta}
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
