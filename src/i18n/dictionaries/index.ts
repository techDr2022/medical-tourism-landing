import type { LocaleCode } from "../config";
import type { Dictionary } from "../types";
import { en } from "./en";
import { ar } from "./ar";
import { prs } from "./prs";
import { ps } from "./ps";
import { hi } from "./hi";
import { fr } from "./fr";
import { ha } from "./ha";
import { yo } from "./yo";
import { ig } from "./ig";

const dictionaries: Record<LocaleCode, Dictionary> = {
  en,
  ha,
  yo,
  ig,
  prs,
  ps,
  ar,
  hi,
  fr,
};

export function getDictionary(locale: LocaleCode): Dictionary {
  return dictionaries[locale] ?? en;
}

/** Dot-path lookup, e.g. "common.cta.requestEstimate" */
export function t(dict: Dictionary, path: string): string {
  const parts = path.split(".");
  let cur: unknown = dict;
  for (const part of parts) {
    if (cur && typeof cur === "object" && part in (cur as object)) {
      cur = (cur as Record<string, unknown>)[part];
    } else {
      return path;
    }
  }
  return typeof cur === "string" ? cur : path;
}
