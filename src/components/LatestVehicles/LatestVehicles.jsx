import React, { useEffect, useState, useRef } from "react";
import Vehicle from "../Vehicle/Vehicle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LatestVehicles = ({ latestVehiclePromise }) => {
  const [vehicles, setVehicles] = useState([]);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // If latestVehiclePromise is an actual promise:
    latestVehiclePromise.then((data) => {
      setVehicles(data);
    });
  }, [latestVehiclePromise]);

  useEffect(() => {
    if (vehicles.length > 0) {
      const ctx = gsap.context(() => {
        // Title animation
        gsap.fromTo(
          titleRef.current,
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
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [vehicles]);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30 -z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30 -z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#002f6c] mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6]">
              Vehicles
            </span>
          </h2>
          <p
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Discover our newest additions to the fleet - fresh vehicles ready
            for your next adventure
          </p>
        </div>

        {/* Vehicles Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <Vehicle key={vehicle._id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestVehicles;
