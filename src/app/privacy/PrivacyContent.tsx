"use client";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function PrivacyContent() {
  return (
    <Box sx={{ "& > *": { mb: 3 } }}>
      <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151" }}>
        MedicalToursIndia.com (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates a medical travel
        coordination service connecting international patients with licensed hospitals in India. This Privacy
        Policy explains how we collect, use, disclose, and safeguard your information when you use our website
        and services.
      </Typography>

      <section>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#171717", mb: 1 }}>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151" }}>
          We collect information you provide directly, including:
        </Typography>
        <Box component="ul" sx={{ pl: 3, color: "#374151", lineHeight: 1.8 }}>
          <li>Name, country, email address, and phone/WhatsApp number</li>
          <li>Medical condition descriptions and medical reports you upload</li>
          <li>Any other information you submit through our contact or inquiry forms</li>
        </Box>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151", mt: 1 }}>
          We may also collect usage data through cookies and analytics (e.g., Google Analytics) to improve our
          website, including pages visited, referral sources, and general geographic location.
        </Typography>
      </section>

      <section>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#171717", mb: 1 }}>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151" }}>
          We use your information to:
        </Typography>
        <Box component="ul" sx={{ pl: 3, color: "#374151", lineHeight: 1.8 }}>
          <li>Connect you with hospitals and coordinate your medical travel</li>
          <li>Respond to inquiries and send relevant follow-up communications</li>
          <li>Send confirmation and thank-you emails</li>
          <li>Improve our website and services</li>
          <li>Comply with legal obligations</li>
        </Box>
      </section>

      <section>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#171717", mb: 1 }}>
          3. Sharing of Information
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151" }}>
          We share your medical and contact information only with hospitals and their teams as necessary to
          coordinate your care. We may use third-party service providers (e.g., email delivery, hosting,
          analytics) who process data on our behalf. We do not sell your personal information.
        </Typography>
      </section>

      <section>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#171717", mb: 1 }}>
          4. Data Security
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151" }}>
          We implement reasonable technical and organisational measures to protect your personal and health
          information. Medical reports and forms are transmitted over secure connections. However, no method
          of transmission over the internet is 100% secure.
        </Typography>
      </section>

      <section>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#171717", mb: 1 }}>
          5. Data Retention
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151" }}>
          We retain your information as long as needed to fulfil the purposes described in this policy and to
          comply with legal obligations. You may request deletion of your data by contacting us.
        </Typography>
      </section>

      <section>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#171717", mb: 1 }}>
          6. Your Rights
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151" }}>
          Depending on your location, you may have rights to access, correct, or delete your personal data.
          Contact us at{" "}
          <a href="mailto:info@techdr.in" style={{ color: "#1c7c7f", textDecoration: "none" }}>
            info@techdr.in
          </a>{" "}
          to exercise these rights.
        </Typography>
      </section>

      <section>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#171717", mb: 1 }}>
          7. Cookies and Analytics
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151" }}>
          We use cookies and similar technologies for analytics (e.g., Google Analytics) and to improve user
          experience. You can control cookie preferences through your browser settings.
        </Typography>
      </section>

      <section>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#171717", mb: 1 }}>
          8. Changes to This Policy
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151" }}>
          We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top
          indicates when changes were last made. Continued use of our services after changes constitutes
          acceptance of the updated policy.
        </Typography>
      </section>

      <section>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#171717", mb: 1 }}>
          9. Contact Us
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#374151" }}>
          For questions about this Privacy Policy or our data practices, contact us at{" "}
          <a href="mailto:info@techdr.in" style={{ color: "#1c7c7f", textDecoration: "none" }}>
            info@techdr.in
          </a>
          .
        </Typography>
      </section>
    </Box>
  );
}
