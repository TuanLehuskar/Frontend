import React from "react"; // nạp thư viện react
import ReactDOM from "react-dom/client"; // nạp thư viện react-dom
import Navigator from "./components/navigators/Navigator.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./routes/browserRouter";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Tạo component<Home
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
