/**
 * Africa landing page content — patients from Nigeria, Kenya, Ghana, Tanzania, Ethiopia, Uganda.
 *
 * TODO before Google Ads launch:
 * - Verify SA / regional comparison prices with ops
 * - Replace placeholder testimonials with permissioned patient stories
 * - Confirm medical visa timelines per country
 * - Set NEXT_PUBLIC_AFRICA_LEAD_WEBHOOK_URL
 */

import { HOSPITAL_NETWORK } from "@/constants";

export const AFRICA_WHATSAPP_DEFAULT_MESSAGE =
  "Hi, I'm from Africa and I'm interested in medical treatment in India. I'd like to learn about options and transparent pricing.";

export const AFRICA_TRUST_STRIP = {
  accreditation: "JCI & NABH Accredited Hospitals",
  patientCountLabel: "3,500+",
  sinceYear: "2016",
  hospitalNetworkLabel: HOSPITAL_NETWORK.fullLabel,
} as const;

export const AFRICA_COUNTRIES_SERVED = [
  "Nigeria",
  "Kenya",
  "Ghana",
  "Tanzania",
  "Ethiopia",
  "Uganda",
] as const;

export type AfricaCountry = (typeof AFRICA_COUNTRIES_SERVED)[number];

export const AFRICA_COUNTRY_META: Record<
  AfricaCountry,
  { flag: string; cities: readonly string[] }
> = {
  Nigeria: { flag: "🇳🇬", cities: ["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan"] },
  Kenya: { flag: "🇰🇪", cities: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"] },
  Ghana: { flag: "🇬🇭", cities: ["Accra", "Kumasi", "Tamale"] },
  Tanzania: { flag: "🇹🇿", cities: ["Dar es Salaam", "Dodoma", "Arusha"] },
  Ethiopia: { flag: "🇪🇹", cities: ["Addis Ababa", "Dire Dawa", "Mekelle"] },
  Uganda: { flag: "🇺🇬", cities: ["Kampala", "Entebbe", "Gulu"] },
};

/** Qualification dropdown — matches prompt spec. */
export const QUALIFICATION_TREATMENTS = [
  "Cardiac",
  "Orthopedic",
  "Cancer",
  "Transplant",
  "Neurology",
  "Other",
] as const;

export type QualificationTreatment = (typeof QUALIFICATION_TREATMENTS)[number];

export const QUALIFICATION_REPORT_OPTIONS = [
  { value: "yes", label: "Yes, I have reports" },
  { value: "no_consultation", label: "No, I need a consultation first" },
] as const;

export const QUALIFICATION_TRAVEL_OPTIONS = [
  { value: "yes_1_3_months", label: "Yes, within the next 1–3 months" },
  { value: "researching", label: "Just researching for now" },
] as const;

export type AfricaCurrencyMode = "USD" | "LOCAL";

export interface AfricaCostRow {
  treatment: string;
  indiaUsd: number;
  /** Typical private-hospital cost in patient's home region (indicative). */
  africaHomeUsd: number | null;
  ukUsd: number | null;
  southAfricaUsd: number | null;
}

/**
 * Indicative package floors — India + UK from repo anchors.
 * Africa home / SA figures are indicative until ops verifies.
 */
export const AFRICA_COST_ROWS: AfricaCostRow[] = [
  {
    treatment: "Bypass Surgery (CABG)",
    indiaUsd: 5500,
    africaHomeUsd: 14000,
    ukUsd: 25000,
    southAfricaUsd: 18000,
  },
  {
    treatment: "Total Knee Replacement",
    indiaUsd: 5500,
    africaHomeUsd: 11000,
    ukUsd: 15000,
    southAfricaUsd: 13000,
  },
  {
    treatment: "Total Hip Replacement",
    indiaUsd: 6200,
    africaHomeUsd: 12000,
    ukUsd: 18000,
    southAfricaUsd: 14500,
  },
  {
    treatment: "Kidney Transplant",
    indiaUsd: 13000,
    africaHomeUsd: 28000,
    ukUsd: 50000,
    southAfricaUsd: 35000,
  },
  {
    treatment: "Angioplasty (1 Stent)",
    indiaUsd: 4400,
    africaHomeUsd: 9000,
    ukUsd: 15000,
    southAfricaUsd: 11000,
  },
  {
    treatment: "Spinal Fusion (up to 2 levels)",
    indiaUsd: 8200,
    africaHomeUsd: 16000,
    ukUsd: 35000,
    southAfricaUsd: 22000,
  },
];

export interface AfricaTreatmentCard {
  id: string;
  title: string;
  description: string;
  startingFromUsd: number;
  qualificationValue: QualificationTreatment;
  formTreatmentValue: QualificationTreatment;
  iconSrc?: string;
}

export const AFRICA_TREATMENT_CARDS: AfricaTreatmentCard[] = [
  {
    id: "cardiac",
    title: "Cardiac Surgery",
    description: "Bypass, valve repair, and angioplasty with transparent package pricing.",
    startingFromUsd: 4400,
    qualificationValue: "Cardiac",
    formTreatmentValue: "Cardiac",
    iconSrc: "/logos/icons/003-heart.svg",
  },
  {
    id: "cancer",
    title: "Cancer Treatment",
    description: "Oncology pathways — chemo, radiation, and surgical options at accredited centres.",
    startingFromUsd: 3000,
    qualificationValue: "Cancer",
    formTreatmentValue: "Cancer",
    iconSrc: "/logos/icons/002-ribbon.svg",
  },
  {
    id: "ortho",
    title: "Orthopedic",
    description: "Knee and hip replacement with implant options explained in writing.",
    startingFromUsd: 5500,
    qualificationValue: "Orthopedic",
    formTreatmentValue: "Orthopedic",
    iconSrc: "/logos/icons/004-arthritis.svg",
  },
  {
    id: "transplant",
    title: "Organ Transplant",
    description: "Kidney and liver transplant coordination with hospital evaluation before travel.",
    startingFromUsd: 13000,
    qualificationValue: "Transplant",
    formTreatmentValue: "Transplant",
    iconSrc: "/logos/icons/005-kidney.svg",
  },
  {
    id: "neuro",
    title: "Neurology & Neurosurgery",
    description: "Brain and spine procedures matched to specialist hospital teams.",
    startingFromUsd: 7800,
    qualificationValue: "Neurology",
    formTreatmentValue: "Neurology",
    iconSrc: "/logos/icons/neuro.svg",
  },
];

export interface AfricaTestimonial {
  patientName: string;
  country: AfricaCountry;
  city: string;
  treatmentType: string;
  hospitalName: string;
  doctorName: string;
  quote: string;
  isPlaceholder: boolean;
}

export const AFRICA_TESTIMONIALS: AfricaTestimonial[] = [
  {
    patientName: "Chinedu O.",
    country: "Nigeria",
    city: "Lagos",
    treatmentType: "Bypass surgery",
    hospitalName: "Apollo Hospitals, Chennai",
    doctorName: "Dr. R. Krishnan",
    quote:
      "The written estimate matched the hospital bill. I was back in Lagos in three weeks — no hidden fees from the coordinator.",
    isPlaceholder: true,
  },
  {
    patientName: "Grace M.",
    country: "Kenya",
    city: "Nairobi",
    treatmentType: "Knee replacement",
    hospitalName: "Max Healthcare, Delhi",
    doctorName: "Dr. S. Mehta",
    quote:
      "One coordinator handled my e-Medical Visa letter, airport pickup, and accommodation for my husband. Everything was in English.",
    isPlaceholder: true,
  },
  {
    patientName: "Kwame A.",
    country: "Ghana",
    city: "Accra",
    treatmentType: "Cancer treatment",
    hospitalName: "Yashoda Hospitals, Hyderabad",
    doctorName: "Dr. P. Reddy",
    quote:
      "We compared costs with South Africa and the UK — India was significantly less, with the same JCI-accredited standard of care.",
    isPlaceholder: true,
  },
];

export const AFRICA_VISA_TRAVEL_POINTS = [
  {
    id: "visa",
    title: "Medical visa assistance",
    body: "We prepare hospital invitation letters and embassy documentation. Most African nationals receive e-Medical Visa approval in 3–7 business days.",
  },
  {
    id: "pickup",
    title: "Airport pickup & hospital transfer",
    body: "Your coordinator arranges pickup at Delhi, Mumbai, Chennai, or Hyderabad airports — direct to your hospital or accommodation.",
  },
  {
    id: "attendant",
    title: "Accommodation for your attendant",
    body: "Most patients travel with a family member. We help book nearby guest houses or hospital-attached lodging for your companion.",
  },
  {
    id: "food",
    title: "Dietary & cultural needs",
    body: "Halal meal options, vegetarian menus, and African food preferences can be arranged at partner hospitals on request.",
  },
  {
    id: "language",
    title: "Language & interpreter support",
    body: "English is the working language at our partner hospitals. Swahili, French, and Arabic interpreter support available on request.",
  },
  {
    id: "accreditation",
    title: "JCI & NABH accredited hospitals",
    body: "We work with internationally accredited hospitals — the same standards trusted by patients from the UK, Middle East, and Africa.",
  },
] as const;

export const AFRICA_TRUST_POINTS = [
  {
    id: "pricing",
    title: "Transparent pricing",
    body: "Written hospital estimates before you travel — no hidden fees, no surprise add-ons",
  },
  {
    id: "visa",
    title: "Medical visa support",
    body: "Invitation letters and embassy documentation filed on your behalf",
  },
  {
    id: "coordinator",
    title: "Dedicated WhatsApp coordinator",
    body: "One person from first enquiry through discharge — not a call centre",
  },
] as const;

export const AFRICA_FAQ = [
  {
    question: "How do I get a medical visa from my African country?",
    answer:
      "Most African nationals apply for an Indian e-Medical Visa once the hospital issues an invitation letter. We help assemble documents and guide you through the online application. Typical approval is 3–7 business days — timing varies by embassy workload and your nationality.",
  },
  {
    question: "How much does treatment in India cost compared to South Africa or the UK?",
    answer:
      "For procedures like bypass surgery, knee replacement, and kidney transplant, India packages are typically 40–70% less than private hospitals in South Africa or the UK — at JCI-accredited facilities. We provide written estimates based on your medical reports so you can compare before booking flights.",
  },
  {
    question: "Do I pay you or the hospital directly?",
    answer:
      "You pay the hospital directly for treatment. We are a coordination service — we do not collect treatment fees on the hospital's behalf. Our role is to match you with the right hospital, secure transparent pricing, and handle visa and travel logistics.",
  },
  {
    question: "Can a family member travel with me?",
    answer:
      "Yes. Most patients bring one attendant. We help with attendant visa documentation, nearby accommodation, airport pickup, and hospital visiting arrangements.",
  },
  {
    question: "Is halal food available at Indian hospitals?",
    answer:
      "Yes. Partner hospitals in Delhi, Hyderabad, and other cities offer halal meal options on request. Let your coordinator know your dietary requirements when planning travel.",
  },
  {
    question: "How do I know this service is trustworthy?",
    answer:
      "We work only with accredited hospitals that issue their own invoices. You receive written estimates before travel, and treatment fees go to the hospital — not to a personal account. Our official WhatsApp line is the same number listed on this page.",
  },
  {
    question: "What languages are spoken at the hospitals?",
    answer:
      "English is the primary language in international patient departments. Swahili, French, Hausa, and Arabic interpreter support can be arranged for consultations and during your hospital stay.",
  },
] as const;

export const AFRICA_HERO = {
  brand: "Medical Tours India",
  headline: "Treatment in India, guided for African families",
  headlineWithCountry: (country: string) =>
    `Treatment in India, guided for families from ${country}`,
  subheadline:
    "Transparent hospital pricing, medical visa letters, and a WhatsApp coordinator.",
  primaryCta: "Chat With Us on WhatsApp",
  secondaryCta: "Get free cost estimate",
} as const;

export function formatAfricaMoney(amountUsd: number): string {
  return `$${amountUsd.toLocaleString("en-US")}`;
}
