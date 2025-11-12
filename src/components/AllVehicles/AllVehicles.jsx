import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router";
import Vehicle from "../Vehicle/Vehicle";
import {
  FaSort,
  FaSortAmountDown,
  FaSortAmountUp,
  FaFilter,
} from "react-icons/fa";
import gsap from "gsap";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [searchParams] = useSearchParams();

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const filterBarRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3000/vehicles")
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data);
        applyFiltersAndSort(data, "default");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        // Title animation
        gsap.fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );

        // Filter bar animation
        gsap.fromTo(
          filterBarRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: "power3.out" }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [loading]);

  const applyFiltersAndSort = (data, sortOption) => {
    let result = [...data];

    // Apply URL search params filters (from Banner search)
    const location = searchParams.get("location");
    const category = searchParams.get("category");
    const owner = searchParams.get("owner");

    if (location) {
      result = result.filter((v) =>
        v.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(
        (v) => v.categories.toLowerCase() === category.toLowerCase()
      );
    }

    if (owner) {
      result = result.filter(
        (v) => v.userEmail.toLowerCase() === owner.toLowerCase()
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort(
          (a, b) => parseFloat(a.pricePerDay) - parseFloat(b.pricePerDay)
        );
        break;
      case "price-high":
        result.sort(
          (a, b) => parseFloat(b.pricePerDay) - parseFloat(a.pricePerDay)
        );
        break;
      case "name-asc":
        result.sort((a, b) => a.vehicleName.localeCompare(b.vehicleName));
        break;
      case "name-desc":
        result.sort((a, b) => b.vehicleName.localeCompare(a.vehicleName));
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // Default order (as received from API)
        break;
    }

    setFilteredVehicles(result);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortBy(newSort);
    applyFiltersAndSort(vehicles, newSort);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-linear-to-b from-slate-50 to-white">
        <span className="loading loading-spinner loading-lg text-[#0ea5e9]"></span>
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden min-h-screen">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30 -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96  rounded-full blur-3xl opacity-30 -z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#002f6c] mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            All{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0ea5e9] to-[#14b8a6]">
              Vehicles
            </span>
          </h2>
          <p
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Explore our complete fleet of vehicles - find the perfect ride for
            your journey
          </p>
        </div>

        {/* Filter and Sort Bar */}
        <div ref={filterBarRef} className="mb-8 max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-white/80 border border-slate-200 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Results Count */}
              <div className="flex items-center gap-3">
                <FaFilter className="text-[#0ea5e9] text-xl" />
                <span
                  className="text-slate-700 font-medium"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Showing{" "}
                  <span className="text-[#0ea5e9] font-bold">
                    {filteredVehicles.length}
                  </span>{" "}
                  of {vehicles.length} vehicles
                </span>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <label
                  className="flex items-center gap-2 text-slate-700 font-medium whitespace-nowrap"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <FaSort className="text-[#14b8a6]" />
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="select select-bordered bg-white border-slate-300 text-slate-700 focus:border-[#0ea5e9] focus:outline-none w-full md:w-64 rounded-xl"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <option value="default">Default Order</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchParams.get("location") ||
              searchParams.get("category") ||
              searchParams.get("owner")) && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-slate-600 font-medium">
                    Active Filters:
                  </span>
                  {searchParams.get("location") && (
                    <span className="badge badge-lg bg-[#0ea5e9]/10 text-[#0ea5e9] border-[#0ea5e9]/30">
                      Location: {searchParams.get("location")}
                    </span>
                  )}
                  {searchParams.get("category") && (
                    <span className="badge badge-lg bg-[#14b8a6]/10 text-[#14b8a6] border-[#14b8a6]/30">
                      Type: {searchParams.get("category")}
                    </span>
                  )}
                  {searchParams.get("owner") && (
                    <span className="badge badge-lg bg-purple-100 text-purple-700 border-purple-300">
                      Owner Filter Active
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {filteredVehicles.map((vehicle) => (
              <Vehicle key={vehicle._id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🚗</div>
            <h3
              className="text-2xl font-bold text-[#002f6c] mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              No Vehicles Found
            </h3>
            <p
              className="text-slate-600"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllVehicles;
