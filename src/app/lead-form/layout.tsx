import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { createPageMetadata } from "@/lib/seo";

const LEAD_FORM_TITLE = "Request a Treatment Estimate | Medical Travel to India";
const LEAD_FORM_DESCRIPTION =
  "Submit medical reports for a free treatment estimate in India. Get hospital options, preliminary costs, and coordination from our 20+ team — worldwide patients welcome.";

export const metadata: Metadata = createPageMetadata({
  title: LEAD_FORM_TITLE,
  description: LEAD_FORM_DESCRIPTION,
  path: "/lead-form",
  keywords: [
    "medical travel inquiry",
    "treatment estimate India",
    "hospital options India",
    "medical reports upload",
    "free medical tourism quote India",
  ],
});

export default function LeadFormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <WebPageJsonLd
        path="/lead-form"
        title={LEAD_FORM_TITLE}
        description={LEAD_FORM_DESCRIPTION}
        speakableSelectors={["h1", "[data-speakable]"]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Request Treatment Estimate", path: "/lead-form" },
        ]}
      />
      {children}
    </>
  );
}
