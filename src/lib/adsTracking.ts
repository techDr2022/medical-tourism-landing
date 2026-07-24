declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type AdsConversionEvent =
  | "form_start"
  | "form_submit"
  | "lead_submit"
  | "whatsapp_click";

function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/**
 * Fire Google Ads / GTM conversion-style events.
 * Uses dataLayer (GTM is already on the site) and gtag when present.
 *
 * Do not use this for Nigeria lead conversions — use {@link trackLeadSubmit} so Ads
 * receives a single `lead_submit` (not `form_submit` / native GTM form events).
 */
export function trackAdsConversion(
  event: AdsConversionEvent,
  params: Record<string, unknown> = {},
  eventCategory = "nigeria_lead_form"
) {
  if (typeof window === "undefined") return;

  pushDataLayer({
    event,
    event_category: eventCategory,
    ...params,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, {
      event_category: eventCategory,
      ...params,
    });
  }

  // TODO: Meta Pixel — replace PLACEHOLDER_PIXEL_ID in layout/script when running FB/IG ads.
  // Example once pixel is installed:
  // if (typeof window.fbq === "function") {
  //   window.fbq("trackCustom", event, params);
  // }
}

/** Time for GTM / Google Ads tags to process `lead_submit` before page unload. */
export const LEAD_SUBMIT_REDIRECT_DELAY_MS = 700;

/**
 * Single Google Ads conversion signal for a successful lead save.
 * Pushes exactly one `lead_submit` dataLayer event.
 * Call once after the lead is saved and before any WhatsApp redirect.
 */
export function trackLeadSubmit(): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "lead_submit",
  });
}

/**
 * Push `lead_submit`, then wait so GTM can fire conversion tags before redirect.
 */
export function trackLeadSubmitAndWait(
  delayMs: number = LEAD_SUBMIT_REDIRECT_DELAY_MS
): Promise<void> {
  trackLeadSubmit();
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayMs);
  });
}

/** Google Ads conversion — Africa LP lead form success only. */
export const AFRICA_ADS_CONVERSION_SEND_TO =
  "AW-18246472126/psUOCOiQ8tAcEL6jzPxD";

/** Google Ads conversion — Neurology Lead Form (fires on /neurology/thank-you). */
export const NEUROLOGY_ADS_CONVERSION_SEND_TO =
  "AW-18246472126/SR4MCIi259UcEL6jzPxD";

/**
 * GTM Custom Event for Africa WhatsApp clicks.
 * Unique name so Nigeria `whatsapp_click` triggers do not mix.
 */
export function trackAfricaWhatsAppClick(
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  pushDataLayer({
    event: "africa_whatsapp_click",
    event_category: "africa_lead_form",
    ...params,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", "africa_whatsapp_click", {
      event_category: "africa_lead_form",
      ...params,
    });
  }
}

/**
 * GTM Custom Event for Africa lead-form success.
 * Unique name so Nigeria `lead_submit` triggers do not mix.
 * Call only after a successful API submit — never on button click alone.
 */
export function trackAfricaLeadSubmit(
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  pushDataLayer({
    event: "africa_lead_submit",
    event_category: "africa_lead_form",
    ...params,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", "africa_lead_submit", {
      event_category: "africa_lead_form",
      ...params,
    });
  }
}

/**
 * Fire the Africa lead-form Google Ads conversion snippet.
 * Call only after a successful `/api/africa-contact` submit — never on page load.
 */
export function trackAfricaLeadFormConversion(): void {
  if (typeof window === "undefined") return;

  pushDataLayer({
    event: "africa_lead_conversion",
    event_category: "africa_lead_form",
    send_to: AFRICA_ADS_CONVERSION_SEND_TO,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: AFRICA_ADS_CONVERSION_SEND_TO,
      value: 1.0,
      currency: "INR",
    });
  }
}

/**
 * Fire Africa GTM lead event + Ads conversion, then wait before redirect.
 */
export function trackAfricaLeadFormConversionAndWait(
  delayMs: number = LEAD_SUBMIT_REDIRECT_DELAY_MS,
  params: Record<string, unknown> = { source: "side_drawer" }
): Promise<void> {
  trackAfricaLeadSubmit(params);
  trackAfricaLeadFormConversion();
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayMs);
  });
}

/**
 * GTM Custom Event for Neurology lead-form success (before thank-you redirect).
 * Ads conversion fires on /neurology/thank-you — do not send_to here.
 */
export function trackNeurologyLeadSubmit(
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  pushDataLayer({
    event: "neurology_lead_submit",
    event_category: "neurology_lead_form",
    ...params,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", "neurology_lead_submit", {
      event_category: "neurology_lead_form",
      ...params,
    });
  }
}

/**
 * Fire the Neurology Lead Form Google Ads conversion snippet.
 * Call on /neurology/thank-you page load after a successful lead submit.
 */
export function trackNeurologyLeadFormConversion(): void {
  if (typeof window === "undefined") return;

  pushDataLayer({
    event: "neurology_lead_conversion",
    event_category: "neurology_lead_form",
    send_to: NEUROLOGY_ADS_CONVERSION_SEND_TO,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: NEUROLOGY_ADS_CONVERSION_SEND_TO,
      value: 1.0,
      currency: "INR",
    });
  }
}

/**
 * Fire Neurology GTM lead event, then wait before thank-you redirect.
 * Ads conversion is deferred to /neurology/thank-you.
 */
export function trackNeurologyLeadSubmitAndWait(
  delayMs: number = LEAD_SUBMIT_REDIRECT_DELAY_MS,
  params: Record<string, unknown> = { source: "neurology_hero_form" }
): Promise<void> {
  trackNeurologyLeadSubmit(params);
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayMs);
  });
}

/** Capture UTM params from the current URL for CRM attribution. */
export function getUtmParamsFromUrl(): {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
} {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
    };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_term: params.get("utm_term") ?? "",
    utm_content: params.get("utm_content") ?? "",
  };
}
