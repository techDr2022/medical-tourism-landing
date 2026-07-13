import type { Metadata } from "next";
import { AfghanistanHowToJsonLd } from "@/components/seo/AfghanistanHowToJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { AFGHANISTAN_VISA_PAYMENT_FAQ } from "@/constants/afghanistan";
import { createPageMetadata } from "@/lib/seo";

const AFGHANISTAN_TITLE =
  "Medical Treatment in India for Afghan Patients | Compare Hospital Options";
const AFGHANISTAN_DESCRIPTION =
  "Afghan patients seeking treatment in India: send your reports on WhatsApp and compare 3 accredited hospital options matched to your condition and budget. No fee to use this service. Honest guidance on visa and payment realities.";

export const metadata: Metadata = createPageMetadata({
  title: AFGHANISTAN_TITLE,
  description: AFGHANISTAN_DESCRIPTION,
  path: "/afghanistan",
  keywords: [
    "medical treatment India for Afghan patients",
    "Afghanistan medical tourism India",
    "hospital options India from Afghanistan",
    "medical visa India from Afghanistan",
    "medical travel Afghanistan to India",
    "compare hospitals India Afghan patients",
    "cancer treatment India Afghanistan",
    "heart surgery India Afghan patients",
    "treatment in India from Kabul",
    "WhatsApp hospital estimate India Afghanistan",
  ],
});

export default function AfghanistanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <WebPageJsonLd
        path="/afghanistan"
        title={AFGHANISTAN_TITLE}
        description={AFGHANISTAN_DESCRIPTION}
        speakableSelectors={["h1", "[data-speakable]", "#faq"]}
      />
      <FaqJsonLd faqs={[...AFGHANISTAN_VISA_PAYMENT_FAQ]} path="/afghanistan" />
      <AfghanistanHowToJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Medical Travel from Afghanistan", path: "/afghanistan" },
        ]}
      />
      {children}
    </>
  );
}
