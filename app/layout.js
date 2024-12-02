import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Message from "@/components/Message";

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
  title: "Miracle Touch Spa - Relaxation Redefined",
  description: "Relaxation and rejuvenation in the comfort of your space.",
  openGraph: {
    title: "Miracle Touch Spa - Relaxation Redefined",
    description: "Relaxation and rejuvenation in the comfort of your space.",
    url: "https://miracletouchspa.vercel.app",
    siteName: "Miracle Touch Spa",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Miracle Touch Spa Logo and Tagline",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miracle Touch Spa - Relaxation Redefined",
    description: "Relaxation and rejuvenation in the comfort of your space.",
    image: "/og-image.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* SEO Metadata */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="title" content={metadata.title} />
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
        <link rel="canonical" href="https://miracletouchspa.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />

        {/* Google Tag (GTM) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16782790647"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16782790647');
            `,
          }}
        />

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Miracle Touch Spa",
              alternateName: "Miracle Spa",
              url: "https://miracletouchspa.vercel.app",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://miracletouchspa.vercel.app/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        <main className="pt-14 md:pt-16">{children}</main>
        <Message />
        <Footer />
      </body>
    </html>
  );
}
