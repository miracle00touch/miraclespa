import HomePage from "@/components/HomePage";
import Benefits from "@/components/Benefits";
import ServiceLocations from "@/components/ServiceLocations";

export const metadata = {
  title: "Miracle Touch Spa - Relaxation Redefined",
  description:
    "Experience the best in relaxation with Miracle Touch Spa, serving Metro Manila including Quezon City, Makati, Manila, Taguig, and more. Book your session now!",
  openGraph: {
    title: "Miracle Touch Spa - Relaxation Redefined",
    description:
      "Experience the best in relaxation with Miracle Touch Spa, serving Metro Manila including Quezon City, Makati, Manila, Taguig, and more. Book your session now!",
    url: "https://miracletouchspa.vercel.app/",
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
    description:
      "Experience the best in relaxation with Miracle Touch Spa, serving Metro Manila including Quezon City, Makati, Manila, Taguig, and more. Book your session now!",
    image: "/og-image.jpg",
  },
  alternates: {
    canonical: "https://miracletouchspa.vercel.app/",
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
