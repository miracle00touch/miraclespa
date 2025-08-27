"use client";

import React from "react";

const ServiceCardSkeleton = ({ className = "" }) => {
  return (
    <article
      className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl ${className}`}
      aria-hidden="true"
    >
      {/* Image placeholder - exactly matching ServiceCard */}
      <div className="relative w-full h-56 md:h-64">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse" />
      </div>

      {/* Content placeholder - exactly matching ServiceCard */}
      <div className="p-6">
        {/* Title placeholder - matches h3 text-xl md:text-2xl mb-2 */}
        <div
          className="h-7 md:h-8 bg-gray-300 rounded mb-2 animate-pulse"
          style={{ width: "75%" }}
        />

        {/* Description placeholder - matches p text-sm md:text-base leading-relaxed */}
        <div className="space-y-2">
          <div className="h-4 md:h-5 bg-gray-300 rounded animate-pulse" />
          <div
            className="h-4 md:h-5 bg-gray-300 rounded animate-pulse"
            style={{ width: "90%" }}
          />
          <div
            className="h-4 md:h-5 bg-gray-300 rounded animate-pulse"
            style={{ width: "80%" }}
          />
        </div>

        {/* Price placeholder - matches mt-3 and text-lg */}
        <div className="mt-3">
          <div
            className="h-6 md:h-7 bg-gray-300 rounded animate-pulse"
            style={{ width: "80px" }}
          />
        </div>
      </div>
    </article>
  );
};

export default ServiceCardSkeleton;
