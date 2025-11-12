import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { FaCar, FaRoute, FaShieldAlt } from "react-icons/fa";
import gsap from "gsap";

const Banner = () => {
  const bannerRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonsRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for smooth sequential animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Heading animation - slide in from left
      tl.fromTo(
        headingRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
      );

      // Subheading animation - slide in from left with delay
      tl.fromTo(
        subheadingRef.current,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );

      // Buttons stagger animation
      tl.fromTo(
        buttonsRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
        "-=0.4"
      );

      // Features animation
      tl.fromTo(
        featuresRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
        "-=0.5"
      );

      // Parallax effect on scroll
      const handleScroll = () => {
        const scrollY = window.scrollY;
        gsap.to(bannerRef.current, {
          yPercent: scrollY * 0.05,
          ease: "none",
          duration: 0.1,
        });
      };

      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        ref={bannerRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001f3f]/95 via-[#002f6c]/90 to-[#002f6c]/80"></div>

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-400 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-white space-y-8">
              {/* Main Heading */}
              <h1
                ref={headingRef}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Your Journey Starts{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">
                  Here
                </span>
              </h1>

              {/* Subheading */}
              <p
                ref={subheadingRef}
                className="text-lg sm:text-xl text-slate-200 max-w-xl leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Discover the freedom of travel with TravelEase. Book premium
                vehicles, explore new destinations, and create unforgettable
                memories on every journey.
              </p>

              {/* CTA Buttons */}
              <div ref={buttonsRef} className="flex flex-wrap gap-4">
                <Link
                  to="/allVehicles"
                  className="btn btn-lg bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] hover:from-[#0284c7] hover:to-[#0d9488] border-none text-white px-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  Explore Vehicles
                </Link>
                <Link
                  to="/about"
                  className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-[#002f6c] px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Learn More
                </Link>
              </div>

              {/* Features List */}
              <div
                ref={featuresRef}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8"
              >
                <div className="flex items-center gap-3 backdrop-blur-sm bg-white/10 rounded-2xl p-4 border border-white/20">
                  <div className="bg-gradient-to-br from-[#0ea5e9] to-[#14b8a6] p-3 rounded-xl">
                    <FaCar className="text-2xl text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">500+</p>
                    <p className="text-slate-300 text-sm">Vehicles</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 backdrop-blur-sm bg-white/10 rounded-2xl p-4 border border-white/20">
                  <div className="bg-gradient-to-br from-[#14b8a6] to-[#0ea5e9] p-3 rounded-xl">
                    <FaRoute className="text-2xl text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">50+</p>
                    <p className="text-slate-300 text-sm">Locations</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 backdrop-blur-sm bg-white/10 rounded-2xl p-4 border border-white/20">
                  <div className="bg-gradient-to-br from-[#0ea5e9] to-[#14b8a6] p-3 rounded-xl">
                    <FaShieldAlt className="text-2xl text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">100%</p>
                    <p className="text-slate-300 text-sm">Secure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Luxury vehicle"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002f6c]/60 via-transparent to-transparent"></div>

                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 right-8 backdrop-blur-xl bg-white/90 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="text-[#002f6c] font-bold text-xl mb-1"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Premium Fleet
                      </p>
                      <p
                        className="text-slate-600"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Top-rated vehicles for every journey
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-[#0ea5e9] to-[#14b8a6] text-white font-bold text-2xl rounded-xl px-4 py-2">
                      4.8★
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#0ea5e9] to-[#14b8a6] rounded-full blur-2xl opacity-50 -z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-[#14b8a6] to-[#0ea5e9] rounded-full blur-2xl opacity-50 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
