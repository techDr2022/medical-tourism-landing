import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Thank You | Medical Travel to India",
  description:
    "Your medical travel inquiry has been received. Our team will respond within 24 hours with your next steps.",
  path: "/thank-you",
  noIndex: true,
});

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
