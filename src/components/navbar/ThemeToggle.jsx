import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// الأيقونة بتوضّح اللي هيحصل لما تدوس: في اللايت القمر (يبدّل للدارك)، وفي الدارك الشمس (يبدّل للايت)
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-full bg-white/80 text-slate-700
        ring-1 ring-slate-900/10 transition duration-300 hover:bg-white focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-brand
        dark:bg-white/10 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-white/20"
    >
      <Moon
        size={18}
        aria-hidden="true"
        className={`absolute inset-0 m-auto transition-all duration-500 ${
          isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
      />
      <Sun
        size={18}
        aria-hidden="true"
        className={`absolute inset-0 m-auto transition-all duration-500 ${
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
        }`}
      />
    </button>
  );
}