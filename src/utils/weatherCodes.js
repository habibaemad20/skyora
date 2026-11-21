import {
  Sun, Moon, CloudSun, CloudMoon, Cloud, CloudFog,
  CloudDrizzle, CloudRain, CloudSnow, CloudLightning,
} from "lucide-react";

const same = (Icon, color) => ({ day: { Icon, color }, night: { Icon, color } });

const KINDS = {
  clear: {
    day: { Icon: Sun, color: "text-amber-500" },
    night: { Icon: Moon, color: "text-amber-500 dark:text-yellow-300" },
  },
  partly: {
    day: { Icon: CloudSun, color: "text-slate-600 dark:text-slate-300" },
    night: { Icon: CloudMoon, color: "text-slate-600 dark:text-slate-300" },
  },
  cloud: same(Cloud, "text-slate-500 dark:text-slate-300"),
  fog: same(CloudFog, "text-slate-500 dark:text-slate-300"),
  drizzle: same(CloudDrizzle, "text-slate-500 dark:text-slate-300"),
  rain: same(CloudRain, "text-slate-600 dark:text-slate-300"),
  snow: same(CloudSnow, "text-slate-500 dark:text-slate-200"),
  storm: same(CloudLightning, "text-slate-700 dark:text-slate-200"),
};

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