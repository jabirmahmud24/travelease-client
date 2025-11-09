import React, { useEffect, useState } from "react";

import Vehicle from "../Vehicle/Vehicle";

const LatestVehicles = ({ latestVehiclePromise }) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // If latestVehiclePromise is an actual promise:
    latestVehiclePromise.then((data) => {
      setVehicles(data);
    });
  }, [latestVehiclePromise]);

  return (
    <div>
      <h2 className="text-5xl text-center">
        Recent <span className="text-primary">Vehicles</span>
      </h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <Vehicle key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default LatestVehicles;
