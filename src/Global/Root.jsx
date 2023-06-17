import React from "react"; // nạp thư viện react
import ReactDOM from "react-dom/client"; // nạp thư viện react-dom
import Navigator from "../components/navigators/Navigator.jsx";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <Navigator />
      <Outlet />
    </>
  );
}

export default Root;
