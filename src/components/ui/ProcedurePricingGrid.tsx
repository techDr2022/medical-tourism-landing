"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import type { ProcedureCategory } from "@/constants/procedurePricing";

const GREEN_600 = "#1c7c7f";

interface ProcedurePricingGridProps {
  categories: ProcedureCategory[];
}

export function ProcedurePricingGrid({ categories }: ProcedurePricingGridProps) {
  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
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
                    py: 1.5,
                    borderBottom: `1px solid ${alpha("#171717", 0.05)}`,
                    "&:last-child": { borderBottom: "none" },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.9375rem",
                      color: alpha("#171717", 0.85),
                      lineHeight: 1.5,
                      fontWeight: 500,
                      mb: 0.75,
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
                      lineHeight: 1.4,
                    }}
                  >
                    {procedure.indiaPrice}
                    {procedure.comparison ? (
                      <Box
                        component="span"
                        sx={{
                          fontWeight: 400,
                          color: alpha("#171717", 0.55),
                        }}
                      >
                        {" "}
                        — {procedure.comparison}
                      </Box>
                    ) : null}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
