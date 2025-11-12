import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaCar,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loading from "../Loader/Loading";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

const MyVehicles = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/vehicles`);
      const data = await res.data;
      // filter by logged-in user's email
      const myVehicles = data.filter(
        (vehicle) => vehicle.userEmail === user?.email
      );
      setVehicles(myVehicles);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchVehicles();
  }, [user]);

  useEffect(() => {
    if (!loading && vehicles.length > 0) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [loading, vehicles]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      backdrop: "rgba(0, 47, 108, 0.4)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `http://localhost:3000/vehicles/${id}`
          );
          const data = res.data;
          // console.log(res);

          if (res.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: data.message || "Vehicle deleted successfully.",
              icon: "success",
              confirmButtonColor: "#0ea5e9",
            });
            fetchVehicles();
          } else {
            Swal.fire({
              title: "Error",
              text: data.message || "Failed to delete",
              icon: "error",
              confirmButtonColor: "#0ea5e9",
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error",
            text: "Something went wrong",
            icon: "error",
            confirmButtonColor: "#0ea5e9",
          });
        }
      }
    });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <section
      ref={sectionRef}
      className="py-20  relative overflow-hidden min-h-screen"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30 -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30 -z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1868d1] mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            My{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0ea5e9] to-[#14b8a6]">
              Vehicles
            </span>
          </h2>
          <p
            className="text-lg text-slate-500 max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Manage your vehicle listings - view, update, or remove vehicles from
            your fleet
          </p>
        </div>

        {vehicles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🚗</div>
            <h3
              className="text-2xl font-bold text-[#002f6c] mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              No Vehicles Added Yet
            </h3>
            <p
              className="text-slate-600 mb-6"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Start building your fleet by adding your first vehicle
            </p>
            <button
              onClick={() => navigate("/addVehicle")}
              className="btn btn-lg bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] hover:from-[#0284c7] hover:to-[#0d9488] border-none text-white px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <FaCar className="mr-2" />
              Add Your First Vehicle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {vehicles.map((vehicle) => (
              <div key={vehicle._id} className="group">
                <div className="bg-white shadow-lg hover:shadow-2xl border border-slate-100 transition-all duration-500 transform hover:-translate-y-2 rounded-3xl overflow-hidden">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={vehicle.coverImage}
                      alt={vehicle.vehicleName}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Availability Badge */}
                    <div className="absolute top-4 right-4">
                      {vehicle.availability === "Available" ? (
                        <span className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                          <FaCheckCircle />
                          Available
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                          <FaTimesCircle />
                          Unavailable
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <h3
                      className="font-bold text-xl text-[#002f6c] group-hover:text-[#0ea5e9] transition-colors duration-300"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {vehicle.vehicleName}
                    </h3>

                    <div
                      className="space-y-2 text-slate-600"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <p className="flex items-center gap-2">
                        <FaCar className="text-[#14b8a6] flex-shrink-0" />
                        <span className="font-medium">Category:</span>{" "}
                        {vehicle.category || vehicle.categories}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaDollarSign className="text-[#0ea5e9] flex-shrink-0" />
                        <span className="font-medium text-lg text-[#002f6c]">
                          {vehicle.pricePerDay}
                        </span>
                        <span className="text-sm">/day</span>
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
                      <button
                        onClick={() =>
                          navigate(`/vehicleDetails/${vehicle._id}`)
                        }
                        className="btn btn-sm bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] hover:from-[#0284c7] hover:to-[#0d9488] border-none text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full"
                      >
                        <FaEye className="mr-2" />
                        View Details
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            navigate(`/updateVehicle/${vehicle._id}`)
                          }
                          className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 border-none text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex-1"
                        >
                          <FaEdit className="mr-1" />
                          Update
                        </button>

                        <button
                          onClick={() => handleDelete(vehicle._id)}
                          className="btn btn-sm bg-red-500 hover:bg-red-600 border-none text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex-1"
                        >
                          <FaTrash className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyVehicles;
