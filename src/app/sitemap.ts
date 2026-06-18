import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/for-kenya`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${baseUrl}/landing-page/kenya`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    { url: `${baseUrl}/lead-form`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/llms.txt`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/llms-full.txt`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/ai.txt`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
