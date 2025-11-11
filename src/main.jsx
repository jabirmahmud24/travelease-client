import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";

import App from "./App.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import Register from "./pages/Auth/Register.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import AllVehicles from "./components/AllVehicles/AllVehicles.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import ViewDetails from "./components/ViewDetails/ViewDetails.jsx";
import MyBookings from "./components/MyBookings/MyBookings.jsx";

import MyVehicles from "./components/MyVehicles/MyVehicles.jsx";
import AddVehicle from "./components/AddVehicle.jsx/AddVehicle.jsx";
import UpdateVehicle from "./components/UpdateVehicle/UpdateVehicle.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "allVehicles",
        Component: AllVehicles,
      },
      {
        path: "myBookings",
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      {
        path: "myVehicles",
        element: (
          <PrivateRoute>
            <MyVehicles></MyVehicles>
          </PrivateRoute>
        ),
      },
      {
        path: "addVehicle",
        element: (
          <PrivateRoute>
            <AddVehicle></AddVehicle>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateVehicle/:id",
        element: (
          <PrivateRoute>
            <UpdateVehicle></UpdateVehicle>
          </PrivateRoute>
        ),
      },
      {
        path: "vehicleDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/vehicles/${params.id}`),
        element: (
          <PrivateRoute>
            <ViewDetails></ViewDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
  </StrictMode>
);
