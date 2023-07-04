import React from "react"; // nạp thư viện react
import { HOME_PAGE_PATH } from "./constants";
import HomePage from "./Home.jsx";
const homePageRoute = {
  path: HOME_PAGE_PATH,
  element: <HomePage />,
};

export default homePageRoute;
