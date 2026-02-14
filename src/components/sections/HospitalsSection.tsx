"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { SectionContainer } from "../ui/SectionContainer";
import { HOSPITALS } from "@/constants";
import { useState } from "react";

const GREEN_600 = "#10b981";

export function HospitalsSection() {
  return (
    <SectionContainer variant="alt" id="hospitals">
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="overline"
          sx={{
            color: GREEN_600,
            fontWeight: 600,
            letterSpacing: 1.5,
          }}
        >
          Trusted Partners
        </Typography>
        <Typography
          variant="h2"
          sx={{
            mt: 1,
            mb: 2,
            fontSize: { xs: "1.5rem", md: "1.75rem" },
          }}
        >
          Our Official Hospital Network
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 560, mx: "auto", mb: 2 }}>
          We operate under formal collaborations and working arrangements with <Box component="span" sx={{ fontWeight: 600, color: GREEN_600 }}>50+ hospitals</Box> in India, including leading hospital groups:
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 560, mx: "auto" }}>
          Patients are treated directly by the selected hospital and its licensed medical team. Hospital billing is issued directly by the hospital.
        </Typography>
      </Box>
      <Grid 
        container 
        spacing={{ xs: 2, sm: 2.5, md: 3 }} 
        sx={{ 
          maxWidth: 1400, 
          mx: "auto",
          justifyContent: "center",
        }}
      >
        {HOSPITALS.map((hospital) => (
          <HospitalLogo key={hospital.name} hospital={hospital} />
        ))}
      </Grid>
    </SectionContainer>
  );
}

function HospitalLogo({ hospital }: { hospital: { name: string; logo: string } }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Grid 
      size={{ 
        xs: 6,    // 2 per row on mobile
        sm: 4,    // 3 per row on small screens
        md: 2.4,  // 5 per row on medium screens
        lg: 2,    // 6 per row on large screens
        xl: 1.7,  // 7 per row on extra large screens
      }}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          borderRadius: 3,
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 244, 0.3) 100%)",
          backdropFilter: "blur(10px)",
          border: "1px solid",
          borderColor: alpha("#171717", 0.1),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: { xs: 85, sm: 95, md: 105 },
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(22, 163, 74, 0.2)",
            borderColor: alpha(GREEN_600, 0.3),
            transform: "translateY(-4px)",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(240, 253, 244, 0.5) 100%)",
          },
        }}
      >
        {!imageError ? (
          <Box
            component="img"
            src={hospital.logo}
            alt={hospital.name}
            onError={() => setImageError(true)}
            sx={{
              maxWidth: "85%",
              maxHeight: "70%",
              objectFit: "contain",
              opacity: 0.85,
              transition: "all 0.3s ease",
              "&:hover": {
                opacity: 1,
                transform: "scale(1.05)",
              },
            }}
          />
        ) : (
          <Typography
            sx={{
              fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
              fontWeight: 600,
              color: alpha("#171717", 0.6),
              textAlign: "center",
              lineHeight: 1.2,
              px: 1,
            }}
          >
            {hospital.name}
          </Typography>
        )}
      </Box>
    </Grid>
  );
}
