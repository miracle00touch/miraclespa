"use client";
import React from "react";
import Image from "next/image";

const Gallery = () => {
  const massagers = [
    {
      id: 1,
      name: "Jane Doe",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      description:
        "Jane specializes in Swedish and deep tissue massage, providing ultimate relaxation.",
    },
    {
      id: 2,
      name: "John Smith",
      image: "https://images.pexels.com/photos/769732/pexels-photo-769732.jpeg",
      description:
        "John is an expert in sports massage, helping clients recover and maintain peak performance.",
    },
    {
      id: 3,
      name: "Mary Johnson",
      image:
        "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg",
      description:
        "Mary's expertise includes Thai massage, promoting flexibility and stress relief.",
    },
    {
      id: 4,
      name: "David Lee",
      image:
        "https://images.pexels.com/photos/6628644/pexels-photo-6628644.jpeg",
      description:
        "David offers reflexology treatments, focusing on pressure points for holistic healing.",
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
