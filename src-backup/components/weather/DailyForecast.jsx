import GlassCard from "../ui/GlassCard";
import { getWeather } from "../../utils/weatherCodes";
import { formatTemp } from "../../utils/formatters";

const formatDay = (iso, i) =>
  i === 0
    ? "Today"
    : new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
        weekday: "short", month: "short", day: "numeric",
      });

export default function DailyForecast({ weather, units }) {
  const { daily } = weather;

  // أقل وأعلى درجة في الأسبوع كله (عشان نحسب مكان الشريط)
  const weekMin = Math.min(...daily.temperature_2m_min);
  const weekMax = Math.max(...daily.temperature_2m_max);
  const span = weekMax - weekMin;

  return (
    <GlassCard>
      <h3 className="font-display text-lg font-bold">7-day outlook</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400">Daily high and low temperatures</p>

      <ul className="mt-4 space-y-1">
        {daily.time.map((date, i) => {
          const { label, Icon, color } = getWeather(daily.weather_code[i], 1);
          const min = daily.temperature_2m_min[i];
          const max = daily.temperature_2m_max[i];
          const left = ((min - weekMin) / span) * 100;
          const width = ((max - min) / span) * 100;

          return (
            <li
              key={date}
              className={`flex items-center gap-3 rounded-2xl px-3 py-3 sm:gap-4 ${
                i === 0 ? "bg-sky-50 dark:bg-white/10" : ""
              }`}
            >
              <span className="w-24 shrink-0 text-sm font-semibold sm:w-32">{formatDay(date, i)}</span>

              <span className="flex w-8 shrink-0 items-center gap-2 sm:w-40">
                <Icon size={22} aria-hidden="true" className={`shrink-0 ${color}`} />
                <span className="hidden truncate text-sm text-slate-600 sm:inline dark:text-slate-300">
                  {label}
                </span>
              </span>

              <span className="hidden w-12 shrink-0 text-xs font-semibold text-sky-700 md:inline dark:text-indigo-300">
                {daily.precipitation_probability_max[i]}%
              </span>

              <span className="w-9 shrink-0 text-end text-sm text-slate-500 dark:text-slate-400">
                {formatTemp(min, units)}°
              </span>

              {/* شريط المدى: left و width ديناميكيين فبنستخدم style */}
              <div className="relative h-2 flex-1 rounded-full bg-slate-200 dark:bg-white/10">
                <div
                  className="absolute h-full rounded-full bg-linear-to-r from-sky-500 to-amber-500 dark:from-indigo-400 dark:to-amber-400"
                  style={{ left: `${left}%`, width: `${Math.max(width, 6)}%` }}
                />
              </div>

              <span className="w-9 shrink-0 text-sm font-semibold">{formatTemp(max, units)}°</span>
            </li>
          );
        })}
      </ul>
    </GlassCard>
  );
}