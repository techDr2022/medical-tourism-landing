import type { MetadataRoute } from "next";
import { AI_BOT_USER_AGENTS, AI_CONTENT_PATHS, AI_DISALLOW_PATHS } from "@/lib/ai-bots";
import { SITE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const disallow = [...AI_DISALLOW_PATHS];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      ...AI_BOT_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: ["/", ...AI_CONTENT_PATHS],
        disallow,
      })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
