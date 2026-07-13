import type { FaqItem } from "@/lib/faq";
import { buildFaqPageSchema } from "@/lib/schema";
import { JsonLd } from "./JsonLd";

type FaqJsonLdProps = {
  faqs: readonly FaqItem[] | FaqItem[];
  path: string;
};

export function FaqJsonLd({ faqs, path }: FaqJsonLdProps) {
  return <JsonLd data={buildFaqPageSchema(faqs, path)} />;
}
