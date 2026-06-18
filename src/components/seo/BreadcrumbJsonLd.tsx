import { buildBreadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "./JsonLd";

type BreadcrumbJsonLdProps = {
  items: { name: string; path: string }[];
};

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  return <JsonLd data={buildBreadcrumbSchema(items)} />;
}
