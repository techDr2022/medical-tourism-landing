// Add your hospital logos to the /public/logos/ directory
// Format: { name: "Hospital Name", logo: "/logos/filename.png" }
//
// Featured grid shows 20 partner names. Entries with a logo path render the image;
// missing files fall back to the hospital name (see HospitalLogo).
// Network claim remains 200+ accredited hospitals in India.

export const HOSPITALS = [
  { name: "Apollo Hospitals", logo: "/logos/Apollo_Hospitals_Logo.svg" },
  { name: "Max Healthcare", logo: "/logos/Max-Healthcare-Logo.png" },
  { name: "Medicover", logo: "/logos/Logo-medicover.png" },
  { name: "Yashoda Hospitals", logo: "/logos/Yashoda_Hospitals_logo.png" },
  { name: "CNC", logo: "/logos/cnc-logo-1-e1738403987399.webp" },
  { name: "Fortis Healthcare", logo: "/logos/hospitals/fortis.png" },
  { name: "Manipal Hospitals", logo: "/logos/hospitals/manipal.png" },
  { name: "Medanta", logo: "/logos/hospitals/medanta.png" },
  { name: "Narayana Health", logo: "/logos/hospitals/narayana.svg" },
  { name: "Aster Hospitals", logo: "/logos/hospitals/aster.svg" },
  { name: "Artemis Hospitals", logo: "/logos/hospitals/artemis.png" },
  { name: "BLK-Max Super Speciality", logo: "/logos/hospitals/blkmax.png" },
  { name: "Gleneagles Hospitals", logo: "/logos/hospitals/gleneagles.png" },
  { name: "Care Hospitals", logo: "/logos/hospitals/care.png" },
  { name: "HCG Cancer Centre", logo: "/logos/hospitals/hcg.png" },
  { name: "Kokilaben Hospital", logo: "/logos/hospitals/kokilaben.svg" },
  { name: "Amrita Hospital", logo: "/logos/hospitals/amrita.svg" },
  { name: "KIMS Hospitals", logo: "/logos/hospitals/kims.png" },
  { name: "Rainbow Children's Hospital", logo: "/logos/hospitals/rainbow.svg" },
  { name: "Asian Heart Institute", logo: "/logos/hospitals/asianheart.png" },
] as const;

/** Site-wide hospital network claim — keep copy consistent everywhere. */
export const HOSPITAL_NETWORK = {
  countLabel: "200+",
  shortLabel: "200+ accredited hospitals",
  fullLabel: "200+ accredited hospitals in India",
  /** Closing line under the logo grid */
  moreInWords: "200+ accredited hospitals across India",
} as const;

export const PROCESS_STEPS = [
  "Share medical reports",
  "Receive hospital options and preliminary estimate",
  "Optional video consultation",
  "Confirm hospital and travel dates",
  "Visa and accommodation coordination",
  "Treatment in India",
  "Post-treatment follow-up communication",
];
