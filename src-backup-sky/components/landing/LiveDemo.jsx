import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Droplets, Wind, Thermometer } from "lucide-react";
import SearchBar from "../navbar/SearchBar";
import { useWeather } from "../../hooks/useWeather";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { getWeather, getMood } from "../../utils/weatherCodes";
import { formatTemp, tempUnit, formatWind, windUnit } from "../../utils/formatters";
import { SUGGESTED_CITIES } from "../../data/suggestedCities";
import { cityKey, pickCity } from "../../utils/cities";
import { pushRecent } from "../../utils/recent";

function Mini({ Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-black/15 p-3 backdrop-blur">
      <p className="flex items-center gap-1.5 text-xs text-white/85">
        <Icon size={14} aria-hidden="true" /> {label}
      </p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

export default function LiveDemo() {
  const navigate = useNavigate();
  const [units] = useLocalStorage("skyora-units", "metric");
  const [city, setCity] = useState(SUGGESTED_CITIES[0]);
  const { data: weather, loading, error, retry } = useWeather(city);

  const info = weather ? getWeather(weather.current.weather_code, weather.current.is_day) : null;
  // شخصية الألوان بتتطبق على الكارت بس (مش على الصفحة)
  const mood = weather ? getMood(weather.current.weather_code, weather.current.is_day) : "cloudy";

  const openApp = () => {
    pushRecent(city); // نحفظ المدينة الأول، وبعدين نفتح التطبيق عليها
    navigate("/app");
  };

  return (
    <div className="relative z-20 rounded-3xl border border-slate-900/10 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/5 sm:p-8">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Now try the real thing</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Search any city to see its live weather, right now.
          </p>

          <div className="mt-5">
            <SearchBar onSelect={(c) => setCity(pickCity(c))} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTED_CITIES.slice(0, 5).map((c) => {
              const active = cityKey(c) === cityKey(city);
              return (
                <button
                  key={c.name}
                  onClick={() => setCity(c)}
                  aria-pressed={active}
                  className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold transition duration-300 ${
                    active
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                      : "bg-slate-900/5 text-slate-800 hover:bg-slate-900/10 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

        <div
          data-mood={mood}
          className="mood-scope min-h-72 rounded-3xl bg-linear-to-br from-brand to-brand-2 p-6 text-white shadow-2xl shadow-brand/30"
        >
          {loading && !weather && (
            <div role="status" className="space-y-4">
              <span className="sr-only">Loading weather...</span>
              <div className="h-6 w-1/2 animate-pulse rounded-lg bg-white/25" />
              <div className="h-24 w-2/3 animate-pulse rounded-lg bg-white/25" />
              <div className="h-16 w-full animate-pulse rounded-2xl bg-white/25" />
            </div>
          )}

          {error && !weather && (
            <div role="alert" className="grid min-h-60 place-items-center text-center">
              <div>
                <p className="font-semibold">{error}</p>
                <button onClick={retry} className="mt-3 cursor-pointer rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900">
                  Try again
                </button>
              </div>
            </div>
          )}

          {weather && info && (
            <div>
              <p className="text-lg font-semibold">
                {city.name}
                {city.country && <span className="font-normal text-white/85">, {city.country}</span>}
              </p>

              <div className="mt-2 flex items-center justify-between">
                <p className="font-display text-7xl font-extrabold leading-none">
                  {formatTemp(weather.current.temperature_2m, units)}
                  <span className="text-3xl font-semibold text-white/90">{tempUnit(units)}</span>
                </p>
                <info.Icon strokeWidth={1.25} aria-hidden="true" className="h-20 w-20 animate-float text-white drop-shadow-xl" />
              </div>
              <p className="mt-2 font-semibold">{info.label}</p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <Mini Icon={Droplets} label="Humidity" value={`${weather.current.relative_humidity_2m}%`} />
                <Mini Icon={Wind} label="Wind"
                  value={`${formatWind(weather.current.wind_speed_10m, units)} ${windUnit(units)}`} />
                <Mini Icon={Thermometer} label="High / Low"
                  value={`${formatTemp(weather.daily.temperature_2m_max[0], units)}° / ${formatTemp(weather.daily.temperature_2m_min[0], units)}°`} />
              </div>

              <button onClick={openApp}
                className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5">
                Open the full forecast <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}