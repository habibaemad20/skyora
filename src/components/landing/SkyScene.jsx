import { HAZE_AMOUNT, rgb, skyAt, starOpacity } from "../../utils/sky";
const CLOUDS = [
  { top: "10%", scale: "1.6", dur: 90, delay: -30, x: "12%", inClear: "opacity-80", inPartly: "opacity-100" },
  { top: "22%", scale: "2.4", dur: 120, delay: -70, x: "55%", inClear: "opacity-0", inPartly: "opacity-90" },
  { top: "6%", scale: "1.2", dur: 75, delay: -45, x: "78%", inClear: "opacity-70", inPartly: "opacity-100" },
  { top: "34%", scale: "2", dur: 105, delay: -10, x: "34%", inClear: "opacity-0", inPartly: "opacity-80" },
  { top: "16%", scale: "1.8", dur: 100, delay: -55, x: "88%", inClear: "opacity-0", inPartly: "opacity-0" },
];
const DROPS = Array.from({ length: 60 }, (_, i) => ({
  left: (i * 53) % 100,
  delay: -(((i * 37) % 100) / 50),
  dur: 0.6 + ((i * 7) % 6) * 0.08,
}));
const FLAKES = Array.from({ length: 44 }, (_, i) => ({
  left: (i * 61) % 100,
  delay: -(((i * 29) % 100) / 8),
  dur: 8 + ((i * 5) % 7),
  size: 4 + (i % 4) * 1.5,
}));
const STARS = Array.from({ length: 40 }, (_, i) => ({
  left: (i * 47 + 11) % 100,
  top: (i * 29) % 60,
  size: 1 + (i % 3),
  delay: -((i * 13) % 30) / 10,
}));
const CLOUD_COLOR = {
  clear: "bg-white", partly: "bg-white", cloudy: "bg-slate-300", fog: "bg-slate-200",
  snow: "bg-slate-100", rain: "bg-slate-400", storm: "bg-slate-600",
};
const SUN_OPACITY = { clear: 1, partly: 0.9, cloudy: 0.25, fog: 0.2, snow: 0.55, rain: 0.2, storm: 0 };

const cloudVisibility = (weather, c) =>
  weather === "clear" ? c.inClear : weather === "partly" ? c.inPartly : "opacity-100";

const take = (list, density) => list.slice(0, Math.round(list.length * density));

export default function SkyScene({ weather, hour, dark, density = 1, calm = false }) {
  const [top, mid, bottom] = skyAt(hour).map(rgb);

  const isSun = hour >= 6 && hour <= 18;
  const p = isSun ? (hour - 6) / 12 : ((hour < 6 ? hour + 24 : hour) - 18) / 12;
  const x = 8 + 84 * p;
  const y = 62 - 50 * Math.sin(Math.PI * p);

  const overlay = calm
    ? dark ? "bg-black/50" : "bg-white/50"
    : dark ? "bg-black/25" : "bg-white/25";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${top}, ${mid} 55%, ${bottom})` }}
    >
      {/* النجوم */}
      <div className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: starOpacity(hour) * (weather === "clear" ? 1 : 0.2) }}>
        {take(STARS, density).map((s, i) => (
          <span key={i} className="star"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }} />
        ))}
      </div>

      {/* الشمس / القمر */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-700 ${
          isSun
            ? "h-28 w-28 bg-amber-200 shadow-[0_0_100px_40px_rgba(253,224,71,0.45)]"
            : "h-24 w-24 bg-slate-100 shadow-[0_0_80px_28px_rgba(199,210,254,0.4)]"
        }`}
        style={{ left: `${x}%`, top: `${y}%`, opacity: SUN_OPACITY[weather] }}
      />

      {/* السحاب */}
      <div className="absolute inset-0">
        {CLOUDS.map((c, i) => (
          <div
            key={i}
            className={`cloud transition-[background-color,opacity] duration-700 ${CLOUD_COLOR[weather]} ${cloudVisibility(weather, c)}`}
            style={{ top: c.top, scale: c.scale, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s`, "--x": c.x }}
          />
        ))}
      </div>

      {/* عشان تغير اللون حسب الطقس*/}
      <div className="absolute inset-0 bg-slate-800 transition-opacity duration-700" style={{ opacity: HAZE_AMOUNT[weather] }} />

      {/* مطرة */}
      {(weather === "rain" || weather === "storm") && (
        <div className="fade-in absolute inset-0">
          {take(DROPS, density).map((d, i) => (
            <span key={i} className="drop"
              style={{ left: `${d.left}%`, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }} />
          ))}
        </div>
      )}
      {weather === "storm" && <div className="lightning" />}

      {/* تلج */}
      {weather === "snow" && (
        <div className="fade-in absolute inset-0">
          {take(FLAKES, density).map((f, i) => (
            <span key={i} className="flake"
              style={{ left: `${f.left}%`, width: f.size, height: f.size, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }} />
          ))}
        </div>
      )}

      <div className={`absolute inset-0 transition-colors duration-700 ${overlay}`} />
    </div>
  );
}