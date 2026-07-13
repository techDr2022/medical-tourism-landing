import { buildWebPageSchema } from "@/lib/schema";
import { JsonLd } from "./JsonLd";

type WebPageJsonLdProps = {
  path: string;
  title: string;
  description: string;
  speakableSelectors?: string[];
};

export function WebPageJsonLd({
  path,
  title,
  description,
  speakableSelectors,
}: WebPageJsonLdProps) {
  return (
    <JsonLd
      data={buildWebPageSchema({
        path,
        title,
        description,
        speakableSelectors,
      })}
    />
  );
}
