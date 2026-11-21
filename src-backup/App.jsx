import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import BottomNav from "./components/navbar/BottomNav";
import RecentSearches from "./components/weather/RecentSearches";
import HeroCard from "./components/weather/HeroCard";
import StatsGrid from "./components/weather/StatsGrid";
import SunArc from "./components/weather/SunArc";
import HourlyForecast from "./components/weather/HourlyForecast";
import DailyForecast from "./components/weather/DailyForecast";
import WeatherSkeleton from "./components/states/WeatherSkeleton";
import ErrorState from "./components/states/ErrorState";
import EmptyState from "./components/states/EmptyState";
import OfflineBanner from "./components/states/OfflineBanner";
import FavoritesDrawer from "./components/favorites/FavoritesDrawer";
import Toast from "./components/ui/Toast";
import { useWeather } from "./hooks/useWeather";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useOnlineStatus } from "./hooks/useOnlineStatus";
import { useGeolocation } from "./hooks/useGeolocation";
import { cityKey, pickCity } from "./utils/cities";
import { getMood } from "./utils/weatherCodes";
import { formatTemp, tempUnit } from "./utils/formatters";

const MAX_RECENT = 5;

export default function App() {
  const [units, setUnits] = useLocalStorage("skyora-units", "metric");
  const [recent, setRecent] = useLocalStorage("skyora-recent", []);
  const [favorites, setFavorites] = useLocalStorage("skyora-favorites", []);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [city, setCity] = useState(() => recent[0] ?? null);
  const { data: weather, loading, error, savedAt, retry } = useWeather(city);
  const online = useOnlineStatus();

  const isFavorite = city ? favorites.some((f) => cityKey(f) === cityKey(city)) : false;

  const selectCity = (picked) => {
    const next = pickCity(picked);
    setCity(next);
    setRecent((prev) => {
      const old = prev.find((c) => cityKey(c) === cityKey(next));
      return [{ ...next, temp: old?.temp }, ...prev.filter((c) => cityKey(c) !== cityKey(next))].slice(0, MAX_RECENT);
    });
  };

  const toggleFavorite = () => {
    if (!city) return;
    setFavorites((prev) =>
      prev.some((f) => cityKey(f) === cityKey(city))
        ? prev.filter((f) => cityKey(f) !== cityKey(city))
        : [...prev, pickCity(city)]
    );
  };

  const removeFavorite = (target) =>
    setFavorites((prev) => prev.filter((f) => cityKey(f) !== cityKey(target)));

  const location = useGeolocation(selectCity);

  useEffect(() => {
    if (!weather || !city) return;
    const temp = weather.current.temperature_2m;
    setRecent((prev) =>
      prev.map((c) => (cityKey(c) === cityKey(city) && c.temp !== temp ? { ...c, temp } : c))
    );
  }, [weather, city, setRecent]);

  useEffect(() => {
    document.title =
      weather && city
        ? `${formatTemp(weather.current.temperature_2m, units)}${tempUnit(units)} ${city.name} · SKYORA`
        : "SKYORA · Know the sky before you step out";
  }, [weather, city, units]);

   const mood = weather ? getMood(weather.current.weather_code, weather.current.is_day) : "sunny";
  useEffect(() => {
    document.documentElement.dataset.mood = mood;
  }, [mood]);

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-100">
      {/* */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 -z-10 bg-linear-to-br transition-colors duration-1000 ${background}`}
      />

      <Navbar
        units={units}
        onUnitsChange={setUnits}
        onSelectCity={selectCity}
        locationStatus={location.status}
        onLocate={location.locate}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setDrawerOpen(true)}
      />

      <main className="mx-auto max-w-7xl space-y-6 px-4 pb-28 pt-4 md:pb-10">
        <RecentSearches
          cities={recent}
          activeKey={city ? cityKey(city) : null}
          units={units}
          onSelect={selectCity}
        />

        {!city && <EmptyState onSelect={selectCity} />}
        {city && loading && !weather && <WeatherSkeleton />}
        {city && error && !weather && <ErrorState message={error} onRetry={retry} />}

        {city && weather && (
          <>
            {(savedAt || !online) && (
              <OfflineBanner online={online} savedAt={savedAt} onRetry={retry} />
            )}

            <section className="grid gap-6 lg:grid-cols-2">
              <HeroCard
                city={city}
                weather={weather}
                units={units}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
              <StatsGrid weather={weather} units={units} />
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
              <SunArc weather={weather} />
              <div className="min-w-0 lg:col-span-2">
                <HourlyForecast weather={weather} units={units} />
              </div>
            </section>

            <DailyForecast weather={weather} units={units} />
          </>
        )}
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-24 md:pb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/60 px-6 py-4 text-sm text-slate-500 backdrop-blur-xl dark:bg-white/5 dark:text-slate-400">
          <p>
            <span className="font-bold text-sky-700 dark:text-indigo-300">SKYORA</span> · Weather data by Open-Meteo
          </p>
          <p className="italic">Know the sky before you step out.</p>
        </div>
      </footer>

      <BottomNav
        locating={location.status === "loading"}
        savedCount={favorites.length}
        onForecast={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onLocate={location.locate}
        onSaved={() => setDrawerOpen(true)}
      />

      <FavoritesDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        favorites={favorites}
        activeKey={city ? cityKey(city) : null}
        units={units}
        onSelect={(f) => {
          selectCity(f);
          setDrawerOpen(false);
        }}
        onRemove={removeFavorite}
        onAddCurrent={toggleFavorite}
        canAdd={Boolean(city) && !isFavorite}
      />

      <Toast status={location.status} name={location.name} />
    </div>
  );
}