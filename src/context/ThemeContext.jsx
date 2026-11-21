import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

const ThemeContext = createContext();
const QUERY = "(prefers-color-scheme: dark)";

export function ThemeProvider({ children }) {
  // preference: "light" | "dark" | "system"
  const [preference, setPreference] = useState(() => localStorage.getItem("theme") ?? "system");
  const [systemDark, setSystemDark] = useState(() => matchMedia(QUERY).matches);
  // override: صفحة معينة (الـ Landing) تفرض لايت/دارك مؤقتًا من غير ما تلمس اختيار المستخدم
  const [override, setOverride] = useState(null);

  // لو الجهاز بدّل لايت/دارك وإحنا على "system"، نتابعه
  useEffect(() => {
    const mq = matchMedia(QUERY);
    const onChange = (e) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // الثيم بتاع المستخدم (بيتحسب من التفضيل)
  const theme = preference === "system" ? (systemDark ? "dark" : "light") : preference;
  // الثيم المطبّق فعليًا: الفرض المؤقت لو موجود، وإلا ثيم المستخدم
  const applied = override ?? theme;

  // هنا بس بنكتب كلاس dark على <html> (مكان واحد = مفيش تعارض)
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