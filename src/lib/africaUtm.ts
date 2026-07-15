import { getUtmParamsFromUrl } from "@/lib/adsTracking";
import {
  AFRICA_COUNTRIES_SERVED,
  type AfricaCountry,
} from "@/constants/africa";

const COUNTRY_KEYWORDS: Record<AfricaCountry, string[]> = {
  Nigeria: ["nigeria", "nigerian", "lagos", "abuja"],
  Kenya: ["kenya", "kenyan", "nairobi"],
  Ghana: ["ghana", "ghanaian", "accra"],
  Tanzania: ["tanzania", "tanzanian", "dar"],
  Ethiopia: ["ethiopia", "ethiopian", "addis"],
  Uganda: ["uganda", "ugandan", "kampala"],
};

/**
 * Resolve target country from UTM params or `?country=` query for dynamic headlines.
 */
export function getAfricaCountryFromUrl(): AfricaCountry | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const countryParam = params.get("country")?.trim().toLowerCase();

  if (countryParam) {
    const match = AFRICA_COUNTRIES_SERVED.find(
      (c) => c.toLowerCase() === countryParam
    );
    if (match) return match;
  }

  const utm = getUtmParamsFromUrl();
  const haystack = [
    utm.utm_campaign,
    utm.utm_content,
    utm.utm_term,
    utm.utm_source,
  ]
    .join(" ")
    .toLowerCase();

  for (const country of AFRICA_COUNTRIES_SERVED) {
    const keywords = COUNTRY_KEYWORDS[country];
    if (keywords.some((kw) => haystack.includes(kw))) {
      return country;
    }
  }

  return null;
}
