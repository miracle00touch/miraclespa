// app/loading.js

"use client";

import { usePathname } from "next/navigation";
import PublicTherapistSkeleton from "../components/PublicTherapistSkeleton";
import ServiceCardSkeleton from "../components/ServiceCardSkeleton";

export default function Loading() {
  // Show the page-level therapist skeleton when navigating to /female or /male.
  // For all other routes render a minimal, non-blocking indicator so users
  // have feedback but the UI won't be dominated by a full-page funnel.
  const pathname = usePathname();

  if (
    pathname &&
    (pathname.startsWith("/female") || pathname.startsWith("/male"))
  ) {
    return <PublicTherapistSkeleton />;
  }

  if (pathname && pathname.startsWith("/services")) {
    return <ServiceCardSkeleton />;
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="h-2 w-28 bg-gray-300 rounded animate-pulse" />
    </div>
  );
}
