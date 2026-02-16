"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Box from "@mui/material/Box";

interface LegalPageWrapperProps {
  children: React.ReactNode;
}

export function LegalPageWrapper({ children }: LegalPageWrapperProps) {
  const router = useRouter();
  return (
    <>
      <Header onCtaClick={() => router.push("/")} />
      <Box component="main" sx={{ minHeight: "100vh" }}>
        {children}
      </Box>
      <Footer />
    </>
  );
}
