"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { SectionContainer } from "../ui/SectionContainer";
import { alpha } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";

const GREEN_600 = "#1c7c7f";
const GREEN_700 = "#0d9488";
const GRADIENT_START = "#10b981";
const GRADIENT_END = "#0d9488";

interface Testimonial {
  name: string;
  location: string;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "James M.",
    location: "International patient",
    text: "I was initially unsure about travelling to India for heart surgery. The coordination team helped arrange a video consultation with the specialist before I travelled. Everything was organised clearly — hospital admission, visa guidance, and accommodation. The process felt structured and professional from start to finish.",
  },
  {
    name: "Grace W.",
    location: "International patient",
    text: "We were looking for options for my mother's knee replacement. The team shared hospital package estimates and explained the differences between room categories. There were no hidden charges from their side. The hospital treated us directly, and the coordination support made the journey smooth.",
  },
  {
    name: "Daniel O.",
    location: "International patient",
    text: "I appreciated being able to speak with the doctor through video consultation before making travel plans. It helped us understand the procedure and expected hospital stay. Once we arrived in India, airport pickup and accommodation were already arranged.",
  },
  {
    name: "Esther N.",
    location: "International patient",
    text: "From the first enquiry to discharge, communication was clear. We were assigned one coordinator who handled hospital communication and documents. It reduced stress, especially when travelling abroad for medical treatment.",
  },
  {
    name: "Peter K.",
    location: "International patient",
    text: "We received official hospital cost estimates before travelling. The final invoice was issued directly by the hospital as explained. The transparency gave us confidence in the process.",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
  };

  const currentTestimonial = TESTIMONIALS[activeIndex];

  return (
    <SectionContainer variant="alt" id="testimonials">
      <Box sx={{ maxWidth: 900, mx: "auto", textAlign: "center" }}>
        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="overline"
            sx={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "#171717",
              textTransform: "uppercase",
              mb: 1,
              display: "block",
            }}
          >
            Patient Reviews
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, mb: 2 }}>
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                sx={{
                  fontSize: "1.5rem",
                  color: "#fbbf24",
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Testimonial Card */}
        <Box
          sx={{
            position: "relative",
            mb: 4,
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              p: { xs: 3, md: 5 },
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              border: `1px solid ${alpha("#171717", 0.08)}`,
              minHeight: { xs: 280, md: 240 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transition: "all 0.3s ease",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", md: "1.125rem" },
                lineHeight: 1.7,
                color: "#374151",
                mb: 3,
                fontStyle: "italic",
              }}
            >
              "{currentTestimonial.text}"
            </Typography>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#171717",
                  mb: 0.5,
                }}
              >
                {currentTestimonial.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: alpha("#171717", 0.6),
                  fontSize: "0.875rem",
                }}
              >
                {currentTestimonial.location}
              </Typography>
            </Box>
          </Box>

          {/* Navigation Arrows */}
          <IconButton
            onClick={handlePrevious}
            sx={{
              position: "absolute",
              left: { xs: 8, md: -20 },
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${alpha("#171717", 0.1)}`,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              width: { xs: 40, md: 48 },
              height: { xs: 40, md: 48 },
              zIndex: 1,
              "&:hover": {
                backgroundColor: GREEN_600,
                color: "white",
                borderColor: GREEN_600,
              },
              transition: "all 0.2s ease",
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }} />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: { xs: 8, md: -20 },
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${alpha("#171717", 0.1)}`,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              width: { xs: 40, md: 48 },
              height: { xs: 40, md: 48 },
              zIndex: 1,
              "&:hover": {
                backgroundColor: GREEN_600,
                color: "white",
                borderColor: GREEN_600,
              },
              transition: "all 0.2s ease",
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }} />
          </IconButton>
        </Box>

        {/* Dots Indicator */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {TESTIMONIALS.map((_, index) => (
            <Box
              key={index}
              onClick={() => handleDotClick(index)}
              sx={{
                width: activeIndex === index ? 32 : 8,
                height: 8,
                borderRadius: 4,
                background:
                  activeIndex === index
                    ? `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`
                    : alpha("#171717", 0.2),
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: activeIndex === index ? GREEN_700 : alpha("#171717", 0.3),
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </SectionContainer>
  );
}
