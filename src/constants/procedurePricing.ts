export interface ProcedurePrice {
  name: string;
  indiaPrice: string;
  /** Indicative Western price anchor for savings context */
  comparison?: string;
}

export interface ProcedureCategory {
  title: string;
  procedures: ProcedurePrice[];
}

export const PROCEDURE_PRICE_CATEGORIES: ProcedureCategory[] = [
  {
    title: "Cardiac Procedures",
    procedures: [
      {
        name: "Angiography",
        indiaPrice: "from $400",
        comparison: "typically $5,000+ in the US, £2,500+ in the UK",
      },
      {
        name: "Angioplasty (1 Stent)",
        indiaPrice: "from $4,400",
        comparison: "typically $30,000+ in the US, £15,000+ in the UK",
      },
      {
        name: "Bypass Surgery (CABG)",
        indiaPrice: "from $5,500",
        comparison: "typically $70,000+ in the US, £25,000+ in the UK",
      },
      {
        name: "Valve Replacement",
        indiaPrice: "from $8,000",
        comparison: "typically $80,000+ in the US, £30,000+ in the UK",
      },
    ],
  },
  {
    title: "Orthopaedic Procedures",
    procedures: [
      {
        name: "Total Knee Replacement (Single Knee)",
        indiaPrice: "from $5,500",
        comparison: "typically $35,000+ in the US, £15,000+ in the UK",
      },
      {
        name: "Total Hip Replacement",
        indiaPrice: "from $6,200",
        comparison: "typically $40,000+ in the US, £18,000+ in the UK",
      },
    ],
  },
  {
    title: "Neurosurgery",
    procedures: [
      {
        name: "Spinal Fusion (Up to Two Levels)",
        indiaPrice: "from $8,200",
        comparison: "typically $80,000+ in the US, £35,000+ in the UK",
      },
      {
        name: "Craniotomy",
        indiaPrice: "from $7,800",
        comparison: "typically $100,000+ in the US, £40,000+ in the UK",
      },
    ],
  },
  {
    title: "Transplant Procedures",
    procedures: [
      {
        name: "Kidney Transplant",
        indiaPrice: "from $13,000",
        comparison: "typically $100,000+ in the US, £50,000+ in the UK",
      },
      {
        name: "Liver Transplant (Adult)",
        indiaPrice: "from $27,000",
        comparison: "typically $300,000+ in the US, £100,000+ in the UK",
      },
    ],
  },
];
