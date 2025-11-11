import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaSearch, FaMapMarkerAlt, FaCar, FaCalendarAlt } from "react-icons/fa";
import gsap from "gsap";

const Banner = () => {
  const navigate = useNavigate();
  const bannerRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonsRef = useRef(null);
  const searchBarRef = useRef(null);

  const [searchData, setSearchData] = useState({
    location: "",
    vehicleType: "",
    dateFrom: "",
    dateTo: "",
  });

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

      // Search bar pop-in with scale
      tl.fromTo(
        searchBarRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)" },
        "-=0.3"
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

  const handleInputChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    // Navigate to all vehicles page with search parameters
    const params = new URLSearchParams();
    if (searchData.location) params.append("location", searchData.location);
    if (searchData.vehicleType)
      params.append("category", searchData.vehicleType);
    if (searchData.dateFrom) params.append("dateFrom", searchData.dateFrom);
    if (searchData.dateTo) params.append("dateTo", searchData.dateTo);

    navigate(`/allVehicles?${params.toString()}`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div
        ref={bannerRef}
        className="absolute inset-0 bg-gradient-to-br from-[#002f6c] via-[#0284c7] to-[#14b8a6]"
        style={{
          backgroundSize: "120% 120%",
          animation: "gradientShift 15s ease infinite",
        }}
      >
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

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001f3f]/80 via-[#002f6c]/60 to-transparent"></div>
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
                Plan Your Next Trip{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">
                  with Ease
                </span>
              </h1>

              {/* Subheading */}
              <p
                ref={subheadingRef}
                className="text-lg sm:text-xl text-slate-200 max-w-xl"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Your one-stop solution for booking vehicles, managing trips, and
                exploring adventures.
              </p>

              {/* CTA Buttons */}
              <div ref={buttonsRef} className="flex flex-wrap gap-4">
                <Link
                  to="/allVehicles"
                  className="btn btn-lg bg-[#0ea5e9] hover:bg-[#38bdf8] border-none text-white px-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  Start Booking
                </Link>
                <Link
                  to="/trips"
                  className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-[#002f6c] px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  View Your Trips
                </Link>
              </div>
            </div>

            {/* Right Column - Search Bar */}
            <div ref={searchBarRef} className="w-full">
              <div className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                  <FaSearch className="text-cyan-300" />
                  Find Your Vehicle
                </h3>

                <div className="space-y-4">
                  {/* Location Input */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white flex items-center gap-2">
                        <FaMapMarkerAlt className="text-cyan-300" />
                        Destination
                      </span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="Where are you going?"
                      className="input input-bordered bg-white/20 border-white/40 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-cyan-300 transition-all"
                      value={searchData.location}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Vehicle Type Dropdown */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white flex items-center gap-2">
                        <FaCar className="text-cyan-300" />
                        Vehicle Type
                      </span>
                    </label>
                    <select
                      name="vehicleType"
                      className="select select-bordered bg-white/20 border-white/40 text-white focus:bg-white/30 focus:border-cyan-300 transition-all"
                      value={searchData.vehicleType}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select vehicle type
                      </option>
                      <option value="Taxi">Taxi</option>
                      <option value="Van">Van</option>
                      <option value="SUV">SUV</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Bus">Bus</option>
                      <option value="Truck">Truck</option>
                    </select>
                  </div>

                  {/* Date Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-white flex items-center gap-2 text-sm">
                          <FaCalendarAlt className="text-cyan-300" />
                          From
                        </span>
                      </label>
                      <input
                        type="date"
                        name="dateFrom"
                        className="input input-bordered bg-white/20 border-white/40 text-white focus:bg-white/30 focus:border-cyan-300 transition-all"
                        value={searchData.dateFrom}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-white flex items-center gap-2 text-sm">
                          <FaCalendarAlt className="text-cyan-300" />
                          To
                        </span>
                      </label>
                      <input
                        type="date"
                        name="dateTo"
                        className="input input-bordered bg-white/20 border-white/40 text-white focus:bg-white/30 focus:border-cyan-300 transition-all"
                        value={searchData.dateTo}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Search Button */}
                  <button
                    onClick={handleSearch}
                    className="btn btn-block bg-gradient-to-r from-cyan-400 to-teal-400 border-none text-[#002f6c] font-semibold text-lg hover:from-cyan-300 hover:to-teal-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] mt-6"
                  >
                    <FaSearch className="mr-2" />
                    Search Vehicles
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;
