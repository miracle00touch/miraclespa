import React from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

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
          whether you're at home or visiting us directly.
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
          <div className="flex items-center">
            <FaPhoneAlt className="text-brown-500 mr-3 text-2xl md:text-3xl" />
            <div>
              <p className="text-lg md:text-xl font-semibold text-gray-800">
                Contact Us
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                (+63) 927 473 6260
              </p>
            </div>
          </div>

          {/* Email Info */}
          <div className="flex items-center">
            <FaEnvelope className="text-brown-500 mr-3 text-2xl md:text-3xl" />
            <div>
              <p className="text-lg md:text-xl font-semibold text-gray-800">
                Email
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                miracletouchspa2@gmail.com
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
            name: "Miracle Touch Spa",
            description:
              "Miracle Touch Spa provides professional massage services in Quezon City, Makati, Manila, and other cities in Metro Manila.",
            image:
              "https://images.pexels.com/photos/2604843/pexels-photo-2604843.jpeg",
            telephone: "+63 927 473 6260",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Metro Manila",
              addressCountry: "Philippines",
            },
            areaServed: [
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
            url: "https://miracletouchspa.vercel.app/location",
          }),
        }}
      />
    </div>
  );
};

export default Location;
