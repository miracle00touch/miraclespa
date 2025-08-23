"use client";

import { FaFacebook, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useContacts } from "../hooks/useContacts";

export default function HomePage() {
  const { getPrimaryPhone, getPrimaryEmail, loading, error } = useContacts();

  // Get contact info with fallbacks
  const phoneNumber = getPrimaryPhone() || "(+63) 927 473 6260";
  const emailAddress = getPrimaryEmail() || "miracletouchspa2@gmail.com";
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#f8f3eb] text-gray-800">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/pexels-spa-home.jpg"
          alt="Spa Background"
          fill
          sizes="100vw"
          className="opacity-40 object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12">
        <h1 className="text-5xl md:text-7xl font-light mb-4 text-brown-700 font-playfair italic">
          Miracle Touch Spa Manila
        </h1>
        <h2 className="text-2xl md:text-3xl font-light mb-6 text-brown-600 font-playfair">
          Premium Home Service Spa & Sensual Massage
        </h2>
        <p className="text-lg md:text-xl font-playfair mb-8 max-w-2xl mx-auto text-brown-600 leading-relaxed">
          Experience luxury spa treatments in the comfort of your home with
          Manila&apos;s premier mobile spa service. Our professional therapists
          deliver exceptional sensual massage therapy, Swedish massage, and
          therapeutic spa treatments directly to your location. Available 24/7
          throughout Metro Manila for ultimate convenience and relaxation.
        </p>

        {/* Large Contact Number */}
        <div className="mb-6">
          <a
            href={`tel:${phoneNumber.replace(/[^\d+]/g, "")}`}
            className="block"
          >
            <p className="text-4xl md:text-5xl font-serif text-brown-800 tracking-wide hover:text-brown-600 transition-colors">
              {phoneNumber}
            </p>
            <p className="text-sm text-brown-500 mt-2">
              Call now for instant booking
            </p>
          </a>
        </div>

        {/* Book Now Button with Tooltip */}
        <div className="relative group">
          <Link href="contact" passHref>
            <button className="relative font-playfair z-10 bg-brown-600 hover:bg-brown-700 text-white font-medium py-3 px-12 rounded-full text-lg md:text-xl shadow-md transition-all duration-200 ease-in-out">
              BOOK NOW
            </button>
          </Link>
          {/* Tooltip */}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 px-6 py-4 bg-brown-700 text-white text-lg rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 before:content-[''] before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:-translate-x-full before:border-8 before:border-transparent before:border-r-brown-700 border border-white">
            Open 24/7
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="relative z-10 flex flex-col md:flex-row items-center text-center space-y-6 md:space-y-0 md:space-x-12 text-brown-700 mt-10">
        <Link
          href="https://www.facebook.com/miracletouchspa"
          passHref
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center space-x-3">
            <FaFacebook className="text-brown-500" size={20} />
            <span className="font-medium font-serif text-lg md:text-xl">
              Miracle Touch Spa
            </span>
          </div>
        </Link>
        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-brown-500" size={20} />
          <span className="font-medium font-serif text-lg md:text-xl">
            {emailAddress}
          </span>
        </div>
      </div>

      {/* Enhanced Structured Data for Google Ads */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://miracletouchspa.vercel.app",
            name: "Miracle Touch Spa Manila",
            alternateName: "Miracle Touch Spa",
            description:
              "Premium home service spa in Manila offering professional sensual massage therapy, Swedish massage, and luxury spa treatments. Available 24/7 throughout Metro Manila for ultimate relaxation and wellness.",
            image: [
              "https://miracletouchspa.vercel.app/images/pexels-spa-home.jpg",
              "https://miracletouchspa.vercel.app/og-image.jpg",
            ],
            logo: "https://miracletouchspa.vercel.app/miracle_touch_spa.svg",
            telephone: phoneNumber.replace(/[^\d+]/g, ""),
            priceRange: "₱₱",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Metro Manila",
              addressCountry: "Philippines",
              addressRegion: "National Capital Region",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "14.5995",
              longitude: "120.9842",
            },
            url: "https://miracletouchspa.vercel.app",
            sameAs: [
              "https://www.facebook.com/miracletouchspa",
              `mailto:${emailAddress}`,
            ],
            openingHours: [
              "Mo 00:00-23:59",
              "Tu 00:00-23:59",
              "We 00:00-23:59",
              "Th 00:00-23:59",
              "Fr 00:00-23:59",
              "Sa 00:00-23:59",
              "Su 00:00-23:59",
            ],
            serviceArea: [
              "Quezon City",
              "Makati City",
              "Manila City",
              "Taguig City",
              "Pasay City",
              "Pasig City",
              "Parañaque City",
              "Mandaluyong City",
              "San Juan City",
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Spa and Massage Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  name: "Home Service Sensual Massage",
                  description:
                    "Professional sensual massage therapy delivered to your home",
                },
                {
                  "@type": "Offer",
                  name: "Swedish Massage",
                  description:
                    "Relaxing Swedish massage for stress relief and wellness",
                },
                {
                  "@type": "Offer",
                  name: "Deep Tissue Massage",
                  description:
                    "Therapeutic deep tissue massage for muscle tension relief",
                },
                {
                  "@type": "Offer",
                  name: "Couple Massage",
                  description:
                    "Romantic couple massage sessions in the comfort of your home",
                },
              ],
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "150",
              bestRating: "5",
              worstRating: "1",
            },
          }),
        }}
      />

      {/* Additional Schema for Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Home Service Spa and Massage Manila",
            description:
              "Premium mobile spa services providing sensual massage therapy, Swedish massage, and luxury spa treatments delivered to your home in Metro Manila.",
            provider: {
              "@type": "LocalBusiness",
              name: "Miracle Touch Spa Manila",
              telephone: phoneNumber.replace(/[^\d+]/g, ""),
              url: "https://miracletouchspa.vercel.app",
            },
            areaServed: [
              "Metro Manila",
              "Quezon City",
              "Makati City",
              "Manila City",
              "Taguig City",
              "Pasay City",
              "Pasig City",
            ],
            availableChannel: {
              "@type": "ServiceChannel",
              servicePhone: phoneNumber.replace(/[^\d+]/g, ""),
              serviceUrl: "https://miracletouchspa.vercel.app/contact",
            },
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "00:00",
              closes: "23:59",
            },
          }),
        }}
      />
    </div>
  );
}
