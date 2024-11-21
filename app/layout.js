// app/layout.js
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
  title: "Miracle Touch Spa",
  description: "Relaxation and rejuvenation in the comfort of your space",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Site Verification Meta Tag */}
        <meta
          name="google-site-verification"
          content="DKT9nc5-rlF_hN3OgTZlVUXbUUVgMB3FzfpTgvyz72o"
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* Metadata for SEO */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
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
