import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { SITE_FAQ } from "@/lib/faq";
import { createPageMetadata } from "@/lib/seo";

const KENYA_TITLE =
  "Medical Treatment in India from Kenya | Hospital & Travel Coordination";
const KENYA_DESCRIPTION =
  "Free medical travel coordination for patients in Kenya seeking treatment in India. Hospital options, cost estimates, medical visa help, and 20+ coordinators — zero service fee.";

export const metadata: Metadata = createPageMetadata({
  title: KENYA_TITLE,
  description: KENYA_DESCRIPTION,
  path: "/for-kenya",
  keywords: [
    "medical travel Kenya to India",
    "Kenya patients India hospital",
    "medical tourism Kenya India",
    "India treatment cost estimate Kenya",
    "medical visa India Kenya",
    "heart surgery India from Kenya",
    "cancer treatment India Kenya",
    "knee replacement India Kenya cost",
    "Nairobi medical tourism India",
  ],
});

export default function ForKenyaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <WebPageJsonLd
        path="/for-kenya"
        title={KENYA_TITLE}
        description={KENYA_DESCRIPTION}
        speakableSelectors={["h1", "[data-speakable]", "#faq"]}
      />
      <FaqJsonLd faqs={SITE_FAQ} path="/for-kenya" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Medical Travel from Kenya", path: "/for-kenya" },
        ]}
      />
      {children}
    </>
  );
}
