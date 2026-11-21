import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full
        bg-white/80 text-slate-700 ring-1 ring-slate-900/10 transition duration-300
        hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-sky-700
        dark:bg-white/10 dark:text-indigo-200 dark:ring-white/10 dark:hover:bg-white/20
        dark:focus-visible:outline-indigo-400"
    >
      {isDark ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}