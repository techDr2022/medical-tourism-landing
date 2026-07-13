"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { SectionContainer } from "../ui/SectionContainer";
import { HOSPITALS, HOSPITAL_NETWORK } from "@/constants";
import { useEffect, useState } from "react";

const GREEN_600 = "#1c7c7f";

export function HospitalsSection() {
  return (
    <SectionContainer variant="alt" id="hospitals">
      <Box sx={{ textAlign: "center", mb: { xs: 2, sm: 2.5, md: 3 }, px: { xs: 0.5, sm: 0 } }}>
        <Typography
          variant="overline"
          sx={{
            color: GREEN_600,
            fontWeight: 600,
            letterSpacing: { xs: 1.2, sm: 1.5 },
            fontSize: { xs: "0.65rem", sm: "0.7rem" },
          }}
        >
          Trusted Partners
        </Typography>
        <Typography
          variant="h2"
          sx={{
            mt: 0.5,
            mb: 1,
            fontSize: { xs: "1.2rem", sm: "1.35rem", md: "1.5rem" },
            lineHeight: 1.25,
            px: { xs: 0.5, sm: 0 },
          }}
        >
          Our Official Hospital Network
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            maxWidth: 560,
            mx: "auto",
            fontSize: { xs: "0.8125rem", md: "0.875rem" },
            lineHeight: 1.55,
            px: { xs: 0.5, sm: 1 },
          }}
        >
          Featured partners from our network of{" "}
          <Box component="span" sx={{ fontWeight: 600, color: GREEN_600 }}>
            {HOSPITAL_NETWORK.fullLabel}
          </Box>
          . Patients are treated directly by the selected hospital.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: "repeat(3, minmax(0, 1fr))",
            md: "repeat(4, minmax(0, 1fr))",
            lg: "repeat(5, minmax(0, 1fr))",
          },
          gap: { xs: 1, sm: 1.25, md: 1.5 },
          maxWidth: { xs: "100%", sm: 720, md: 860, lg: 960 },
          width: "100%",
          mx: "auto",
        }}
      >
        {HOSPITALS.map((hospital) => (
          <HospitalLogo key={hospital.name} hospital={hospital} />
        ))}
      </Box>

      <Box sx={{ textAlign: "center", mt: { xs: 2, sm: 2.5, md: 3 }, px: { xs: 0.5, sm: 1 } }}>
        <Typography
          sx={{
            fontSize: { xs: "0.9375rem", sm: "1rem", md: "1.125rem" },
            fontWeight: 700,
            color: GREEN_600,
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
          }}
        >
          +200 accredited hospitals in India
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 0.75,
            color: alpha("#171717", 0.65),
            maxWidth: 440,
            mx: "auto",
            fontSize: { xs: "0.75rem", sm: "0.8125rem" },
            lineHeight: 1.5,
          }}
        >
          The 20 partners above are a sample — we coordinate access to{" "}
          {HOSPITAL_NETWORK.moreInWords}.
        </Typography>
      </Box>
    </SectionContainer>
  );
}

export function HospitalLogo({ hospital }: { hospital: { name: string; logo: string } }) {
  const [imageError, setImageError] = useState(false);
  const hasLogo = Boolean(hospital.logo) && !imageError;

  useEffect(() => {
    setImageError(false);
  }, [hospital.logo]);

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        p: { xs: 1, sm: 1.25, md: 1.5 },
        borderRadius: { xs: 1.5, sm: 2 },
        backgroundColor: "#fff",
        border: "1px solid",
        borderColor: alpha("#171717", 0.08),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: { xs: 52, sm: 60, md: 68 },
        height: "100%",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        "@media (hover: hover)": {
          "&:hover": {
            boxShadow: "0 2px 8px rgba(28, 124, 127, 0.12)",
            borderColor: alpha(GREEN_600, 0.25),
          },
        },
      }}
    >
      {hasLogo ? (
        <Box
          component="img"
          key={hospital.logo}
          src={hospital.logo}
          alt={hospital.name}
          loading="lazy"
          onError={() => setImageError(true)}
          sx={{
            maxWidth: "100%",
            maxHeight: { xs: 28, sm: 34, md: 40 },
            width: "auto",
            height: "auto",
            objectFit: "contain",
            opacity: 0.9,
          }}
        />
      ) : (
        <Typography
          sx={{
            fontSize: { xs: "0.625rem", sm: "0.6875rem", md: "0.75rem" },
            fontWeight: 600,
            color: alpha("#171717", 0.75),
            textAlign: "center",
            lineHeight: 1.2,
            px: 0.25,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            wordBreak: "break-word",
          }}
        >
          {hospital.name}
        </Typography>
      )}
    </Box>
  );
}
