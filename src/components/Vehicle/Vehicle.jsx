import React from "react";
import { Link } from "react-router";
import { FaCar, FaMapMarkerAlt } from "react-icons/fa";

const Vehicle = ({ vehicle }) => {
  const { _id, categories, coverImage, vehicleName, location } = vehicle;
  return (
    <div className="group">
      <div className="card bg-white shadow-lg hover:shadow-2xl border border-slate-100 transition-all duration-500 transform hover:-translate-y-2 rounded-3xl overflow-hidden">
        <figure className="px-4 pt-4 relative overflow-hidden">
          <img
            src={coverImage}
            className="rounded-2xl h-64 w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-4 rounded-2xl bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </figure>
        <div className="card-body">
          <h2
            className="card-title text-[#002f6c] text-xl font-bold group-hover:text-[#0ea5e9] transition-colors duration-300"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {vehicleName}
          </h2>
          <div
            className="space-y-2 text-slate-600"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <p className="flex items-center gap-2">
              <FaCar className="text-[#14b8a6] text-lg flex-shrink-0" />
              <span className="font-medium">Categories:</span> {categories}
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#0ea5e9] text-lg flex-shrink-0" />
              <span className="font-medium">{location}</span>
            </p>
          </div>
          <div className="card-actions mt-4">
            <Link
              to={`/vehicleDetails/${_id}`}
              className="btn w-full bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] hover:from-[#0284c7] hover:to-[#0d9488] border-none text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicle;
