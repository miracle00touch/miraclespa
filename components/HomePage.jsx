import { FaFacebook, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
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
          Miracle Touch Spa
        </h1>
        <p className="text-lg md:text-xl font-playfair mb-8 max-w-lg mx-auto text-brown-600 leading-relaxed">
          Rejuvenate your senses with the soothing touch of sensual massage in
          our serene and tranquil spa retreat.
        </p>

        {/* Large Contact Number */}
        <div className="mb-6">
          <p className="text-4xl md:text-5xl font-serif text-brown-800 tracking-wide">
            (+63) 927 473 6260
          </p>
        </div>

        {/* Book Now Button with Tooltip */}
        <div className="relative group">
          <Link href="contact" passHref>
            <button className="relative font-playfair z-10 bg-brown-600 hover:bg-brown-700 text-white font-medium py-3 px-12 rounded-full text-lg md:text-xl shadow-md transition-all duration-200 ease-in-out">
              BOOK NOW
            </button>
          </Link>
          {/* Tooltip */}
          <div className="absolute left-full shadown-md top-1/2 transform -translate-y-1/2 ml-4 px-6 py-4 bg-brown-700 text-white text-lg rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 before:content-[''] before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:-translate-x-full before:border-8 before:border-transparent before:border-r-brown-700 border border-white">
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
            miracletouchspa2@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
}
