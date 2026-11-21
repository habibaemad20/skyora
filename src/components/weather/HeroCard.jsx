import { MapPin, Star } from "lucide-react";
import AnimatedNumber from "../ui/AnimatedNumber";
import { useSettings } from "../../context/SettingsContext";
import { getWeather } from "../../utils/weatherCodes";
import { getInsight } from "../../utils/insights";
import {
  formatTemp, tempUnit, formatTime, formatLongDate,
  getGreeting, formatVisibility, formatPressure,
} from "../../utils/formatters";

function SummaryItem({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-slate-600 dark:text-slate-400">{label}</dt>
      <dd className="mt-1 font-semibold">{value}</dd>
    </div>
  );
}

export default function HeroCard({ city, weather, units, isFavorite, onToggleFavorite }) {
  const { settings } = useSettings();
  const { current, daily } = weather;
  const { label, Icon, color } = getWeather(current.weather_code, current.is_day);
  const insight = getInsight(daily);

  return (
    <section
      aria-label="Current weather"
      className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/50
        p-6 text-slate-900 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl transition-colors duration-500
        dark:border-white/10 dark:bg-slate-700/40 dark:text-white sm:p-8"
    >
      {}
      <div aria-hidden="true" className="pointer-events-none absolute -end-20 -top-20 h-72 w-72 rounded-full bg-brand/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -start-16 h-64 w-64 rounded-full bg-brand-2/20 blur-3xl" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <MapPin size={20} aria-hidden="true" className="text-accent" />
              <h2 className="font-display text-2xl font-bold">
                {city.name}{city.country && `, ${city.country}`}
              </h2>
              <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[11px] font-bold tracking-wide text-accent">
                LIVE
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {formatLongDate(current.time)} · {formatTime(current.time, settings.timeFormat)}
            </p>
          </div>

          <button
            onClick={onToggleFavorite}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full bg-slate-900/5
              transition duration-300 hover:bg-slate-900/10 focus-visible:outline-2 focus-visible:outline-brand
              dark:bg-white/10 dark:hover:bg-white/20"
          >
            <Star size={18} className={isFavorite ? "pop fill-amber-400 text-amber-400" : ""} />
          </button>
        </div>

        <div className="mt-4 inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1.5 text-sm font-medium dark:bg-white/10">
          <insight.Icon size={16} className="shrink-0 text-accent" aria-hidden="true" />
          <span>{insight.text}</span>
        </div>

        <p className="mt-6 text-xl text-slate-600 dark:text-slate-300">
          {getGreeting(current.time)}, {city.name}
        </p>

        <div className="mt-2 flex items-center justify-between gap-4">
          <div className="flex items-start">
            <span className="bg-linear-to-br from-slate-900 to-brand bg-clip-text font-display text-8xl font-extrabold leading-none tracking-tight text-transparent dark:from-white dark:to-white/60 sm:text-9xl">
              <AnimatedNumber value={formatTemp(current.temperature_2m, units)} />
            </span>
            <span className="mt-2 text-3xl font-semibold text-accent">{tempUnit(units)}</span>
          </div>
          <Icon
            strokeWidth={1.5}
            aria-hidden="true"
            className={`h-24 w-24 shrink-0 animate-float drop-shadow-lg sm:h-32 sm:w-32 ${color}`}
          />
        </div>

        <p className="mt-4 text-lg font-semibold">
          {label}
          <span className="font-normal text-slate-600 dark:text-slate-300">
            {" "}· Feels like {formatTemp(current.apparent_temperature, units)}°
          </span>
        </p>

        <dl className="mt-auto grid grid-cols-2 gap-4 rounded-2xl bg-slate-900/5 p-4 text-sm dark:bg-white/5 sm:grid-cols-4">
          <SummaryItem
            label="High / Low"
            value={`${formatTemp(daily.temperature_2m_max[0], units)}° / ${formatTemp(daily.temperature_2m_min[0], units)}°`}
          />
          <SummaryItem
            label="Pressure"
            value={`${formatPressure(current.pressure_msl, settings.pressureUnit)} ${settings.pressureUnit}`}
          />
          <SummaryItem label="Visibility" value={formatVisibility(current.visibility, units)} />
          <SummaryItem label="Dew point" value={`${formatTemp(current.dew_point_2m, units)}°`} />
        </dl>
      </div>
    </section>
  );
}