import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/** Content revision date for crawl signals — bump when major page copy changes. */
const CONTENT_LAST_MODIFIED = new Date("2026-07-13");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;
  const lastModified = CONTENT_LAST_MODIFIED;

  return [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/nigeria`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/afghanistan`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/for-kenya`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    {
      url: `${baseUrl}/landing-page/kenya`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    { url: `${baseUrl}/lead-form`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/llms.txt`, lastModified, changeFrequency: "weekly", priority: 0.75 },
    { url: `${baseUrl}/llms-full.txt`, lastModified, changeFrequency: "weekly", priority: 0.75 },
    { url: `${baseUrl}/ai.txt`, lastModified, changeFrequency: "weekly", priority: 0.75 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
