import React from "react";
import { FaMapMarkerAlt, FaHome } from "react-icons/fa";

const ServiceLocations = () => {
  return (
    <section className="bg-[#f3e7d1] py-12 px-4 text-center text-gray-800">
      <h2 className="text-3xl font-semibold mb-8 font-serif text-brown-700">
        Where Can You Enjoy a Massage?
      </h2>
      <p className="max-w-2xl mx-auto text-gray-700 mb-8">
        Miracle Touch Spa offers professional massage services across various
        locations in Metro Manila, and even at select hotels or in the comfort
        of your own home. Experience relaxation and convenience tailored to you.
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {/* Location Cards */}
        <div className="bg-white rounded-lg shadow-md p-6 max-w-xs text-left transform transition duration-300 hover:shadow-2xl hover:bg-[#faf0e6] hover:scale-105">
          <FaMapMarkerAlt className="text-brown-500 text-3xl mb-4" />
          <h3 className="text-xl font-semibold text-brown-800">Quezon City</h3>
          <p className="text-gray-600">
            Miracle Touch Spa provides relaxing massage services throughout
            Quezon City, bringing rejuvenation to your door.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-xs text-left transform transition duration-300 hover:shadow-2xl hover:bg-[#faf0e6] hover:scale-105">
          <FaMapMarkerAlt className="text-brown-500 text-3xl mb-4" />
          <h3 className="text-xl font-semibold text-brown-800">Makati City</h3>
          <p className="text-gray-600">
            Enjoy Miracle Touch Spa&apos;s massage services in Makati City,
            perfect for home or hotel visits in the heart of the business
            district.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-xs text-left transform transition duration-300 hover:shadow-2xl hover:bg-[#faf0e6] hover:scale-105">
          <FaMapMarkerAlt className="text-brown-500 text-3xl mb-4" />
          <h3 className="text-xl font-semibold text-brown-800">Manila City</h3>
          <p className="text-gray-600">
            Miracle Touch Spa extends its massage and spa services across Manila
            City, delivering relaxation wherever you are.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-xs text-left transform transition duration-300 hover:shadow-2xl hover:bg-[#faf0e6] hover:scale-105">
          <FaMapMarkerAlt className="text-brown-500 text-3xl mb-4" />
          <h3 className="text-xl font-semibold text-brown-800">Taguig City</h3>
          <p className="text-gray-600">
            Relax with Miracle Touch Spa’s personalized massage services in
            Taguig City, including Bonifacio Global City (BGC).
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-xs text-left transform transition duration-300 hover:shadow-2xl hover:bg-[#faf0e6] hover:scale-105">
          <FaMapMarkerAlt className="text-brown-500 text-3xl mb-4" />
          <h3 className="text-xl font-semibold text-brown-800">Pasay City</h3>
          <p className="text-gray-600">
            Miracle Touch Spa is available in Pasay City, ideal for travelers
            seeking in-room massages near the airport.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-xs text-left transform transition duration-300 hover:shadow-2xl hover:bg-[#faf0e6] hover:scale-105">
          <FaHome className="text-brown-500 text-3xl mb-4" />
          <h3 className="text-xl font-semibold text-brown-800">Home Service</h3>
          <p className="text-gray-600">
            Experience the luxury of a private massage at home with Miracle
            Touch Spa, tailored to offer complete relaxation.
          </p>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Miracle Touch Spa - Massage Services",
            description:
              "Professional massage services across Metro Manila including Quezon City, Makati, Manila, Taguig, and Pasay.",
            areaServed: [
              { "@type": "Place", name: "Quezon City" },
              { "@type": "Place", name: "Makati City" },
              { "@type": "Place", name: "Manila City" },
              { "@type": "Place", name: "Taguig City" },
              { "@type": "Place", name: "Pasay City" },
            ],
            provider: {
              "@type": "LocalBusiness",
              name: "Miracle Touch Spa",
              telephone: "+63 927 473 6260",
              url: "https://miracletouchspa.vercel.app",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Metro Manila",
                addressCountry: "Philippines",
              },
            },
          }),
        }}
      />
    </section>
  );
};

export default ServiceLocations;
