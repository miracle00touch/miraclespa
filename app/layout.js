// app/layout.js
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Message from "@/components/Message";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  metadataBase: new URL("https://miracletouchspa.vercel.app"),
  title:
    "Miracle Touch Spa Manila - Premium Home Service Spa & Sensual Massage | 24/7",
  description:
    "Experience luxury spa treatments in Manila with Miracle Touch Spa's premium home service. Professional sensual massage therapy, Swedish massage, and spa treatments delivered to your home 24/7 in Metro Manila. Book now for ultimate relaxation.",
  keywords:
    "spa Manila, home service spa, sensual massage Manila, spa treatment, home massage Manila, luxury spa, therapeutic massage, Swedish massage, deep tissue massage, relaxation therapy, spa at home, mobile spa Manila, 24/7 spa service, Metro Manila spa, premium massage, wellness therapy, stress relief massage, couple massage, body massage Manila",
  openGraph: {
    title:
      "Miracle Touch Spa Manila - Premium Home Service Spa & Sensual Massage",
    description:
      "Experience luxury spa treatments in Manila with our premium home service. Professional sensual massage therapy and spa treatments delivered to your home 24/7 in Metro Manila.",
    url: "https://miracletouchspa.vercel.app",
    siteName: "Miracle Touch Spa Manila",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Miracle Touch Spa Manila - Premium Home Service Spa & Sensual Massage",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Miracle Touch Spa Manila - Premium Home Service Spa & Sensual Massage",
    description:
      "Experience luxury spa treatments in Manila with our premium home service. Professional sensual massage therapy delivered to your home 24/7.",
    image: "/og-image.jpg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "DKT9nc5-rlF_hN3OgTZlVUXbUUVgMB3FzfpTgvyz72o",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Global SEO Metadata */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta property="twitter:card" content={metadata.twitter.card} />
        <meta property="twitter:title" content={metadata.twitter.title} />
        <meta
          property="twitter:description"
          content={metadata.twitter.description}
        />
        <meta property="twitter:image" content={metadata.twitter.image} />
        <meta
          name="google-site-verification"
          content="DKT9nc5-rlF_hN3OgTZlVUXbUUVgMB3FzfpTgvyz72o"
        />
        <link rel="canonical" href={metadata.openGraph.url} />
        <link rel="icon" href="/favicon.ico" />

        {/* Prevent dark mode flash */}
        <meta name="color-scheme" content="light" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            html { color-scheme: light; }
            body { background-color: #ffffff !important; }
          `,
          }}
        />

        {/* Google Tag Manager */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16782790647"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16782790647');
            
            // Enhanced conversion tracking for calls
            function trackPhoneCall() {
              gtag('event', 'conversion', {
                'send_to': 'AW-16782790647/phone-call',
                'value': 1.0,
                'currency': 'PHP'
              });
            }
            
            // Track clicks on phone numbers
            document.addEventListener('DOMContentLoaded', function() {
              const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
              phoneLinks.forEach(function(link) {
                link.addEventListener('click', trackPhoneCall);
              });
            });
          `}
        </Script>

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Miracle Touch Spa",
              alternateName: "Miracle Spa",
              url: metadata.openGraph.url,
              potentialAction: {
                "@type": "SearchAction",
                target: `${metadata.openGraph.url}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: metadata.openGraph.url,
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <NavBar />
        <main className="pt-14 md:pt-16 flex-grow">{children}</main>
        <Analytics />
        <Message />
        <Footer />
      </body>
    </html>
  );
}
