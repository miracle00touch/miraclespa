"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import TherapistImageLoader from "../../components/TherapistImageLoader";
import PublicTherapistSkeleton from "../../components/PublicTherapistSkeleton";
import { useContacts } from "../../hooks/useContacts";
import {
  FaTimes,
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaHeart,
  FaWhatsapp,
  FaPhoneAlt,
  FaDumbbell,
  FaChevronLeft,
  FaChevronRight,
  FaImages,
} from "react-icons/fa";

const Male = () => {
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [massagers, setMassagers] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState(null);

  const { getPrimaryPhone, getWhatsAppNumber } = useContacts({
    autoFetch: true,
  });

  // Get contact info with fallbacks
  const phoneNumber = getPrimaryPhone() || "+639274736260";
  const whatsappNumber = getWhatsAppNumber() || phoneNumber;

  // Load male therapists from API
  useEffect(() => {
    loadTherapists();
  }, []);

  const loadTherapists = async () => {
    try {
      setError(null);
      setIsLoadingData(true);

      // Small delay to ensure skeleton is visible
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await fetch("/api/therapists?gender=male&active=true", {
        headers: {
          "Cache-Control": "no-store",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success) {
        setMassagers(data.data);
      } else {
        setError(data.error || "Failed to load therapists");
      }
    } catch (err) {
      console.error("Error loading therapists:", err);
      setError(`Failed to load therapists: ${err.message}`);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Fallback data in case API fails
  const fallbackMassagers = [
    {
      id: 1,
      name: "Carlos Mendoza",
      age: 32,
      location: "Makati City",
      experience: "9 years",
      rating: 4.9,
      reviews: 184,
      images: [
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
      ],
      description:
        "Experienced therapist specializing in deep tissue and sports massage.",
      specialties: [
        "Deep Tissue",
        "Sports Massage",
        "Therapeutic",
        "Sensual Massage",
      ],
      languages: ["English", "Filipino", "Spanish"],
      availability: "Mon-Sat, 8AM-10PM",
      bio: "Carlos brings nearly a decade of experience in therapeutic massage. Former physical therapist turned wellness specialist, he combines medical knowledge with relaxation techniques. His strong hands and professional approach make him ideal for clients seeking both therapeutic benefits and deep relaxation.",
      price: "₱3,500/session",
      bodyType: "Muscular",
      height: "5'11\"",
      personality: ["Professional", "Strong", "Knowledgeable", "Reliable"],
      isActive: true,
      showAge: true,
      showHeight: true,
      showBodyType: true,
      showPersonality: true,
    },
    {
      id: 2,
      name: "Ramon Cruz",
      age: 28,
      location: "Quezon City",
      experience: "6 years",
      rating: 4.8,
      reviews: 142,
      images: [
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      ],
      description: "Expert in sports massage and rehabilitation therapy.",
      specialties: [
        "Sports Massage",
        "Rehabilitation",
        "Nuru Massage",
        "Recovery",
      ],
      languages: ["English", "Filipino"],
      availability: "Daily, 9AM-9PM",
      bio: "Ramon specializes in sports therapy and injury recovery. His athletic background and certification in sports massage make him perfect for active clients. He understands the physical demands of modern life and tailors each session to address specific muscle groups and tension areas.",
      price: "₱3,200/session",
      bodyType: "Athletic",
      height: "5'9\"",
      personality: ["Energetic", "Focused", "Motivating", "Precise"],
      isActive: true,
      showAge: true,
      showHeight: true,
      showBodyType: true,
      showPersonality: true,
    },
    {
      id: 3,
      name: "Miguel Santos",
      age: 35,
      location: "Manila City",
      experience: "12 years",
      rating: 5.0,
      reviews: 267,
      images: [
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
      ],
      description:
        "Senior therapist skilled in therapeutic and sensual relaxation techniques.",
      specialties: [
        "Therapeutic",
        "Sensual Massage",
        "Relaxation",
        "Holistic Healing",
      ],
      languages: ["English", "Filipino", "Tagalog"],
      availability: "Mon-Fri, 10AM-8PM",
      bio: "Miguel is our most experienced male therapist with over 12 years in the wellness industry. His mastery of various massage techniques and intuitive understanding of client needs has earned him a perfect rating. He specializes in creating transformative experiences that heal both body and mind.",
      price: "₱4,000/session",
      bodyType: "Well-built",
      height: "6'0\"",
      personality: ["Experienced", "Intuitive", "Calming", "Masterful"],
      isActive: true,
      showAge: true,
      showHeight: true,
      showBodyType: true,
      showPersonality: true,
    },
    {
      id: 4,
      name: "Rico Delgado",
      age: 26,
      location: "Taguig City",
      experience: "4 years",
      rating: 4.7,
      reviews: 98,
      images: [
        "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg",
        "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg",
      ],
      description:
        "Young and passionate therapist specializing in modern massage techniques.",
      specialties: [
        "Modern Techniques",
        "Sensual Massage",
        "Aromatherapy",
        "Hot Stone",
      ],
      languages: ["English", "Filipino"],
      availability: "Tue-Sun, 11AM-9PM",
      bio: "Rico represents the new generation of massage therapists, combining traditional techniques with modern wellness approaches. His youthful energy and innovative methods appeal to clients looking for fresh perspectives on relaxation and wellness.",
      price: "₱2,800/session",
      bodyType: "Lean",
      height: "5'8\"",
      personality: ["Innovative", "Passionate", "Friendly", "Creative"],
      isActive: true,
      showAge: true,
      showHeight: true,
      showBodyType: true,
      showPersonality: true,
    },
  ];

  const openModal = (therapist) => {
    setSelectedTherapist(therapist);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedTherapist(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    if (selectedTherapist && selectedTherapist.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === selectedTherapist.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedTherapist && selectedTherapist.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedTherapist.images.length - 1 : prev - 1
      );
    }
  };

  const bookTherapist = (therapist) => {
    const message = `Hi! I'd like to book a session with ${therapist.name}. What are his available slots?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${whatsappNumber.replace(
        /\D/g,
        ""
      )}?text=${encodedMessage}`,
      "_blank"
    );
  };

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#f3e7d1] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={loadTherapists}
            className="mt-4 bg-brown-600 text-white px-4 py-2 rounded-md hover:bg-brown-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // While fetching, show the page-level skeleton to keep layout stable
  if (isLoadingData) {
    return <PublicTherapistSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#f3e7d1] py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-5xl font-semibold font-serif mb-6 md:mb-8 text-center text-brown-800">
        Male Therapists
      </h1>
      <p className="text-brown-700 text-lg md:text-xl text-center mb-12 font-sans">
        Our professional male therapists bring strength, skill, and expertise to
        ensure your ultimate comfort and well-being.
        <span className="block mt-2 text-base font-medium text-brown-600">
          Click on any therapist to view detailed profile
        </span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {massagers.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-600 text-lg">No therapists found.</p>
            <button
              onClick={loadTherapists}
              className="mt-4 bg-brown-600 text-white px-4 py-2 rounded-md hover:bg-brown-700"
            >
              Retry
            </button>
          </div>
        ) : (
          massagers.map((massager) => (
            <div
              key={massager._id || massager.id}
              onClick={() => openModal(massager)}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-2xl group"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <TherapistImageLoader
                  src={massager.images[0]}
                  alt={massager.name}
                  className="h-full w-full group-hover:scale-110 transition-transform duration-500"
                  fill={true}
                  fallbackIcon={true}
                  showSkeleton={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-2">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold">{massager.rating}</span>
                    <span className="text-sm">
                      ({massager.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {massager.name}
                  </h3>
                  <span className="text-brown-600 font-medium text-sm">
                    {massager.age} years
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <FaMapMarkerAlt className="mr-1" />
                  <span>{massager.location}</span>
                  <span className="mx-2">•</span>
                  <span>{massager.experience} exp</span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {massager.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {massager.specialties.slice(0, 2).map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                  {massager.specialties.length > 2 && (
                    <span className="text-blue-600 text-xs">
                      +{massager.specialties.length - 2} more
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-brown-800 font-bold">
                    {massager.price}
                  </span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selectedTherapist && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all"
              >
                <FaTimes className="text-gray-600 text-xl" />
              </button>

              {/* Header with Image */}
              <div className="relative h-80 md:h-96 group">
                <TherapistImageLoader
                  src={selectedTherapist.images[currentImageIndex]}
                  alt={`${selectedTherapist.name} - Photo ${
                    currentImageIndex + 1
                  }`}
                  className="rounded-t-lg"
                  fill={true}
                  fallbackIcon={true}
                  showSkeleton={false}
                />

                {/* Image Navigation - only show if multiple images */}
                {selectedTherapist.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full z-10 opacity-70 hover:opacity-100 transition-opacity"
                      type="button"
                    >
                      <FaChevronLeft className="text-lg" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full z-10 opacity-70 hover:opacity-100 transition-opacity"
                      type="button"
                    >
                      <FaChevronRight className="text-lg" />
                    </button>

                    {/* Image indicators */}
                    <div className="absolute bottom-20 right-6 bg-black bg-opacity-50 px-3 py-1 rounded-full text-white text-sm flex items-center z-10">
                      <FaImages className="mr-2" />
                      {currentImageIndex + 1} /{" "}
                      {selectedTherapist.images.length}
                    </div>
                  </>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    {selectedTherapist.name}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm">
                    {selectedTherapist.showAge && (
                      <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                        {selectedTherapist.age} years old
                      </span>
                    )}
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                      {selectedTherapist.experience} experience
                    </span>
                    <div className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span>
                        {selectedTherapist.rating} ({selectedTherapist.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Thumbnails - only show if multiple images */}
              {selectedTherapist.images.length > 1 && (
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex space-x-2 overflow-x-auto">
                    {selectedTherapist.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 relative rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index
                            ? "border-blue-500 ring-2 ring-blue-200"
                            : "border-gray-300 hover:border-blue-300"
                        }`}
                      >
                        <TherapistImageLoader
                          src={image}
                          alt={`${selectedTherapist.name} - Thumbnail ${
                            index + 1
                          }`}
                          className=""
                          fill={true}
                          fallbackIcon={false}
                          showSkeleton={false}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Main Info */}
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold text-brown-800 mb-4">
                      About {selectedTherapist.name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {selectedTherapist.bio}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                          <FaDumbbell className="mr-2" />
                          Specialties
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTherapist.specialties.map(
                            (specialty, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                              >
                                {specialty}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-2">
                          Languages
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTherapist.languages.map(
                            (language, index) => (
                              <span
                                key={index}
                                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                              >
                                {language}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {selectedTherapist.showPersonality &&
                      selectedTherapist.personality &&
                      selectedTherapist.personality.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-blue-700 mb-2">
                            Professional Qualities
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedTherapist.personality.map(
                              (trait, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                >
                                  <FaHeart className="inline mr-1 text-xs text-blue-500" />
                                  {trait}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-3">
                        Quick Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium">
                            {selectedTherapist.location}
                          </span>
                        </div>
                        {selectedTherapist.showHeight &&
                          selectedTherapist.height && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Height:</span>
                              <span className="font-medium">
                                {selectedTherapist.height}
                              </span>
                            </div>
                          )}
                        {selectedTherapist.showBodyType &&
                          selectedTherapist.bodyType && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Build:</span>
                              <span className="font-medium">
                                {selectedTherapist.bodyType}
                              </span>
                            </div>
                          )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Experience:</span>
                          <span className="font-medium">
                            {selectedTherapist.experience}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Photos:</span>
                          <span className="font-medium">
                            {selectedTherapist.images.length}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                        <FaClock className="mr-2" />
                        Availability
                      </h4>
                      <p className="text-green-700 text-sm">
                        {selectedTherapist.availability}
                      </p>
                    </div>

                    <div className="bg-brown-100 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-brown-800 mb-2">
                        {selectedTherapist.price}
                      </div>
                      <p className="text-brown-600 text-sm mb-4">per session</p>

                      <div className="space-y-2">
                        <button
                          onClick={() => bookTherapist(selectedTherapist)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                        >
                          <FaWhatsapp className="mr-2" />
                          Book via WhatsApp
                        </button>
                        <a
                          href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                        >
                          <FaPhoneAlt className="mr-2" />
                          Call Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Male;
