import React from "react"; // nạp thư viện react
import ReactDOM from "react-dom/client"; // nạp thư viện react-dom
import Navigator from "../components/navigators/Navigator.jsx";
import { Outlet } from "react-router-dom";
import Map from "../pages/Map/Map.jsx";
function Root() {
  return (
    <>
      <Navigator />
      <Outlet />
    </>
  );
}

export default Root;
