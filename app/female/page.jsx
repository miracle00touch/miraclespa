"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useContacts } from "../../hooks/useContacts";
import {
  FaTimes,
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaHeart,
  FaWhatsapp,
  FaPhoneAlt,
  FaChevronLeft,
  FaChevronRight,
  FaImages,
} from "react-icons/fa";

const Female = () => {
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [massagers, setMassagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingStarted, setLoadingStarted] = useState(false); // Prevent duplicate calls

  const {
    getPrimaryPhone,
    getWhatsAppNumber,
    loading: contactsLoading,
    fetchContacts: fetchContactsExplicit,
  } = useContacts({ autoFetch: true }); // Changed to auto-fetch

  // Get contact info with fallbacks
  const phoneNumber = getPrimaryPhone() || "+639274736260";
  const whatsappNumber = getWhatsAppNumber() || phoneNumber;

  // Load female therapists from API
  useEffect(() => {
    if (!loadingStarted) {
      setLoadingStarted(true);
      loadTherapists();
    }
  }, [loadingStarted]);

  const loadTherapists = async () => {
    try {
      setLoading(true);
      setError(null);

      // Add slight delay to avoid cold start issues
      await new Promise((resolve) => setTimeout(resolve, 200));

      const response = await fetch(
        "/api/therapists?gender=female&active=true",
        {
          headers: {
            "Cache-Control": "public, max-age=300, stale-while-revalidate=60",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setMassagers(data.data);
      } else {
        console.error("Invalid data structure:", data);
        setError(
          data.error || "Failed to load therapists - invalid data structure"
        );
      }
    } catch (err) {
      console.error("Error loading therapists:", err);
      setError(`Failed to load therapists: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fallback data in case API fails
  const fallbackMassagers = [
    {
      id: 1,
      name: "Maria Santos",
      age: 26,
      location: "Quezon City",
      experience: "5 years",
      rating: 4.9,
      reviews: 127,
      images: [
        "https://images.pexels.com/photos/6788392/pexels-photo-6788392.jpeg",
        "https://images.pexels.com/photos/6560288/pexels-photo-6560288.jpeg",
        "https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg",
      ],
      description:
        "Maria specializes in Swedish and deep tissue massage, providing ultimate relaxation.",
      specialties: [
        "Swedish Massage",
        "Deep Tissue",
        "Hot Stone",
        "Aromatherapy",
      ],
      languages: ["English", "Filipino", "Tagalog"],
      availability: "Mon-Sat, 9AM-9PM",
      bio: "With 5 years of experience, Maria has mastered the art of relaxation therapy. She holds certifications in Swedish and deep tissue massage, and has helped over 500 clients achieve their wellness goals. Her gentle yet effective approach makes her perfect for both first-time clients and massage enthusiasts.",
      price: "₱2,500/session",
      bodyType: "Petite",
      height: "5'3\"",
      personality: ["Gentle", "Professional", "Caring", "Attentive"],
      isActive: true,
      showAge: true,
      showHeight: true,
      showBodyType: true,
      showPersonality: true,
    },
    {
      id: 2,
      name: "Ana Rivera",
      age: 29,
      location: "Makati City",
      experience: "7 years",
      rating: 4.8,
      reviews: 203,
      images: [
        "https://images.pexels.com/photos/5893392/pexels-photo-5893392.jpeg",
        "https://images.pexels.com/photos/7659561/pexels-photo-7659561.jpeg",
      ],
      description:
        "Ana is an expert in sports massage, helping clients recover and maintain peak performance.",
      specialties: [
        "Sports Massage",
        "Therapeutic",
        "Sensual Massage",
        "Recovery",
      ],
      languages: ["English", "Filipino", "Spanish"],
      availability: "Daily, 8AM-10PM",
      bio: "Ana brings 7 years of expertise in sports and therapeutic massage. Former athlete turned wellness professional, she understands the body's needs for recovery and relaxation. Her techniques combine traditional methods with modern therapeutic approaches.",
      price: "₱3,000/session",
      bodyType: "Athletic",
      height: "5'5\"",
      personality: ["Energetic", "Knowledgeable", "Motivating", "Skilled"],
      isActive: true,
      showAge: true,
      showHeight: true,
      showBodyType: true,
      showPersonality: true,
    },
    {
      id: 3,
      name: "Liza Cruz",
      age: 24,
      location: "Manila City",
      experience: "3 years",
      rating: 4.7,
      reviews: 89,
      images: [
        "https://images.pexels.com/photos/5984487/pexels-photo-5984487.jpeg",
      ],
      description:
        "Liza's expertise includes Thai massage, promoting flexibility and stress relief.",
      specialties: [
        "Thai Massage",
        "Flexibility Training",
        "Nuru Massage",
        "Stress Relief",
      ],
      languages: ["English", "Filipino"],
      availability: "Tue-Sun, 10AM-8PM",
      bio: "Young and passionate, Liza specializes in traditional Thai massage techniques. Her flexibility and understanding of body mechanics help clients improve their range of motion while achieving deep relaxation. Perfect for those seeking both wellness and flexibility.",
      price: "₱2,200/session",
      bodyType: "Slim",
      height: "5'2\"",
      personality: ["Friendly", "Flexible", "Patient", "Intuitive"],
      isActive: true,
      showAge: true,
      showHeight: true,
      showBodyType: true,
      showPersonality: true,
    },
    {
      id: 4,
      name: "Jasmine Reyes",
      age: 31,
      location: "Taguig City",
      experience: "8 years",
      rating: 5.0,
      reviews: 156,
      images: [
        "https://images.pexels.com/photos/6173603/pexels-photo-6173603.jpeg",
        "https://images.pexels.com/photos/5938567/pexels-photo-5938567.jpeg",
        "https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg",
      ],
      description:
        "Jasmine offers reflexology treatments, focusing on pressure points for holistic healing.",
      specialties: [
        "Reflexology",
        "Holistic Healing",
        "Sensual Massage",
        "Pressure Points",
      ],
      languages: ["English", "Filipino", "Mandarin"],
      availability: "Mon-Fri, 9AM-7PM",
      bio: "Senior therapist with 8 years of holistic healing experience. Jasmine's expertise in reflexology and pressure point therapy has earned her a perfect 5.0 rating. She combines ancient healing wisdom with modern wellness techniques for transformative sessions.",
      price: "₱3,500/session",
      bodyType: "Curvy",
      height: "5'4\"",
      personality: ["Wise", "Healing", "Compassionate", "Experienced"],
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
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeModal = () => {
    setSelectedTherapist(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    if (selectedTherapist && (selectedTherapist.images || []).length > 1) {
      setCurrentImageIndex((prev) =>
        prev === (selectedTherapist.images || []).length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedTherapist && (selectedTherapist.images || []).length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? (selectedTherapist.images || []).length - 1 : prev - 1
      );
    }
  };

  const bookTherapist = (therapist) => {
    const message = `Hi! I'd like to book a session with ${therapist.name}. What are her available slots?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${whatsappNumber.replace(
        /\D/g,
        ""
      )}?text=${encodedMessage}`,
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3e7d1] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-600 mx-auto"></div>
          <p className="mt-4 text-brown-700">Loading therapists...</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-[#f3e7d1] py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-5xl font-semibold font-serif mb-6 md:mb-8 text-center text-brown-800">
        Female Therapists
      </h1>
      <p className="text-brown-700 text-lg md:text-xl text-center mb-12 font-sans">
        Our skilled female therapists are dedicated to providing you with the
        ultimate relaxation experience.
        <span className="block mt-2 text-base font-medium text-brown-600">
          Click on any therapist to view detailed profile
        </span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.isArray(massagers) && massagers.length > 0 ? (
          massagers.map((massager) => (
            <div
              key={massager._id || massager.id}
              onClick={() => openModal(massager)}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-2xl group"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={
                    massager.images?.[0] ||
                    massager.image ||
                    "https://images.pexels.com/photos/3757946/pexels-photo-3757946.jpeg"
                  }
                  alt={massager.name || "Therapist"}
                  fill
                  sizes="(max-width: 640px) 100vw,
                       (max-width: 1024px) 50vw,
                       (max-width: 1280px) 25vw,
                       20vw"
                  className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src =
                      "https://images.pexels.com/photos/3757946/pexels-photo-3757946.jpeg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-2">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold">
                      {massager.rating || 5.0}
                    </span>
                    <span className="text-sm">
                      ({massager.reviews || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {massager.name || "Therapist"}
                  </h3>
                  <span className="text-brown-600 font-medium text-sm">
                    {massager.age || "25"} years
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <FaMapMarkerAlt className="mr-1" />
                  <span>{massager.location || "Metro Manila"}</span>
                  <span className="mx-2">•</span>
                  <span>{massager.experience || "Experienced"} exp</span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {massager.description ||
                    "Professional therapist with extensive experience."}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {(massager.specialties || [])
                    .slice(0, 2)
                    .map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-brown-100 text-brown-700 px-2 py-1 rounded-full text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  {(massager.specialties || []).length > 2 && (
                    <span className="text-brown-600 text-xs">
                      +{(massager.specialties || []).length - 2} more
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-brown-800 font-bold">
                    {massager.price || massager.hourlyRate
                      ? `₱${massager.hourlyRate || massager.price}`
                      : "Contact for rates"}
                  </span>
                  <button className="bg-brown-600 hover:bg-brown-700 text-white px-3 py-1 rounded-full text-sm transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              {loading
                ? "Loading therapists..."
                : error
                ? error
                : "No therapists available at the moment."}
            </p>
          </div>
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
                <Image
                  src={selectedTherapist.images[currentImageIndex]}
                  alt={`${selectedTherapist.name} - Photo ${
                    currentImageIndex + 1
                  }`}
                  fill
                  className="object-cover rounded-t-lg"
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
                            ? "border-brown-500 ring-2 ring-brown-200"
                            : "border-gray-300 hover:border-brown-300"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${selectedTherapist.name} - Thumbnail ${
                            index + 1
                          }`}
                          fill
                          className="object-cover"
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
                        <h4 className="font-semibold text-brown-700 mb-2">
                          Specialties
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTherapist.specialties.map(
                            (specialty, index) => (
                              <span
                                key={index}
                                className="bg-brown-100 text-brown-700 px-3 py-1 rounded-full text-sm"
                              >
                                {specialty}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-brown-700 mb-2">
                          Languages
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTherapist.languages.map(
                            (language, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
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
                          <h4 className="font-semibold text-brown-700 mb-2">
                            Personality Traits
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedTherapist.personality.map(
                              (trait, index) => (
                                <span
                                  key={index}
                                  className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm"
                                >
                                  <FaHeart className="inline mr-1 text-xs" />
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
                    <div className="bg-brown-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-brown-800 mb-3">
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
                              <span className="text-gray-600">Body Type:</span>
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

export default Female;
