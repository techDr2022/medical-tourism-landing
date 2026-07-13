import { fileToBase64 } from "@/lib/fileUpload";
import type { BudgetBand, LeadIntentScore, TreatmentOption } from "@/constants/nigeria";

export interface NigeriaLeadPayload {
  fullName: string;
  whatsapp: string;
  treatment: TreatmentOption | string;
  treatmentOther?: string;
  reportStatus: string;
  lead_intent_score: LeadIntentScore;
  patientFor: string;
  city: string;
  budget_band: BudgetBand | string;
  consent: boolean;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  source_page: "/nigeria";
  files?: { name: string; content: string }[];
}

/**
 * TODO: Ask for the real CRM webhook / API URL / Zoho / HubSpot form ID,
 * then set NEXT_PUBLIC_NIGERIA_LEAD_WEBHOOK_URL (or a server route that proxies it).
 *
 * Until then this function soft-succeeds so WhatsApp redirect + conversion
 * events can be QA’d — do NOT launch Google Ads without a real endpoint.
 */
export async function submitLead(formData: NigeriaLeadPayload): Promise<void> {
  const endpoint =
    process.env.NEXT_PUBLIC_NIGERIA_LEAD_WEBHOOK_URL?.trim() ||
    process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL?.trim();

  // Strip file binary from console / lightweight logs
  const logSafe = {
    ...formData,
    files: formData.files?.map((f) => ({ name: f.name, bytes: f.content.length })),
  };

  if (!endpoint) {
    // TODO: replace with real CRM POST before ads launch
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[TODO] Nigeria lead endpoint not configured. submitLead() soft-succeeded with payload:",
        logSafe
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 350));
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || "Lead submission failed. Please try again or WhatsApp us directly.");
  }
}

export async function filesToPayload(
  files: File[]
): Promise<{ name: string; content: string }[]> {
  const out: { name: string; content: string }[] = [];
  for (const file of files) {
    const content = await fileToBase64(file);
    out.push({ name: file.name, content });
  }
  return out;
}

/** Normalize and validate Nigerian WhatsApp numbers (+234…). */
export function normalizeNigerianWhatsApp(input: string): string | null {
  let digits = input.replace(/\D/g, "");

  if (digits.startsWith("234")) {
    digits = digits.slice(3);
  }
  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  // Nigerian mobile: 10 digits, typically starting with 7/8/9
  if (!/^[789]\d{9}$/.test(digits)) {
    return null;
  }

  return `+234${digits}`;
}

export function buildWhatsAppEstimateUrl(
  whatsappBusinessNumber: string,
  treatment: string,
  budgetBand: string
): string {
  const text = `Hi, I just submitted my details for ${treatment}. My budget range is ${budgetBand}. Please send my cost estimate.`;
  return `https://wa.me/${whatsappBusinessNumber.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}
