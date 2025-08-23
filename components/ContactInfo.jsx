"use client";

import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useContacts } from "../hooks/useContacts";

const ContactInfo = () => {
  const { getPrimaryPhone, getPrimaryEmail, loading, error } = useContacts();

  // Get contact info with fallbacks
  const phoneNumber = getPrimaryPhone() || "+63 927 473 6260";
  const emailAddress = getPrimaryEmail() || "miracletouchspa2@gmail.com";

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center animate-pulse">
          <div className="w-8 h-8 bg-brown-300 rounded mr-3"></div>
          <div className="w-32 h-4 bg-brown-300 rounded"></div>
        </div>
        <div className="flex items-center animate-pulse">
          <div className="w-8 h-8 bg-brown-300 rounded mr-3"></div>
          <div className="w-40 h-4 bg-brown-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Phone */}
      <div className="flex items-center">
        <FaPhoneAlt className="text-brown-500 mr-3 text-2xl md:text-3xl" />
        <div>
          <p className="text-lg md:text-xl font-semibold text-gray-800">
            Phone
          </p>
          <p className="text-gray-600 text-sm md:text-base">
            <a
              href={`tel:${phoneNumber.replace(/\s/g, "")}`}
              className="hover:text-brown-600 transition-colors"
            >
              {phoneNumber}
            </a>
          </p>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-center">
        <FaEnvelope className="text-brown-500 mr-3 text-2xl md:text-3xl" />
        <div>
          <p className="text-lg md:text-xl font-semibold text-gray-800">
            Email
          </p>
          <p className="text-gray-600 text-sm md:text-base">
            <a
              href={`mailto:${emailAddress}`}
              className="hover:text-brown-600 transition-colors"
            >
              {emailAddress}
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactInfo;
