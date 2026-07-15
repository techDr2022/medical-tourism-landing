import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { AFRICA_FAQ } from "@/constants/africa";
import { createPageMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--af-font-inter",
  display: "swap",
});

const AFRICA_TITLE =
  "Medical Treatment in India for African Patients | Transparent Pricing & Visa Help";
const AFRICA_DESCRIPTION =
  "African patients from Nigeria, Kenya, Ghana, Tanzania, Ethiopia, and Uganda — world-class treatment in India with transparent pricing, medical visa assistance, and a dedicated WhatsApp coordinator.";

/** Google Ads account for Africa LP conversions (config only — no conversion on load). */
const AFRICA_GOOGLE_ADS_ID = "AW-18246472126";

export const metadata: Metadata = createPageMetadata({
  title: AFRICA_TITLE,
  description: AFRICA_DESCRIPTION,
  path: "/africa",
  keywords: [
    "medical treatment India for African patients",
    "medical tourism India Africa",
    "heart surgery India cost Nigeria",
    "cancer treatment India Kenya",
    "knee replacement India Ghana",
    "medical visa India from Africa",
    "e-Medical Visa India Nigeria Kenya",
    "India hospital cost estimate Africa",
    "affordable surgery India African patients",
    "medical travel Africa to India",
    "India vs South Africa medical cost",
    "transparent pricing medical tourism India",
  ],
});

export default function AfricaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.variable} ${inter.className}`}>
      {/* Google Ads base tag — conversion fires only after successful lead submit */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${AFRICA_GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="africa-google-ads-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${AFRICA_GOOGLE_ADS_ID}');
        `}
      </Script>
      <WebPageJsonLd
        path="/africa"
        title={AFRICA_TITLE}
        description={AFRICA_DESCRIPTION}
        speakableSelectors={["h1", "[data-speakable]", "#faq"]}
      />
      <FaqJsonLd faqs={[...AFRICA_FAQ]} path="/africa" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Medical Travel from Africa", path: "/africa" },
        ]}
      />
      {children}
    </div>
  );
}
