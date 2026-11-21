export async function getCurrentSummary({ latitude, longitude, timezone }, signal) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    timezone,
    current: "temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,is_day",
    daily: "temperature_2m_max,temperature_2m_min",
    forecast_days: 1,
  });

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { signal });
  if (!res.ok) throw new Error("Failed to load");
  const d = await res.json();

  return {
    temp: d.current.temperature_2m,
    code: d.current.weather_code,
    isDay: d.current.is_day,
    wind: d.current.wind_speed_10m,
    humidity: d.current.relative_humidity_2m,
    max: d.daily.temperature_2m_max[0],
    min: d.daily.temperature_2m_min[0],
  };
}
