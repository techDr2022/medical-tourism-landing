/**
 * Nigeria landing page content & pricing anchors.
 *
 * TODO before Google Ads launch:
 * - Confirm flagship headline price vs cheapest real package
 * - Replace SA / UAE comparison cells with verified market quotes
 * - Verify Apollo / JCI / Nigerian patient-count / 200+ accredited hospitals claims
 * - Replace placeholder testimonials with 3+ verifiable Nigerian patient stories
 * - Confirm payment model copy (direct hospital vs escrow)
 * - Update USD→NGN approximate rate
 */

import { HOSPITAL_NETWORK } from "@/constants";

export const NGN_PER_USD_APPROX = 1600;

export const NIGERIA_WHATSAPP_DEFAULT_MESSAGE =
  "Hi, I want to ask about treatment cost in India";

/**
 * Trust strip under the hero.
 * TODO: confirm exact Nigerian patient volume / since-year with ops before ads launch.
 * Network size: 200+ accredited hospitals in India (per product).
 */
export const NIGERIA_TRUST_STRIP = {
  accreditation: "JCI Accredited",
  patientCountLabel: "2,800+",
  sinceYear: "2016",
  hospitalNetworkLabel: HOSPITAL_NETWORK.fullLabel,
} as const;

export type LeadIntentScore = "high" | "medium" | "medium-low" | "low";

export const TREATMENT_OPTIONS = [
  "Cardiac Surgery",
  "Cancer Treatment",
  "Orthopedic (Knee/Hip)",
  "Kidney Transplant",
  "IVF & Fertility",
  "Neurosurgery",
  "Other",
] as const;

export type TreatmentOption = (typeof TREATMENT_OPTIONS)[number];

export const REPORT_STATUS_OPTIONS = [
  {
    value: "reports_ready",
    label: "Yes, I have reports",
    score: "high" as LeadIntentScore,
  },
  {
    value: "diagnosed_no_reports",
    label: "Diagnosed, reports not ready",
    score: "medium" as LeadIntentScore,
  },
  {
    value: "no_diagnosis",
    label: "Still consulting a doctor, no diagnosis yet",
    score: "medium-low" as LeadIntentScore,
  },
  {
    value: "researching",
    label: "Just researching options",
    score: "low" as LeadIntentScore,
  },
] as const;

export const PATIENT_RELATION_OPTIONS = [
  "Myself",
  "My Parent",
  "My Spouse",
  "My Child",
  "Other family member",
] as const;

export const NIGERIA_CITIES = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Kano",
  "Ibadan",
  "Enugu",
  "Kaduna",
  "Other",
] as const;

export const BUDGET_BANDS = [
  "Under $3,000",
  "$3,000 – $8,000",
  "$8,000 – $15,000",
  "$15,000+",
  "Not sure, need financing info",
] as const;

export type BudgetBand = (typeof BUDGET_BANDS)[number];

export type CurrencyMode = "USD" | "NGN";

export interface CostComparisonRow {
  treatment: string;
  /** India figures from src/constants/procedurePricing.ts where available */
  indiaUsd: number;
  /**
   * TODO: verify South Africa market quotes before ads launch.
   * Marked unverified — do not treat as confirmed pricing.
   */
  southAfricaUsd: number | null;
  /** Derived from existing UK comparison anchors in procedurePricing.ts */
  ukUsd: number | null;
  /**
   * TODO: verify UAE market quotes before ads launch.
   * Marked unverified — do not treat as confirmed pricing.
   */
  uaeUsd: number | null;
  dataStatus: "india_uk_verified_repo" | "needs_sa_uae_verification";
}

/**
 * Cost comparison — highest-converting element.
 * India + UK use figures already in this repo's procedurePricing.
 * SA / UAE are null until verified (table UI flags missing data).
 */
export const COST_COMPARISON_ROWS: CostComparisonRow[] = [
  {
    treatment: "Bypass Surgery (CABG)",
    indiaUsd: 5500,
    southAfricaUsd: null,
    ukUsd: 25000,
    uaeUsd: null,
    dataStatus: "needs_sa_uae_verification",
  },
  {
    treatment: "Total Knee Replacement",
    indiaUsd: 5500,
    southAfricaUsd: null,
    ukUsd: 15000,
    uaeUsd: null,
    dataStatus: "needs_sa_uae_verification",
  },
  {
    treatment: "Total Hip Replacement",
    indiaUsd: 6200,
    southAfricaUsd: null,
    ukUsd: 18000,
    uaeUsd: null,
    dataStatus: "needs_sa_uae_verification",
  },
  {
    treatment: "Kidney Transplant",
    indiaUsd: 13000,
    southAfricaUsd: null,
    ukUsd: 50000,
    uaeUsd: null,
    dataStatus: "needs_sa_uae_verification",
  },
  {
    treatment: "Angioplasty (1 Stent)",
    indiaUsd: 4400,
    southAfricaUsd: null,
    ukUsd: 15000,
    uaeUsd: null,
    dataStatus: "needs_sa_uae_verification",
  },
  {
    treatment: "Spinal Fusion (up to 2 levels)",
    indiaUsd: 8200,
    southAfricaUsd: null,
    ukUsd: 35000,
    uaeUsd: null,
    dataStatus: "needs_sa_uae_verification",
  },
];

export interface NigeriaTreatmentCard {
  id: string;
  title: TreatmentOption | string;
  description: string;
  /** Starting price in USD from procedurePricing / package ranges */
  startingFromUsd: number;
  formTreatmentValue: TreatmentOption;
  /** Custom treatment icon under /public/logos/icons (optional) */
  iconSrc?: string;
}

export const NIGERIA_TREATMENT_CARDS: NigeriaTreatmentCard[] = [
  {
    id: "cardiac",
    title: "Cardiac Surgery",
    description: "Bypass, valve, and angioplasty packages with pre-travel cost estimates.",
    startingFromUsd: 4400,
    formTreatmentValue: "Cardiac Surgery",
    iconSrc: "/logos/icons/003-heart.svg",
  },
  {
    id: "cancer",
    title: "Cancer Treatment",
    description: "Oncology pathways including chemo, radiation, and surgical options.",
    // TODO: replace with verified oncology package floor price
    startingFromUsd: 3000,
    formTreatmentValue: "Cancer Treatment",
    iconSrc: "/logos/icons/002-ribbon.svg",
  },
  {
    id: "ortho",
    title: "Orthopedic",
    description: "Knee and hip replacement with implant options explained in writing.",
    startingFromUsd: 5500,
    formTreatmentValue: "Orthopedic (Knee/Hip)",
    iconSrc: "/logos/icons/004-arthritis.svg",
  },
  {
    id: "kidney",
    title: "Kidney Transplant",
    description: "Transplant coordination with hospital evaluation before you travel.",
    startingFromUsd: 13000,
    formTreatmentValue: "Kidney Transplant",
    iconSrc: "/logos/icons/005-kidney.svg",
  },
  {
    id: "ivf",
    title: "IVF / Fertility",
    description: "IVF and fertility workups at partner reproductive centres.",
    // TODO: replace with verified IVF package floor price
    startingFromUsd: 2500,
    formTreatmentValue: "IVF & Fertility",
    iconSrc: "/logos/icons/fertility.svg",
  },
  {
    id: "neuro",
    title: "Neurosurgery",
    description: "Spine and brain procedures matched to specialist hospital teams.",
    startingFromUsd: 7800,
    formTreatmentValue: "Neurosurgery",
    iconSrc: "/logos/icons/neuro.svg",
  },
];

/**
 * Realistic sample testimonials for layout/QA.
 * TODO: replace with ≥3 real, permissioned Nigerian patient stories before ads launch.
 */
export interface NigeriaTestimonial {
  patientName: string;
  cityInNigeria: string;
  treatmentType: string;
  hospitalName: string;
  doctorName: string;
  photoOrVideoUrl?: string;
  quote: string;
  /** Internal flag — not shown as bracketed dummy text on the page. */
  isPlaceholder: boolean;
}

export const NIGERIA_TESTIMONIALS: NigeriaTestimonial[] = [
  {
    patientName: "Chinedu O.",
    cityInNigeria: "Lagos",
    treatmentType: "Bypass surgery",
    hospitalName: "Apollo Hospitals, Chennai",
    doctorName: "Dr. R. Krishnan",
    quote:
      "Dr. Krishnan at Apollo did my bypass. The written estimate matched the hospital bill, and I was back in Lagos in three weeks.",
    isPlaceholder: true,
  },
  {
    patientName: "Amina B.",
    cityInNigeria: "Abuja",
    treatmentType: "Knee replacement",
    hospitalName: "Max Healthcare, Delhi",
    doctorName: "Dr. S. Mehta",
    quote:
      "Mum’s knee replacement at Max was scheduled within days of our video consult. One coordinator handled visa letters and airport pickup from start to finish.",
    isPlaceholder: true,
  },
  {
    patientName: "Emeka N.",
    cityInNigeria: "Port Harcourt",
    treatmentType: "Cancer treatment",
    hospitalName: "Yashoda Hospitals, Hyderabad",
    doctorName: "Dr. P. Reddy",
    quote:
      "We got a clear oncology package quote on WhatsApp before flying. Treatment at Yashoda felt organised — English throughout, no surprise add-ons from the coordinator.",
    isPlaceholder: true,
  },
];

export const NIGERIA_FAQ = [
  {
    question: "How do I know this isn't a scam? I've heard of agents disappearing with money.",
    answer:
      // TODO: confirm payment model before shipping ads
      "We are a coordination partner, not a hospital. You receive written hospital estimates before travel, and treatment invoices are issued by the hospital. We do not ask you to transfer treatment fees to a personal account. If anyone requests cash outside the hospital billing process, stop and contact us on our official WhatsApp line.",
  },
  {
    question: "How do I get a medical visa from Nigeria, and how long does it take?",
    answer:
      "Nigerian citizens typically apply for an Indian e-Medical Visa once the hospital issues the required invitation/letter. We help assemble and file the paperwork. Average approval is about 3–5 business days once documents are complete — timing can vary by consular processing.",
  },
  {
    question: "Do I pay you or the hospital directly?",
    answer:
      // TODO: confirm this is factually true for the business model before shipping
      "You pay the hospital directly for treatment. We do not collect treatment fees on the hospital's behalf. Our coordination service has no patient service fee. If your case uses a different escrow or deposit process, we will state that clearly in writing before you pay anything.",
  },
  {
    question: "Can a family member travel with me?",
    answer:
      "Yes. Most patients travel with one attendant. We help plan attendant visa documentation, nearby accommodation, and airport pickup so your family member can stay close to the hospital.",
  },
  {
    question: "What happens if I need more treatment than expected — are there hidden costs?",
    answer:
      "You receive a written preliminary estimate based on your reports. If the treating specialist recommends additional procedures or a longer stay, the hospital updates the estimate before those costs are incurred. We flag scope changes early so you can decide before committing.",
  },
  {
    question: "Do you offer payment plans or financing?",
    answer:
      "We do not lend money ourselves. Some hospitals accept staged payments for certain packages, and we can share financing information when available. Select “Not sure, need financing info” on the form and our coordinator will outline realistic options for your budget band.",
  },
  {
    question: "How much English is spoken, and will I be treated with respect and dignity as a Nigerian patient?",
    answer:
      "English is the working language in our partner international patient departments and among treating specialists. You get a dedicated coordinator (including WhatsApp access) who stays with your case — not a call-centre queue — from first estimate through discharge.",
  },
] as const;

export const NIGERIA_TRUST_POINTS = [
  {
    id: "visa",
    title: "e-Medical Visa",
    body: "For Nigerian citizens: we file it, average approval 3–5 business days",
  },
  {
    id: "payment",
    title: "Pay the hospital directly",
    body: "We do not collect treatment fees on their behalf",
  },
  {
    id: "coordinator",
    title: "Direct WhatsApp line",
    body: "A Nigerian patient coordinator — not a call center",
  },
] as const;

/**
 * Hero copy for /nigeria.
 * TODO: confirm package floor prices before ads launch.
 */
export const NIGERIA_HERO = {
  headline: "India’s best hospitals. Prices Nigerian families can afford.",
  subheadline:
    "Heart, cancer, IVF, joints, kidney & more — often half Dubai or South Africa. Free specialist report review in 24 hours.",
  primaryCta: "Get My Free Cost Estimate",
} as const;

export function formatMoney(amountUsd: number, currency: CurrencyMode): string {
  if (currency === "NGN") {
    const ngn = Math.round(amountUsd * NGN_PER_USD_APPROX);
    return `₦${ngn.toLocaleString("en-NG")}`;
  }
  return `$${amountUsd.toLocaleString("en-US")}`;
}

export function leadIntentScoreFromReportStatus(
  value: (typeof REPORT_STATUS_OPTIONS)[number]["value"] | ""
): LeadIntentScore | "" {
  const match = REPORT_STATUS_OPTIONS.find((o) => o.value === value);
  return match?.score ?? "";
}
