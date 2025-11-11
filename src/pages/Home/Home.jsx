import React from "react";
import LatestVehicles from "../../components/LatestVehicles/LatestVehicles";
import Banner from "../../components/Banner/Banner";
import FeaturedOwners from "../../components/FeaturedOwners/FeaturedOwners";
import About from "../../components/About/About";

const Home = () => {
  const latestVehiclePromise = fetch(
    "http://localhost:3000/latest-vehicles"
  ).then((res) => res.json());
  return (
    <div>
      <Banner></Banner>
      <LatestVehicles
        latestVehiclePromise={latestVehiclePromise}
      ></LatestVehicles>
      <FeaturedOwners></FeaturedOwners>
      <About></About>
    </div>
  );
};

export default Home;
