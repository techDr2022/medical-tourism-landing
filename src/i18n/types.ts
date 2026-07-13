export type Dictionary = {
  common: {
    brand: string;
    nav: {
      whyIndia: string;
      hospitals: string;
      services: string;
      pricing: string;
      process: string;
      contact: string;
    };
    cta: {
      requestEstimate: string;
      talkToExpert: string;
      getFreeConsultation: string;
      mobileSticky: string;
    };
    language: string;
    whatsappAria: string;
    whatsappBubble: string;
    whatsappDefaultMessage: string;
  };
  footer: {
    importantTitle: string;
    importantBody: string;
    metricHospitals: string;
    metricSupport: string;
    metricCoordinators: string;
    about: string;
    privacy: string;
    terms: string;
    rights: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    body: string;
    coordinationDefault: string;
    coordinationKenya: string;
    primaryCta: string;
    secondaryCta: string;
  };
  afghanistan: {
    headline: string;
    subheadline: string;
    languageNote: string;
    primaryCta: string;
    trustHint: string;
    faqOverline: string;
    faqTitle: string;
    faqSubtitle: string;
    howOverline: string;
    howTitle: string;
    howBody: string;
    treatmentsOverline: string;
    treatmentsTitle: string;
    treatmentsSubtitle: string;
    storiesOverline: string;
    storiesTitle: string;
    finalTitle: string;
    finalBody: string;
    stickyCta: string;
  };
  nigeria: {
    headline: string;
    priceFrom: string;
    subheadline: string;
    primaryCta: string;
    stickyCta: string;
  };
};

export type TranslationKey =
  | `common.${keyof Dictionary["common"]}`
  | string;
