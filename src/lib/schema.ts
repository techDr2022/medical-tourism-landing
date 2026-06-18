import { HOSPITALS, PROCESS_STEPS } from "@/constants";
import { SITE_FAQ } from "@/lib/faq";
import { SITE, absoluteUrl } from "@/lib/seo";

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
        logo: absoluteUrl("/logos/new-logo.png"),
        email: SITE.contactEmail,
        telephone: `+${SITE.whatsapp}`,
        description: SITE.defaultDescription,
        areaServed: "Worldwide",
        knowsAbout: [
          "Medical tourism India",
          "Hospital coordination",
          "International patient care",
          "Medical visa India",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: `+${SITE.whatsapp}`,
            email: SITE.contactEmail,
            contactType: "customer service",
            availableLanguage: ["English"],
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
          name: "Coordinated treatments in India",
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
      buildFaqPageSchema(),
      buildHowToSchema(),
    ],
  };
}

export function buildFaqPageSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: SITE_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildHowToSchema() {
  return {
    "@type": "HowTo",
    "@id": `${SITE.url}/#process`,
    name: "How to get medical treatment in India as an international patient",
    description:
      "Step-by-step process for international patients coordinating medical treatment in India through MedicalToursIndia.",
    step: PROCESS_STEPS.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step,
      text: step,
    })),
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
