
const toF = (c) => (c * 9) / 5 + 32;

export const formatTemp = (c, units = "metric") =>
  Math.round(units === "imperial" ? toF(c) : c);
export const tempUnit = (units) => (units === "imperial" ? "°F" : "°C");

export const formatWind = (kmh, units = "metric") =>
  Math.round(units === "imperial" ? kmh * 0.621371 : kmh);
export const windUnit = (units) => (units === "imperial" ? "mph" : "km/h");

export const formatVisibility = (meters, units = "metric") =>
  units === "imperial"
    ? `${Math.round(meters / 1609)} mi`
    : `${Math.round(meters / 1000)} km`;

// "2026-11-15T16:50" → "4:50 PM"
export function formatTime(iso) {
  const [h, m] = iso.slice(11, 16).split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

// "2026-11-15T10:42" → "Sunday, Nov 15"
export function formatLongDate(iso) {
  return new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long", month: "short", day: "numeric",
  });
}

export function getGreeting(iso) {
  const hour = Number(iso.slice(11, 13));
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const COMPASS = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
export const degToCompass = (deg) => COMPASS[Math.round(deg / 22.5) % 16];

// أوصاف للكروت
export const humidityLabel = (h) => (h < 30 ? "Dry" : h < 60 ? "Comfortable" : "Humid");
export const windLabel = (kmh) => (kmh < 12 ? "Calm" : kmh < 30 ? "Breeze" : "Strong");
export const uvLabel = (uv) =>
  uv < 3 ? "Low" : uv < 6 ? "Moderate" : uv < 8 ? "High" : uv < 11 ? "Very high" : "Extreme";
export const rainLabel = (p) => (p < 20 ? "Minimal" : p < 50 ? "Possible" : "Likely");