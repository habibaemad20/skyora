import { CloudSun, LocateFixed, Loader2, Star } from "lucide-react";

// شريط تنقل سفلي للموبايل بس (md:hidden)
export default function BottomNav({ locating, savedCount, onForecast, onLocate, onSaved }) {
  const item =
    "flex flex-1 cursor-pointer flex-col items-center gap-1 py-2 text-xs font-semibold transition duration-300";

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-white/40 bg-white/80 px-4 pt-1
        pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl
        md:hidden dark:border-white/10 dark:bg-slate-950/80"
    >
      <div className="mx-auto flex max-w-md">
        <button onClick={onForecast} className={`${item} text-sky-700 dark:text-indigo-300`}>
          <span className="rounded-full bg-sky-100 px-5 py-1 dark:bg-indigo-500/20">
            <CloudSun size={20} aria-hidden="true" />
          </span>
          Forecast
        </button>

        <button
          onClick={onLocate}
          disabled={locating}
          className={`${item} text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white`}
        >
          <span className="px-5 py-1">
            {locating ? (
              <Loader2 size={20} aria-hidden="true" className="animate-spin" />
            ) : (
              <LocateFixed size={20} aria-hidden="true" />
            )}
          </span>
          My location
        </button>

        <button
          onClick={onSaved}
          className={`${item} text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white`}
        >
          <span className="relative px-5 py-1">
            <Star size={20} aria-hidden="true" />
            {savedCount > 0 && (
              <span className="absolute end-2 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-sky-700 px-1 text-[10px] font-bold text-white dark:bg-indigo-500">
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