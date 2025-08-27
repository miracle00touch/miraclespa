"use client";

import React from "react";
import { FaStar } from "react-icons/fa";

const TherapistCardSkeleton = ({ className = "" }) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg overflow-hidden animate-pulse ${className}`}
      aria-hidden="true"
    >
      {/* Image skeleton */}
      <div className="relative w-full h-56 bg-gray-200 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />

        {/* Rating skeleton overlay */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-2">
            <FaStar className="text-gray-300" />
            <div className="w-8 h-4 bg-gray-300 rounded" />
            <div className="w-16 h-4 bg-gray-300 rounded" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-4">
        {/* Name and age */}
        <div className="flex justify-between items-start mb-2">
          <div className="h-6 bg-gray-300 rounded w-24" />
          <div className="h-5 bg-gray-300 rounded w-16" />
        </div>

        {/* Experience and location */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-300 rounded w-32" />
          <div className="h-4 bg-gray-300 rounded w-28" />
        </div>

        {/* Description */}
        <div className="space-y-1 mb-4">
          <div className="h-3 bg-gray-300 rounded w-full" />
          <div className="h-3 bg-gray-300 rounded w-3/4" />
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1 mb-3">
          <div className="h-6 bg-gray-300 rounded-full w-16" />
          <div className="h-6 bg-gray-300 rounded-full w-20" />
        </div>

        {/* Price and button */}
        <div className="flex justify-between items-center">
          <div className="h-5 bg-gray-300 rounded w-20" />
          <div className="h-8 bg-gray-300 rounded-full w-24" />
        </div>
      </div>
    </div>
  );
};

const PublicTherapistSkeleton = ({ count = 8 }) => {
  return (
    <div className="min-h-screen bg-[#f3e7d1] py-10 px-4 sm:px-6 lg:px-8">
      {/* Header skeleton */}
      <div className="text-center mb-12">
        <div className="h-12 bg-gray-300 rounded w-80 mx-auto mb-6 animate-pulse" />
        <div className="space-y-2">
          <div className="h-6 bg-gray-300 rounded w-96 mx-auto animate-pulse" />
          <div className="h-6 bg-gray-300 rounded w-80 mx-auto animate-pulse" />
          <div className="h-5 bg-gray-300 rounded w-72 mx-auto animate-pulse" />
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: count }).map((_, index) => (
          <TherapistCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default PublicTherapistSkeleton;
