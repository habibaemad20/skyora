import { Sun, CloudRain, Snowflake, CloudLightning } from "lucide-react";

// الطقس اللي بيظهر في أزرار الـ Landing
export const WEATHERS = {
  clear: { label: "Clear sky", short: "Clear", Icon: Sun },
  rain: { label: "Heavy rain", short: "Rain", Icon: CloudRain },
  snow: { label: "Snowfall", short: "Snow", Icon: Snowflake },
  storm: { label: "Thunderstorm", short: "Storm", Icon: CloudLightning },
};

// تغميق السماء لكل طقس (0 = مفيش، 1 = غامق خالص)
// partly / cloudy / fog بيتستخدموا في التطبيق بس
export const HAZE_AMOUNT = { clear: 0, partly: 0.08, cloudy: 0.3, fog: 0.35, snow: 0.2, rain: 0.45, storm: 0.6 };

// نوع الطقس اللي بيرجّعه getWeather ← طقس المشهد
const SCENE_BY_KIND = {
  clear: "clear", partly: "partly", cloud: "cloudy", fog: "fog",
  drizzle: "rain", rain: "rain", snow: "snow", storm: "storm",
};
export const sceneFromKind = (kind) => SCENE_BY_KIND[kind] ?? "cloudy";

const toHour = (iso) => Number(iso.slice(11, 13)) + Number(iso.slice(14, 16)) / 60;

// بنحوّل الوقت الحقيقي لوقت "المشهد": الشروق ← الساعة 6، والغروب ← الساعة 18
// فالسماء تبقى مظبوطة في أي مدينة وأي فصل
export function sceneHour(timeIso, sunriseIso, sunsetIso) {
  const now = toHour(timeIso);
  const rise = toHour(sunriseIso);
  const set = toHour(sunsetIso);
  if (!(set > rise)) return now; // شمس منتصف الليل أو ظلام دائم: نستخدم الوقت زي ما هو

  if (now >= rise && now <= set) return 6 + (12 * (now - rise)) / (set - rise);

  const night = 24 - (set - rise);
  const elapsed = now > set ? now - set : now + 24 - set;
  return (18 + (12 * elapsed) / night) % 24;
}

// ألوان السماء [أعلى, وسط, أسفل] عند كل ساعة، وبنمزج بينها
const STOPS = [0, 5, 7, 12, 17, 19, 21, 24];
const SKY = [
  ["#0b1030", "#121847", "#1c2358"], // 0  منتصف الليل
  ["#2f3a78", "#94679f", "#f0b08c"], // 5  فجر
  ["#6aaede", "#a9d5f0", "#e6f3fb"], // 7  صباح
  ["#4f9ad9", "#8fc7ee", "#dcecf8"], // 12 ظهر
  ["#5b82c4", "#d994a8", "#f2b98a"], // 17 غروب
  ["#38386f", "#a65c82", "#e68a68"], // 19 شفق
  ["#0d1233", "#141a47", "#1d2559"], // 21 ليل
  ["#0b1030", "#121847", "#1c2358"], // 24 منتصف الليل
];

const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const mixRgb = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);

// ألوان السماء عند ساعة معينة (مزج بين أقرب مرحلتين). بترجّع 3 ألوان [r,g,b]
export function skyAt(hour) {
  let i = STOPS.findIndex((s, idx) => hour >= s && hour <= STOPS[idx + 1]);
  if (i < 0) i = STOPS.length - 2;
  const t = (hour - STOPS[i]) / (STOPS[i + 1] - STOPS[i]);
  return SKY[i].map((c, k) => mixRgb(hexToRgb(c), hexToRgb(SKY[i + 1][k]), t));
}

export const rgb = (c) => `rgb(${c.map(Math.round).join(",")})`;

// النجوم بتظهر بالليل وتختفي بالنهار
export function starOpacity(hour) {
  if (hour <= 5 || hour >= 20) return 1;
  if (hour < 7) return (7 - hour) / 2;
  if (hour > 18) return (hour - 18) / 2;
  return 0;
}

// السماء غامقة ولا فاتحة؟ (الـ Landing بتخلي الصفحة كلها تتبعها)
export function isSkyDark(hour, weather) {
  const [r, g, b] = skyAt(hour)[1];
  const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const haze = HAZE_AMOUNT[weather];
  return brightness * (1 - haze) + 40 * haze < 150;
}

export function timeLabel(h) {
  const hh = Math.floor(h) % 24;
  const mm = h % 1 ? "30" : "00";
  return `${hh % 12 || 12}:${mm} ${hh >= 12 ? "PM" : "AM"}`;
}