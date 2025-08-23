// SEO metadata for services page
export const metadata = {
  title:
    "Spa Services Manila - Home Service Massage & Sensual Therapy | Miracle Touch Spa",
  description:
    "Discover our premium spa services in Manila. Professional home service massage including Swedish massage, sensual therapy, deep tissue, hot stone, and therapeutic treatments. Available 24/7 throughout Metro Manila.",
  keywords:
    "spa services Manila, massage services, sensual massage, Swedish massage, deep tissue massage, hot stone massage, therapeutic massage, home service massage Manila, mobile spa services, relaxation therapy, wellness treatments",
  alternates: {
    canonical: "https://miracletouchspa.vercel.app/services",
  },
  openGraph: {
    title:
      "Spa Services Manila - Home Service Massage & Sensual Therapy | Miracle Touch Spa",
    description:
      "Discover our premium spa services in Manila. Professional home service massage including Swedish massage, sensual therapy, deep tissue, hot stone, and therapeutic treatments. Available 24/7 throughout Metro Manila.",
    url: "https://miracletouchspa.vercel.app/services",
    siteName: "Miracle Touch Spa",
    images: [
      {
        url: "https://miracletouchspa.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Miracle Touch Spa Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Spa Services Manila - Home Service Massage & Sensual Therapy | Miracle Touch Spa",
    description:
      "Discover our premium spa services in Manila. Professional home service massage including Swedish massage, sensual therapy, deep tissue, hot stone, and therapeutic treatments. Available 24/7 throughout Metro Manila.",
    images: ["https://miracletouchspa.vercel.app/og-image.jpg"],
  },
};

export default function ServicesLayout({ children }) {
  return children;
}
