import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

const ThemeContext = createContext();
const QUERY = "(prefers-color-scheme: dark)";

export function ThemeProvider({ children }) {
  const [preference, setPreference] = useState(() => localStorage.getItem("theme") ?? "system");
  const [systemDark, setSystemDark] = useState(() => matchMedia(QUERY).matches);
  const [override, setOverride] = useState(null);
  useEffect(() => {
    const mq = matchMedia(QUERY);
    const onChange = (e) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const theme = preference === "system" ? (systemDark ? "dark" : "light") : preference;
  const applied = override ?? theme;
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", applied === "dark");
  }, [applied]);

  useEffect(() => {
    localStorage.setItem("theme", preference);
  }, [preference]);

  const toggleTheme = () => setPreference(theme === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, preference, setPreference, toggleTheme, setOverride }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);