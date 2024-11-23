import React from "react";
import { FaFacebook, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-r from-brown-800 to-brown-600 text-beige-200 py-10"
      role="contentinfo"
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
        {/* Left Section: Contact Information */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
          <h2 className="text-3xl font-semibold font-playfair italic">
            Miracle Touch Spa
          </h2>
          <p className="text-beige-300 text-sm md:text-base font-serif">
            Relax and rejuvenate at Miracle Touch Spa, offering professional
            massage and wellness services in [Your Location]. Contact us for
            home-service appointments today.
          </p>
          <p className="flex items-center">
            <FaEnvelope className="mr-2" aria-hidden="true" />
            <a
              href="mailto:miracletouchspa2@gmail.com"
              className="underline hover:text-beige-100 transition"
              aria-label="Email Miracle Touch Spa"
            >
              miracletouchspa2@gmail.com
            </a>
          </p>
          <p className="flex items-center">
            <FaPhoneAlt className="mr-2" aria-hidden="true" />
            <a
              href="tel:+639274736260"
              className="underline hover:text-beige-100 transition"
              aria-label="Call Miracle Touch Spa"
            >
              (+63) 927 473 6260
            </a>
          </p>
        </div>

        {/* Right Section: Social and Call-to-Action */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-3">
          <p className="text-beige-300 font-serif text-sm md:text-base">
            Follow Us & Book Now
          </p>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com/miracletouchspa"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-beige-200 hover:text-beige-100 transition"
              aria-label="Visit Miracle Touch Spa's Facebook page"
            >
              <FaFacebook size={24} aria-hidden="true" />
            </a>
            <a
              href="tel:+639123456789"
              className="text-beige-200 hover:text-beige-100 transition"
              aria-label="Call Miracle Touch Spa Now"
            >
              <FaPhoneAlt size={24} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="text-center mt-8 text-beige-400 text-sm font-serif border-t border-beige-300 pt-4">
        <p>
          &copy; {new Date().getFullYear()} Miracle Touch Spa. All rights
          reserved.
        </p>
      </div>

      {/* Local Business Schema */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Miracle Touch Spa",
          "description": "Relax and rejuvenate at Miracle Touch Spa. Contact us for home-service appointments.",
          "telephone": "+639274736260",
          "email": "miracletouchspa2@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Manila",
            "addressRegion": "Metro Manila",
            "addressCountry": "PH"
          },
          "url": "https://facebook.com/miracletouchspa",
          "sameAs": [
            "https://facebook.com/miracletouchspa"
          ]
        }
        `}
      </script>
    </footer>
  );
};

export default Footer;
