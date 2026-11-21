export const mockCity = {
  name: "Cairo",
  country: "Egypt",
  admin1: "Cairo Governorate",
  latitude: 30.06,
  longitude: 31.25,
  timezone: "Africa/Cairo",
};
const hours = Array.from({ length: 48 }, (_, i) => {
  const day = i < 24 ? 15 : 16;
  return `2026-11-${day}T${String(i % 24).padStart(2, "0")}:00`;
});

export const mockWeather = {
  timezone: "Africa/Cairo",
  current: {
    time: "2026-11-15T10:42",
    temperature_2m: 28,
    apparent_temperature: 30,
    relative_humidity_2m: 45,
    weather_code: 2,
    wind_speed_10m: 12,
    wind_direction_10m: 340,
    wind_gusts_10m: 18,
    pressure_msl: 1014,
    dew_point_2m: 16,
    visibility: 10000, 
    precipitation: 0,
    is_day: 1,
  },
  hourly: {
    time: hours,
    temperature_2m: hours.map((_, i) =>
      Math.round(25 + 6 * Math.sin((((i % 24) - 9) / 24) * 2 * Math.PI))
    ),
    precipitation_probability: hours.map(() => 10),
    weather_code: hours.map(() => 2),
  },
  daily: {
    time: [
      "2026-11-15", "2026-11-16", "2026-11-17", "2026-11-18",
      "2026-11-19", "2026-11-20", "2026-11-21",
    ],
    weather_code: [2, 0, 0, 3, 80, 2, 0],
    temperature_2m_max: [32, 33, 34, 31, 28, 27, 29],
    temperature_2m_min: [21, 22, 23, 21, 19, 18, 20],
    sunrise: [
      "2026-11-15T06:00", "2026-11-16T06:01", "2026-11-17T06:02", "2026-11-18T06:03",
      "2026-11-19T06:04", "2026-11-20T06:05", "2026-11-21T06:06",
    ],
    sunset: [
      "2026-11-15T16:50", "2026-11-16T16:49", "2026-11-17T16:49", "2026-11-18T16:48",
      "2026-11-19T16:48", "2026-11-20T16:47", "2026-11-21T16:47",
    ],
    uv_index_max: [6, 6, 6, 5, 4, 5, 6],
    precipitation_probability_max: [10, 0, 0, 15, 45, 20, 5],
  },
};

export const mockRecent = [
  { name: "Cairo", temp: 28 },
  { name: "Alexandria", temp: 25 },
  { name: "London", temp: 16 },
  { name: "Dubai", temp: 34 },
  { name: "Tokyo", temp: 21 },
];