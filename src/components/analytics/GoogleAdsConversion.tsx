import Script from "next/script";
import {
  GOOGLE_ADS_CONVERSION_LABEL,
  GOOGLE_ADS_ID,
} from "@/components/analytics/GoogleAnalytics";

/** Google Ads conversion event snippet for the contact thank-you page */
export function GoogleAdsContactConversion() {
  const sendTo = `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`;

  return (
    <Script id="google-ads-contact-conversion" strategy="afterInteractive">
      {`gtag('event', 'conversion', {'send_to': '${sendTo}'});`}
    </Script>
  );
}
