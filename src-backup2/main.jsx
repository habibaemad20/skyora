import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode> <ThemeProvider> <App /></ThemeProvider></StrictMode>
);
import { searchCities } from "./api/geocoding";
window.searchCities = searchCities; // مؤقت للتجربة، هنشيله بعدين