"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";

const TherapistImageLoader = ({
  src,
  alt,
  className = "",
  fill = true,
  fallbackIcon = true,
  showSkeleton = true, // New prop to control skeleton display
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {/* Skeleton loader */}
      {isLoading && showSkeleton && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full relative">
            {/* Base skeleton */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-gray-100 opacity-50" />

            {/* Avatar placeholder in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-400 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* When showSkeleton is false we deliberately render no loading overlay here
      to avoid double-loading UI (the route-level PublicTherapistSkeleton should
      be the single visible loader). */}

      {/* Error fallback or no image */}
      {(hasError || !src) && !isLoading && fallbackIcon && (
        <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100">
          <FaUser size={48} />
        </div>
      )}

      {/* Actual image - only load when in view */}
      {src && isInView && !hasError && (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          className={`object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          quality={75}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>
  );
};

export default TherapistImageLoader;
