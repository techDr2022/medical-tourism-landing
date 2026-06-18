import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Medical Treatment in India from Kenya | Hospital & Travel Coordination",
  description:
    "Free medical travel coordination for patients in Kenya seeking treatment in India. Hospital options, cost estimates, medical visa help, and 20+ coordinators — zero service fee.",
  path: "/for-kenya",
  keywords: [
    "medical travel Kenya to India",
    "Kenya patients India hospital",
    "medical tourism Kenya India",
    "India treatment cost estimate Kenya",
    "medical visa India Kenya",
  ],
});

export default function ForKenyaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
