import { useEffect, useState } from "react";
import { getCurrentSummary } from "../api/currentWeather";
import { cityKey } from "../utils/cities";
export function useFavoritesWeather(favorites, enabled) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!enabled || favorites.length === 0) return;

    const controller = new AbortController();

    Promise.all(
      favorites.map((f) =>
        getCurrentSummary(f, controller.signal)
          .then((summary) => [cityKey(f), summary])
          .catch(() => null) // مدينة فشلت: نكمل الباقي
      )
    ).then((entries) => {
      if (!controller.signal.aborted) {
        setData(Object.fromEntries(entries.filter(Boolean)));
      }
    });

    return () => controller.abort();
  }, [favorites, enabled]);

  return data;
}