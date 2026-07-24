import { NeurologyPage } from "@/components/neurology";
import { NEUROLOGY_CONDITION_CARDS } from "@/constants/neurology";

export default function NeurologyRoutePage() {
  const conditionImages = Object.fromEntries(
    NEUROLOGY_CONDITION_CARDS.filter((card) => Boolean(card.image)).map(
      (card) => [card.slug, card.image]
    )
  );

  return <NeurologyPage conditionImages={conditionImages} />;
}
