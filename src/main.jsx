import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { initCardGlow } from "./utils/cardGlow.js";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";

initCardGlow();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <SettingsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SettingsProvider>
    </ThemeProvider>
  </StrictMode>
);