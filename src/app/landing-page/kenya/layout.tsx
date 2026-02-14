import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Travel to India from Kenya | Hospital Coordination for Kenyan Patients",
  description:
    "Dedicated medical travel support for patients in Kenya. Get hospital options, cost estimates, medical visa guidance, and full coordination for treatment in India. Kenya-based support, no service fee.",
  metadataBase: new URL("https://medicaltoursindia.com"),
  openGraph: {
    title: "Medical Travel to India from Kenya | Hospital Coordination for Kenyan Patients",
    description:
      "Dedicated medical travel support for patients in Kenya. Hospital options, cost estimates, visa guidance, and full coordination for treatment in India.",
    url: "https://medicaltoursindia.com/landing-page/kenya",
    siteName: "MedicalToursIndia",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Travel to India from Kenya | Hospital Coordination for Kenyan Patients",
    description:
      "Dedicated medical travel support for patients in Kenya. Hospital options, cost estimates, visa guidance, and full coordination for treatment in India.",
  },
  alternates: {
    canonical: "https://medicaltoursindia.com/landing-page/kenya",
  },
};

export default function KenyaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
