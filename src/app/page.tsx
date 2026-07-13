import { HomePageClient } from "@/components/HomePageClient";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { SITE_FAQ } from "@/lib/faq";
import { SITE } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <WebPageJsonLd
        path="/"
        title={SITE.defaultTitle}
        description={SITE.defaultDescription}
        speakableSelectors={["h1", "[data-speakable]", "#faq"]}
      />
      <FaqJsonLd faqs={SITE_FAQ} path="/" />
      <HomePageClient />
    </>
  );
}
