import HomePage from "@/components/HomePage";
import Benefits from "@/components/Benefits";
import ServiceLocations from "@/components/ServiceLocations";

export const metadata = {
  title: "Miracle Touch Spa - Relaxation Redefined",
  description:
    "Experience the best in relaxation with Miracle Touch Spa. Book your session now!",
  openGraph: {
    title: "Miracle Touch Spa - Relaxation Redefined",
    description:
      "Experience the best in relaxation with Miracle Touch Spa. Book your session now!",
    url: "https://miracletouchspa.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miracle Touch Spa - Relaxation Redefined",
    description:
      "Experience the best in relaxation with Miracle Touch Spa. Book your session now!",
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
