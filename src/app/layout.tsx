import type { Metadata } from "next";
import { ThemeRegistry } from "@/theme/ThemeRegistry";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medical Travel to India | Coordinated Hospital Access for International Patients",
  description:
    "Submit your medical reports to receive hospital options, preliminary estimates, and coordinated treatment support in India. Exclusively for international patients.",
  metadataBase: new URL("https://medicaltoursindia.com"),
  openGraph: {
    title: "Medical Travel to India | Coordinated Hospital Access for International Patients",
    description:
      "Submit your medical reports to receive hospital options, preliminary estimates, and coordinated treatment support in India. Exclusively for international patients.",
    url: "https://medicaltoursindia.com",
    siteName: "MedicalToursIndia",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Travel to India | Coordinated Hospital Access for International Patients",
    description:
      "Submit your medical reports to receive hospital options, preliminary estimates, and coordinated treatment support in India. Exclusively for international patients.",
  },
  alternates: {
    canonical: "https://medicaltoursindia.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0, padding: 0 }} suppressHydrationWarning>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
