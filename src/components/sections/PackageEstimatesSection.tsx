"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { SectionContainer } from "../ui/SectionContainer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#10b981";
const GREEN_700 = "#0d9488";

const PACKAGE_ITEMS = [
  "Structured hospital package estimates",
  "Expected length of hospital stay",
  "Room category options (Economy, Double, Single)",
  "Implant details where applicable",
  "Inclusions and exclusions within the package",
];

const PROCEDURE_CATEGORIES = [
  {
    title: "Cardiac Procedures",
    procedures: [
      { name: "Angiography", price: "USD 400" },
      { name: "Angioplasty (1 Stent)", price: "USD 4,400" },
      { name: "Bypass Surgery (CABG)", price: "USD 5,500" },
      { name: "Valve Replacement", price: "USD 8,000" },
    ],
  },
  {
    title: "Orthopaedic Procedures",
    procedures: [
      { name: "Total Knee Replacement (Single Knee)", price: "USD 5,500" },
      { name: "Total Hip Replacement", price: "USD 6,200" },
    ],
  },
  {
    title: "Neurosurgery",
    procedures: [
      { name: "Spinal Fusion (Up to Two Levels)", price: "USD 8,200" },
      { name: "Craniotomy", price: "USD 7,800" },
    ],
  },
  {
    title: "Transplant Procedures",
    procedures: [
      { name: "Kidney Transplant", price: "USD 13,000" },
      { name: "Liver Transplant (Adult)", price: "USD 27,000" },
    ],
  },
];

const TRANSPARENCY_POINTS = [
  "We do not set medical pricing",
  "We do not add service charges to hospital bills",
  "All invoices are issued directly by the hospital",
  "Final treatment plans are decided by licensed hospital specialists",
];

export function PackageEstimatesSection() {
  return (
    <SectionContainer variant="alt" id="pricing">
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: "#171717",
              fontWeight: 600,
              letterSpacing: 1.5,
              fontSize: "0.8125rem",
              display: "block",
              mb: 1.5,
            }}
          >
            Pricing Transparency
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.75rem", md: "2rem" },
              fontWeight: 700,
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${GREEN_600} 0%, ${GREEN_700} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Transparent Hospital Package Estimates
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              color: alpha("#171717", 0.7),
              maxWidth: 900,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            We understand that patients travelling from Kenya want clarity on expected treatment costs before planning their journey. Through our formal hospital collaborations, we receive official tariff plans directly from accredited hospital partners in India.
          </Typography>
        </Box>

        {/* What We Share */}
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 3,
            border: `1px solid ${alpha("#171717", 0.1)}`,
            p: { xs: 3, md: 4 },
            mb: 6,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box sx={{ mb: 0.5 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#171717",
              }}
            >
              Upon reviewing your medical reports, we can share:
            </Typography>
            <Box
              sx={{
                width: 48,
                height: 3,
                mt: 1,
                borderRadius: 1,
                background: `linear-gradient(90deg, ${GREEN_600} 0%, ${GREEN_700} 100%)`,
              }}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.8125rem",
              color: alpha("#171717", 0.65),
              mb: 3,
            }}
          >
            Transparent, personalized estimates with no hidden costs.
          </Typography>
          <Grid container spacing={2}>
            {PACKAGE_ITEMS.map((item) => (
              <Grid key={item} size={{ xs: 12, sm: 6 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    py: 1,
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      fontSize: 22,
                      color: GREEN_600,
                      flexShrink: 0,
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.9375rem",
                      color: alpha("#171717", 0.8),
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: `1px solid ${alpha("#171717", 0.1)}`,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                color: alpha("#171717", 0.7),
                fontStyle: "italic",
              }}
            >
              All treatment costs are billed directly by the hospital. Final estimates are confirmed after medical evaluation by the treating specialist.
            </Typography>
          </Box>
        </Box>

        {/* Package Ranges */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.5rem", md: "1.75rem" },
              fontWeight: 700,
              mb: 4,
              textAlign: "center",
              color: "#171717",
            }}
          >
            Indicative Hospital Package Ranges
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.875rem",
              color: alpha("#171717", 0.7),
              textAlign: "center",
              mb: 5,
              maxWidth: 800,
              mx: "auto",
            }}
          >
            Based on official hospital tariff plans. These are indicative ranges and may vary based on medical condition, room category selection, and specialist evaluation.
          </Typography>

          <Grid container spacing={3}>
            {PROCEDURE_CATEGORIES.map((category) => (
              <Grid key={category.title} size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    p: 4,
                    height: "100%",
                    borderRadius: 3,
                    backgroundColor: "#ffffff",
                    border: `1px solid ${alpha("#171717", 0.1)}`,
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(16, 185, 129, 0.15)",
                      borderColor: alpha(GREEN_600, 0.3),
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      mb: 3,
                      color: "#171717",
                      pb: 2,
                      borderBottom: `2px solid ${alpha(GREEN_600, 0.2)}`,
                    }}
                  >
                    {category.title}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {category.procedures.map((procedure) => (
                      <Box
                        key={procedure.name}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 2,
                          py: 1.5,
                          borderBottom: `1px solid ${alpha("#171717", 0.05)}`,
                          "&:last-child": {
                            borderBottom: "none",
                          },
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "0.9375rem",
                            color: alpha("#171717", 0.8),
                            lineHeight: 1.5,
                            flex: 1,
                          }}
                        >
                          {procedure.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "0.9375rem",
                            fontWeight: 700,
                            color: GREEN_600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {procedure.price}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              mt: 4,
              textAlign: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.8125rem",
                color: alpha("#171717", 0.6),
                fontStyle: "italic",
              }}
            >
              Official tariff references are available upon request.
            </Typography>
          </Box>
        </Box>

        {/* Transparency Note */}
        <Box
          sx={{
            p: 4,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(GREEN_600, 0.08)} 0%, ${alpha(GREEN_700, 0.05)} 100%)`,
            border: `1px solid ${alpha(GREEN_600, 0.2)}`,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: "1.125rem",
              fontWeight: 700,
              mb: 3,
              color: "#171717",
              textAlign: "center",
            }}
          >
            Important Transparency Note
          </Typography>
          <Grid container spacing={2}>
            {TRANSPARENCY_POINTS.map((point) => (
              <Grid key={point} size={{ xs: 12, sm: 6 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: GREEN_600,
                      flexShrink: 0,
                      mt: 1,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.875rem",
                      color: alpha("#171717", 0.8),
                      lineHeight: 1.6,
                    }}
                  >
                    {point}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${alpha(GREEN_600, 0.2)}` }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                color: alpha("#171717", 0.8),
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              Our role is coordination and travel support.
            </Typography>
          </Box>
        </Box>
      </Box>
    </SectionContainer>
  );
}
