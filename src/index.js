import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// Remove splash screen after app loads
window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");
  if (splash) {
    splash.style.display = "none";
  }
});
