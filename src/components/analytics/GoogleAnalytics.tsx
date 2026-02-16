"use client";

import Script from "next/script";

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-DN851W50PC";
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            ${GOOGLE_ADS_ID ? `allow_google_signals: true, allow_ad_personalization_signals: true,` : ""}
          });
          ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
        `}
      </Script>
    </>
  );
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire conversion event for form submissions (GA4 + Google Ads) */
export function trackFormConversion() {
  if (typeof window === "undefined" || !window.gtag) return;
  const GA_ID = GA_MEASUREMENT_ID;
  const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const ADS_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (GA_ID) {
    window.gtag("event", "generate_lead", {
      send_to: GA_ID,
      event_callback: () => {},
    });
  }
  if (ADS_ID && ADS_LABEL) {
    window.gtag("event", "conversion", {
      send_to: `${ADS_ID}/${ADS_LABEL}`,
      event_callback: () => {},
    });
  }
  // Google Ads conversion event for Contact Us form
  window.gtag("event", "ads_conversion_Contact_Us_1", {
    event_callback: () => {},
  });
}
