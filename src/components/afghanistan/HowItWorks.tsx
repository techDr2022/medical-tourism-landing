"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { AFGHANISTAN_HOW_IT_WORKS } from "@/constants/afghanistan";
import { AF } from "@/constants/afghanistanTheme";
import { useTranslation } from "@/i18n/LanguageProvider";

/** Simple 4-step process — large numbers, one idea each. */
export function HowItWorks() {
  const { t } = useTranslation();

  return (
    <Box id="process" component="section">
      <Box sx={{ textAlign: "center", mb: 4, maxWidth: 640, mx: "auto" }}>
        <Typography
          variant="overline"
          sx={{ color: AF.primary, fontWeight: 600, letterSpacing: 1.5 }}
        >
          {t("afghanistan.howOverline")}
        </Typography>
        <Typography
          component="h2"
          sx={{
            mt: 1,
            mb: 1.5,
            fontSize: { xs: "1.5rem", md: "1.75rem" },
            fontWeight: 700,
            color: AF.text,
          }}
        >
          {t("afghanistan.howTitle")}
        </Typography>
        <Typography variant="body2" sx={{ color: AF.muted, lineHeight: 1.65 }}>
          {t("afghanistan.howBody")}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {AFGHANISTAN_HOW_IT_WORKS.map((item) => (
          <Grid key={item.step} size={{ xs: 12, sm: 6, md: 3 }}>
            <Box
              sx={{
                height: "100%",
                p: 2.5,
                borderRadius: 2,
                border: `1px solid ${AF.line}`,
                backgroundColor: AF.white,
              }}
            >
              <Typography
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1.5,
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  color: AF.white,
                  backgroundColor: AF.primary,
                }}
              >
                {item.step}
              </Typography>
              <Typography sx={{ fontWeight: 700, mb: 0.75, color: AF.text, fontSize: "1rem" }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: AF.muted, lineHeight: 1.55 }}>
                {item.body}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
