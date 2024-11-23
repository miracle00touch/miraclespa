"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FiMenu } from "react-icons/fi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);

  // Detect scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const linkClasses = (path) => {
    const isHomePage = pathname === "/";
    const isActive = pathname === path;

    return isActive && isHomePage
      ? "relative text-brown-700 px-3 py-2 text-sm font-medium transition duration-300"
      : isActive
      ? "relative text-brown-700 px-3 py-2 text-sm font-medium transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-gray-800"
      : "relative text-brown-600 px-3 py-2 text-sm font-medium transition duration-300 hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-[-2px] hover:after:w-full hover:after:h-[2px] hover:after:bg-gray-800";
  };

  return (
    <nav
      className={`${
        scrolled ? "shadow-lg" : ""
      } bg-brown-100 text-gray-700 w-full fixed top-0 z-50 transition-shadow duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16 w-full">
          <div className="flex items-center space-x-3">
            {/* Logo and Text */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/miracle_touch_spa.svg"
                alt="Miracle Touch Spa Logo"
                width={40} // Define width for the logo
                height={40} // Define height for the logo
                priority
              />
              <span className="hidden sm:block text-xl italic font-bold font-playfair tracking-wide text-brown-800">
                Miracle Touch Spa
              </span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link href="/" className={linkClasses("/")}>
              Home
            </Link>
            <Link href="/gallery" className={linkClasses("/gallery")}>
              Gallery
            </Link>
            <Link href="/services" className={linkClasses("/services")}>
              Services
            </Link>
            <Link href="/location" className={linkClasses("/location")}>
              Location
            </Link>
            <Link href="/contact" className={linkClasses("/contact")}>
              Contact
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-in menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div
            ref={mobileMenuRef}
            className="fixed right-0 top-0 h-full w-3/4 bg-white shadow-lg p-6 flex flex-col justify-center items-center space-y-6 overflow-hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col items-center space-y-6 pb-10 w-full">
              <Link
                href="/"
                className={`${linkClasses("/")} py-4`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/gallery"
                className={`${linkClasses("/gallery")} py-4`}
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/services"
                className={`${linkClasses("/services")} py-4`}
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/location"
                className={`${linkClasses("/location")} py-4`}
                onClick={() => setIsOpen(false)}
              >
                Location
              </Link>
              <Link
                href="/contact"
                className={`${linkClasses("/contact")} py-4`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
