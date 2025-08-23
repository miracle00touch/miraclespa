import React from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import ContactInfo from "../../components/ContactInfo";

export const metadata = {
  title:
    "Home Service Spa Locations Manila - Sensual Massage Available 24/7 | Metro Manila",
  description:
    "Miracle Touch Spa provides premium home service throughout Metro Manila. Professional sensual massage and spa treatments in Quezon City, Makati, Manila, Taguig, Pasay, Pasig, and all Metro Manila areas. Available 24/7. Call (+63) 927 473 6260.",
  keywords:
    "home service spa Manila, mobile massage Metro Manila, sensual massage Quezon City, spa service Makati, home massage Manila city, mobile spa Taguig, home service massage Pasay, spa delivery Pasig, 24/7 spa service Philippines, luxury mobile spa",
  alternates: {
    canonical: "https://miracletouchspa.vercel.app/location",
  },
  openGraph: {
    title: "Home Service Spa Locations Manila - Sensual Massage Available 24/7",
    description:
      "Premium home service spa throughout Metro Manila. Professional sensual massage and spa treatments delivered to your location in Quezon City, Makati, Manila, and more.",
    url: "https://miracletouchspa.vercel.app/location",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/2604843/pexels-photo-2604843.jpeg",
        width: 1200,
        height: 630,
        alt: "Miracle Touch Spa Location and Service Areas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spa Locations & Home Service | Miracle Touch Spa Metro Manila",
    description:
      "Professional massage services available across Metro Manila. Home service available.",
    image: "https://images.pexels.com/photos/2604843/pexels-photo-2604843.jpeg",
  },
};

const Location = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-[#f3e7d1] px-4 md:px-8 py-12">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-semibold font-serif mb-4 text-brown-800">
          Visit Miracle Touch Spa
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-700">
          Experience relaxation at its finest with Miracle Touch Spa. We provide
          massages and spa services across Metro Manila, ensuring convenience
          whether you&apos;re at home or visiting us directly.
        </p>
      </header>

      {/* Location and Contact Information */}
      <section className="flex flex-col md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-4xl transform transition-transform duration-300 hover:shadow-2xl">
        {/* Image Section */}
        <div className="md:w-1/2">
          <Image
            src="https://images.pexels.com/photos/2604843/pexels-photo-2604843.jpeg"
            alt="Relaxing Spa Location in Metro Manila"
            width={600}
            height={400}
            className="object-cover h-full w-full"
            priority
          />
        </div>

        {/* Information Section */}
        <div className="p-6 md:p-10 md:w-1/2 bg-gray-50 flex flex-col space-y-6 justify-center">
          {/* Location Info */}
          <div className="flex items-center">
            <div>
              <p className="text-lg md:text-xl font-semibold text-gray-800">
                Conveniently Located Across Metro Manila
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                Miracle Touch Spa offers massage services in Quezon City,
                Makati, Manila, Taguig, Pasay, and other cities, bringing
                relaxation to your doorstep.
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <ContactInfo />

          {/* Business Hours */}
          <div className="flex items-center">
            <div className="text-brown-500 mr-3 text-2xl md:text-3xl">🕒</div>
            <div>
              <p className="text-lg md:text-xl font-semibold text-gray-800">
                Business Hours
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                24/7 Available • Home Service & Appointment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Served Section */}
      <section className="mt-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold font-serif text-brown-800 mb-4">
          Serving Locations
        </h2>
        <p className="max-w-3xl text-lg text-gray-700 mx-auto mb-6">
          Miracle Touch Spa proudly serves the following locations in Metro
          Manila:
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-600">
          <li>Quezon City</li>
          <li>Makati City</li>
          <li>Manila City</li>
          <li>Taguig City</li>
          <li>Pasay City</li>
          <li>Pasig City</li>
          <li>Parañaque City</li>
          <li>Mandaluyong City</li>
          <li>San Juan City</li>
        </ul>
      </section>

      {/* Footer Note */}
      <footer className="text-center mt-8">
        <p className="max-w-2xl text-sm md:text-base text-gray-600">
          Note: We offer both in-spa and home-service massages for your
          convenience. Experience relaxation wherever you are in Metro Manila.
        </p>
      </footer>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://miracletouchspa.vercel.app/#business",
            name: "Miracle Touch Spa",
            alternateName: "Miracle Spa Manila",
            description:
              "Professional massage and spa services in Metro Manila with home service available. Serving Quezon City, Makati, Manila, Taguig, and surrounding areas.",
            image: [
              "https://images.pexels.com/photos/2604843/pexels-photo-2604843.jpeg",
              "/og-image.jpg",
            ],
            telephone: "+63 927 473 6260",
            email: "miracletouchspa2@gmail.com",
            url: "https://miracletouchspa.vercel.app",
            sameAs: [
              "https://miracletouchspa.vercel.app/services",
              "https://miracletouchspa.vercel.app/location",
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Metro Manila",
              addressRegion: "National Capital Region",
              addressCountry: "Philippines",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "14.6091",
              longitude: "121.0223",
            },
            areaServed: [
              {
                "@type": "City",
                name: "Quezon City",
                containedInPlace: "Metro Manila, Philippines",
              },
              {
                "@type": "City",
                name: "Makati City",
                containedInPlace: "Metro Manila, Philippines",
              },
              {
                "@type": "City",
                name: "Manila City",
                containedInPlace: "Metro Manila, Philippines",
              },
              {
                "@type": "City",
                name: "Taguig City",
                containedInPlace: "Metro Manila, Philippines",
              },
              {
                "@type": "City",
                name: "Pasay City",
                containedInPlace: "Metro Manila, Philippines",
              },
              {
                "@type": "City",
                name: "Pasig City",
                containedInPlace: "Metro Manila, Philippines",
              },
              {
                "@type": "City",
                name: "Parañaque City",
                containedInPlace: "Metro Manila, Philippines",
              },
              {
                "@type": "City",
                name: "Mandaluyong City",
                containedInPlace: "Metro Manila, Philippines",
              },
              {
                "@type": "City",
                name: "San Juan City",
                containedInPlace: "Metro Manila, Philippines",
              },
            ],
            priceRange: "₱₱",
            openingHours: "Mo-Su 00:00-23:59",
            serviceType: "Home Service Available",
            hasMap: "https://maps.google.com/?q=Metro+Manila+Philippines",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "150",
              bestRating: "5",
              worstRating: "1",
            },
            review: [
              {
                "@type": "Review",
                author: {
                  "@type": "Person",
                  name: "Maria Santos",
                },
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                },
                reviewBody:
                  "Excellent home massage service in Quezon City. Very professional therapists.",
              },
            ],
          }),
        }}
      />
    </div>
  );
};

export default Location;
