import { MapPin, Star } from "lucide-react";
import { getWeather } from "../../utils/weatherCodes";
import { getInsight } from "../../utils/insights";
import {
  formatTemp, tempUnit, formatTime, formatLongDate,
  getGreeting, formatVisibility,
} from "../../utils/formatters";

function SummaryItem({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-white/70">{label}</dt>
      <dd className="mt-1 font-semibold">{value}</dd>
    </div>
  );
}

export default function HeroCard({ city, weather, units, isFavorite, onToggleFavorite }) {
  const { current, daily } = weather;
  const { label, Icon } = getWeather(current.weather_code, current.is_day);
  const insight = getInsight(daily);

  return (
    <section
      aria-label="Current weather"
      className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-linear-to-br
        from-brand to-brand-2 p-6 text-white shadow-2xl shadow-brand/40 sm:p-8"
    >
      {/* */}
      <div aria-hidden="true" className="pointer-events-none absolute -end-16 -top-16 h-64 w-64 rounded-full bg-white/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -start-10 h-56 w-56 rounded-full bg-black/20 blur-3xl" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <MapPin size={20} aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold">
                {city.name}{city.country && `, ${city.country}`}
              </h2>
              <span className="rounded-full bg-white/25 px-2 py-0.5 text-[11px] font-bold tracking-wide">
                LIVE
              </span>
            </div>
            <p className="mt-1 text-sm text-white/80">
              {formatLongDate(current.time)} · {formatTime(current.time)}
            </p>
          </div>

          <button
            onClick={onToggleFavorite}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full
              bg-white/20 transition duration-300 hover:bg-white/30
              focus-visible:outline-2 focus-visible:outline-white"
          >
            <Star size={18} className={isFavorite ? "fill-amber-300 text-amber-300" : ""} />
          </button>
        </div>

        <div className="mt-4 inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium backdrop-blur">
          <insight.Icon size={16} className="shrink-0" aria-hidden="true" />
          <span>{insight.text}</span>
        </div>

        <p className="mt-6 text-xl text-white/80">
          {getGreeting(current.time)}, {city.name}
        </p>

        <div className="mt-2 flex items-center justify-between gap-4">
          <div className="flex items-start">
            <span className="font-display text-8xl font-extrabold leading-none tracking-tight drop-shadow-lg sm:text-9xl">
              {formatTemp(current.temperature_2m, units)}
            </span>
            <span className="mt-2 text-3xl font-semibold text-white/90">{tempUnit(units)}</span>
          </div>
          <Icon
            strokeWidth={1.25}
            aria-hidden="true"
            className="h-24 w-24 shrink-0 animate-float text-white drop-shadow-xl sm:h-32 sm:w-32"
          />
        </div>

        <p className="mt-4 text-lg font-semibold">
          {label}
          <span className="font-normal text-white/80">
            {" "}· Feels like {formatTemp(current.apparent_temperature, units)}°
          </span>
        </p>

        <dl className="mt-auto grid grid-cols-2 gap-4 rounded-2xl bg-black/15 p-4 pt-4 text-sm backdrop-blur sm:grid-cols-4">
          <SummaryItem
            label="High / Low"
            value={`${formatTemp(daily.temperature_2m_max[0], units)}° / ${formatTemp(daily.temperature_2m_min[0], units)}°`}
          />
          <SummaryItem label="Pressure" value={`${Math.round(current.pressure_msl)} hPa`} />
          <SummaryItem label="Visibility" value={formatVisibility(current.visibility, units)} />
          <SummaryItem label="Dew point" value={`${formatTemp(current.dew_point_2m, units)}°`} />
        </dl>
      </div>
    </section>
  );
}