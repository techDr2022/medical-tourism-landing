/**
 * Afghanistan landing page content & pricing anchors.
 *
 * TODO before Google Ads launch — see also comment block on /afghanistan page.tsx:
 * - Confirm visa process answer (CRITICAL)
 * - Confirm payment method answer (CRITICAL)
 * - Replace placeholder pricing figures
 * - Replace placeholder testimonials with real Afghan patient stories
 * - Confirm Dari/Pashto WhatsApp support
 * - Verify Apollo / JCI / Afghan patient-count trust strip claims
 */

import { HOSPITAL_NETWORK } from "@/constants";
import {
  BUDGET_BANDS,
  PATIENT_RELATION_OPTIONS,
  REPORT_STATUS_OPTIONS,
  TREATMENT_OPTIONS,
  leadIntentScoreFromReportStatus,
  type BudgetBand,
  type LeadIntentScore,
  type TreatmentOption,
} from "@/constants/nigeria";

export {
  BUDGET_BANDS,
  PATIENT_RELATION_OPTIONS,
  REPORT_STATUS_OPTIONS,
  TREATMENT_OPTIONS,
  leadIntentScoreFromReportStatus,
};
export type { BudgetBand, LeadIntentScore, TreatmentOption };

export const AFGHANISTAN_WHATSAPP_DEFAULT_MESSAGE =
  "Hi, I want to ask about treatment cost in India";

/**
 * Trust strip under the hero.
 * TODO: fill real hospital name, accreditation, and Afghan patient count before ads.
 * Do not launch with placeholder trust claims.
 */
export const AFGHANISTAN_TRUST_STRIP = {
  /** TODO: confirm hospital/group name for trust strip */
  hospitalName: "[Hospital Name/Group]",
  accreditation: "JCI Accredited",
  /** TODO: replace with verified assisted-patient count */
  patientCountLabel: "[X]",
  hospitalNetworkLabel: HOSPITAL_NETWORK.fullLabel,
} as const;

export const AFGHANISTAN_CITIES = [
  "Kabul",
  "Herat",
  "Mazar-i-Sharif",
  "Kandahar",
  "Jalalabad",
  "Other",
] as const;

/**
 * WhatsApp country prefixes — many Afghan patients use PK/IR numbers.
 * Default +93; dropdown allows override (not a fixed hardcode).
 */
export const AFGHANISTAN_WHATSAPP_PREFIXES = [
  { code: "+93", label: "Afghanistan (+93)", country: "AF" },
  { code: "+92", label: "Pakistan (+92)", country: "PK" },
  { code: "+98", label: "Iran (+98)", country: "IR" },
  { code: "+971", label: "UAE (+971)", country: "AE" },
  { code: "+91", label: "India (+91)", country: "IN" },
] as const;

export type AfghanistanWhatsAppPrefix =
  (typeof AFGHANISTAN_WHATSAPP_PREFIXES)[number]["code"];

export interface AfghanistanTreatmentCard {
  id: string;
  title: TreatmentOption | string;
  description: string;
  /** Starting price in USD — TODO: confirm all figures before ads */
  startingFromUsd: number;
  formTreatmentValue: TreatmentOption;
  iconSrc?: string;
}

export const AFGHANISTAN_TREATMENT_CARDS: AfghanistanTreatmentCard[] = [
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
 * Patient stories for /afghanistan — SEO-oriented copy (cities, treatments, hospitals).
 * TODO: replace with permissioned, verifiable Afghan patient stories before ads launch.
 */
export interface AfghanistanTestimonial {
  patientName: string;
  city: string;
  treatmentType: string;
  hospitalName: string;
  doctorName: string;
  photoOrVideoUrl?: string;
  quote: string;
  /** Internal ops flag — not shown on the page. */
  isPlaceholder: boolean;
}

export const AFGHANISTAN_TESTIMONIALS: AfghanistanTestimonial[] = [
  {
    patientName: "Ahmad R.",
    city: "Kabul",
    treatmentType: "Cardiac surgery",
    hospitalName: "Apollo Hospitals, Delhi",
    doctorName: "Cardiac care team",
    quote:
      "From Kabul, we needed heart surgery in India without guessing at costs. MedicalToursIndia reviewed our reports on WhatsApp, compared three accredited hospital options, and we chose Apollo Hospitals in Delhi. The written estimate matched what we paid — clear and professional throughout.",
    isPlaceholder: true,
  },
  {
    patientName: "Fatima S.",
    city: "Herat",
    treatmentType: "Orthopedic surgery",
    hospitalName: "Max Healthcare, Delhi",
    doctorName: "Orthopedic care team",
    quote:
      "We were looking for orthopedic surgery in India for my mother and needed options we could afford. They sent three hospital packages matched to our budget. We chose Max Healthcare in Delhi, got help with travel planning, and felt supported from Herat until discharge.",
    isPlaceholder: true,
  },
  {
    patientName: "Omar K.",
    city: "Mazar-i-Sharif",
    treatmentType: "Cancer treatment",
    hospitalName: "Yashoda Hospitals, Hyderabad",
    doctorName: "Oncology care team",
    quote:
      "Cancer treatment abroad felt overwhelming from Mazar-i-Sharif. We received a clear oncology plan and hospital options in India, then selected Yashoda Hospitals in Hyderabad. WhatsApp updates kept our family informed at every step — no surprise fees, no confusion.",
    isPlaceholder: true,
  },
];

/**
 * Critical honesty FAQ — placed high on the page (after hero).
 * Items 1–2 are INTENTIONALLY vague until ops confirms process details.
 */
export const AFGHANISTAN_VISA_PAYMENT_FAQ = [
  {
    question: "How do I get an Indian visa from Afghanistan?",
    answer:
      // TODO CRITICAL — DO NOT SHIP ADS WITHOUT CONFIRMING THIS ANSWER.
      // Do not invent timelines (e.g. "3–5 days") or a specific method until verified.
      "We will guide you through the current visa process step by step once you contact us, including travel to a third country or current e-visa status where applicable, based on the latest requirements for your situation. Requirements change — we will not promise a fixed timeline until we review your case.",
  },
  {
    question: "How do I pay for treatment given banking restrictions in Afghanistan?",
    answer:
      // TODO CRITICAL — DO NOT SHIP ADS WITHOUT CONFIRMING THIS ANSWER.
      // Do not invent a specific payment method (cash on arrival / intermediary) as guaranteed.
      "We will explain available payment options — including approaches such as cash on arrival or transfer via an intermediary where they apply — once we understand your treatment plan. We will state every payment step in writing before you send money anywhere.",
  },
  {
    question: "Can a family member travel with me?",
    answer:
      // TODO: confirm attendant policy with business owner before ads launch.
      "Yes. Most patients travel with one family attendant. We help plan attendant documentation, nearby accommodation, and airport pickup so your family member can stay close to the hospital.",
  },
  {
    question: "Is it safe to travel to India for treatment?",
    answer:
      "Partner hospitals treat international patients daily in accredited facilities. You receive a written preliminary plan, a dedicated coordinator on WhatsApp, and hospital-arranged airport pickup. We work with JCI-accredited and nationally accredited centres — you choose among the options we present after reviewing your reports.",
  },
] as const;

export const AFGHANISTAN_HOW_IT_WORKS = [
  {
    step: 1,
    title: "Send your medical reports",
    body: "Share your diagnosis or reports via WhatsApp — no fee to start.",
  },
  {
    step: 2,
    title: "Get 3 hospital options",
    body: "We match you with 3 accredited hospitals based on your budget and treatment.",
  },
  {
    step: 3,
    title: "You choose",
    body: "Pick the hospital that fits you — we introduce you directly to their international desk.",
  },
  {
    step: 4,
    title: "Visa & travel guidance",
    // Kept general until visa TODO is confirmed — do not promise a specific process here.
    body: "We guide you through visa and travel arrangements for your specific situation.",
  },
] as const;

/** Hero copy — keep short and scannable on mobile. */
export const AFGHANISTAN_HERO = {
  headline: "Compare 3 Hospitals in India for Your Treatment",
  subheadline:
    "Send your medical reports on WhatsApp. We match you by condition and budget — you choose. No fee to use this service.",
  primaryCta: "Send My Reports — Get 3 Hospital Options",
} as const;

export function formatUsd(amountUsd: number): string {
  return `$${amountUsd.toLocaleString("en-US")}`;
}
