import type { QualificationTreatment } from "@/constants/africa";

export interface AfricaQualificationPayload {
  treatment: QualificationTreatment | string;
  treatmentOther?: string;
  reportStatus: string;
  travelTimeline: string;
  country?: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  source_page: "/africa";
  lead_type: "qualification_whatsapp";
}

export interface AfricaEmailLeadPayload {
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  city?: string;
  treatment?: string;
  travelTimeline?: string;
  reportStatus?: string;
  message?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  recaptchaToken?: string;
}

/** Submit Africa enquiry — emails ops + patient via /api/africa-contact (Resend). */
export async function submitAfricaLeadEmail(
  formData: AfricaEmailLeadPayload
): Promise<void> {
  const response = await fetch("/api/africa-contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = (await response.json().catch(() => ({}))) as { error?: string };

  if (!response.ok) {
    throw new Error(data.error || "Failed to send enquiry. Please try WhatsApp.");
  }
}

export function buildQualificationWhatsAppUrl(
  phoneNumber: string,
  answers: {
    treatment: string;
    reportStatus: string;
    travelTimeline: string;
    country?: string | null;
  }
): string {
  const reportLabel =
    answers.reportStatus === "yes"
      ? "I have medical reports"
      : "I need a consultation first";

  const travelLabel =
    answers.travelTimeline === "yes_1_3_months"
      ? "I plan to travel within 1–3 months"
      : "I'm researching options";

  const countryLine = answers.country ? `Country: ${answers.country}\n` : "";

  const text = `Hi, I'm interested in medical treatment in India.

${countryLine}Treatment: ${answers.treatment}
Reports: ${reportLabel}
Travel timeline: ${travelLabel}

I'd like to discuss transparent pricing and next steps.`;

  return `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}
