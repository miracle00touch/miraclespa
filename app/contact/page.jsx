"use client";

import React from "react";
import Image from "next/image";
import {
  FaPhoneAlt,
  FaViber,
  FaWhatsapp,
  FaEnvelope,
  FaFacebook,
  FaTelegramPlane,
} from "react-icons/fa";
import { SiWechat, SiLine } from "react-icons/si";

const Contact = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#f3e7d1] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full text-center">
        {/* Contact Us Title */}
        <h1 className="text-4xl md:text-5xl font-semibold font-serif mb-6 md:mb-8 text-brown-800">
          Contact Us
        </h1>
        <p className="text-brown-700 text-lg md:text-xl mb-8 font-sans">
          Book Now! Call or message us on Viber, WhatsApp, Line, Telegram, or
          WeChat.
        </p>

        {/* Contact Methods - Grid Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {/* Call Us */}
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg transition hover:shadow-xl">
            <FaPhoneAlt className="text-indigo-600 text-3xl mb-4" />
            <a
              href="tel:+639274736260"
              className="text-lg font-medium text-gray-800 hover:text-indigo-600"
            >
              (+63) 927 473 6260
            </a>
            <Image
              src="/images/call.png"
              alt="QR Code to call Miracle Touch Spa"
              width={96}
              height={96}
              className="mt-4 w-24 h-24"
            />
          </div>

          {/* Viber */}
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg transition hover:shadow-xl">
            <FaViber className="text-purple-600 text-4xl mb-4" />
            <a
              href="viber://chat?number=+639274736260"
              className="text-lg font-medium text-gray-800 hover:text-purple-600"
            >
              Message us on Viber
            </a>
            <Image
              src="/images/Viber-mts.png"
              alt="QR Code to message on Viber"
              width={96}
              height={96}
              className="mt-4 w-24 h-24"
            />
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg transition hover:shadow-xl">
            <FaWhatsapp className="text-green-600 text-4xl mb-4" />
            <a
              href="https://wa.me/639274736260"
              className="text-lg font-medium text-gray-800 hover:text-green-600"
            >
              Message us on WhatsApp
            </a>
            <Image
              src="/images/Whatsapp-mts.jpg"
              alt="QR Code to message on WhatsApp"
              width={96}
              height={96}
              className="mt-4 w-24 h-24"
            />
          </div>

          {/* Line */}
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg transition hover:shadow-xl">
            <SiLine className="text-green-500 text-4xl mb-4" />
            <a
              href="https://line.me/ti/p/09274736260"
              className="text-lg font-medium text-gray-800 hover:text-green-500"
            >
              Message us on Line
            </a>
            <Image
              src="/images/Line-mts.jpg"
              alt="QR Code to message on Line"
              width={96}
              height={96}
              className="mt-4 w-24 h-24"
            />
          </div>

          {/* Telegram */}
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg transition hover:shadow-xl">
            <FaTelegramPlane className="text-blue-400 text-4xl mb-4" />
            <a
              href="https://t.me/MNGN12"
              className="text-lg font-medium text-gray-800 hover:text-blue-400"
            >
              Message us on Telegram
            </a>
            <Image
              src="/images/TG-mts.jpg"
              alt="QR Code to message on Telegram"
              width={96}
              height={96}
              className="mt-4 w-24 h-24"
            />
          </div>

          {/* WeChat */}
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg transition hover:shadow-xl">
            <SiWechat className="text-green-400 text-4xl mb-4" />
            <a
              href="#"
              className="text-lg font-medium text-gray-800 hover:text-green-400"
            >
              Message us on WeChat
            </a>
            <Image
              src="/images/WeChat-mts.jpg"
              alt="QR Code to message on WeChat"
              width={96}
              height={96}
              className="mt-4 w-24 h-24"
            />
          </div>
        </div>

        {/* Additional Contact Links */}
        <div className="flex flex-col items-center mt-4 space-y-3">
          <div className="flex items-center space-x-3">
            <FaFacebook className="text-blue-600 text-4xl" />
            <a
              href="https://www.facebook.com/miracletouchspa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-gray-800 hover:text-blue-600"
            >
              Miracle Touch Spa
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-brown-600 text-2xl" />
            <a
              href="mailto:miracletouchspa2@gmail.com"
              className="text-lg font-medium text-gray-800 hover:text-brown-600"
            >
              miracletouchspa2@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
