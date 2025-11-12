import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import {
  FaHome,
  FaCar,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaExclamationTriangle,
} from "react-icons/fa";
import gsap from "gsap";

const Error404 = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const numberRef = useRef(null);
  const contentRef = useRef(null);
  const carRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 404 number animation - scale and bounce
      tl.fromTo(
        numberRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
        }
      );

      // Content fade in
      tl.fromTo(
        contentRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        "-=0.5"
      );

      // Car driving animation (loop)
      gsap.to(carRef.current, {
        x: "100vw",
        duration: 8,
        ease: "none",
        repeat: -1,
        delay: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white relative overflow-hidden flex items-center justify-center py-12"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30 -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30 -z-0"></div>

      {/* Road lines decoration */}
      <div className="absolute bottom-32 left-0 right-0 h-1 bg-slate-300 opacity-50">
        <div className="absolute inset-0 flex justify-around items-center">
          <div className="w-20 h-1 bg-white"></div>
          <div className="w-20 h-1 bg-white"></div>
          <div className="w-20 h-1 bg-white"></div>
          <div className="w-20 h-1 bg-white"></div>
          <div className="w-20 h-1 bg-white"></div>
        </div>
      </div>

      {/* Animated car */}
      <div
        ref={carRef}
        className="absolute bottom-28 -left-20 text-6xl transform -translate-x-full"
      >
        🚗
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Number */}
          <div ref={numberRef} className="mb-8">
            <h1
              className="text-[180px] sm:text-[220px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              404
            </h1>
            <div className="flex justify-center -mt-16">
              <FaExclamationTriangle className="text-yellow-500 text-5xl animate-bounce" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#002f6c]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Oops! Wrong Turn
            </h2>

            <p
              className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Looks like this route doesn't exist. Don't worry, even the best
              drivers take wrong turns sometimes. Let's get you back on track!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-lg btn-outline border-2 border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <FaArrowLeft className="mr-2" />
                Go Back
              </button>

              <Link
                to="/"
                className="btn btn-lg bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] hover:from-[#0284c7] hover:to-[#0d9488] border-none text-white px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <FaHome className="mr-2" />
                Back to Home
              </Link>
            </div>

            {/* Quick Links */}
            <div className="pt-12">
              <p
                className="text-slate-500 mb-4 text-sm font-medium"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                QUICK NAVIGATION
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <Link
                  to="/allVehicles"
                  className="group bg-white border-2 border-slate-200 hover:border-[#0ea5e9] rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <FaCar className="text-3xl text-[#0ea5e9] mb-3 mx-auto group-hover:scale-110 transition-transform" />
                  <h3
                    className="font-bold text-[#002f6c] mb-2"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Browse Vehicles
                  </h3>
                  <p
                    className="text-sm text-slate-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Explore our fleet
                  </p>
                </Link>

                <Link
                  to="/about"
                  className="group bg-white border-2 border-slate-200 hover:border-[#14b8a6] rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <FaMapMarkerAlt className="text-3xl text-[#14b8a6] mb-3 mx-auto group-hover:scale-110 transition-transform" />
                  <h3
                    className="font-bold text-[#002f6c] mb-2"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    About Us
                  </h3>
                  <p
                    className="text-sm text-slate-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Learn more
                  </p>
                </Link>

                <Link
                  to="/myVehicles"
                  className="group bg-white border-2 border-slate-200 hover:border-[#0ea5e9] rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="text-3xl mb-3 mx-auto group-hover:scale-110 transition-transform">
                    🚙
                  </div>
                  <h3
                    className="font-bold text-[#002f6c] mb-2"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    My Vehicles
                  </h3>
                  <p
                    className="text-sm text-slate-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Manage your fleet
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating shapes decoration */}
      <div className="absolute top-20 left-10 w-16 h-16 border-4 border-[#0ea5e9]/20 rounded-full animate-pulse"></div>
      <div
        className="absolute top-40 right-20 w-20 h-20 border-4 border-[#14b8a6]/20 rounded-lg rotate-45 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 left-1/4 w-12 h-12 border-4 border-[#0ea5e9]/20 rounded-full animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
};

export default Error404;
