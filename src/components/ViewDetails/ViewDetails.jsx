import { useState, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const ViewDetails = () => {
  const vehicle = useLoaderData();
  console.log("Vehicle from loader:", vehicle);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [booking, setBooking] = useState(false);

  const handleBookNow = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You need to be logged in to book a vehicle",
      });
      navigate("/login");
      return;
    }

    setBooking(true);

    try {
      const token = await user.getIdToken();

      const bookingData = {
        vehicleId: vehicle._id,
        vehicleName: vehicle.vehicleName,
        owner: vehicle.owner,
        category: vehicle.category,
        pricePerDay: vehicle.pricePerDay,
        location: vehicle.location,
        coverImage: vehicle.coverImage,
        userEmail: user.email,
      };

      const response = await fetch("http://localhost:3000/myBookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Booking Successful!",
          text: "Your vehicle has been booked successfully",
          confirmButtonText: "View My Bookings",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/myBookings");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: data.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Error booking vehicle:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to book vehicle. Please try again.",
      });
    } finally {
      setBooking(false);
    }
  };

  if (!vehicle) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Vehicle not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-gray-600 hover:text-blue-800 transition"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Vehicles
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Vehicle Image */}
          <div className="relative border-2 border-amber-300 h-96 overflow-hidden">
            <img
              src={vehicle.coverImage}
              alt={vehicle.vehicleName}
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
            <div className="absolute top-4 right-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  vehicle.availability === "Available"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {vehicle.availability}
              </span>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {vehicle.vehicleName}
                </h1>
                <p className="text-gray-600 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {vehicle.location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-sm">Price per day</p>
                <p className="text-4xl font-bold text-blue-600">
                  ${vehicle.pricePerDay}
                </p>
              </div>
            </div>

            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                {vehicle.category}
              </span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {vehicle.description}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {vehicle.createdAt}
              </p>
            </div>

            {/* Owner Info */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Owner Information
              </h3>
              <p className="text-gray-700 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {vehicle.owner}
              </p>
            </div>

            {/* Book Now Button */}
            <button
              onClick={handleBookNow}
              disabled={booking || vehicle.availability !== "Available"}
              className={`w-full py-4 px-8 rounded-lg text-white font-semibold text-lg transition duration-300 ${
                vehicle.availability === "Available"
                  ? "bg-blue-600 hover:bg-blue-700 active:scale-95"
                  : "bg-gray-400 cursor-not-allowed"
              } ${booking ? "opacity-75 cursor-wait" : ""}`}
            >
              {booking ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : vehicle.availability === "Available" ? (
                "Book Now"
              ) : (
                "Not Available"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
