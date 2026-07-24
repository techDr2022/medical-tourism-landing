import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import {
  NEUROLOGY_BRAND,
  NEUROLOGY_CONDITION_CARDS,
  NEUROLOGY_FAQ,
  NEUROLOGY_SEO,
  NEUROLOGY_STEPS,
} from "@/constants/neurology";
import { buildHowToSchema } from "@/lib/schema";
import { absoluteUrl, createPageMetadata, SITE } from "@/lib/seo";
import "./neurology.css";

/** Google Ads account for Neurology LP conversions (config only — conversion on thank-you). */
const NEUROLOGY_GOOGLE_ADS_ID = "AW-18246472126";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--neuro-font-sans",
  display: "swap",
  preload: true,
});

const { title: TITLE, description: DESCRIPTION, path: PATH } = NEUROLOGY_SEO;

export const metadata: Metadata = {
  ...createPageMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    keywords: [...NEUROLOGY_SEO.keywords],
  }),
  icons: {
    icon: "/logos/medical%20tours%20india%20favicon.png",
    apple: "/logos/medical%20tours%20india%20favicon.png",
  },
  category: "health",
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
  },
};

export default function NeurologyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageUrl = absoluteUrl(PATH);

  return (
    <div className={`${inter.variable} ${inter.className}`}>
      {/* Google Ads base tag — Neurology Lead Form conversion fires on /neuro-care/thank-you */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${NEUROLOGY_GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="neurology-google-ads-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${NEUROLOGY_GOOGLE_ADS_ID}');
        `}
      </Script>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "MedicalOrganization",
              "@id": `${pageUrl}#provider`,
              name: NEUROLOGY_BRAND,
              url: SITE.url,
              logo: absoluteUrl("/logos/new-logo.png"),
              image: absoluteUrl("/logos/new-logo.png"),
              description:
                "Medical tourism facilitator connecting African patients with JCI-accredited Indian neurology and neurosurgery hospitals.",
              medicalSpecialty: ["Neurology", "Neurosurgery"],
              areaServed: [
                "Nigeria",
                "Kenya",
                "Ghana",
                "Ethiopia",
                "Tanzania",
                "Uganda",
                "South Africa",
                "Zambia",
                "Zimbabwe",
                "Cameroon",
                "Senegal",
                "Rwanda",
                "Mozambique",
              ].map((name) => ({ "@type": "Country", name })),
              contactPoint: {
                "@type": "ContactPoint",
                telephone: `+${SITE.whatsapp}`,
                contactType: "customer service",
                availableLanguage: ["English", "French", "Arabic", "Swahili"],
                areaServed: "Africa",
              },
            },
            {
              "@type": "Service",
              "@id": `${pageUrl}#neurology-service`,
              name: "Neurology Treatment Coordination in India",
              serviceType: "Neurology medical travel coordination",
              description: DESCRIPTION,
              provider: { "@id": `${pageUrl}#provider` },
              areaServed: "Africa",
              audience: {
                "@type": "PeopleAudience",
                geographicArea: { "@type": "Place", name: "Africa" },
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description:
                  "Free expert medical opinion, treatment plan, and coordination — patients pay hospitals directly",
              },
            },
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#conditions`,
              name: "Neurological conditions treated in India",
              numberOfItems: NEUROLOGY_CONDITION_CARDS.length,
              itemListElement: NEUROLOGY_CONDITION_CARDS.map((card, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: card.name,
                description: card.description,
                url: `${pageUrl}#conditions`,
                ...(card.image
                  ? {
                      image: absoluteUrl(card.image),
                    }
                  : {}),
              })),
            },
          ],
        }}
      />
      <JsonLd
        data={buildHowToSchema({
          path: PATH,
          name: "How African patients get neurology treatment in India",
          description:
            "Step-by-step medical journey from searching hospitals to post-treatment follow-up for neurology care in India.",
          steps: NEUROLOGY_STEPS.map((step) => ({
            name: step.title,
            text: `${step.title}: ${step.description}`,
          })),
        })}
      />
      <WebPageJsonLd
        path={PATH}
        title={TITLE}
        description={DESCRIPTION}
        speakableSelectors={[
          "h1",
          "[data-speakable]",
          "#faq",
          "#conditions",
          "#process",
        ]}
      />
      <FaqJsonLd faqs={[...NEUROLOGY_FAQ]} path={PATH} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Neurology Treatment in India", path: PATH },
        ]}
      />
      {children}
    </div>
  );
}
