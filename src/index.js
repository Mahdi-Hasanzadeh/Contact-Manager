import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import { BrowserRouter } from "react-router-dom";
import "./index.css";

import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import "react-toastify/dist/ReactToastify.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
