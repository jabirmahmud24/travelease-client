import React from "react";
import { Link } from "react-router";

const Vehicle = ({ vehicle }) => {
  const { _id, categories, coverImage, vehicleName, location } = vehicle;
  return (
    <div className="card bg-base-100 shadow-sm">
      <figure className="px-4 pt-4">
        <img src={coverImage} className="rounded-xl h-64 object-center" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{vehicleName}</h2>
        <p className="">Catrgories: {categories}</p>
        <p className=""> {location}</p>
        {/* <p>Vehicle ID: {_id}</p> */}
        <div className="card-actions">
          <Link
            to={`/vehicleDetails/${_id}`}
            className="btn btn-primary w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Vehicle;
