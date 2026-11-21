import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const DEFAULTS = { units: "metric", windUnit: "kmh", pressureUnit: "hPa", timeFormat: "12h" };
const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [stored, setStored] = useLocalStorage("skyora-settings", DEFAULTS);
  const settings = { ...DEFAULTS, ...stored };
  const update = (patch) => setStored((prev) => ({ ...DEFAULTS, ...prev, ...patch }));
  const reset = () => setStored(DEFAULTS);

  return (
    <SettingsContext.Provider value={{ settings, update, reset }}>
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => useContext(SettingsContext);