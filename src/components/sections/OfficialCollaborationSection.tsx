"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SectionContainer } from "../ui/SectionContainer";
import { GlassCard } from "../ui/GlassCard";

export function OfficialCollaborationSection() {
  return (
    <SectionContainer>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="overline"
          sx={{ color: "#10b981", fontWeight: 600, letterSpacing: 1.5 }}
        >
          Hospital Partnerships
        </Typography>
        <Typography variant="h2" sx={{ mt: 1, mb: 3, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
          Official Hospital Collaboration
        </Typography>
      </Box>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <GlassCard>
          <Typography variant="body1" paragraph>
            We operate under formal collaborations and MoUs with major hospital groups in India.
          </Typography>
          <Typography variant="body1">
            Patients are admitted through the hospital's international patient department, ensuring proper documentation, transparency, and structured care pathways.
          </Typography>
        </GlassCard>
      </Box>
    </SectionContainer>
  );
}
