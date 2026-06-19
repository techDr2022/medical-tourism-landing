import type { Metadata } from "next";
import { ThemeRegistry } from "@/theme/ThemeRegistry";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import {
  GoogleTagManager,
  GoogleTagManagerNoscript,
} from "@/components/analytics/GoogleTagManager";
import { GlobalJsonLd } from "@/components/seo/GlobalJsonLd";
import { absoluteUrl, createPageMetadata, getSiteVerification, SITE } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    path: "/",
  }),
  icons: {
    icon: "/logos/medical%20tours%20india%20favicon.png",
    apple: "/logos/medical%20tours%20india%20favicon.png",
  },
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "health",
  verification: getSiteVerification(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
        <GoogleTagManager />
        <link
          rel="alternate"
          type="text/plain"
          href={absoluteUrl("/llms.txt")}
          title="LLMs.txt — information for AI systems"
        />
        <link
          rel="alternate"
          type="text/plain"
          href={absoluteUrl("/ai.txt")}
          title="AI.txt — information for AI systems"
        />
        <link
          rel="alternate"
          type="text/plain"
          href={absoluteUrl("/llms-full.txt")}
          title="LLMs-full.txt — extended information for AI answer engines"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }} suppressHydrationWarning>
        <GoogleTagManagerNoscript />
        <GlobalJsonLd />
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
