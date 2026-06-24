export const WHEN_TO_TRAVEL_OPTIONS = [
  { value: "within-1-month", label: "Within 1 month" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "just-exploring", label: "Just exploring" },
] as const;

export type WhenToTravel = (typeof WHEN_TO_TRAVEL_OPTIONS)[number]["value"];

export const VISA_ASSISTANCE_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not-sure", label: "Not sure" },
] as const;

export type VisaAssistance = (typeof VISA_ASSISTANCE_OPTIONS)[number]["value"];

export const WHEN_TO_TRAVEL_VALUES: WhenToTravel[] = WHEN_TO_TRAVEL_OPTIONS.map(
  (option) => option.value
);

export const VISA_ASSISTANCE_VALUES: VisaAssistance[] = VISA_ASSISTANCE_OPTIONS.map(
  (option) => option.value
);

export function formatWhenToTravel(value: string): string {
  return WHEN_TO_TRAVEL_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function formatVisaAssistance(value: string): string {
  return VISA_ASSISTANCE_OPTIONS.find((option) => option.value === value)?.label ?? value;
}
