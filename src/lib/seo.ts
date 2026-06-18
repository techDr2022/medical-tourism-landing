import type { Metadata } from "next";

export const SITE_KEYWORDS = [
  "medical tourism India",
  "medical travel India",
  "treatment in India",
  "international patients India",
  "worldwide medical travel India",
  "global medical tourism India",
  "medical treatment abroad India",
  "affordable medical treatment India",
  "best hospital in India for foreigners",
  "hospital coordination India",
  "medical travel coordinator India",
  "best medical tourism team India",
  "medical visa India",
  "India medical visa assistance",
  "treatment estimate India",
  "hospital package estimate India",
  "video consultation India doctor",
  "online doctor consultation India",
  "pre-travel medical evaluation India",
  "accredited hospitals India",
  "JCI accredited hospitals India",
  "international patient department India",
  "cardiac surgery India",
  "heart surgery India",
  "angioplasty India",
  "bypass surgery India CABG",
  "knee replacement India",
  "hip replacement India",
  "orthopaedic surgery India",
  "joint replacement India",
  "spine surgery India",
  "spinal fusion India",
  "neurosurgery India",
  "brain surgery India",
  "cancer treatment India",
  "oncology India",
  "chemotherapy India",
  "radiation therapy India",
  "organ transplant India",
  "kidney transplant India",
  "liver transplant India",
  "fertility treatment India",
  "IVF India",
  "bariatric surgery India",
  "weight loss surgery India",
  "cosmetic surgery India",
  "plastic surgery India",
  "dental treatment India",
  "eye surgery India",
  "LASIK India",
  "urology treatment India",
  "gastroenterology India",
  "pediatric surgery India",
  "rare disease treatment India",
  "chronic condition treatment India",
  "all medical conditions India",
  "all treatments India",
  "zero cost medical coordination",
  "free medical travel coordination",
  "no service fee medical tourism",
  "medical travel Kenya to India",
  "medical tourism Africa India",
  "medical tourism Middle East India",
  "medical tourism USA to India",
  "medical tourism UK to India",
  "medical tourism Europe India",
  "medical tourism Australia India",
  "medical tourism Canada India",
  "patients from Kenya India treatment",
  "patients from Nigeria India treatment",
  "patients from UAE India treatment",
  "patients from Saudi Arabia India treatment",
  "patients from Bangladesh India treatment",
  "patients from Sri Lanka India treatment",
  "Apollo Hospitals India",
  "Max Healthcare India",
  "Medicover Hospitals India",
  "Yashoda Hospitals India",
  "airport pickup medical travel India",
  "accommodation near hospital India",
  "end to end medical travel support",
  "post treatment follow up India",
  "second opinion India hospital",
  "compare hospital costs India",
  "MedicalToursIndia",
  "landing.medicaltoursindia.com",
] as const;

export const SITE = {
  name: "MedicalToursIndia",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://landing.medicaltoursindia.com",
  defaultTitle:
    "Medical Travel to India | Free Coordination for International Patients Worldwide",
  defaultDescription:
    "Free medical travel coordination for international patients worldwide. 20+ team, 50+ hospitals in India, all treatments and conditions. Hospital options, estimates, visa and travel support at zero cost.",
  locale: "en_US",
  ogImagePath: "/opengraph-image",
  twitterHandle: "@medicaltoursindia",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "info@techdr.in",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "919032292171",
  keywords: SITE_KEYWORDS,
} as const;

export function absoluteUrl(path = ""): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(SITE.ogImagePath);

  return {
    title,
    description,
    keywords: keywords
      ? Array.from(new Set([...keywords, ...SITE_KEYWORDS]))
      : [...SITE_KEYWORDS],
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
    },
    formatDetection: {
      telephone: true,
      email: true,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      ...(SITE.twitterHandle ? { site: SITE.twitterHandle, creator: SITE.twitterHandle } : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function getSiteVerification(): Metadata["verification"] {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  const other: Record<string, string> = {};

  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();
  if (bing) other["msvalidate.01"] = bing;

  return {
    ...(google ? { google } : {}),
    ...(Object.keys(other).length > 0 ? { other } : {}),
  };
}
