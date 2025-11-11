import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);

  const handleSignOut = () => {
    signOutUser().then().catch();
  };

  const links = (
    <>
      {user ? (
        <>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/allVehicles">All Vehicles</NavLink>
          </li>
          <li>
            <NavLink to="/addVehicle">Add Vehicle</NavLink>
          </li>
          <li>
            <NavLink to="/myVehicles">My Vehicles</NavLink>
          </li>

          <li>
            <NavLink to="/myBookings">My Bookings</NavLink>
          </li>
        </>
      ) : (
        <>
          {" "}
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/allVehicles">All Vehicles</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-bold flex items-center gap-1">
          <img className="h-8 w-8" src="/logo.png" alt="Logo" />
          <span className="bg-linear-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text">
            Travel
          </span>
          <span className="bg-linear-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text">
            Ease
          </span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      {/* <div className="navbar-end">
        {user ? (
          <div className="flex gap-2 justify-center items-center">
            <div>
              <img
                className="rounded-full h-12 w-12 border border-amber-50"
                src={user.photoURL}
                alt=""
              />
            </div>
            <button onClick={handleSignOut} className="btn btn-primary">
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/register">Login</Link>
        )}
      </div> */}
      <div className="navbar-end">
        {user ? (
          <div className="flex gap-2 justify-center items-center">
            {/* wrapper uses 'group' so we can show tooltip on hover/focus */}
            <div className="relative group inline-block">
              <img
                className="rounded-full h-12 w-12 border border-amber-50 cursor-pointer"
                src={user.photoURL}
                alt={user.displayName || "User"}
                tabIndex={0} // makes it focusable for keyboard users
              />

              {/* tooltip: invisible by default, visible on hover or focus */}
              <div
                className="pointer-events-none absolute left-1/2 transform -translate-x-1/2 mt-2 w-max whitespace-nowrap
                         rounded-md bg-white text-black text-sm font-medium shadow-md px-3 py-1
                         opacity-0 invisible group-hover:opacity-100 group-hover:visible
                         group-focus:opacity-100 group-focus:visible transition-opacity duration-150"
                role="tooltip"
              >
                {user.displayName}
              </div>
            </div>

            <button onClick={handleSignOut} className="btn btn-primary">
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/register">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
