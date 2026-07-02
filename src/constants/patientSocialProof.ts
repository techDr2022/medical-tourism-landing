export interface PatientTestimonial {
  name: string;
  country: string;
  flag: string;
  treatment: string;
  text: string;
}

export const PATIENT_ORIGIN_COUNTRIES = [
  { flag: "🇳🇬", name: "Nigeria" },
  { flag: "🇰🇪", name: "Kenya" },
  { flag: "🇦🇪", name: "UAE" },
  { flag: "🇮🇶", name: "Iraq" },
] as const;

export const PATIENT_TESTIMONIALS: PatientTestimonial[] = [
  {
    name: "James M.",
    country: "Kenya",
    flag: "🇰🇪",
    treatment: "Heart bypass surgery",
    text: "I was initially unsure about travelling to India for heart surgery. The coordination team helped arrange a video consultation with the specialist before I travelled. Everything was organised clearly — hospital admission, visa guidance, and accommodation. I came back home recovered and grateful.",
  },
  {
    name: "Grace W.",
    country: "Nigeria",
    flag: "🇳🇬",
    treatment: "Knee replacement for mother",
    text: "We were looking for options for my mother's knee replacement. The team shared hospital package estimates and explained the differences between room categories. There were no hidden charges from their side. Mum is walking again — the journey from Lagos felt manageable with one coordinator handling everything.",
  },
  {
    name: "Daniel O.",
    country: "UAE",
    flag: "🇦🇪",
    treatment: "Specialist video consultation",
    text: "I appreciated being able to speak with the doctor through video consultation before making travel plans. It helped us understand the procedure and expected hospital stay. Once we arrived in India, airport pickup and accommodation were already arranged.",
  },
  {
    name: "Fatima A.",
    country: "Iraq",
    flag: "🇮🇶",
    treatment: "Cardiac care coordination",
    text: "From the first enquiry to discharge, communication was clear. We were assigned one coordinator who handled hospital communication and documents. It reduced stress, especially when travelling abroad for medical treatment from Baghdad.",
  },
  {
    name: "Peter K.",
    country: "Kenya",
    flag: "🇰🇪",
    treatment: "Hospital cost estimate",
    text: "We received official hospital cost estimates before travelling. The final invoice was issued directly by the hospital as explained. The transparency gave us confidence in the process.",
  },
];

/** Shown above pricing — patients from key origin markets */
export const FEATURED_PATIENT_TESTIMONIALS = PATIENT_TESTIMONIALS.slice(0, 3);
