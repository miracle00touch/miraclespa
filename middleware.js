import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Only set HSTS in production
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  // Add cache headers for API routes to help with concurrent requests
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // Add request ID for debugging
    const requestId = Math.random().toString(36).substr(2, 9);
    response.headers.set("x-request-id", requestId);

    // For public API routes, avoid long-lived caching here; prefer explicit headers in the API handlers
    if (request.nextUrl.pathname.match(/\/(contacts|services|therapists)$/)) {
      response.headers.set("Cache-Control", "no-store");
    }
  }

  // Add performance headers
  response.headers.set("X-DNS-Prefetch-Control", "on");

  return response;
}

export const config = {
  // Apply to all routes except static assets
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
