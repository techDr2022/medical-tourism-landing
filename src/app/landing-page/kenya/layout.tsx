import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { createPageMetadata } from "@/lib/seo";

const KENYA_LP_TITLE =
  "Medical Travel to India from Kenya | Hospital Coordination for Kenyan Patients";
const KENYA_LP_DESCRIPTION =
  "Kenya to India medical travel made simple. Free coordination with 200+ accredited hospitals in India, treatment estimates, visa guidance, and 20+ team members — no service fee for Kenyan patients.";

export const metadata: Metadata = createPageMetadata({
  title: KENYA_LP_TITLE,
  description: KENYA_LP_DESCRIPTION,
  path: "/landing-page/kenya",
  keywords: [
    "medical travel Kenya to India",
    "Kenya patients India hospital",
    "medical tourism Kenya India",
    "India treatment cost estimate Kenya",
    "free medical coordinator Kenya India",
  ],
});

export default function KenyaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <WebPageJsonLd
        path="/landing-page/kenya"
        title={KENYA_LP_TITLE}
        description={KENYA_LP_DESCRIPTION}
        speakableSelectors={["h1", "[data-speakable]"]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Kenya Medical Travel", path: "/landing-page/kenya" },
        ]}
      />
      {children}
    </>
  );
}
