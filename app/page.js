import HomePage from "@/components/HomePage";
import Benefits from "@/components/Benefits";
import ServiceLocations from "@/components/ServiceLocations";

// SEO metadata for home page
export const metadata = {
  title:
    "Miracle Touch Spa Manila - Premium Home Service Spa & Sensual Massage | 24/7",
  description:
    "Experience luxury spa treatments in Manila with Miracle Touch Spa's premium home service. Professional sensual massage therapy, Swedish massage, and spa treatments delivered to your home 24/7 in Metro Manila. Call (+63) 927 473 6260 to book now.",
  keywords: [
    "spa Manila",
    "home service spa",
    "sensual massage Manila",
    "spa treatment",
    "home massage Manila",
    "luxury spa",
    "therapeutic massage",
    "Swedish massage",
    "mobile spa Manila",
    "24/7 spa service",
    "Metro Manila spa",
    "premium massage",
    "wellness therapy",
    "stress relief massage",
    "couple massage",
    "body massage Manila",
    "relaxation therapy",
    "spa at home",
  ].join(", "),
  alternates: {
    canonical: "https://miracletouchspa.vercel.app",
  },
  openGraph: {
    title:
      "Miracle Touch Spa Manila - Premium Home Service Spa & Sensual Massage",
    description:
      "Experience luxury spa treatments in Manila with our premium home service. Professional sensual massage therapy and spa treatments delivered to your home 24/7 in Metro Manila.",
    url: "https://miracletouchspa.vercel.app",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Miracle Touch Spa Manila - Premium Home Service Spa & Sensual Massage",
      },
    ],
  },
};

export default function Home() {
  return (
    <main>
      <HomePage />
      <Benefits />
      <ServiceLocations />
    </main>
  );
}
