import { useEffect, useState } from "react";
import { getForecast } from "../api/forecast";
import { cityKey } from "../utils/cities";

const cacheKey = (city) => `skyora-weather-${cityKey(city)}`;

function readCache(city) {
  try {
    return JSON.parse(localStorage.getItem(cacheKey(city)));
  } catch {
    return null;
  }
}

function writeCache(city, data) {
  try {
    localStorage.setItem(cacheKey(city), JSON.stringify({ data, savedAt: Date.now() }));
  } catch {

  }
}

export function useWeather(city) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(city));
  const [error, setError] = useState(null);
  const [savedAt, setSavedAt] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setData(null);
    setError(null);
    setSavedAt(null);

    if (!city) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    getForecast(city, controller.signal)
      .then((fresh) => {
        setData(fresh);
        writeCache(city, fresh);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        const cached = readCache(city);
        if (cached?.data) {
          setData(cached.data);
          setSavedAt(cached.savedAt);
        } else {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [city, attempt]);

  return { data, loading, error, savedAt, retry: () => setAttempt((a) => a + 1) };
}