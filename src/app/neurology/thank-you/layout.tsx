import type { Metadata } from "next";
import Script from "next/script";
import { createPageMetadata } from "@/lib/seo";

/** Neurology Lead Form — Google Ads conversion on thank-you page load. */
const NEUROLOGY_ADS_CONVERSION_SEND_TO =
  "AW-18246472126/SR4MCIi259UcEL6jzPxD";

export const metadata: Metadata = createPageMetadata({
  title: "Thank You | Neurology Treatment in India",
  description:
    "Your neurology treatment plan request has been received. Expect a free expert medical opinion within 24 hours.",
  path: "/neurology/thank-you",
  noIndex: true,
});

export default function NeurologyThankYouLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Event snippet for Neurology Lead Form conversion page */}
      <Script id="neurology-lead-form-conversion" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('event', 'conversion', {
            'send_to': '${NEUROLOGY_ADS_CONVERSION_SEND_TO}',
            'value': 1.0,
            'currency': 'INR'
          });
        `}
      </Script>
      {children}
    </>
  );
}
