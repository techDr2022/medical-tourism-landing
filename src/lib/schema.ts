import { HOSPITALS, PROCESS_STEPS } from "@/constants";
import type { FaqItem } from "@/lib/faq";
import { SITE, absoluteUrl } from "@/lib/seo";

/** Richer HowTo copy for answer engines — UI still uses short PROCESS_STEPS labels. */
const PROCESS_STEP_DETAILS: { name: string; text: string }[] = [
  {
    name: "Share medical reports",
    text: "Submit your medical reports and contact details via the lead form or WhatsApp so our coordinators can review your case.",
  },
  {
    name: "Receive hospital options and preliminary estimate",
    text: "Within about 24–48 hours you receive suitable accredited hospital options in India and a preliminary treatment package estimate.",
  },
  {
    name: "Optional video consultation",
    text: "Arrange an optional video consultation with a hospital specialist to discuss your condition, plan, and expected stay before you travel.",
  },
  {
    name: "Confirm hospital and travel dates",
    text: "Choose your preferred hospital and confirm travel and admission dates with your dedicated coordinator.",
  },
  {
    name: "Visa and accommodation coordination",
    text: "We guide medical visa documentation and help arrange airport pickup and accommodation near the hospital.",
  },
  {
    name: "Treatment in India",
    text: "Receive treatment at the accredited hospital while your coordinator supports admission, local logistics, and in-hospital needs.",
  },
  {
    name: "Post-treatment follow-up communication",
    text: "After discharge we help with follow-up communication and return-travel coordination so you stay connected with the care team.",
  },
];

export function buildOrganizationGraph() {
  const organizationId = `${SITE.url}/#organization`;
  const websiteId = `${SITE.url}/#website`;
  const serviceId = `${SITE.url}/#service`;
  const businessId = `${SITE.url}/#medical-business`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE.name,
        url: SITE.url,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/logos/new-logo.png"),
        },
        image: absoluteUrl("/logos/new-logo.png"),
        email: SITE.contactEmail,
        telephone: `+${SITE.whatsapp}`,
        description: SITE.defaultDescription,
        areaServed: [
          { "@type": "Place", name: "Worldwide" },
          { "@type": "Country", name: "Kenya" },
          { "@type": "Country", name: "Nigeria" },
          { "@type": "Country", name: "Afghanistan" },
          { "@type": "Country", name: "India" },
        ],
        knowsAbout: [
          "Medical tourism India",
          "Medical travel coordination",
          "Hospital matching for international patients",
          "Treatment cost estimates India",
          "Medical visa India",
          "Cardiac surgery India",
          "Orthopaedic surgery India",
          "Cancer treatment India",
          "Organ transplant India",
          "IVF and fertility India",
          "Neurosurgery India",
          "International patient departments India",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: `+${SITE.whatsapp}`,
            email: SITE.contactEmail,
            contactType: "customer service",
            availableLanguage: [
              "English",
              "Hindi",
              "Arabic",
              "French",
              "Dari",
              "Pashto",
              "Hausa",
              "Yoruba",
              "Igbo",
            ],
            areaServed: "Worldwide",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE.url,
        name: SITE.name,
        description: SITE.defaultDescription,
        publisher: { "@id": organizationId },
        inLanguage: "en",
        potentialAction: {
          "@type": "CommunicateAction",
          target: absoluteUrl("/lead-form"),
          name: "Request a treatment estimate",
        },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: "Medical Travel Coordination to India",
        description:
          "Free end-to-end coordination for international patients seeking treatment in India — hospital matching, estimates, visa guidance, and travel support.",
        provider: { "@id": organizationId },
        areaServed: "Worldwide",
        serviceType: "Medical travel coordination",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Zero coordination cost — no service fee",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Partner hospitals in India",
          itemListElement: HOSPITALS.map((hospital, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "MedicalOrganization",
              name: hospital.name,
            },
          })),
        },
      },
      {
        "@type": "MedicalBusiness",
        "@id": businessId,
        name: SITE.name,
        url: SITE.url,
        description: SITE.defaultDescription,
        image: absoluteUrl("/logos/new-logo.png"),
        email: SITE.contactEmail,
        telephone: `+${SITE.whatsapp}`,
        areaServed: { "@type": "Place", name: "Worldwide" },
        parentOrganization: { "@id": organizationId },
        medicalSpecialty: "Medical travel coordination",
      },
      buildHowToSchema({ standalone: false }),
    ],
  };
}

export function buildFaqPageSchema(
  faqs: readonly FaqItem[] | FaqItem[],
  pagePath = "/"
) {
  const pageUrl = absoluteUrl(pagePath);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildHowToSchema(
  options?: {
    path?: string;
    name?: string;
    description?: string;
    steps?: readonly { name: string; text: string }[];
    /** When true (default), include @context for a standalone JSON-LD script. */
    standalone?: boolean;
  }
) {
  const path = options?.path ?? "/";
  const pageUrl = absoluteUrl(path);
  const standalone = options?.standalone !== false;
  const steps =
    options?.steps ??
    (PROCESS_STEP_DETAILS.length === PROCESS_STEPS.length
      ? PROCESS_STEP_DETAILS
      : PROCESS_STEPS.map((step) => ({ name: step, text: step })));

  return {
    ...(standalone ? { "@context": "https://schema.org" } : {}),
    "@type": "HowTo",
    "@id": `${pageUrl}#process`,
    name:
      options?.name ??
      "How to get medical treatment in India as an international patient",
    description:
      options?.description ??
      "Step-by-step process for international patients coordinating medical treatment in India through MedicalToursIndia at zero coordination cost.",
    totalTime: "P14D",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${pageUrl}#process`,
    })),
  };
}

export function buildWebPageSchema({
  path,
  title,
  description,
  speakableSelectors = ["h1", "[data-speakable]"],
}: {
  path: string;
  title: string;
  description: string;
  speakableSelectors?: string[];
}) {
  const pageUrl = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: speakableSelectors,
    },
    potentialAction: {
      "@type": "CommunicateAction",
      name: "Request a free treatment estimate",
      target: absoluteUrl("/lead-form"),
    },
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
