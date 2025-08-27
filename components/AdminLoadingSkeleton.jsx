"use client";

import React from "react";
import { FaUser, FaCog, FaPhone } from "react-icons/fa";

const AdminLoadingSkeleton = ({ type = "auth" }) => {
  if (type === "auth") {
    // Authentication loading skeleton
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brown-200 to-brown-300">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-pulse">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4" />
            <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2" />
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto" />
          </div>

          <div className="space-y-4">
            <div className="h-12 bg-gray-300 rounded-lg" />
            <div className="h-12 bg-gray-300 rounded-lg" />
            <div className="h-12 bg-gray-300 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  // Admin panel loading skeleton
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header skeleton */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-300 rounded w-48 animate-pulse" />
          <div className="h-10 bg-gray-300 rounded w-24 animate-pulse" />
        </div>
      </div>

      <div className="p-8">
        {/* Tab navigation skeleton */}
        <div className="flex space-x-4 mb-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-10 bg-gray-300 rounded px-6 animate-pulse"
            />
          ))}
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-200" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="h-6 bg-gray-300 rounded w-24" />
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-gray-300 rounded" />
                    <div className="w-8 h-8 bg-gray-300 rounded" />
                  </div>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="h-4 bg-gray-300 rounded w-20" />
                  <div className="h-4 bg-gray-300 rounded w-32" />
                </div>
                <div className="h-4 bg-gray-300 rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLoadingSkeleton;
