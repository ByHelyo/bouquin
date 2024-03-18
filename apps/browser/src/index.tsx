import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App.tsx";

const index = document.createElement("div");

const body = document.querySelector("body");

if (body) {
  body.prepend(index);
}

ReactDOM.createRoot(index).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
