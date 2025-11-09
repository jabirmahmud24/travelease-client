import React from "react";
import { Link } from "react-router";

const Vehicle = ({ vehicle }) => {
  const { _id, categories, coverImage, vehicleName } = vehicle;
  return (
    <div className="card bg-base-100 shadow-sm">
      <figure className="px-4 pt-4">
        <img src={coverImage} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Vehicle Name: {vehicleName}</h2>
        <h2 className="card-title">Catrgories: {categories}</h2>
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
