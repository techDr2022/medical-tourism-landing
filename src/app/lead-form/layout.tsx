import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Request a Treatment Estimate | Medical Travel to India",
  description:
    "Submit medical reports for a free treatment estimate in India. Get hospital options, preliminary costs, and coordination from our 20+ team — worldwide patients welcome.",
  path: "/lead-form",
  keywords: [
    "medical travel inquiry",
    "treatment estimate India",
    "hospital options India",
    "medical reports upload",
  ],
});

export default function LeadFormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
