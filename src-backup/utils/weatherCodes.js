import {
  Sun, Moon, CloudSun, CloudMoon, Cloud, CloudFog,
  CloudDrizzle, CloudRain, CloudSnow, CloudLightning,
} from "lucide-react";
const same = (Icon, color) => ({ day: { Icon, color }, night: { Icon, color } });

const KINDS = {
  clear: {
    day: { Icon: Sun, color: "text-amber-500" },
    night: { Icon: Moon, color: "text-yellow-300" },
  },
  partly: {
    day: { Icon: CloudSun, color: "text-sky-600 dark:text-sky-300" },
    night: { Icon: CloudMoon, color: "text-indigo-500 dark:text-indigo-300" },
  },
  cloud: same(Cloud, "text-slate-400"),
  fog: same(CloudFog, "text-slate-400"),
  drizzle: same(CloudDrizzle, "text-sky-500"),
  rain: same(CloudRain, "text-sky-600 dark:text-sky-400"),
  snow: same(CloudSnow, "text-cyan-400"),
  storm: same(CloudLightning, "text-violet-500 dark:text-violet-400"),
};

// WMO code → اسم + نوع
const CODES = {
  0: ["Clear sky", "clear"], 1: ["Mostly clear", "partly"], 2: ["Partly cloudy", "partly"],
  3: ["Overcast", "cloud"], 45: ["Fog", "fog"], 48: ["Rime fog", "fog"],
  51: ["Light drizzle", "drizzle"], 53: ["Drizzle", "drizzle"], 55: ["Heavy drizzle", "drizzle"],
  56: ["Freezing drizzle", "drizzle"], 57: ["Freezing drizzle", "drizzle"],
  61: ["Light rain", "rain"], 63: ["Rain", "rain"], 65: ["Heavy rain", "rain"],
  66: ["Freezing rain", "rain"], 67: ["Freezing rain", "rain"],
  71: ["Light snow", "snow"], 73: ["Snow", "snow"], 75: ["Heavy snow", "snow"], 77: ["Snow grains", "snow"],
  80: ["Rain showers", "rain"], 81: ["Rain showers", "rain"], 82: ["Violent showers", "rain"],
  85: ["Snow showers", "snow"], 86: ["Snow showers", "snow"],
  95: ["Thunderstorm", "storm"], 96: ["Thunderstorm, hail", "storm"], 99: ["Thunderstorm, hail", "storm"],
};

export function getWeather(code, isDay = 1) {
  const [label, kind] = CODES[code] ?? ["Unknown", "cloud"];
  const { Icon, color } = KINDS[kind][isDay ? "day" : "night"];
  return { label, Icon, color, kind };
}

const BACKGROUNDS = {
  clear: "from-sky-200 via-blue-100 to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950",
  partly: "from-sky-200 via-blue-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950",
  cloud: "from-slate-300 via-slate-200 to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800",
  fog: "from-slate-300 via-slate-200 to-slate-100 dark:from-slate-950 dark:via-slate-800 dark:to-slate-900",
  drizzle: "from-sky-300 via-slate-200 to-slate-100 dark:from-slate-950 dark:via-sky-950 dark:to-slate-900",
  rain: "from-slate-400 via-sky-200 to-slate-100 dark:from-slate-950 dark:via-sky-950 dark:to-slate-900",
  snow: "from-cyan-100 via-slate-100 to-white dark:from-slate-950 dark:via-cyan-950 dark:to-slate-900",
  storm: "from-slate-500 via-violet-200 to-slate-200 dark:from-slate-950 dark:via-violet-950 dark:to-slate-900",
};

const NIGHT =
  "from-indigo-300 via-slate-300 to-slate-200 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950";

export function getBackground(code, isDay = 1) {
  const [, kind] = CODES[code] ?? ["", "cloud"];
  if (!isDay && (kind === "clear" || kind === "partly")) return NIGHT;
  return BACKGROUNDS[kind];
}
export function getMood(code, isDay = 1) {
  const { kind } = getWeather(code, isDay);
  if (kind === "clear" || kind === "partly") return isDay ? "sunny" : "night";
  if (kind === "rain" || kind === "drizzle") return "rainy";
  if (kind === "storm") return "stormy";
  if (kind === "snow") return "snowy";
  return "cloudy";
}