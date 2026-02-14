declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SCRIPT_ID = "recaptcha-v3-script";

function loadRecaptchaScript(siteKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("reCAPTCHA runs only in the browser"));
      return;
    }
    if (document.getElementById(RECAPTCHA_SCRIPT_ID)) {
      if (window.grecaptcha) {
        resolve();
      } else {
        const check = setInterval(() => {
          if (window.grecaptcha) {
            clearInterval(check);
            resolve();
          }
        }, 50);
        setTimeout(() => {
          clearInterval(check);
          reject(new Error("reCAPTCHA script load timeout"));
        }, 5000);
      }
      return;
    }
    const script = document.createElement("script");
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA script"));
    document.head.appendChild(script);
  });
}

/**
 * Get a reCAPTCHA v3 token for the given action.
 * Requires NEXT_PUBLIC_RECAPTCHA_SITE_KEY to be set.
 */
export async function getRecaptchaToken(action: string = "submit"): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    throw new Error("reCAPTCHA site key is not configured");
  }
  await loadRecaptchaScript(siteKey);
  if (!window.grecaptcha) {
    throw new Error("reCAPTCHA not available");
  }
  return new Promise((resolve, reject) => {
    window.grecaptcha!.ready(async () => {
      try {
        const token = await window.grecaptcha!.execute(siteKey, { action });
        resolve(token);
      } catch (e) {
        reject(e);
      }
    });
  });
}
