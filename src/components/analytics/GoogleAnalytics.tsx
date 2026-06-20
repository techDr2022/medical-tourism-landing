import Script from "next/script";

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-DN851W50PC";
export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18246472126";
export const GOOGLE_ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ||
  "4t3fCPCE0cEcEL6jzPxD";

export function GoogleAnalytics() {
  const primaryId = GA_MEASUREMENT_ID || GOOGLE_ADS_ID;
  if (!primaryId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="beforeInteractive"
      />
      <Script id="gtag-init" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });` : ""}
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

/** Fire GA4 lead event on form submit; Google Ads conversion fires on /thank-you */
export function trackFormConversion() {
  if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID) return;
  window.gtag("event", "generate_lead", {
    send_to: GA_MEASUREMENT_ID,
    event_callback: () => {},
  });
}
