"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { SectionContainer } from "../ui/SectionContainer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { alpha } from "@mui/material/styles";

const GREEN_600 = "#1c7c7f";
const GREEN_700 = "#0d9488";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";

export function WhoThisServiceIsForSection() {
  return (
    <SectionContainer variant="alt">
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
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
            Service Eligibility
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.75rem", md: "2rem" },
              fontWeight: 700,
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Who This Service Is For
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Eligible Patients */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 3,
                backgroundColor: "#ffffff",
                border: `2px solid ${alpha(GREEN_600, 0.2)}`,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: alpha(GREEN_600, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      fontSize: 28,
                      color: GREEN_600,
                    }}
                  />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#171717",
                  }}
                >
                  Eligible Patients
                </Typography>
              </Box>
              <Box sx={{ pl: { xs: 0, sm: 7 } }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "0.9375rem",
                    color: alpha("#171717", 0.8),
                    lineHeight: 1.7,
                    mb: 2,
                  }}
                >
                  This service is exclusively for patients residing outside India.
                </Typography>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: alpha(GREEN_600, 0.05),
                    border: `1px solid ${alpha(GREEN_600, 0.15)}`,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.875rem",
                      color: alpha("#171717", 0.9),
                      fontWeight: 500,
                      mb: 1,
                    }}
                  >
                    We support patients travelling from:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.875rem",
                      color: GREEN_600,
                      fontWeight: 600,
                    }}
                  >
                    Kenya, including Nairobi and other regions
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Not Eligible */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 3,
                backgroundColor: "#ffffff",
                border: `2px solid ${alpha("#171717", 0.1)}`,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: alpha("#171717", 0.05),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CancelIcon
                    sx={{
                      fontSize: 28,
                      color: alpha("#171717", 0.5),
                    }}
                  />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#171717",
                  }}
                >
                  Not Eligible
                </Typography>
              </Box>
              <Box sx={{ pl: { xs: 0, sm: 7 } }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "0.9375rem",
                    color: alpha("#171717", 0.7),
                    lineHeight: 1.7,
                  }}
                >
                  We do not provide services for domestic Indian patients.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </SectionContainer>
  );
}
