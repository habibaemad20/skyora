const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function getForecast({ latitude, longitude, timezone }, signal) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    timezone,
    current: [
      "temperature_2m", "apparent_temperature", "relative_humidity_2m",
      "weather_code", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m",
      "pressure_msl", "precipitation", "is_day",
    ].join(","),
    hourly: [
      "temperature_2m", "precipitation_probability", "weather_code",
      "dew_point_2m", "visibility",
    ].join(","),
    daily: [
      "weather_code", "temperature_2m_max", "temperature_2m_min",
      "sunrise", "sunset", "uv_index_max", "precipitation_probability_max",
    ].join(","),
    forecast_days: 7,
  });

  let res;
  try {
    res = await fetch(`${BASE_URL}?${params}`, { signal });
  } catch (err) {
    if (err.name === "AbortError") throw err; // إلغاء مقصود، مش خطأ
    throw new Error("Couldn't reach the weather service. Check your connection.");
  }
  if (!res.ok) throw new Error("Couldn't load the weather. Please try again.");

  const data = await res.json();

  const i = Math.max(0, data.hourly.time.indexOf(`${data.current.time.slice(0, 13)}:00`));
  data.current.dew_point_2m = data.hourly.dew_point_2m[i];
  data.current.visibility = data.hourly.visibility[i];

  return data;
}