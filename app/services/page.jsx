import React from "react";
import Image from "next/image";

const Services = () => {
  const services = [
    {
      title: "Swedish Massage",
      description:
        "Indulge in a relaxing Swedish Massage at Miracle Touch Spa. Our expert therapists use long, flowing strokes, gentle kneading, and circular movements to soothe your muscles, improve circulation, and enhance flexibility. Perfect for reducing stress and promoting your body's natural healing for total relaxation.",
      image:
        "https://images.pexels.com/photos/6560304/pexels-photo-6560304.jpeg",
    },
    {
      title: "Body Scrub",
      description:
        "Rejuvenate your skin with a luxurious Body Scrub at Miracle Touch Spa. This exfoliating treatment removes dead skin cells, leaving your skin soft, smooth, and glowing. Our body scrub also boosts circulation and revitalizes your skin for a refreshed, youthful appearance.",
      image:
        "https://images.pexels.com/photos/5241025/pexels-photo-5241025.jpeg",
    },
    {
      title: "Ear Candling",
      description:
        "Experience the calming benefits of Ear Candling at Miracle Touch Spa. This soothing therapy is designed to gently remove impurities, improve ear health, and promote relaxation. Perfect for those seeking relief from sinus pressure and a serene, balanced experience.",
      image: "/images/ear-candling.jpg",
    },
    {
      title: "Hot Stone Therapy",
      description:
        "Melt away tension with Hot Stone Therapy at Miracle Touch Spa. Warm, smooth stones are placed on key points of your body to relax muscles and improve circulation. This deeply soothing treatment enhances relaxation and relieves stress, leaving you feeling rejuvenated.",
      image:
        "https://images.pexels.com/photos/5240639/pexels-photo-5240639.jpeg",
    },
    {
      title: "Full Body Massage",
      description:
        "Relax and rejuvenate with a Full Body Massage at Miracle Touch Spa. Our skilled therapists use a combination of techniques to ease muscle tension, improve circulation, and enhance overall well-being. Treat yourself to the ultimate relaxation experience for your mind and body.",
      image:
        "https://images.pexels.com/photos/6629538/pexels-photo-6629538.jpeg",
    },
    {
      title: "Shiatsu Massage",
      description:
        "Revitalize your body with a Shiatsu Massage at Miracle Touch Spa. This traditional Japanese therapy uses precise finger pressure on energy meridians to balance your body's energy, relieve tension, and improve circulation. Perfect for restoring harmony and well-being.",
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
                alt={`Image of ${service.title}`}
                fill
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
    </section>
  );
};

export default Services;
