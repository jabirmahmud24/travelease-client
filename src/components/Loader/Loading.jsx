import React, { useEffect, useRef } from "react";
import { FaCar } from "react-icons/fa";
import gsap from "gsap";

const Loading = ({ message = "Loading..." }) => {
  const containerRef = useRef(null);
  const carRef = useRef(null);
  const dotsRef = useRef(null);
  const circlesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Car bouncing animation
      gsap.to(carRef.current, {
        y: -20,
        duration: 0.6,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Rotating circles animation
      circlesRef.current.forEach((circle, index) => {
        gsap.to(circle, {
          rotation: 360,
          duration: 2 + index * 0.5,
          ease: "none",
          repeat: -1,
        });
      });

      // Loading dots animation
      gsap.to(dotsRef.current.children, {
        opacity: 0.3,
        duration: 0.6,
        stagger: 0.2,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
      });

      // Pulse animation for container
      gsap.to(containerRef.current.querySelector(".loading-card"), {
        scale: 1.02,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white relative overflow-hidden flex items-center justify-center"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30 -z-0 animate-pulse"></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30 -z-0 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-16 h-16 border-4 border-[#0ea5e9]/20 rounded-full animate-pulse"></div>
      <div
        className="absolute top-40 right-20 w-20 h-20 border-4 border-[#14b8a6]/20 rounded-lg rotate-45 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 right-1/4 w-12 h-12 border-4 border-[#0ea5e9]/20 rounded-full animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10">
        <div className="loading-card bg-white/80 backdrop-blur-xl border-2 border-slate-200 rounded-3xl p-12 shadow-2xl">
          <div className="flex flex-col items-center space-y-8">
            {/* Rotating Circles with Car Icon */}
            <div className="relative w-32 h-32">
              {/* Outer rotating circle */}
              <div
                ref={(el) => (circlesRef.current[0] = el)}
                className="absolute inset-0 border-4 border-transparent border-t-[#0ea5e9] border-r-[#0ea5e9] rounded-full"
              ></div>

              {/* Middle rotating circle */}
              <div
                ref={(el) => (circlesRef.current[1] = el)}
                className="absolute inset-3 border-4 border-transparent border-b-[#14b8a6] border-l-[#14b8a6] rounded-full"
              ></div>

              {/* Inner rotating circle */}
              <div
                ref={(el) => (circlesRef.current[2] = el)}
                className="absolute inset-6 border-4 border-transparent border-t-[#0ea5e9] rounded-full"
              ></div>

              {/* Car icon in center */}
              <div
                ref={carRef}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-gradient-to-br from-[#0ea5e9] to-[#14b8a6] p-4 rounded-2xl">
                  <FaCar className="text-3xl text-white" />
                </div>
              </div>
            </div>

            {/* Brand Name */}
            <div className="text-center">
              <h2
                className="text-3xl font-bold mb-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6]">
                  Travel
                </span>
                <span className="text-[#002f6c]">Ease</span>
              </h2>
            </div>

            {/* Loading Message with Dots */}
            <div className="flex items-center gap-2">
              <p
                className="text-lg text-[#002f6c] font-medium"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {message}
              </p>
              <div ref={dotsRef} className="flex gap-1">
                <span className="w-2 h-2 bg-[#0ea5e9] rounded-full"></span>
                <span className="w-2 h-2 bg-[#14b8a6] rounded-full"></span>
                <span className="w-2 h-2 bg-[#0ea5e9] rounded-full"></span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] rounded-full animate-progress"></div>
            </div>

            {/* Fun message */}
            <p
              className="text-sm text-slate-500 text-center max-w-xs"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Preparing your journey...
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animation for progress bar */}
      <style jsx>{`
        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;
