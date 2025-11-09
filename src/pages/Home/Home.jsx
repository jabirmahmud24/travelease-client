import React from "react";
import LatestVehicles from "../../components/LatestVehicles/LatestVehicles";

const Home = () => {
  const latestVehiclePromise = fetch(
    "http://localhost:3000/latest-vehicles"
  ).then((res) => res.json());
  return (
    <div>
      <h2 className="text-6xl text-red-500">This is home 2</h2>
      <LatestVehicles
        latestVehiclePromise={latestVehiclePromise}
      ></LatestVehicles>
    </div>
  );
};

export default Home;
