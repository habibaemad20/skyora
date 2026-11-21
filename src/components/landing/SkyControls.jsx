import { Clock } from "lucide-react";
import { WEATHERS, timeLabel } from "../../utils/sky";

// الساعة دلوقتي، مقرّبة لأقرب نص ساعة
const nowHour = () => {
  const d = new Date();
  return Math.round((d.getHours() + d.getMinutes() / 60) * 2) / 2;
};

export default function SkyControls({ weather, hour, onWeather, onHour }) {
  return (
    <div
      role="group"
      aria-label="Sky controls"
      className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-3xl rounded-2xl border border-white/40 bg-white/75 p-3
        text-slate-900 shadow-2xl shadow-black/20 backdrop-blur-xl transition-colors duration-500
        dark:border-white/10 dark:bg-slate-900/70 dark:text-white sm:bottom-5 sm:p-4"
    >
      <div className="grid gap-3 sm:grid-cols-2 sm:items-center">
        <div role="radiogroup" aria-label="Weather" className="grid grid-cols-4 gap-1 rounded-full bg-slate-900/5 p-1 dark:bg-white/10">
          {Object.entries(WEATHERS).map(([key, w]) => {
            const active = key === weather;
            return (
              <button
                key={key}
                role="radio"
                aria-checked={active}
                aria-label={w.short}
                onClick={() => onWeather(key)}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-full px-2 py-2.5 text-sm font-semibold
                  transition duration-300 focus-visible:outline-2 focus-visible:outline-slate-900 dark:focus-visible:outline-white ${
                    active
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                      : "text-slate-700 hover:bg-slate-900/10 dark:text-slate-200 dark:hover:bg-white/15"
                  }`}
              >
                <w.Icon size={16} aria-hidden="true" />
                <span className="hidden sm:inline">{w.short}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <label className="flex flex-1 items-center gap-3">
            <span className="w-[4.5rem] shrink-0 text-sm font-semibold tabular-nums">{timeLabel(hour)}</span>
            <input
              type="range"
              min="0"
              max="24"
              step="0.5"
              value={hour}
              onChange={(e) => onHour(Number(e.target.value))}
              aria-label="Time of day"
              aria-valuetext={timeLabel(hour)}
              className="h-2 w-full cursor-pointer accent-slate-900 dark:accent-white"
            />
          </label>
          <button
            onClick={() => onHour(nowHour())}
            aria-label="Set to current time"
            title="Current time"
            className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full bg-slate-900/5 transition
              hover:bg-slate-900/10 dark:bg-white/10 dark:hover:bg-white/20"
          >
            <Clock size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}