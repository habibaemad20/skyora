import { History } from "lucide-react";
import { formatTemp } from "../../utils/formatters";
import { cityKey } from "../../utils/cities";

export default function RecentSearches({ cities, activeKey, units, onSelect }) {
  if (cities.length === 0) return null; 

  return (
    <div className="flex items-center gap-3">
      <span className="hidden shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:flex dark:text-slate-400">
        <History size={14} aria-hidden="true" /> Recent
      </span>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {cities.map((c) => {
          const active = cityKey(c) === activeKey;
          return (
            <button
              key={cityKey(c)}
              onClick={() => onSelect(c)}
              aria-pressed={active}
              className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold
                transition duration-300 ${
                  active
                    ? "bg-brand text-white shadow"
                    : "bg-white/80 text-slate-700 ring-1 ring-slate-900/5 hover:bg-white dark:bg-white/10 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-white/20"
                }`}
            >
              {c.name}
              {c.temp != null && ` ${formatTemp(c.temp, units)}°`}
            </button>
          );
        })}
      </div>
    </div>
  );
}