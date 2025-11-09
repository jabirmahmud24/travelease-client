import React, { useEffect, useState } from "react";
import Vehicle from "../Vehicle/Vehicle";
const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/vehicles")
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="my-10">
      <h2 className="text-5xl text-center mb-8 font-bold">
        All <span className="text-primary">Vehicles</span>
      </h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-8">
        {vehicles.map((vehicle) => (
          <Vehicle key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default AllVehicles;
