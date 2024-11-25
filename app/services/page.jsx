import React from "react";
import Image from "next/image";

const Services = () => {
  const services = [
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
  ];

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#f3e7d1] p-8">
      <h1 className="text-4xl md:text-5xl font-semibold font-serif mb-10 text-brown-800">
        Our Services
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <article
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative w-full h-56 md:h-64">
              <Image
                src={service.image}
                alt={`${service.title} at Miracle Touch Spa in Metro Manila`}
                fill
                sizes="(max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                (max-width: 1280px) 33vw,
                25vw"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl md:text-2xl font-semibold text-brown-700 mb-2">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            provider: {
              "@type": "LocalBusiness",
              name: "Miracle Touch Spa",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Metro Manila",
                addressCountry: "Philippines",
              },
              telephone: "+63 927 473 6260",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Massage and Spa Services",
              itemListElement: services.map((service) => ({
                "@type": "Offer",
                name: service.title,
                description: service.description,
              })),
            },
          }),
        }}
      />
    </section>
  );
};

export default Services;
