import { useState } from "react";
import { Sun, CloudRain, Snowflake, CloudLightning } from "lucide-react";

const WEATHERS = {
  clear: { label: "Clear sky", short: "Clear", Icon: Sun, base: 27 },
  rain: { label: "Heavy rain", short: "Rain", Icon: CloudRain, base: 16 },
  snow: { label: "Snowfall", short: "Snow", Icon: Snowflake, base: -2 },
  storm: { label: "Thunderstorm", short: "Storm", Icon: CloudLightning, base: 19 },
};

const STOPS = [0, 5, 7, 12, 17, 19, 21, 24];
const SKY = [
  ["#0a0f2c", "#111a45", "#1b2560"], // 0  منتصف الليل
  ["#25306b", "#8a5a9e", "#f2a37c"], // 5  فجر
  ["#5aa9e6", "#9fd0f5", "#dff1ff"], // 7  صباح
  ["#3b8fe0", "#7ec3f2", "#cfe9fb"], // 12 ظهر
  ["#4a7bd0", "#e08aa0", "#ffb36b"], // 17 غروب
  ["#2a2a6b", "#a8527a", "#f0805a"], // 19 شفق
  ["#0f1438", "#171d52", "#232a6a"], // 21 ليل
  ["#0a0f2c", "#111a45", "#1b2560"], // 24 منتصف الليل
];

const toRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

function mix(a, b, t) {
  const A = toRgb(a);
  const B = toRgb(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
}

function skyAt(h) {
  let i = STOPS.findIndex((s, idx) => h >= s && h <= STOPS[idx + 1]);
  if (i < 0) i = STOPS.length - 2;
  const t = (h - STOPS[i]) / (STOPS[i + 1] - STOPS[i]);
  return SKY[i].map((c, k) => mix(c, SKY[i + 1][k], t));
}

const starOpacity = (h) => {
  if (h <= 5 || h >= 20) return 1;
  if (h < 7) return (7 - h) / 2;
  if (h > 18) return (h - 18) / 2;
  return 0;
};

function timeLabel(h) {
  const hh = Math.floor(h) % 24;
  const mm = h % 1 ? "30" : "00";
  return `${hh % 12 || 12}:${mm} ${hh >= 12 ? "PM" : "AM"}`;
}

const CLOUDS = [
  { top: "12%", scale: "1", dur: 70, delay: -20, x: "15%", inClear: "opacity-90" },
  { top: "26%", scale: "1.4", dur: 95, delay: -60, x: "55%", inClear: "opacity-0" },
  { top: "6%", scale: "0.8", dur: 55, delay: -35, x: "75%", inClear: "opacity-80" },
  { top: "34%", scale: "1.1", dur: 80, delay: -5, x: "35%", inClear: "opacity-0" },
];
const DROPS = Array.from({ length: 46 }, (_, i) => ({
  left: (i * 53) % 100,
  delay: -(((i * 37) % 100) / 50),
  dur: 0.55 + ((i * 7) % 6) * 0.08,
}));
const FLAKES = Array.from({ length: 36 }, (_, i) => ({
  left: (i * 61) % 100,
  delay: -(((i * 29) % 100) / 10),
  dur: 6 + ((i * 5) % 7),
  size: 4 + (i % 4) * 1.5,
}));
const STARS = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 47 + 11) % 100,
  top: (i * 29) % 55,
  size: 1 + (i % 3),
  delay: -((i * 13) % 30) / 10,
}));

const CLOUD_COLOR = { clear: "bg-white", snow: "bg-slate-100", rain: "bg-slate-400", storm: "bg-slate-600" };
const HAZE = { clear: "opacity-0", snow: "opacity-20", rain: "opacity-45", storm: "opacity-60" };
const SUN_OPACITY = { clear: 1, snow: 0.55, rain: 0.2, storm: 0 };

export default function SkyScene() {
  const [weather, setWeather] = useState("clear");
  const [hour, setHour] = useState(14);

  const current = WEATHERS[weather];
  const [top, mid, bottom] = skyAt(hour);

  const temp = Math.round(current.base + 5 * Math.cos(((hour - 15) / 24) * 2 * Math.PI));

  const isSun = hour >= 6 && hour <= 18;
  const p = isSun ? (hour - 6) / 12 : ((hour < 6 ? hour + 24 : hour) - 18) / 12;
  const x = 8 + 84 * p;
  const y = 62 - 50 * Math.sin(Math.PI * p);

  return (
    <div
      role="group"
      aria-label="Interactive sky preview"
      className="relative isolate flex min-h-[34rem] flex-col justify-end overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-900/20"
      style={{ background: `linear-gradient(180deg, ${top}, ${mid} 55%, ${bottom})` }}
    >
      {/**/}
      <div aria-hidden="true" className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: starOpacity(hour) * (weather === "clear" ? 1 : 0.2) }}>
        {STARS.map((s, i) => (
          <span key={i} className="star"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }} />
        ))}
      </div>

      {/* الشمس / القمر */}
      <div
        aria-hidden="true"
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-700 ${
          isSun
            ? "h-24 w-24 bg-amber-200 shadow-[0_0_90px_36px_rgba(253,224,71,0.5)]"
            : "h-20 w-20 bg-slate-100 shadow-[0_0_70px_24px_rgba(199,210,254,0.45)]"
        }`}
        style={{ left: `${x}%`, top: `${y}%`, opacity: SUN_OPACITY[weather] }}
      />

      {/* السحاب */}
      <div aria-hidden="true" className="absolute inset-0">
        {CLOUDS.map((c, i) => (
          <div
            key={i}
            className={`cloud transition-[background-color,opacity] duration-700 ${CLOUD_COLOR[weather]} ${
              weather === "clear" ? c.inClear : "opacity-100"
            }`}
            style={{ top: c.top, scale: c.scale, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s`, "--x": c.x }}
          />
        ))}
      </div>

      {/* ط حسب الطقس */}
      <div aria-hidden="true" className={`absolute inset-0 bg-slate-800 transition-opacity duration-700 ${HAZE[weather]}`} />

      {/* مطرة */}
      {(weather === "rain" || weather === "storm") && (
        <div aria-hidden="true" className="fade-in absolute inset-0">
          {DROPS.map((d, i) => (
            <span key={i} className="drop"
              style={{ left: `${d.left}%`, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }} />
          ))}
        </div>
      )}
      {weather === "storm" && <div aria-hidden="true" className="lightning" />}

      {/* تلج */}
      {weather === "snow" && (
        <div aria-hidden="true" className="fade-in absolute inset-0">
          {FLAKES.map((f, i) => (
            <span key={i} className="flake"
              style={{ left: `${f.left}%`, width: f.size, height: f.size, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }} />
          ))}
        </div>
      )}

      {/* */}
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

      {/**/}
      <div className="relative z-10 p-5 sm:p-8">
        <p className="flex items-center gap-2 text-sm font-semibold text-white">
          <current.Icon size={18} aria-hidden="true" /> {current.label}
        </p>
        <p className="font-display text-8xl font-extrabold leading-none text-white drop-shadow-lg sm:text-9xl">
          {temp}°
        </p>
        <p className="mt-2 text-sm text-white/90">{timeLabel(hour)} · Interactive preview</p>

        <div className="mt-5 grid gap-4 rounded-2xl bg-black/35 p-4 backdrop-blur-md sm:grid-cols-2 sm:items-center">
          <div role="radiogroup" aria-label="Weather" className="grid grid-cols-4 gap-1 rounded-full bg-white/10 p-1">
            {Object.entries(WEATHERS).map(([key, w]) => {
              const active = key === weather;
              return (
                <button
                  key={key}
                  role="radio"
                  aria-checked={active}
                  aria-label={w.short}
                  onClick={() => setWeather(key)}
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-full px-2 py-2.5 text-sm font-semibold
                    transition duration-300 focus-visible:outline-2 focus-visible:outline-white ${
                      active ? "bg-white text-slate-900" : "text-white hover:bg-white/15"
                    }`}
                >
                  <w.Icon size={16} aria-hidden="true" />
                  <span className="hidden sm:inline">{w.short}</span>
                </button>
              );
            })}
          </div>

          <label className="flex items-center gap-3 text-white">
            <span className="w-[4.5rem] shrink-0 text-sm font-semibold tabular-nums">{timeLabel(hour)}</span>
            <input
              type="range"
              min="0"
              max="24"
              step="0.5"
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              aria-label="Time of day"
              aria-valuetext={timeLabel(hour)}
              className="h-2 w-full cursor-pointer accent-white"
            />
          </label>
        </div>
      </div>
    </div>
  );
}