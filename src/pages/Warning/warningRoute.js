import React from "react"; // nạp thư viện react
import ReactDOM from "react-dom/client"; // nạp thư viện react-dom
import { WARNING_PAGE_PATH } from "./constant";
import Warning from "./Warning.jsx";
const warningRoute = {
  path: WARNING_PAGE_PATH,
  element: <Warning />,
};

export default warningRoute;
