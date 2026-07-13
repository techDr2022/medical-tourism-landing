import { AFGHANISTAN_HOW_IT_WORKS } from "@/constants/afghanistan";
import { buildHowToSchema } from "@/lib/schema";
import { JsonLd } from "./JsonLd";

export function AfghanistanHowToJsonLd() {
  return (
    <JsonLd
      data={buildHowToSchema({
        path: "/afghanistan",
        name: "How Afghan patients arrange treatment in India",
        description:
          "Send medical reports, compare three accredited hospital options, choose a hospital, then get visa and travel guidance through MedicalToursIndia.",
        steps: AFGHANISTAN_HOW_IT_WORKS.map((step) => ({
          name: step.title,
          text: step.body,
        })),
      })}
    />
  );
}
