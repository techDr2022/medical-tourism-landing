/**
 * Content & data for /neuro-care — Africa → India neurology Google Ads LP.
 */

export const NEUROLOGY_BRAND = "Medical Tours India";
export const NEUROLOGY_DOMAIN = "medicaltoursindia.com";

export const NEUROLOGY_WHATSAPP_MESSAGE =
  "Hello, I need neurology treatment in India";

/** SEO — keep title ≤ ~60 chars, description ≤ ~155–160 chars. */
export const NEUROLOGY_SEO = {
  title: "Neurology Treatment in India for African Patients | Free Plan",
  description:
    "Brain, spine & epilepsy care in India for Nigeria, Kenya, Ghana & Africa. Free expert opinion in 24 hours, JCI hospitals, visa help — save 60–80%.",
  path: "/neuro-care",
  keywords: [
    "neurology treatment India African patients",
    "brain tumor surgery India cost Nigeria",
    "epilepsy surgery India Kenya",
    "Parkinson's DBS India Ghana",
    "spine surgery India Ethiopia",
    "stroke rehabilitation India Tanzania",
    "brain surgery India Uganda",
    "hydrocephalus treatment India Africa",
    "cerebral palsy surgery India",
    "multiple sclerosis treatment India",
    "neurosurgery India for African patients",
    "medical tourism neurology India",
    "medical visa India neurology",
    "neurology hospital India Africa",
    "CyberKnife brain tumor India cost",
  ],
} as const;

export const AFRICAN_COUNTRIES = [
  { value: "nigeria", label: "Nigeria" },
  { value: "kenya", label: "Kenya" },
  { value: "ghana", label: "Ghana" },
  { value: "ethiopia", label: "Ethiopia" },
  { value: "tanzania", label: "Tanzania" },
  { value: "uganda", label: "Uganda" },
  { value: "southafrica", label: "South Africa" },
  { value: "zambia", label: "Zambia" },
  { value: "zimbabwe", label: "Zimbabwe" },
  { value: "cameroon", label: "Cameroon" },
  { value: "senegal", label: "Senegal" },
  { value: "rwanda", label: "Rwanda" },
  { value: "mozambique", label: "Mozambique" },
  { value: "other", label: "Other Africa" },
] as const;

export const NEURO_CONDITIONS = [
  { value: "brain_tumor", label: "Brain Tumor" },
  { value: "epilepsy", label: "Epilepsy/Seizures" },
  { value: "stroke_rehab", label: "Stroke Rehabilitation" },
  { value: "spine", label: "Spine Surgery" },
  { value: "dbs", label: "Parkinson's Disease" },
  { value: "ms", label: "Multiple Sclerosis" },
  { value: "hydrocephalus", label: "Hydrocephalus" },
  { value: "cerebral_palsy", label: "Cerebral Palsy" },
  { value: "other", label: "Other" },
] as const;

export type CostProcedureKey =
  | "brain_tumor"
  | "epilepsy"
  | "dbs"
  | "spine"
  | "stroke_rehab"
  | "cyberknife";

export type CostCountryKey =
  | "nigeria"
  | "kenya"
  | "ghana"
  | "ethiopia"
  | "southafrica"
  | "tanzania"
  | "uganda"
  | "zambia"
  | "uk"
  | "us"
  | "india";

export const COST_PROCEDURES: { value: CostProcedureKey; label: string }[] = [
  { value: "brain_tumor", label: "Brain Tumor Surgery" },
  { value: "epilepsy", label: "Epilepsy Surgery" },
  { value: "dbs", label: "Parkinson's DBS" },
  { value: "spine", label: "Spine Surgery" },
  { value: "stroke_rehab", label: "Stroke Rehabilitation" },
  { value: "cyberknife", label: "CyberKnife / Radiosurgery" },
];

export const COST_COUNTRIES: {
  value: Exclude<CostCountryKey, "uk" | "us" | "india">;
  label: string;
}[] = [
  { value: "nigeria", label: "Nigeria" },
  { value: "kenya", label: "Kenya" },
  { value: "ghana", label: "Ghana" },
  { value: "ethiopia", label: "Ethiopia" },
  { value: "southafrica", label: "South Africa" },
  { value: "tanzania", label: "Tanzania" },
  { value: "uganda", label: "Uganda" },
  { value: "zambia", label: "Zambia" },
];

/** Approximate private-care USD costs for calculator (illustrative). */
export const NEUROLOGY_COSTS: Record<
  CostProcedureKey,
  Record<CostCountryKey, number>
> = {
  brain_tumor: {
    nigeria: 45000,
    kenya: 38000,
    ghana: 40000,
    ethiopia: 30000,
    southafrica: 55000,
    tanzania: 28000,
    uganda: 26000,
    zambia: 24000,
    uk: 95000,
    us: 120000,
    india: 13500,
  },
  epilepsy: {
    nigeria: 35000,
    kenya: 30000,
    ghana: 32000,
    ethiopia: 22000,
    southafrica: 48000,
    tanzania: 20000,
    uganda: 18000,
    zambia: 16000,
    uk: 75000,
    us: 95000,
    india: 9500,
  },
  dbs: {
    nigeria: 50000,
    kenya: 44000,
    ghana: 46000,
    ethiopia: 35000,
    southafrica: 85000,
    tanzania: 32000,
    uganda: 30000,
    zambia: 28000,
    uk: 90000,
    us: 110000,
    india: 22000,
  },
  spine: {
    nigeria: 25000,
    kenya: 22000,
    ghana: 24000,
    ethiopia: 16000,
    southafrica: 35000,
    tanzania: 14000,
    uganda: 13000,
    zambia: 12000,
    uk: 55000,
    us: 80000,
    india: 7500,
  },
  stroke_rehab: {
    nigeria: 18000,
    kenya: 14000,
    ghana: 16000,
    ethiopia: 10000,
    southafrica: 28000,
    tanzania: 8000,
    uganda: 7500,
    zambia: 7000,
    uk: 40000,
    us: 60000,
    india: 5500,
  },
  cyberknife: {
    nigeria: 40000,
    kenya: 35000,
    ghana: 38000,
    ethiopia: 26000,
    southafrica: 52000,
    tanzania: 22000,
    uganda: 20000,
    zambia: 18000,
    uk: 80000,
    us: 100000,
    india: 11000,
  },
};

export const NEUROLOGY_HERO = {
  subheadline:
    "Connect with India’s leading specialists, receive a personalised treatment plan within 24 hours and get complete support for your entire medical journey.",
} as const;

export const NEUROLOGY_BENEFITS = [
  "Free Expert Medical Opinion within 24 Hours",
  "Complimentary Video Consultation with a Senior Specialist",
  "Transparent Hospital Pricing — Pay Hospitals Directly",
  "Dedicated Patient Coordinator with Complete Travel Support",
] as const;

export const NEUROLOGY_STATS = [
  { value: "5,000+", label: "Patients Treated" },
  { value: "50+", label: "Top Specialists" },
  { value: "JCI & NABH", label: "Accredited Hospitals" },
] as const;

/**
 * Condition card images live in /public/services/
 */
export const NEUROLOGY_CONDITION_CARDS = [
  {
    slug: "brain-tumors",
    emoji: "🧠",
    image: "/services/brain-tumor.webp",
    name: "Brain Tumors",
    description:
      "Microsurgery, awake craniotomy, and stereotactic radiosurgery at leading neuro-oncology centres.",
    savings: "Save ~75% vs UK",
  },
  {
    slug: "epilepsy-surgery",
    emoji: "⚡",
    image: "/services/Epilepsy.jpeg",
    name: "Epilepsy Surgery",
    description:
      "Advanced EEG mapping, resective surgery, and VNS for drug-resistant seizures.",
    savings: "Save ~70% vs UK",
  },
  {
    slug: "stroke-rehab",
    emoji: "🫀",
    image: "/services/STROKE-rehab.png",
    name: "Stroke Rehab",
    description:
      "Multidisciplinary neuro-rehab programmes with physiotherapy, speech, and occupational therapy.",
    savings: "Save ~65% vs SA",
  },
  {
    slug: "spine-surgery",
    emoji: "🦴",
    image: "/services/spine-surgery.jpeg",
    name: "Spine Surgery",
    description:
      "Disc replacement, fusion, and minimally invasive spine procedures with neuro monitoring.",
    savings: "Save ~70% vs UK",
  },
  {
    slug: "parkinsons-dbs",
    emoji: "💊",
    image: "/services/parkinson.jpg",
    name: "Parkinson's DBS",
    description:
      "Deep brain stimulation with experienced functional neurosurgery teams and device programming.",
    savings: "Save ~75% vs SA",
  },
  {
    slug: "multiple-sclerosis",
    emoji: "🔬",
    image: "/services/multiple-sclerosis.webp",
    name: "Multiple Sclerosis",
    description:
      "Disease-modifying therapy plans, infusion centres, and specialist neurology follow-up.",
    savings: "Save ~60% vs UK",
  },
  {
    slug: "hydrocephalus",
    emoji: "💧",
    image: "/services/Hydrocephalus.webp",
    name: "Hydrocephalus",
    description:
      "VP shunt placement, endoscopic third ventriculostomy, and paediatric neurosurgery.",
    savings: "Save ~70% vs UK",
  },
  {
    slug: "cerebral-palsy",
    emoji: "🧒",
    image: "/services/cerebral-palsy.jpg",
    name: "Cerebral Palsy",
    description:
      "Selective dorsal rhizotomy, baclofen pumps, and long-term rehab pathways for children.",
    savings: "Save ~65% vs SA",
  },
] as const;

export const NEUROLOGY_STEPS = [
  {
    step: 1,
    title: "Search",
    description: "Tell us the treatment, hospital, doctor or city you need.",
    icon: "search",
    phase: "plan",
  },
  {
    step: 2,
    title: "Compare",
    description: "We compare hospitals, doctors, costs and patient reviews.",
    icon: "compare",
    phase: "plan",
  },
  {
    step: 3,
    title: "Upload",
    description: "Share your reports, scans and prescriptions securely.",
    icon: "upload",
    phase: "plan",
  },
  {
    step: 4,
    title: "Opinion",
    description: "Get a free expert medical opinion and teleconsult.",
    icon: "opinion",
    phase: "plan",
  },
  {
    step: 5,
    title: "Quote",
    description: "Receive a clear package with inclusions and exclusions.",
    icon: "quote",
    phase: "plan",
  },
  {
    step: 6,
    title: "Travel",
    description: "We arrange visa, stay, airport pickup and interpreter.",
    icon: "travel",
    phase: "travel",
  },
  {
    step: 7,
    title: "Treatment",
    description: "Admission, billing help and family updates throughout.",
    icon: "treatment",
    phase: "travel",
  },
  {
    step: 8,
    title: "Follow-up",
    description: "Records, recovery support and teleconsult after you return.",
    icon: "followup",
    phase: "travel",
  },
] as const;

export const NEUROLOGY_HOSPITALS = [
  {
    initials: "AH",
    name: "Apollo Hospitals",
    description:
      "Flagship neuro centres with advanced imaging, CyberKnife, and dedicated international patient desks.",
    badges: ["JCI", "NABH"],
  },
  {
    initials: "FH",
    name: "Fortis Healthcare",
    description:
      "High-volume epilepsy and stroke programmes with multidisciplinary neuro ICUs.",
    badges: ["JCI", "NABH"],
  },
  {
    initials: "MD",
    name: "Medanta – The Medicity",
    description:
      "Institute of Neurosciences known for complex brain tumours and functional neurosurgery.",
    badges: ["JCI", "NABH"],
  },
  {
    initials: "MH",
    name: "Manipal Hospitals",
    description:
      "Comprehensive neurology and neurosurgery with paediatric and spine specialities.",
    badges: ["NABH"],
  },
] as const;

export const NEUROLOGY_HOSPITAL_NETWORK_NOTE =
  "Access to 200+ accredited hospitals across India. Featured partners above are examples from our neurology network — we match you to the best clinical fit for your case.";

export const NEUROLOGY_TESTIMONIALS = [
  {
    initials: "AO",
    name: "Adebayo O.",
    flag: "🇳🇬",
    location: "Lagos, Nigeria",
    quote:
      "My UK quote for brain tumour surgery was over $120,000. In India at Apollo Chennai, the entire package — surgery, ICU, and stay — was a fraction of that. Medical Tours India handled my visa and airport pickup seamlessly.",
    stars: 5,
    tag: "Brain Tumor Surgery · Saved ~$100,000 vs UK",
    avatarColor: "#0E8A7A",
  },
  {
    initials: "FM",
    name: "Fatima M.",
    flag: "🇰🇪",
    location: "Nairobi, Kenya",
    quote:
      "My husband had drug-resistant epilepsy for years. After surgery at Fortis Delhi he has been seizure-free for two years. The neurologist explained every step in clear English — we never felt lost.",
    stars: 5,
    tag: "Epilepsy Surgery · Seizure-free 2 years",
    avatarColor: "#152B5E",
  },
  {
    initials: "KN",
    name: "Kwame N.",
    flag: "🇬🇭",
    location: "Accra, Ghana",
    quote:
      "Parkinson's DBS in South Africa was quoted at nearly $85,000. At Medanta we paid around $22,000 with the same device brand. The tremor control changed his life — and our family's.",
    stars: 5,
    tag: "Parkinson's DBS · Saved ~$63,000 vs SA",
    avatarColor: "#D4A843",
  },
] as const;

export const NEUROLOGY_FAQ = [
  {
    question: "How do I get a medical visa for India from Africa?",
    answer:
      "Once a partner hospital issues an invitation letter based on your reports, most African nationals apply for an Indian e-Medical Visa online. We prepare the hospital letter, guide document checklists, and walk you through the application. Typical approval is 3–7 business days depending on nationality and embassy workload.",
  },
  {
    question:
      "How much does the total trip cost including flights and accommodation?",
    answer:
      "Hospital packages usually cover treatment, hospital stay, and investigations. Flights, attendant lodging, and local transport are separate. For a typical 2–3 week neurology stay, many African families budget $1,500–$4,000 beyond treatment for two people — we share a written trip estimate with your treatment plan.",
  },
  {
    question: "Will there be a language barrier at Indian hospitals?",
    answer:
      "English is the working language in international patient departments at our partner hospitals. We can arrange French, Arabic, Swahili, or Hausa interpreter support for key consultations when needed.",
  },
  {
    question: "How do I send my medical reports to you?",
    answer:
      "Share scans, discharge summaries, and prescriptions via WhatsApp or the form on this page (PDF, JPG, or DICOM links). Our medical team reviews them and returns a free expert medical opinion with hospital recommendation, specialist names, and a cost breakdown — typically within 24 hours.",
  },
  {
    question: "Is Medical Tours India a hospital or a free patient service?",
    answer:
      "We are a medical travel coordination service — not a hospital. You pay the hospital directly for treatment. Our matching, estimates, visa letters, and on-ground support are free. We never recommend a hospital for any reason other than clinical fit and transparency.",
  },
  {
    question: "Can I bring a family member as an attendant?",
    answer:
      "Yes. Most neurology patients travel with one attendant. We help with attendant visa documentation, nearby accommodation, airport pickup, and hospital visiting arrangements so your family stays close throughout treatment.",
  },
] as const;

export const NEUROLOGY_SOCIAL_AVATARS = [
  { initials: "AO", color: "#0E8A7A" },
  { initials: "FM", color: "#152B5E" },
  { initials: "KN", color: "#D4A843" },
] as const;
