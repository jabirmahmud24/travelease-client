import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { FaCar, FaMapMarkerAlt, FaStar, FaUser } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeaturedOwners = () => {
  const [featuredOwners, setFeaturedOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    fetchFeaturedOwners();
  }, []);

  useEffect(() => {
    if (featuredOwners.length > 0) {
      const ctx = gsap.context(() => {
        // Title animation
        gsap.fromTo(
          ".featured-title",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );

        // Cards stagger animation
        gsap.fromTo(
          cardsRef.current,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [featuredOwners]);

  const fetchFeaturedOwners = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/vehicles");
      const vehicles = await response.json();

      // Group vehicles by owner
      const ownerMap = {};
      vehicles.forEach((vehicle) => {
        const ownerName = vehicle.owner;
        const ownerEmail = vehicle.userEmail;
        const location = vehicle.location;

        if (!ownerMap[ownerEmail]) {
          ownerMap[ownerEmail] = {
            name: ownerName,
            email: ownerEmail,
            location: location,
            vehicles: [],
            vehicleCount: 0,
            // Generate a rating between 4.0 and 5.0
            rating: (Math.random() * 1 + 4).toFixed(1),
            // Generate avatar based on name
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              ownerName
            )}&background=0ea5e9&color=fff&size=200&bold=true`,
          };
        }

        ownerMap[ownerEmail].vehicles.push(vehicle);
        ownerMap[ownerEmail].vehicleCount++;
      });

      // Convert to array and sort by vehicle count
      const ownersArray = Object.values(ownerMap);
      const sortedOwners = ownersArray.sort(
        (a, b) => b.vehicleCount - a.vehicleCount
      );

      // Get top 3 owners
      const topOwners = sortedOwners.slice(0, 3);

      setFeaturedOwners(topOwners);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching featured owners:", error);
      setLoading(false);
    }
  };

  const handleOwnerClick = (ownerEmail) => {
    // Navigate to all vehicles filtered by this owner
    navigate(`/allVehicles?owner=${encodeURIComponent(ownerEmail)}`);
  };

  if (loading) {
    return (
      <div className="py-20 bg-linear-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <span className="loading loading-spinner loading-lg text-[#0ea5e9]"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-linear-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30 -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30 -z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 featured-title">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#002f6c] mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0ea5e9] to-[#14b8a6]">
              Owners
            </span>
          </h2>
          <p
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Meet our top vehicle owners who provide exceptional service and
            maintain the largest fleets
          </p>
        </div>

        {/* Owners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredOwners.map((owner, index) => (
            <div
              key={owner.email}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => handleOwnerClick(owner.email)}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 transform hover:-translate-y-2">
                {/* Card Header with Avatar */}
                <div className="relative h-48 bg-linear-to-br from-[#0ea5e9] to-[#14b8a6] flex items-center justify-center overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20"></div>

                  {/* Avatar */}
                  <div className="relative z-10">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white transform group-hover:scale-110 transition-transform duration-500">
                      <img
                        src={owner.avatar}
                        alt={owner.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Badge for ranking */}
                  {index === 0 && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                      <FaStar className="text-yellow-600" />
                      #1
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  {/* Owner Name */}
                  <h3
                    className="text-2xl font-bold text-[#002f6c] text-center group-hover:text-[#0ea5e9] transition-colors"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {owner.name}
                  </h3>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-slate-100">
                    {/* Vehicle Count */}
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-2 text-[#0ea5e9] mb-1">
                        <FaCar className="text-xl" />
                        <span className="text-2xl font-bold">
                          {owner.vehicleCount}
                        </span>
                      </div>
                      <span className="text-sm text-slate-600">Vehicles</span>
                    </div>

                    {/* Rating */}
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-2 text-yellow-500 mb-1">
                        <FaStar className="text-xl" />
                        <span className="text-2xl font-bold">
                          {owner.rating}
                        </span>
                      </div>
                      <span className="text-sm text-slate-600">Rating</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center justify-center gap-2 text-slate-600">
                    <FaMapMarkerAlt className="text-[#14b8a6]" />
                    <span className="text-sm font-medium">
                      {owner.location}
                    </span>
                  </div>

                  {/* View Vehicles Button */}
                  <button className="w-full btn bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] hover:from-[#0284c7] hover:to-[#0d9488] border-none text-white font-semibold rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300">
                    View Vehicles
                  </button>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0ea5e9]/0 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Owners Link */}
        {featuredOwners.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/allVehicles")}
              className="btn btn-outline border-2 border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              View All Vehicles
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedOwners;
