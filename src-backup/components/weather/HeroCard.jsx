import { MapPin, Star } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import { getWeather } from "../../utils/weatherCodes";
import { getInsight } from "../../utils/insights";
import {
  formatTemp, tempUnit, formatTime, formatLongDate,
  getGreeting, formatVisibility,
} from "../../utils/formatters";

// عنصر صغير في صندوق الملخص
function SummaryItem({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="mt-1 font-semibold">{value}</dd>
    </div>
  );
}

export default function HeroCard({ city, weather, units, isFavorite, onToggleFavorite }) {
  const { current, daily } = weather;
  const { label, Icon, color } = getWeather(current.weather_code, current.is_day);
  const insight = getInsight(daily);

  return (
    <GlassCard className="flex h-full flex-col p-6 sm:p-8">
      {/* الصف الأول: المدينة + المفضلة */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <MapPin size={20} className="text-sky-700 dark:text-indigo-300" aria-hidden="true" />
            <h2 className="font-display text-2xl font-bold">
              {city.name}, {city.country}
            </h2>
            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-bold tracking-wide text-sky-800 dark:bg-indigo-500/20 dark:text-indigo-200">
              LIVE
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {formatLongDate(current.time)} · {formatTime(current.time)}
          </p>
        </div>

        <button
          onClick={onToggleFavorite}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full
            bg-sky-50 text-sky-700 transition duration-300 hover:bg-sky-100
            focus-visible:outline-2 focus-visible:outline-sky-700
            dark:bg-white/10 dark:text-indigo-200 dark:hover:bg-white/20"
        >
          <Star size={18} className={isFavorite ? "fill-amber-400 text-amber-400" : ""} />
        </button>
      </div>

      {/* النصيحة */}
      <div className="mt-4 inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-900 dark:bg-white/10 dark:text-slate-100">
        <insight.Icon size={16} className="shrink-0" aria-hidden="true" />
        <span>{insight.text}</span>
      </div>

      <p className="mt-6 text-xl text-slate-500 dark:text-slate-400">
        {getGreeting(current.time)}, {city.name}
      </p>

      {/* الدرجة الكبيرة + الأيقونة */}
      <div className="mt-2 flex items-center justify-between gap-4">
        <div className="flex items-start">
          <span className="font-display text-8xl font-semibold leading-none tracking-tight sm:text-9xl">
            {formatTemp(current.temperature_2m, units)}
          </span>
          <span className="mt-2 text-3xl font-medium text-sky-700 dark:text-indigo-300">
            {tempUnit(units)}
          </span>
        </div>
        <Icon
          strokeWidth={1.25}
          aria-hidden="true"
          className={`h-24 w-24 shrink-0 animate-float sm:h-32 sm:w-32 ${color}`}
        />
      </div>

      <p className="mt-4 text-lg font-semibold">
        {label}
        <span className="font-normal text-slate-500 dark:text-slate-400">
          {" "}· Feels like {formatTemp(current.apparent_temperature, units)}°
        </span>
      </p>

      {/* ملخص اليوم */}
      <dl className="mt-auto grid grid-cols-2 gap-4 rounded-2xl bg-slate-900/5 p-4 text-sm sm:grid-cols-4 dark:bg-white/5">
        <SummaryItem
          label="High / Low"
          value={`${formatTemp(daily.temperature_2m_max[0], units)}° / ${formatTemp(daily.temperature_2m_min[0], units)}°`}
        />
        <SummaryItem label="Pressure" value={`${Math.round(current.pressure_msl)} hPa`} />
        <SummaryItem label="Visibility" value={formatVisibility(current.visibility, units)} />
        <SummaryItem label="Dew point" value={`${formatTemp(current.dew_point_2m, units)}°`} />
      </dl>
    </GlassCard>
  );
}