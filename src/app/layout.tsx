import type { Metadata } from "next";
import { ThemeRegistry } from "@/theme/ThemeRegistry";
import { RecaptchaProvider } from "@/components/providers/RecaptchaProvider";
import { GclidCapture } from "@/components/GclidCapture";
import { StickyWhatsAppButton } from "@/components/layout/StickyWhatsAppButton";
import { GlobalJsonLd } from "@/components/seo/GlobalJsonLd";
import { LanguageProvider } from "@/i18n/LanguageProvider";
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5FM77FT3');`,
          }}
        />
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5FM77FT3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <GlobalJsonLd />
        <GclidCapture />
        <ThemeRegistry>
          <LanguageProvider>
            <RecaptchaProvider>
              {children}
              <StickyWhatsAppButton />
            </RecaptchaProvider>
          </LanguageProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
