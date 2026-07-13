"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { alpha } from "@mui/material/styles";
import { NIGERIA_FAQ } from "@/constants/nigeria";

const GREEN_600 = "#1c7c7f";

interface FAQAccordionProps {
  items?: readonly { question: string; answer: string }[];
  title?: string;
  subtitle?: string;
  overline?: string;
  /** Prefix for accordion panel ids (a11y). */
  idPrefix?: string;
  /** Section id for AEO speakable / deep links (default: faq). */
  sectionId?: string;
  /** When true, expand the first item by default. */
  defaultExpandedFirst?: boolean;
}

export function FAQAccordion({
  items = NIGERIA_FAQ,
  title = "Questions Nigerian patients ask us",
  subtitle = "Straight answers on scams, visas, payment, and what to expect in India.",
  overline = "Nigeria-specific FAQ",
  idPrefix = "nigeria-faq",
  sectionId = "faq",
  defaultExpandedFirst = true,
}: FAQAccordionProps) {
  const [expanded, setExpanded] = useState<string | false>(
    defaultExpandedFirst ? `${idPrefix}-0` : false
  );

  return (
    <Box id={sectionId} component="section" aria-labelledby={`${idPrefix}-heading`}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="overline"
          sx={{ color: GREEN_600, fontWeight: 600, letterSpacing: 1.5 }}
        >
          {overline}
        </Typography>
        <Typography
          id={`${idPrefix}-heading`}
          component="h2"
          variant="h2"
          sx={{ mt: 1, mb: 1.5, fontSize: { xs: "1.5rem", md: "1.75rem" } }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 640, mx: "auto", lineHeight: 1.7 }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        {items.map((item, index) => {
          const panelId = `${idPrefix}-${index}`;
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
    </Box>
  );
}
