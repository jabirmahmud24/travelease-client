import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
const AddVehicle = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicleName: "",
    owner: user?.displayName || "",
    categories: "",
    pricePerDay: "",
    location: "",
    availability: "Available",
    description: "",
    coverImage: "",
    userEmail: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      createdAt: new Date().toISOString(),
    };

    try {
      // ✅ Use Axios POST
      const response = await axios.post(
        "http://localhost:3000/vehicles",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Vehicle Added",
          text: "Your vehicle has been added successfully!",
        }).then(() => {
          navigate("/myVehicles");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data?.message || "Failed to add vehicle.",
        });
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 rounded-lg shadow-lg mt-8">
      <h2
        className="text-4xl md:text-5xl font-bold text-[#1868d1] mb-4 text-center"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Add A New{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0ea5e9] to-[#14b8a6]">
          Vehicle
        </span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Vehicle Name</label>
          <input
            type="text"
            name="vehicleName"
            value={formData.vehicleName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Owner Name</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            readOnly
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Price Per Day</label>
          <input
            type="number"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Category</label>
          <input
            type="text"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Availability</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option className="bg-gray-400" value="Available">
              Available
            </option>
            <option className="bg-gray-400" value="Not Available">
              Not Available
            </option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-1">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
