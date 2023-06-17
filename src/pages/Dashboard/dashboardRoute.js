import React from "react"; // nạp thư viện react
import ReactDOM from "react-dom/client"; // nạp thư viện react-dom
import { DASHBOARD_PAGE_PATH } from "./constant";
import Dashboard from "./Dashboard.jsx";

const dashboardRoute = {
  path: DASHBOARD_PAGE_PATH,
  element: <Dashboard />,
};

export default dashboardRoute;
