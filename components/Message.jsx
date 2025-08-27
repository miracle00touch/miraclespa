"use client";
import React, { useState } from "react";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

const Message = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please complete the CAPTCHA.");
      return;
    }

    setIsLoading(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, // Vercel supports client-side env vars with NEXT_PUBLIC prefix
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        { ...formData, "g-recaptcha-response": captchaToken },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
      .then(
        () => {
          setIsSubmitted(true);
          setIsLoading(false);
          setCaptchaToken(null);
        },
        () => {
          alert("Failed to send message. Please try again.");
          setIsLoading(false);
        }
      );

    setFormData({ from_name: "", reply_to: "", message: "" });
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    setIsSubmitted(false);
  };

  return (
    <div>
      {/* Contact Form Toggle Button */}
      <button
        onClick={toggleFormVisibility}
        className="fixed bottom-4 right-4 bg-brown-600 text-white p-4 rounded-full hover:bg-brown-700 transition-shadow shadow-lg flex items-center justify-center"
        aria-label="Open contact form"
      >
        <FaPaperPlane className="text-2xl" />
      </button>

      {/* Contact Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-lg relative">
            <button
              onClick={toggleFormVisibility}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              aria-label="Close contact form"
            >
              <FaTimes className="text-2xl" />
            </button>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Send us a message
            </h3>

            {isSubmitted ? (
              <p className="text-center text-green-500 font-medium">
                Thank you! Your message has been sent.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                  type="text"
                  name="from_name"
                  placeholder="Your Name"
                  value={formData.from_name}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring focus:ring-brown-300"
                  aria-label="Your Name"
                />
                <input
                  type="email"
                  name="reply_to"
                  placeholder="Your Email"
                  value={formData.reply_to}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring focus:ring-brown-300"
                  aria-label="Your Email"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring focus:ring-brown-300 h-32 resize-none"
                  aria-label="Your Message"
                ></textarea>
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={handleCaptchaChange}
                />
                <button
                  type="submit"
                  className="bg-brown-600 text-white py-2 px-6 rounded-full hover:bg-brown-700 transition disabled:bg-gray-400 flex items-center justify-center"
                  disabled={isLoading}
                  aria-label="Send Message"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 bg-white/30 rounded animate-pulse"></div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
