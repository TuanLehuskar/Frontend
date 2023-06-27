import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import mapRoute from "../pages/Map/mapRoute";
import ErrorPage from "../pages/Error/Error.jsx";
import Root from "../Global/Root.jsx";
import dashboardRoute from "../pages/Dashboard/dashboardRoute";
import warningRoute from "../pages/Warning/warningRoute";
import dut1Route from "../pages/Dashboard/SubPage/DUTPage1/DUT1PageRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [mapRoute, dashboardRoute, warningRoute, dut1Route],
  },
]);

export default router;
