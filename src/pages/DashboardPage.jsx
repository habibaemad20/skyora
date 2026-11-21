import { useOutletContext } from "react-router-dom";
import RecentSearches from "../components/weather/RecentSearches";
import HeroCard from "../components/weather/HeroCard";
import StatsGrid from "../components/weather/StatsGrid";
import SunArc from "../components/weather/SunArc";
import HourlyForecast from "../components/weather/HourlyForecast";
import DailyForecast from "../components/weather/DailyForecast";
import WeatherSkeleton from "../components/states/WeatherSkeleton";
import ErrorState from "../components/states/ErrorState";
import EmptyState from "../components/states/EmptyState";
import OfflineBanner from "../components/states/OfflineBanner";
import { cityKey } from "../utils/cities";

export default function DashboardPage() {
  const {
    city, weather, loading, error, savedAt, retry, online,
    units, recent, selectCity, isFavorite, toggleFavorite,
  } = useOutletContext();

  return (
    <>
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
          {(savedAt || !online) && <OfflineBanner online={online} savedAt={savedAt} onRetry={retry} />}

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
    </>
  );
}