import { buildOrganizationGraph } from "@/lib/schema";
import { JsonLd } from "./JsonLd";

export function GlobalJsonLd() {
  return <JsonLd data={buildOrganizationGraph()} />;
}
