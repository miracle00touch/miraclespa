"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useContacts } from "../../hooks/useContacts";

// Note: metadata should be in a separate file for client components
// or moved to a parent server component
import {
  FaPhoneAlt,
  FaViber,
  FaWhatsapp,
  FaEnvelope,
  FaFacebook,
  FaTelegramPlane,
  FaClock,
  FaMapMarkerAlt,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import { SiWechat, SiLine } from "react-icons/si";

const Contact = () => {
  const [selectedService, setSelectedService] = useState("Nuru Massage");

  const {
    getPrimaryPhone,
    getPrimaryEmail,
    getWhatsAppNumber,
    getViberNumber,
    getTelegramContact,
    getWeChatContact,
    loading,
    error,
  } = useContacts({ autoFetch: false });

  // Get contact numbers with fallbacks
  const phoneNumber = getPrimaryPhone() || "+639274736260";
  const emailAddress = getPrimaryEmail() || "miracletouchspa2@gmail.com";
  const whatsappNumber = getWhatsAppNumber() || phoneNumber;
  const viberNumber = getViberNumber() || phoneNumber;
  const telegramContact = getTelegramContact() || "MNGN12";
  const wechatContact = getWeChatContact() || "09274736260";

  const services = [
    "Nuru Massage",
    "Sensual Massage",
    "Swedish Massage",
    "Full Body Massage",
    "Hot Stone Therapy",
    "Shiatsu Massage",
    "Body Scrub",
    "Ear Candling",
  ];

  const quickBookingMessage = (platform) => {
    const message = `Hi! I'd like to book a ${selectedService} session. What are your available slots today/tomorrow?`;

    const encodedMessage = encodeURIComponent(message);

    switch (platform) {
      case "whatsapp":
        return `https://wa.me/${whatsappNumber.replace(
          /\D/g,
          ""
        )}?text=${encodedMessage}`;
      case "viber":
        return `viber://chat?number=${viberNumber.replace(
          /\s/g,
          ""
        )}&text=${encodedMessage}`;
      case "telegram":
        return `https://t.me/${telegramContact.replace(
          "@",
          ""
        )}?text=${encodedMessage}`;
      case "line":
        return `https://line.me/ti/p/${wechatContact}`;
      default:
        return "#";
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f8f4e8] via-[#f3e7d1] to-[#ede1d1]">
      {/* Hero Section with Urgent CTA */}
      <div className="relative bg-gradient-to-r from-brown-800 to-brown-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-yellow-400 text-brown-900 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <FaClock className="mr-2" />
            Available Today • Home Service • Metro Manila
          </div>

          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">
            Book Your Relaxing
            <span className="block text-yellow-300">Spa Experience</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-brown-100 max-w-3xl mx-auto">
            Professional massage therapy in the comfort of your home.
            <strong className="text-yellow-300">
              {" "}
              Same-day bookings available!
            </strong>
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-brown-200">
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="flex items-center">
              <FaCheckCircle className="text-green-400 mr-1" />
              <span className="font-semibold">Licensed Therapists</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-blue-400 mr-1" />
              <span className="font-semibold">All Metro Manila</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Booking Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12 border-t-4 border-brown-600">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-brown-800 mb-4">
              🕐 Book Now - Get Instant Response!
            </h2>
            <p className="text-lg text-brown-700 mb-6">
              Select your preferred service and message us instantly. Most
              bookings confirmed within 10 minutes!
            </p>

            {/* Service Selector */}
            <div className="mb-8">
              <label className="block text-brown-800 font-semibold mb-4 text-lg">
                Choose Your Service:
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full max-w-md mx-auto px-4 py-3 border-2 border-brown-300 rounded-lg focus:border-brown-600 focus:outline-none text-lg font-medium bg-white"
              >
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Primary Booking Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* WhatsApp - Primary CTA */}
            <a
              href={quickBookingMessage("whatsapp")}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
            >
              <FaWhatsapp className="text-2xl mr-3" />
              Book via WhatsApp
              <span className="ml-2 text-sm bg-white bg-opacity-20 px-2 py-1 rounded">
                Fastest Response
              </span>
            </a>

            {/* Call - Secondary CTA */}
            <a
              href={`tel:${phoneNumber.replace(/\s/g, "")}`}
              className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
            >
              <FaPhoneAlt className="text-2xl mr-3" />
              Call Now: {phoneNumber}
            </a>
          </div>

          {/* Alternative Contact Methods */}
          <div className="mb-8">
            <p className="text-brown-700 font-medium mb-4 text-center">
              Or choose your preferred messaging app:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Viber */}
              <a
                href={quickBookingMessage("viber")}
                className="group bg-white hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-400 p-4 rounded-lg transition-all duration-300 text-center"
              >
                <FaViber className="text-purple-600 text-3xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-purple-700">
                  Viber
                </span>
              </a>

              {/* Telegram */}
              <a
                href={quickBookingMessage("telegram")}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 p-4 rounded-lg transition-all duration-300 text-center"
              >
                <FaTelegramPlane className="text-blue-500 text-3xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-blue-700">
                  Telegram
                </span>
              </a>

              {/* Line */}
              <a
                href={quickBookingMessage("line")}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white hover:bg-green-50 border-2 border-green-200 hover:border-green-400 p-4 rounded-lg transition-all duration-300 text-center"
              >
                <SiLine className="text-green-500 text-3xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-green-700">Line</span>
              </a>

              {/* WeChat */}
              <div className="group bg-white hover:bg-green-50 border-2 border-green-200 hover:border-green-400 p-4 rounded-lg transition-all duration-300 text-center cursor-pointer">
                <SiWechat className="text-green-400 text-3xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-green-700">
                  WeChat
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* QR Codes Section */}
        <div className="bg-brown-50 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-brown-800 text-center mb-6">
            📱 Scan to Book Instantly
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Image
                src="/images/call.png"
                alt="QR Code for calling Miracle Touch Spa"
                width={120}
                height={120}
                className="mx-auto mb-2 rounded-lg shadow-md"
              />
              <p className="text-sm font-medium text-brown-700">Call Direct</p>
            </div>
            <div className="text-center">
              <Image
                src="/images/Whatsapp-mts.jpg"
                alt="QR Code to message Miracle Touch Spa on WhatsApp"
                width={120}
                height={120}
                className="mx-auto mb-2 rounded-lg shadow-md"
              />
              <p className="text-sm font-medium text-brown-700">WhatsApp</p>
            </div>
            <div className="text-center">
              <Image
                src="/images/Viber-mts.png"
                alt="QR Code to message Miracle Touch Spa on Viber"
                width={120}
                height={120}
                className="mx-auto mb-2 rounded-lg shadow-md"
              />
              <p className="text-sm font-medium text-brown-700">Viber</p>
            </div>
            <div className="text-center">
              <Image
                src="/images/TG-mts.jpg"
                alt="QR Code to message Miracle Touch Spa on Telegram"
                width={120}
                height={120}
                className="mx-auto mb-2 rounded-lg shadow-md"
              />
              <p className="text-sm font-medium text-brown-700">Telegram</p>
            </div>
          </div>
        </div>

        {/* Why Book With Us Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h3 className="text-3xl font-bold text-brown-800 text-center mb-8">
            Why Choose Miracle Touch Spa?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-brown-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-brown-600 text-2xl" />
              </div>
              <h4 className="font-bold text-lg text-brown-800 mb-2">
                Licensed & Professional
              </h4>
              <p className="text-brown-600">
                Certified therapists with years of experience
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brown-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-brown-600 text-2xl" />
              </div>
              <h4 className="font-bold text-lg text-brown-800 mb-2">
                Home Service Available
              </h4>
              <p className="text-brown-600">
                We come to you anywhere in Metro Manila
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brown-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-brown-600 text-2xl" />
              </div>
              <h4 className="font-bold text-lg text-brown-800 mb-2">
                Same Day Booking
              </h4>
              <p className="text-brown-600">
                Available today with flexible scheduling
              </p>
            </div>
          </div>
        </div>

        {/* Urgency Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-8 text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-brown-900 mb-4">
            ⏰ Limited Slots Available Today!
          </h3>
          <p className="text-brown-800 text-lg mb-6">
            Don&apos;t miss out on your relaxation time. Book now to secure your
            preferred time slot.
          </p>
          <a
            href={quickBookingMessage("whatsapp")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brown-900 hover:bg-brown-800 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105"
          >
            Book My Session Now →
          </a>
        </div>

        {/* Additional Contact & Social */}
        <div className="bg-brown-800 rounded-2xl text-white p-8 text-center">
          <h3 className="text-2xl font-bold mb-6">Stay Connected</h3>
          <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
            <a
              href="https://www.facebook.com/miracletouchspa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
            >
              <FaFacebook className="text-xl mr-2" />
              Follow Us on Facebook
            </a>
            <a
              href={`mailto:${emailAddress}`}
              className="flex items-center bg-brown-600 hover:bg-brown-700 px-6 py-3 rounded-lg transition-colors"
            >
              <FaEnvelope className="text-xl mr-2" />
              {emailAddress}
            </a>
          </div>
          <p className="text-brown-200">
            Operating Hours: 9:00 AM - 10:00 PM Daily | Serving All Metro Manila
          </p>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Book Miracle Touch Spa - Professional Massage Services",
            description:
              "Book professional massage services with Miracle Touch Spa in Metro Manila. Same-day bookings available. Contact us via WhatsApp, Viber, Line, Telegram, or call direct.",
            url: "https://miracletouchspa.vercel.app/contact",
            telephone: phoneNumber,
            contactType: "Customer Support",
            sameAs: [
              "https://www.facebook.com/miracletouchspa",
              `mailto:${emailAddress}`,
            ],
            areaServed: {
              "@type": "City",
              name: "Metro Manila",
              containedInPlace: {
                "@type": "Country",
                name: "Philippines",
              },
            },
            availableService: [
              {
                "@type": "Service",
                name: "Swedish Massage",
                description: "Professional Swedish massage therapy",
              },
              {
                "@type": "Service",
                name: "Full Body Massage",
                description: "Complete relaxation massage therapy",
              },
              {
                "@type": "Service",
                name: "Hot Stone Therapy",
                description: "Therapeutic hot stone massage",
              },
            ],
          }),
        }}
      />
    </div>
  );
};

export default Contact;
