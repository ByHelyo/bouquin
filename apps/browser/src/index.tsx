import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App.tsx";

const body = document.querySelector("body");

if (body) {
  ReactDOM.createRoot(body).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
