import { NavLink } from "react-router-dom";
import { CloudSun, LocateFixed, Loader2, Star } from "lucide-react";

const base = "flex flex-1 cursor-pointer flex-col items-center gap-1 py-2 text-xs font-semibold transition duration-300";
const idle = "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white";

export default function BottomNav({ locating, savedCount, onLocate, onSaved }) {
  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-white/40 bg-white/80 px-4 pt-1
        pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl
        md:hidden dark:border-white/10 dark:bg-slate-950/80"
    >
      <div className="mx-auto flex max-w-md">
        <NavLink to="/app" end className={({ isActive }) => `${base} ${isActive ? "text-accent" : idle}`}>
          {({ isActive }) => (
            <>
              <span className={`rounded-full px-5 py-1 ${isActive ? "bg-brand/15" : ""}`}>
                <CloudSun size={20} aria-hidden="true" />
              </span>
              Forecast
            </>
          )}
        </NavLink>

        <button onClick={onLocate} disabled={locating} className={`${base} ${idle}`}>
          <span className="px-5 py-1">
            {locating ? (
              <Loader2 size={20} aria-hidden="true" className="animate-spin" />
            ) : (
              <LocateFixed size={20} aria-hidden="true" />
            )}
          </span>
          My location
        </button>

        <button onClick={onSaved} className={`${base} ${idle}`}>
          <span className="relative px-5 py-1">
            <Star size={20} aria-hidden="true" />
            {savedCount > 0 && (
              <span className="absolute end-2 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
                {savedCount}
              </span>
            )}
          </span>
          Saved
        </button>
      </div>
    </nav>
  );
}