"use client";
import React from "react";
import Image from "next/image";

const Gallery = () => {
  const massagers = [
    {
      id: 1,
      name: "Maria Santos",
      image:
        "https://images.pexels.com/photos/6788392/pexels-photo-6788392.jpeg",
      description:
        "Maria specializes in Swedish and deep tissue massage, providing ultimate relaxation.",
    },
    {
      id: 2,
      name: "Ana Rivera",
      image:
        "https://images.pexels.com/photos/5893392/pexels-photo-5893392.jpeg",
      description:
        "Ana is an expert in sports massage, helping clients recover and maintain peak performance.",
    },
    {
      id: 3,
      name: "Liza Cruz",
      image:
        "https://images.pexels.com/photos/5984487/pexels-photo-5984487.jpeg",
      description:
        "Liza's expertise includes Thai massage, promoting flexibility and stress relief.",
    },
    {
      id: 4,
      name: "Jasmine Reyes",
      image:
        "https://images.pexels.com/photos/6173603/pexels-photo-6173603.jpeg",
      description:
        "Jasmine offers reflexology treatments, focusing on pressure points for holistic healing.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3e7d1] py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-5xl font-semibold font-serif mb-6 md:mb-8 text-center text-brown-800">
        Meet Our Team
      </h1>
      <p className="text-brown-700 text-lg md:text-xl text-center mb-12 font-sans">
        Our skilled massagers are dedicated to providing you with the best
        experience.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {massagers.map((massager) => (
          <div
            key={massager.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <div className="relative w-full h-56">
              <Image
                src={massager.image}
                alt={massager.name}
                fill
                className="object-cover h-full w-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {massager.name}
              </h3>
              <p className="text-gray-600 mt-2">{massager.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
