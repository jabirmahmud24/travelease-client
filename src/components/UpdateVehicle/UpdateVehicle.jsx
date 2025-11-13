import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import Loading from "../Loader/Loading";

const UpdateVehicle = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [vehicle, setVehicle] = useState(null);
  const navigate = useNavigate();

  // Fetch vehicle by ID
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(
          `https://travelease-server.vercel.app/vehicles/${id}`
        );
        setVehicle(res.data); // Axios automatically parses JSON
      } catch (err) {
        console.error("Error loading vehicle:", err);
      }
    };

    fetchVehicle();
  }, [id]);

  // Handle Update Submit
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedVehicle = {
      vehicleName: form.vehicleName.value,
      owner: form.owner.value,
      categories: form.categories.value,
      pricePerDay: form.pricePerDay.value,
      location: form.location.value,
      availability: form.availability.value,
      description: form.description.value,
      coverImage: form.coverImage.value,
      userEmail: user?.email,
    };

    axios
      .patch(
        `https://travelease-server.vercel.app/vehicles/${id}`,
        updatedVehicle,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        const data = res.data;
        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Vehicle updated successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
          navigate("/myVehicles");
        } else {
          Swal.fire({
            icon: "info",
            title: "No Changes",
            text: "No changes were made.",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating vehicle:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to update vehicle.",
        });
      });
  };

  if (!vehicle) return <Loading></Loading>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-2xl">
      {/* Vehicle Header */}
      <h2 className="text-4xl md:text-5xl font-bold text-center text-[#002f6c] dark:text-[#0a68e4] mb-4">
        Update Your{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0ea5e9] to-[#14b8a6]">
          Vehicle Data
        </span>
      </h2>
      <div className="mb-6 text-center">
        <img
          src={vehicle.coverImage}
          alt={vehicle.vehicleName}
          className="w-64 h-40 object-cover mx-auto rounded-xl"
        />
        <h2 className="text-2xl font-bold mt-3 my-4">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0ea5e9] to-[#14b8a6]">
            {vehicle.vehicleName}
          </span>
        </h2>
        <p className="text-sm text-gray-500">{vehicle.description}</p>
      </div>

      {/* Update Form */}
      <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
        {/* Vehicle Name */}
        <div>
          <label className="label">
            <span className="label-text">Vehicle Name</span>
          </label>
          <input
            name="vehicleName"
            defaultValue={vehicle.vehicleName}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Owner */}
        <div>
          <label className="label">
            <span className="label-text">Owner Name</span>
          </label>
          <input
            name="owner"
            defaultValue={vehicle.owner}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Categories Dropdown */}
        <div>
          <label className="label">
            <span className="label-text">Categories</span>
          </label>
          <select
            name="categories"
            defaultValue={vehicle.categories}
            className="select select-bordered w-full"
          >
            <option>Sedan</option>
            <option>SUV</option>
            <option>Electric</option>
            <option>Van</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="label">
            <span className="label-text">Price Per Day</span>
          </label>
          <input
            name="pricePerDay"
            defaultValue={vehicle.pricePerDay}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            name="location"
            defaultValue={vehicle.location}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Availability */}
        <div>
          <label className="label">
            <span className="label-text">Availability</span>
          </label>
          <select
            name="availability"
            defaultValue={vehicle.availability}
            className="select select-bordered w-full"
          >
            <option>Available</option>
            <option>Unavailable</option>
          </select>
        </div>

        {/* Description (full width) */}
        <div className="col-span-2">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            defaultValue={vehicle.description}
            className="textarea textarea-bordered w-full"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Cover Image URL */}
        <div className="col-span-2">
          <label className="label">
            <span className="label-text">Cover Image URL</span>
          </label>
          <input
            name="coverImage"
            defaultValue={vehicle.coverImage}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary col-span-2 mt-4 bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] hover:from-[#0284c7] hover:to-[#0d9488] border-none text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full"
        >
          <FiEdit /> Update Vehicle
        </button>
      </form>
    </div>
  );
};

export default UpdateVehicle;
