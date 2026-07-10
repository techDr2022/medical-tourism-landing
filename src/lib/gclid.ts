const GCLID_STORAGE_KEY = "gclid";
/** Google Ads click ID retention window (90 days). */
const GCLID_MAX_AGE_SECONDS = 90 * 24 * 60 * 60;

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, maxAgeSeconds: number): void {
  if (typeof document === "undefined") return;
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax${secure}`;
}

/** Persist gclid to both localStorage and a first-party cookie. */
export function persistGclid(gclid: string): void {
  if (typeof window === "undefined" || !gclid) return;
  try {
    localStorage.setItem(GCLID_STORAGE_KEY, gclid);
  } catch {
    // private mode / quota — cookie still covers attribution
  }
  writeCookie(GCLID_STORAGE_KEY, gclid, GCLID_MAX_AGE_SECONDS);
}

/** Persist gclid from the current URL query string when present. */
export function captureGclidFromUrl(): void {
  if (typeof window === "undefined") return;
  const gclid = new URLSearchParams(window.location.search).get("gclid");
  if (gclid) persistGclid(gclid);
}

/**
 * Resolve gclid from URL → localStorage → cookie.
 * Prefer URL so thank-you redirects always win for attribution.
 */
export function getStoredGclid(): string | null {
  if (typeof window === "undefined") return null;

  const fromUrl = new URLSearchParams(window.location.search).get("gclid");
  if (fromUrl) {
    persistGclid(fromUrl);
    return fromUrl;
  }

  try {
    const fromStorage = localStorage.getItem(GCLID_STORAGE_KEY);
    if (fromStorage) {
      persistGclid(fromStorage);
      return fromStorage;
    }
  } catch {
    // ignore
  }

  const fromCookie = readCookie(GCLID_STORAGE_KEY);
  if (fromCookie) {
    persistGclid(fromCookie);
    return fromCookie;
  }

  return null;
}

/** Thank-you path with gclid query param when available. */
export function getThankYouPath(): string {
  const gclid = getStoredGclid();
  if (!gclid) return "/thank-you";
  return `/thank-you?gclid=${encodeURIComponent(gclid)}`;
}

/**
 * Full-page navigation to thank-you so GTM/Google Ads see a real page load
 * with gclid in the URL (client-side router.push often drops conversion attribution).
 */
export function redirectToThankYou(): void {
  if (typeof window === "undefined") return;
  window.location.assign(getThankYouPath());
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Expose gclid on thank-you for GTM / Google Ads conversion tags. */
export function publishGclidForConversion(): string | null {
  const gclid = getStoredGclid();
  if (!gclid) return null;

  persistGclid(gclid);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "gclid_available",
    gclid,
  });

  return gclid;
}
