import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | Medical Travel to India",
  description: "Your medical travel inquiry has been received. Our team will respond within 24–48 hours.",
  robots: { index: false, follow: false },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
