"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { alpha } from "@mui/material/styles";
import { SectionContainer } from "../ui/SectionContainer";
import { SITE_FAQ } from "@/lib/faq";

const GREEN_600 = "#1c7c7f";

export function FaqSection() {
  const [expanded, setExpanded] = useState<string | false>("faq-0");

  return (
    <SectionContainer id="faq" variant="alt">
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="overline"
          sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5 }}
        >
          Common Questions
        </Typography>
        <Typography
          component="h2"
          variant="h2"
          sx={{ mt: 1, mb: 2, fontSize: { xs: "1.5rem", md: "1.75rem" } }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 640, mx: "auto", lineHeight: 1.7 }}
        >
          Direct answers about medical travel to India, our coordination service, costs, and
          process — for patients worldwide.
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        {SITE_FAQ.map((item, index) => {
          const panelId = `faq-${index}`;
          return (
            <Accordion
              key={item.question}
              expanded={expanded === panelId}
              onChange={(_, isExpanded) => setExpanded(isExpanded ? panelId : false)}
              disableGutters
              elevation={0}
              sx={{
                mb: 1.5,
                borderRadius: "12px !important",
                border: `1px solid ${alpha("#171717", 0.1)}`,
                backgroundColor: "#ffffff",
                "&::before": { display: "none" },
                overflow: "hidden",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: GREEN_600 }} />}
                aria-controls={`${panelId}-content`}
                id={`${panelId}-header`}
                sx={{ px: { xs: 2, md: 3 }, py: 0.5 }}
              >
                <Typography
                  component="h3"
                  sx={{
                    fontSize: { xs: "0.9375rem", md: "1rem" },
                    fontWeight: 600,
                    color: "#171717",
                    lineHeight: 1.4,
                  }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: { xs: 2, md: 3 }, pt: 0, pb: 2.5 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.75, fontSize: "0.9375rem" }}
                >
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
