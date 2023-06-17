import React from "react"; // nạp thư viện react
import ReactDOM from "react-dom/client"; // nạp thư viện react-dom
import { MAP_PAGE_PATH } from "./constant";
import Map from "./Map.jsx";
const mapRoute = {
  path: MAP_PAGE_PATH,
  element: <Map />,
};

export default mapRoute;
