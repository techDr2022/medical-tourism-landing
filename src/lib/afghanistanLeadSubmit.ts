import { fileToBase64 } from "@/lib/fileUpload";
import type {
  AfghanistanWhatsAppPrefix,
  BudgetBand,
  LeadIntentScore,
  TreatmentOption,
} from "@/constants/afghanistan";

export interface AfghanistanLeadPayload {
  fullName: string;
  whatsapp: string;
  whatsapp_prefix: AfghanistanWhatsAppPrefix | string;
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
  source_page: "/afghanistan";
  files?: { name: string; content: string }[];
}

/**
 * TODO: Ask for the real CRM webhook / API URL / Zoho / HubSpot form ID,
 * then set NEXT_PUBLIC_AFGHANISTAN_LEAD_WEBHOOK_URL (or a server route that proxies it).
 *
 * Until then this function soft-succeeds so WhatsApp redirect + conversion
 * events can be QA’d — do NOT launch Google Ads without a real endpoint.
 */
export async function submitLead(formData: AfghanistanLeadPayload): Promise<void> {
  const endpoint =
    process.env.NEXT_PUBLIC_AFGHANISTAN_LEAD_WEBHOOK_URL?.trim() ||
    process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL?.trim();

  const logSafe = {
    ...formData,
    files: formData.files?.map((f) => ({ name: f.name, bytes: f.content.length })),
  };

  if (!endpoint) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[TODO] Afghanistan lead endpoint not configured. submitLead() soft-succeeded with payload:",
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

/**
 * Normalize WhatsApp with a selectable country prefix.
 * Afghan patients often use +92 / +98 numbers — do not hardcode +93-only validation.
 */
export function normalizeWhatsAppWithPrefix(
  prefix: string,
  localInput: string
): string | null {
  const prefixDigits = prefix.replace(/\D/g, "");
  if (!prefixDigits) return null;

  let local = localInput.replace(/\D/g, "");

  // Strip accidental country code if user pasted full international number
  if (local.startsWith(prefixDigits)) {
    local = local.slice(prefixDigits.length);
  }
  if (local.startsWith("0")) {
    local = local.slice(1);
  }

  // Reasonable mobile length across AF/PK/IR/AE/IN
  if (local.length < 7 || local.length > 12) {
    return null;
  }
  if (!/^\d+$/.test(local)) {
    return null;
  }

  return `+${prefixDigits}${local}`;
}

/** Post-submit WhatsApp deep link — hospital options (not generic "consultation"). */
export function buildWhatsAppHospitalOptionsUrl(
  whatsappBusinessNumber: string,
  treatment: string,
  budgetBand: string
): string {
  const text = `Hi, I submitted my details for ${treatment}. My budget range is ${budgetBand}. Please send me hospital options.`;
  return `https://wa.me/${whatsappBusinessNumber.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}
