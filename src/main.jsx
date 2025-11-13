import { StrictMode, Suspense } from "react";
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
import About from "./components/About/About.jsx";
import Error404 from "./components/Error/Error404.jsx";
import Loading from "./components/Loader/Loading.jsx";

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
        path: "about",
        Component: About,
      },
      {
        path: "*",
        Component: Error404,
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
          fetch(`https://travelease-server.vercel.app/vehicles/${params.id}`),
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
    <Suspense fallback={<Loading></Loading>}>
      <AuthProvider>
        <RouterProvider router={router} />,
      </AuthProvider>
    </Suspense>
  </StrictMode>
);
