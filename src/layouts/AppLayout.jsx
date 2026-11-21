import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import BottomNav from "../components/navbar/BottomNav";
import FavoritesDrawer from "../components/favorites/FavoritesDrawer";
import Toast from "../components/ui/Toast";
import SkyScene from "../components/landing/SkyScene";
import { useWeather } from "../hooks/useWeather";
import { useSky } from "../hooks/useSky";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { useGeolocation } from "../hooks/useGeolocation";
import { useSettings } from "../context/SettingsContext";
import { useTheme } from "../context/ThemeContext";
import { cityKey, pickCity } from "../utils/cities";
import { formatTemp, tempUnit } from "../utils/formatters";

const MAX_RECENT = 5;

export default function AppLayout() {
  const { settings, update } = useSettings();
  const units = settings.units;
  const setUnits = (u) => update({ units: u });

  const { theme } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [recent, setRecent] = useLocalStorage("skyora-recent", []);
  const [favorites, setFavorites] = useLocalStorage("skyora-favorites", []);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [city, setCity] = useState(() => recent[0] ?? null);
  const { data: weather, loading, error, savedAt, retry } = useWeather(city);
  const online = useOnlineStatus();
  const sky = useSky(weather); 

  const isFavorite = city ? favorites.some((f) => cityKey(f) === cityKey(city)) : false;

  const selectCity = (picked) => {
    const next = pickCity(picked);
    setCity(next);
    setRecent((prev) => {
      const old = prev.find((c) => cityKey(c) === cityKey(next));
      return [{ ...next, temp: old?.temp }, ...prev.filter((c) => cityKey(c) !== cityKey(next))].slice(0, MAX_RECENT);
    });
    if (pathname !== "/app") navigate("/app");
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

  return (
    <div className="min-h-screen font-sans text-slate-800 transition-colors duration-500 dark:text-slate-100">
      <SkyScene weather={sky.weather} hour={sky.hour} dark={theme === "dark"} density={0.6} calm />

      <Navbar
        units={units}
        onUnitsChange={setUnits}
        onSelectCity={selectCity}
        locationStatus={location.status}
        onLocate={location.locate}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setDrawerOpen(true)}
      />

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-4 md:pb-10">
        {}
        <div key={pathname} className="page-in space-y-6">
          <Outlet
            context={{
              city, weather, loading, error, savedAt, retry, online,
              units, recent, selectCity, isFavorite, toggleFavorite,
              setFavorites, setRecent,
            }}
          />
        </div>
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-24 md:pb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/60 px-6 py-4 text-sm text-slate-600 backdrop-blur-xl dark:bg-white/5 dark:text-slate-400">
          <p>
            <span className="font-bold text-accent">SKYORA</span> · Weather data by Open-Meteo
          </p>
          <p className="italic">Know the sky before you step out.</p>
        </div>
      </footer>

      <BottomNav
        locating={location.status === "loading"}
        savedCount={favorites.length}
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