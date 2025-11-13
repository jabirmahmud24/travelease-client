import React from "react";
import LatestVehicles from "../../components/LatestVehicles/LatestVehicles";
import Banner from "../../components/Banner/Banner";
import FeaturedOwners from "../../components/FeaturedOwners/FeaturedOwners";
import About from "../../components/About/About";
import axios from "axios";

const Home = () => {
  const latestVehiclePromise = axios
    .get("https://travelease-server.vercel.app/latest-vehicles")
    .then((res) => res.data);
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
