import React, { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { FaCar } from "react-icons/fa";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  const [theme, setTheme] = useState("light");
  // when theme changes, update HTML attribute
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  // toggle function
  const handleThemeToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const handleSignOut = () => {
    signOutUser().then().catch();
  };

  const links = (
    <>
      {user ? (
        <>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-bold rounded-sm bg-[#0ea5e9] text-white"
                  : "text-black hover:text-blue-800 hover:font-bold hover:bg-blue-200"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/allVehicles"
              className={({ isActive }) =>
                isActive
                  ? "font-bold rounded-sm bg-[#0ea5e9] text-white"
                  : "text-black hover:text-blue-800 hover:font-bold hover:bg-blue-200"
              }
            >
              All Vehicles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/addVehicle"
              className={({ isActive }) =>
                isActive
                  ? "font-bold rounded-sm bg-[#0ea5e9] text-white"
                  : "text-black hover:text-blue-800 hover:font-bold hover:bg-blue-200"
              }
            >
              Add Vehicle
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myVehicles"
              className={({ isActive }) =>
                isActive
                  ? "font-bold rounded-sm bg-[#0ea5e9] text-white"
                  : "text-black hover:text-blue-800 hover:font-bold hover:bg-blue-200"
              }
            >
              My Vehicles
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/myBookings"
              className={({ isActive }) =>
                isActive
                  ? "font-bold rounded-sm bg-[#0ea5e9] text-white"
                  : "text-black hover:text-blue-800 hover:font-bold hover:bg-blue-200"
              }
            >
              My Bookings
            </NavLink>
          </li>
        </>
      ) : (
        <>
          {" "}
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "font-bold rounded-sm bg-[#0ea5e9] text-white"
                  : "text-black hover:text-blue-800 hover:font-bold hover:bg-blue-200"
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "font-bold rounded-sm bg-[#0ea5e9] text-white"
                  : "text-black hover:text-blue-800 hover:font-bold hover:bg-blue-200"
              }
            >
              Register
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-bold rounded-sm bg-[#0ea5e9] text-white"
                  : "text-black hover:text-blue-800 hover:font-bold hover:bg-blue-200"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/allVehicles"
              className={({ isActive }) =>
                isActive
                  ? "font-bold rounded-sm bg-[#0ea5e9] text-white"
                  : "text-black hover:text-blue-800 hover:font-bold hover:bg-blue-200"
              }
            >
              All Vehicles
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-slate-100 shadow-sm z-50">
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
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-linear-to-br from-[#0ea5e9] to-[#14b8a6] p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <FaCar className="h-6 w-6 text-white" />
          </div>
          <span
            className="text-2xl font-bold"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-600 to-teal-600">
              Travel
            </span>
            <span className="text-slate-700">Ease</span>
          </span>
        </Link>
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
        {/* --------------- */}
        {/* Toggle Button */}
        <div className="flex-none flex justify-center items-center border-2 border-black text-black px-2 rounded-2xl mr-2">
          <h4>Theme</h4>
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the theme */}
            <input type="checkbox" onChange={handleThemeToggle} />

            {/* sun icon (light mode) */}
            <svg
              className="swap-on fill-current w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5 12a7 7 0 1014 0 7 7 0 00-14 0zM12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>

            {/* moon icon (dark mode) */}
            <svg
              className="swap-off fill-current w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64 13a9 9 0 11-9-9 7 7 0 009 9z" />
            </svg>
          </label>
        </div>

        {/* --------------- */}
        {user ? (
          <div className="flex gap-2 justify-center items-center">
            {/* wrapper uses 'group' so we can show tooltip on hover/focus */}
            <div className="relative group inline-block">
              <img
                className="rounded-full h-12 w-12 border border-gray-500 cursor-pointer"
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

            <button
              onClick={handleSignOut}
              className="btn btn-sm bg-blue-600 text-white rounded-2xl border-none"
            >
              Sign Out
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
