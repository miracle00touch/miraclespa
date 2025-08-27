"use client";
import React, { useState, useEffect } from "react";
import ServiceCard from "../../components/ServiceCard";
import { useContacts } from "../../hooks/useContacts";

const Services = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const { getPrimaryPhone, getPrimaryEmail } = useContacts({ autoFetch: true });

  // Get contact info with fallbacks
  const phoneNumber = getPrimaryPhone() || "+639274736260";
  const emailAddress = getPrimaryEmail() || "miracletouchspa2@gmail.com";

  // Load services from API
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setError(null);
      setIsLoadingData(true);

      const response = await fetch("/api/services", {
        headers: {
          "Cache-Control": "no-store",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success) {
        // Sort services by category priority and order
        const sortedServices = data.data.sort((a, b) => {
          const categoryOrder = { sensual: 1, professional: 2, specialty: 3 };
          if (categoryOrder[a.category] !== categoryOrder[b.category]) {
            return categoryOrder[a.category] - categoryOrder[b.category];
          }
          return (a.order || 0) - (b.order || 0);
        });
        setServices(sortedServices);
      } else {
        setError(data.error || "Failed to load services");
      }
    } catch (err) {
      console.error("Error loading services:", err);
      setError(`Failed to load services: ${err.message}`);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Fallback services in case API fails
  const fallbackServices = [
    {
      title: "Swedish Massage",
      description:
        "Indulge in a relaxing Swedish Massage at Miracle Touch Spa. Our expert therapists in Metro Manila use long, flowing strokes, gentle kneading, and circular movements to soothe your muscles, improve circulation, and enhance flexibility. Perfect for reducing stress and promoting your body's natural healing.",
      image:
        "https://images.pexels.com/photos/6560304/pexels-photo-6560304.jpeg",
    },
    {
      title: "Body Scrub",
      description:
        "Rejuvenate your skin with a luxurious Body Scrub at Miracle Touch Spa. This exfoliating treatment in Metro Manila removes dead skin cells, leaving your skin soft, smooth, and glowing. Boost circulation and revitalize your skin for a refreshed, youthful appearance.",
      image:
        "https://images.pexels.com/photos/5241025/pexels-photo-5241025.jpeg",
    },
    {
      title: "Ear Candling",
      description:
        "Experience the calming benefits of Ear Candling at Miracle Touch Spa. This soothing therapy gently removes impurities, improves ear health, and promotes relaxation. Perfect for relieving sinus pressure and achieving a serene, balanced experience.",
      image: "/images/ear-candling.jpg",
    },
    {
      title: "Hot Stone Therapy",
      description:
        "Melt away tension with Hot Stone Therapy at Miracle Touch Spa in Metro Manila. Warm, smooth stones are placed on key points of your body to relax muscles and improve circulation. This deeply soothing treatment enhances relaxation and relieves stress.",
      image:
        "https://images.pexels.com/photos/5240639/pexels-photo-5240639.jpeg",
    },
    {
      title: "Full Body Massage",
      description:
        "Relax and rejuvenate with a Full Body Massage at Miracle Touch Spa. Our skilled therapists in Metro Manila combine techniques to ease muscle tension, improve circulation, and enhance overall well-being. Treat yourself to ultimate relaxation.",
      image:
        "https://images.pexels.com/photos/6629538/pexels-photo-6629538.jpeg",
    },
    {
      title: "Shiatsu Massage",
      description:
        "Revitalize your body with a Shiatsu Massage at Miracle Touch Spa in Metro Manila. This traditional Japanese therapy uses precise finger pressure on energy meridians to balance your body's energy, relieve tension, and improve circulation.",
      image:
        "https://images.pexels.com/photos/6628700/pexels-photo-6628700.jpeg",
    },
    {
      title: "Nuru Massage",
      description:
        "Experience authentic Nuru massage with skilled therapists in Metro Manila. This intimate body-to-body massage uses special gel for ultimate sensual relaxation. Performed in a safe, private, and respectful environment with full attention to your comfort and boundaries.",
      image:
        "https://images.pexels.com/photos/3757948/pexels-photo-3757948.jpeg",
    },
    {
      title: "Sensual Massage",
      description:
        "Indulge in our signature sensual massage services designed for deep intimate relaxation. Our trained therapists provide attentive care using gentle touches and sensual techniques in a private, comfortable setting. Perfect for stress relief and sensual awakening.",
      image:
        "https://images.pexels.com/photos/6560289/pexels-photo-6560289.jpeg",
    },
  ];

  // Show error state
  if (error) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-[#f3e7d1] p-8">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">
            Failed to load services: {error}
          </p>
          <button
            onClick={loadServices}
            className="bg-brown-600 hover:bg-brown-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
      <section className="flex flex-col items-center justify-center min-h-screen bg-[#f3e7d1] p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold font-serif mb-4 text-brown-800">
            Sensual Massage Services in Metro Manila
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            Experience premium sensual spa treatments with skilled therapists.
            Specializing in Nuru massage, sensual massage, and intimate wellness
            services. Available for home service across Metro Manila.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`tel:${phoneNumber.replace(/\s/g, "")}`}
              className="bg-brown-600 hover:bg-brown-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300"
            >
              📞 Call Now: {phoneNumber}
            </a>
            <p className="text-sm text-gray-600">
              Available 24/7 • Home Service Available
            </p>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto transition-opacity duration-500 ${
            isLoadingData ? "opacity-0" : "opacity-100"
          }`}
        >
          {isLoadingData ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <div className="relative">
                {/* Modern spinner */}
                <div className="w-12 h-12 border-4 border-brown-200 border-t-brown-600 rounded-full animate-spin"></div>
              </div>
              <p className="text-brown-600 text-lg font-medium mt-4">
                Loading services...
              </p>
            </div>
          ) : services.length > 0 ? (
            services.map((service, index) => (
              <div
                key={service._id || index}
                className="animate-fade-in-up opacity-0"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <ServiceCard service={service} index={index} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-600 text-lg">No services found.</p>
              <button
                onClick={loadServices}
                className="mt-4 bg-brown-600 text-white px-4 py-2 rounded-md hover:bg-brown-700"
              >
                Retry
              </button>
            </div>
          )}
        </div>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://miracletouchspa.vercel.app/#business",
              name: "Miracle Touch Spa",
              alternateName: "Miracle Sensual Spa Manila",
              description:
                "Sensual massage and intimate spa services in Metro Manila with home service available. Specializing in Nuru massage, sensual massage, and body-to-body treatments.",
              url: "https://miracletouchspa.vercel.app",
              telephone: phoneNumber.replace(/[^\d+]/g, ""),
              email: emailAddress,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Metro Manila",
                addressRegion: "National Capital Region",
                addressCountry: "Philippines",
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Quezon City",
                },
                {
                  "@type": "City",
                  name: "Makati City",
                },
                {
                  "@type": "City",
                  name: "Manila City",
                },
                {
                  "@type": "City",
                  name: "Taguig City",
                },
                {
                  "@type": "City",
                  name: "Pasay City",
                },
              ],
              priceRange: "₱₱",
              openingHours: "Mo-Su 00:00-23:59",
              serviceType: "Home Service Available",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Massage and Spa Services",
                itemListElement: services
                  .filter(
                    (service) => service && (service.name || service.title)
                  )
                  .map((service, index) => {
                    const serviceName = service.name || service.title;
                    return {
                      "@type": "Offer",
                      "@id": `https://miracletouchspa.vercel.app/services#${serviceName
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`,
                      name: serviceName,
                      description: service.description || "",
                      category: "Massage Therapy",
                      areaServed: "Metro Manila",
                      availableAtOrFrom: {
                        "@type": "Place",
                        name: "Miracle Touch Spa",
                      },
                    };
                  }),
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "150",
              },
            }),
          }}
        />
      </section>
    </>
  );
};

export default Services;
