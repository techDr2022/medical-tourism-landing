import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { NIGERIA_FAQ } from "@/constants/nigeria";
import { createPageMetadata } from "@/lib/seo";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--ng-font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ng-font-sans",
  display: "swap",
});

const NIGERIA_TITLE =
  "Medical Treatment in India for Nigerian Patients | Free Cost Estimate in 24 Hours";
const NIGERIA_DESCRIPTION =
  "Nigerian patients save up to 50%+ vs Dubai or South Africa on treatment in India. Free specialist report review, e-Medical Visa help (avg. 3–5 days), and a written cost estimate within 24 hours — no agent fees.";

export const metadata: Metadata = createPageMetadata({
  title: NIGERIA_TITLE,
  description: NIGERIA_DESCRIPTION,
  path: "/nigeria",
  keywords: [
    "medical treatment India for Nigerian patients",
    "Nigeria medical tourism India",
    "heart surgery India cost Nigeria",
    "cancer treatment India from Nigeria",
    "IVF India cost for Nigerians",
    "knee replacement India Nigeria",
    "medical visa India from Nigeria",
    "e-Medical Visa India Nigeria",
    "India hospital cost estimate Lagos",
    "India hospital cost estimate Abuja",
    "medical travel Nigeria to India",
    "affordable surgery India for Nigerians",
    "pay hospital directly medical tourism India",
  ],
});

export default function NigeriaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${outfit.variable} ${manrope.variable}`}>
      {/* TODO Meta Pixel: add FB/IG pixel script when running Meta ads
          <script>!function(f,b,e,v,n,t,s)... fbq('init','PLACEHOLDER_PIXEL_ID');</script>
      */}
      <WebPageJsonLd
        path="/nigeria"
        title={NIGERIA_TITLE}
        description={NIGERIA_DESCRIPTION}
        speakableSelectors={["h1", "[data-speakable]", "#faq"]}
      />
      <FaqJsonLd faqs={[...NIGERIA_FAQ]} path="/nigeria" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Medical Travel from Nigeria", path: "/nigeria" },
        ]}
      />
      {children}
    </div>
  );
}
