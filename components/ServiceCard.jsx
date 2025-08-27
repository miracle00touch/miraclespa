"use client";

import React from "react";
import Image from "next/image";

const ServiceCard = ({ service, index }) => {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl w-full flex flex-col h-full">
      <div className="relative w-full h-56 md:h-64 flex-shrink-0">
        <Image
          src={
            service.image ||
            (service.images && service.images[0]) ||
            "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg"
          }
          alt={`${
            service.title || service.name
          } at Miracle Touch Spa in Metro Manila`}
          fill
          sizes="(max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            (max-width: 1280px) 33vw,
            25vw"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-semibold text-brown-700 mb-2 line-clamp-2">
            {service.name || service.title}
          </h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed line-clamp-3">
            {service.description}
          </p>
        </div>
        {service.price && (
          <div className="mt-3 pt-2">
            <span className="text-lg font-semibold text-brown-600">
              ₱{service.price}
            </span>
          </div>
        )}
      </div>
    </article>
  );
};

export default ServiceCard;
