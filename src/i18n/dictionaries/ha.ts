import type { Dictionary } from "../types";
import { en } from "./en";

/** Hausa — primary northern Nigeria language */
export const ha: Dictionary = {
  ...en,
  common: {
    ...en.common,
    nav: {
      whyIndia: "Me yasa Indiya",
      hospitals: "Asibitoci",
      services: "Ayyuka",
      pricing: "Farashi",
      process: "Hanya",
      contact: "Tuntuɓe mu",
    },
    cta: {
      requestEstimate: "Nemi kimanta farashi",
      talkToExpert: "Yi magana da ƙwararre",
      getFreeConsultation: "Shawara kyauta",
      mobileSticky: "Nemi kimanta farashin magani",
    },
    language: "Harshe",
    whatsappAria: "Yi magana a WhatsApp",
    whatsappBubble: "Kana buƙatar taimako? Yi magana da mai kula a WhatsApp.",
    whatsappDefaultMessage: "Sannu, ina son taimako game da magani a Indiya.",
  },
  footer: {
    ...en.footer,
    importantTitle: "Muhimman bayanai:",
    importantBody:
      "Mu sabis ne na tsara tafiya ta magani. Ba mu bayar da ganewar asali ko magani ba. Duk ayyukan likita asibitoci da likitoci masu lasisi a Indiya ne ke yi. Sabis ɗinmu na ƙasashen waje ne da ke zuwa Indiya don magani.",
    metricHospitals: "Asibitoci da aka amince a Indiya",
    metricSupport: "Tallafi na duniya",
    metricCoordinators: "Masu kula da marasa lafiya",
    about:
      "Muna haɗa marasa lafiya da asibitoci masu lasisi a Indiya. Shawarwarin likita tsakanin majiyyaci da asibitin da ke magani ne.",
    privacy: "Manufar sirri",
    terms: "Sharudda da sanarwa",
    rights: "Duk haƙƙoƙi an kiyaye.",
  },
  hero: {
    ...en.hero,
    titleLine1: "Magani na duniya a Indiya.",
    titleLine2: "Babu kuɗin tsarawa.",
    body: "Muna taimaka wa marasa lafiya daga ƙasashen waje su sami asibitoci da aka amince a Indiya — kimanta farashi, tallafin visa ta magani, da tsarawa gaba ɗaya ba tare da kuɗin sabis ba.",
    coordinationDefault: "Tsarawa kyauta ga marasa lafiya na ƙasashen waje.",
    coordinationKenya: "Tsarawa kyauta ga marasa lafiya daga Kenya.",
    primaryCta: "Shawara kyauta",
    secondaryCta: "Loda rahotannin magani",
  },
  nigeria: {
    headline: "Mafi kyawun asibitocin Indiya. Farashi da iyalai na Najeriya za su iya biya.",
    priceFrom: "",
    subheadline:
      "Zuciya, ciwon daji, IVF, gwiwa, koda da ƙari — sau da yawa rabin farashin Dubai ko Afirka ta Kudu. Duba rahoto kyauta cikin awanni 24.",
    primaryCta: "Sami kimanta farashi kyauta",
    stickyCta: "Sami kimanta farashi kyauta",
  },
  afghanistan: en.afghanistan,
};
