import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import LocationButton from "./LocationButton";
import FavoritesButton from "./FavoritesButton";
import ThemeToggle from "./ThemeToggle";
import UnitToggle from "./UnitToggle";

// بكرة هنضيف هنا Settings بسطر واحد
const NAV_LINKS = [{ to: "/app", label: "Forecast", end: true }];

const idle = "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white";
const tabBase = "block cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition duration-300";

export default function Navbar({
  units, onUnitsChange, onSelectCity,
  locationStatus, onLocate,
  favoritesCount, onOpenFavorites,
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition duration-300 ${
        scrolled
          ? "border-b border-white/40 bg-white/60 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 md:flex-nowrap md:gap-4">
        <Logo />

        <ul className="hidden rounded-full bg-white/50 p-1 ring-1 ring-slate-900/5 lg:flex dark:bg-white/5 dark:ring-white/10">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              {/* NavLink بيدّينا isActive: الصفحة الحالية هي اللي ملونة */}
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `${tabBase} ${isActive ? "bg-brand text-white shadow" : idle}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <button onClick={onOpenFavorites} className={`${tabBase} ${idle}`}>
              Saved Locations
            </button>
          </li>
        </ul>

        <div className="order-last w-full md:order-none md:max-w-md md:flex-1 lg:ms-auto">
          <SearchBar onSelect={onSelectCity} />
        </div>

        <div className="ms-auto flex items-center gap-2 md:ms-0">
          <div className="hidden items-center gap-2 md:flex">
            <LocationButton status={locationStatus} onClick={onLocate} />
            <FavoritesButton count={favoritesCount} onClick={onOpenFavorites} />
          </div>
          <UnitToggle units={units} onChange={onUnitsChange} />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}