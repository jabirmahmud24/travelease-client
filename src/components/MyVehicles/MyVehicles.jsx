import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const MyVehicles = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`http://localhost:3000/vehicles`);
      const data = await res.json();
      // filter by logged-in user's email
      const myVehicles = data.filter(
        (vehicle) => vehicle.userEmail === user?.email
      );
      setVehicles(myVehicles);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.email) fetchVehicles();
  }, [user]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:3000/vehicles/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (res.ok) {
            Swal.fire(
              "Deleted!",
              data.message || "Vehicle deleted.",
              "success"
            );
            fetchVehicles(); // refresh list
          } else {
            Swal.fire("Error", data.message || "Failed to delete", "error");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Something went wrong", "error");
        }
      }
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">My Vehicles</h2>
      {vehicles.length === 0 ? (
        <p>No vehicles added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <img
                src={vehicle.coverImage}
                alt={vehicle.vehicleName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-950">
                  {vehicle.vehicleName}
                </h3>
                <p className="text-gray-600">{vehicle.category}</p>
                <p className="text-gray-600">${vehicle.pricePerDay}/day</p>
                <p
                  className={`font-semibold ${
                    vehicle.availability === "Available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {vehicle.availability}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => navigate(`/vehicleDetails/${vehicle._id}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => navigate(`/updateVehicle/${vehicle._id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVehicles;
