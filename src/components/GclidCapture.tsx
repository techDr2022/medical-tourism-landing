"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureGclidFromUrl } from "@/lib/gclid";

function GclidCaptureInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureGclidFromUrl();
  }, [pathname, searchParams]);

  return null;
}

/** Captures ?gclid= on load and client navigations; stores in cookie + localStorage. */
export function GclidCapture() {
  return (
    <Suspense fallback={null}>
      <GclidCaptureInner />
    </Suspense>
  );
}
