import React from "react";

export default function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`bg-white rounded-lg shadow animate-pulse overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="w-full h-56 bg-gray-200" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  );
}
