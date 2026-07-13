export const LOCALES = [
  { code: "en", label: "English", shortLabel: "EN", dir: "ltr" as const, markets: ["all"] as const },
  { code: "ha", label: "Hausa", shortLabel: "HA", dir: "ltr" as const, markets: ["nigeria"] as const },
  { code: "yo", label: "Yorùbá", shortLabel: "YO", dir: "ltr" as const, markets: ["nigeria"] as const },
  { code: "ig", label: "Igbo", shortLabel: "IG", dir: "ltr" as const, markets: ["nigeria"] as const },
  { code: "prs", label: "دری (Dari)", shortLabel: "دری", dir: "rtl" as const, markets: ["afghanistan"] as const },
  { code: "ps", label: "پښتو (Pashto)", shortLabel: "پښتو", dir: "rtl" as const, markets: ["afghanistan"] as const },
  { code: "ar", label: "العربية", shortLabel: "AR", dir: "rtl" as const, markets: ["all"] as const },
  { code: "hi", label: "हिन्दी", shortLabel: "HI", dir: "ltr" as const, markets: ["all"] as const },
  { code: "fr", label: "Français", shortLabel: "FR", dir: "ltr" as const, markets: ["all"] as const },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];

export const DEFAULT_LOCALE: LocaleCode = "en";
export const LOCALE_STORAGE_KEY = "mti_locale";

export function getLocaleMeta(code: LocaleCode) {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

export function getLocalesForPath(pathname: string | null) {
  const list = [...LOCALES];
  const hasMarket = (markets: readonly string[], market: string) => markets.includes(market);

  if (pathname?.startsWith("/nigeria")) {
    return list.sort((a, b) => {
      const aN = hasMarket(a.markets, "nigeria") || a.code === "en" ? 0 : 1;
      const bN = hasMarket(b.markets, "nigeria") || b.code === "en" ? 0 : 1;
      return aN - bN;
    });
  }
  if (pathname?.startsWith("/afghanistan")) {
    return list.sort((a, b) => {
      const aA = hasMarket(a.markets, "afghanistan") || a.code === "en" ? 0 : 1;
      const bA = hasMarket(b.markets, "afghanistan") || b.code === "en" ? 0 : 1;
      return aA - bA;
    });
  }
  return list;
}
