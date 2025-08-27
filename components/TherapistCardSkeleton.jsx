"use client";

import React from "react";

const TherapistCardSkeleton = ({ className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden animate-pulse ${className}`}
      aria-hidden="true"
    >
      {/* Image skeleton */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />

        {/* Avatar placeholder in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-400 rounded-full" />
          </div>
        </div>

        {/* Status badge skeleton */}
        <div className="absolute top-2 right-2">
          <div className="w-16 h-6 bg-gray-300 rounded-full" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-4">
        {/* Name and action buttons */}
        <div className="flex justify-between items-start mb-3">
          <div className="h-6 bg-gray-300 rounded w-24" />
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded" />
            <div className="w-8 h-8 bg-gray-300 rounded" />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-300 rounded w-20" />
          <div className="h-4 bg-gray-300 rounded w-32" />
          <div className="h-4 bg-gray-300 rounded w-28" />
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-200">
          <div className="h-4 bg-gray-300 rounded w-16" />
          <div className="h-4 bg-gray-300 rounded w-20" />
        </div>
      </div>
    </div>
  );
};

export default TherapistCardSkeleton;
