"use client";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function TermsContent() {
  return (
    <Box sx={{ "& > *": { mb: 3 } }}>
      <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151" }}>
        Welcome to MedicalToursIndia.com. By using our website and services, you agree to these Terms of
        Service and our Medical Disclaimer. Please read them carefully.
      </Typography>

      <section>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#171717", mb: 1 }}>
          Medical Disclaimer (Important)
        </Typography>
        <Box
          sx={{
            p: 2,
            backgroundColor: "rgba(28, 124, 127, 0.08)",
            borderLeft: "4px solid #1c7c7f",
            borderRadius: 1,
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151", fontWeight: 600 }}>
            We are a medical travel coordination service. We do not provide medical diagnosis, advice, or
            treatment. All medical services are delivered solely by licensed hospitals and doctors in India.
            We act only as a coordination and facilitation partner between you and the hospital.
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151", mt: 2 }}>
          Treatment estimates and package ranges on this website are indicative only. Final diagnosis,
          treatment plans, and costs are determined by the treating hospital and specialists. You are
          responsible for consulting qualified healthcare providers for medical decisions.
        </Typography>
      </section>

      <section>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#171717", mb: 1 }}>
          Our Service
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151" }}>
          We connect international patients with accredited hospitals in India and assist with coordination
          such as hospital admission, medical visa guidance, accommodation, and travel logistics. We operate
          under formal collaborations with hospital groups in India. Our role is strictly coordination—we do
          not influence clinical decisions or add service fees to hospital bills.
        </Typography>
      </section>

      <section>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#171717", mb: 1 }}>
          Use of Our Website
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151" }}>
          You agree to use our website only for lawful purposes. You must not submit false information,
          misrepresent your identity, or use our forms for spam or malicious purposes. We may refuse service
          or terminate access at our discretion.
        </Typography>
      </section>

      <section>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#171717", mb: 1 }}>
          Privacy
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151" }}>
          Your use of our services is also governed by our{" "}
          <a href="/privacy" style={{ color: "#1c7c7f", textDecoration: "none" }}>
            Privacy Policy
          </a>
          , which explains how we collect, use, and protect your information.
        </Typography>
      </section>

      <section>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#171717", mb: 1 }}>
          Limitation of Liability
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151" }}>
          To the maximum extent permitted by law, we are not liable for any medical outcomes, hospital
          decisions, treatment results, or third-party actions. Our liability is limited to the coordination
          services we directly provide. Medical care is the sole responsibility of the treating hospital and
          medical team.
        </Typography>
      </section>

      <section>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#171717", mb: 1 }}>
          Contact
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151" }}>
          For questions about these Terms, contact us at{" "}
          <a href="mailto:info@techdr.in" style={{ color: "#1c7c7f", textDecoration: "none" }}>
            info@techdr.in
          </a>
          .
        </Typography>
      </section>
    </Box>
  );
}
