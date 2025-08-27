"use client";
import React from "react";
import Image from "next/image";
import ServiceCardSkeleton from "../../../components/ServiceCardSkeleton";

const RealCard = ({ service }) => {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl w-full max-w-md">
      <div className="relative w-full h-56 md:h-64">
        <Image
          src={service.image}
          alt={`${service.title} at Miracle Touch Spa in Metro Manila`}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl md:text-2xl font-semibold text-brown-700 mb-2">
          {service.title}
        </h3>
        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
          {service.description}
        </p>
        <div className="mt-3">
          <span className="text-lg font-semibold text-brown-600">₱1500</span>
        </div>
      </div>
    </article>
  );
};

export default function Page() {
  const service = {
    title: "Swedish Massage",
    description:
      "Indulge in a relaxing Swedish Massage at Miracle Touch Spa. Our expert therapists use long, flowing strokes to soothe your muscles.",
    image: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg",
  };

  return (
    <div className="min-h-screen bg-[#f3e7d1] p-8">
      <h1 className="text-2xl font-bold mb-6">Skeleton vs Real Card (debug)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="mb-3 font-semibold">Real card</h2>
          <RealCard service={service} />
        </div>
        <div>
          <h2 className="mb-3 font-semibold">Skeleton</h2>
          <div className="w-full max-w-md">
            <ServiceCardSkeleton />
          </div>
        </div>
      </div>
      <p className="mt-6 text-sm text-gray-600">
        Open <code>/debug/skeletons</code> in the browser to compare.
      </p>
    </div>
  );
}
