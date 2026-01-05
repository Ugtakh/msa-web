"use client";

import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/Loaders";

const SanityAppProvider = dynamic(() => import("@/providers/SanityProvider"), {
  ssr: false,
  loading: () => <LoadingSpinner text="Loading ..." isFullScreen size="lg" />,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <SanityAppProvider>{children}</SanityAppProvider>;
}
