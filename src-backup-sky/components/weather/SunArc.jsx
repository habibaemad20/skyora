import { Sunrise, Sunset } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import { formatTime } from "../../utils/formatters";

const toMin = (iso) => Number(iso.slice(11, 13)) * 60 + Number(iso.slice(14, 16));
const formatDuration = (m) => `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m`;

const P0 = [20, 120];
const P1 = [150, -40];
const P2 = [280, 120];
const ARC = `M${P0[0]} ${P0[1]} Q${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`;

const pointAt = (t) => [
  (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t ** 2 * P2[0],
  (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t ** 2 * P2[1],
];

export default function SunArc({ weather }) {
  const { current, daily } = weather;
  const sunrise = daily.sunrise[0];
  const sunset = daily.sunset[0];

  const now = toMin(current.time);
  const rise = toMin(sunrise);
  const set = toMin(sunset);

  const raw = (now - rise) / (set - rise);
  const t = Math.min(1, Math.max(0, raw)); // نحبسها بين 0 و 1
  const isUp = raw > 0 && raw < 1;
  const [x, y] = pointAt(t);

  const badge = isUp
    ? `Sunset in ${formatDuration(set - now)}`
    : now < rise
      ? `Sunrise in ${formatDuration(rise - now)}`
      : "Sun has set";

  return (
    <GlassCard className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display text-lg font-bold">Solar progression</h3>
        <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-bold text-accent">
          {badge}
        </span>
      </div>

      <svg
        viewBox="0 0 300 150"
        role="img"
        aria-label={`Sunrise at ${formatTime(sunrise)}, sunset at ${formatTime(sunset)}`}
        className="mt-4 w-full"
      >
        {/* خط الأفق */}
        <line
          x1="20" y1="120" x2="280" y2="120" strokeDasharray="4 4"
          className="stroke-slate-300 dark:stroke-white/15"
        />
        {/* */}
        <path d={ARC} fill="none" strokeWidth="3" strokeLinecap="round" className="stroke-slate-200 dark:stroke-white/10" />
        {/*  */}
        <path
          d={ARC} fill="none" strokeWidth="3" strokeLinecap="round"
          pathLength="1" strokeDasharray={`${t} 1`}
          className="stroke-brand"
        />
        {isUp && (
          <>
            <circle cx={x} cy={y} r="16" className="fill-amber-400/30" />
            <circle cx={x} cy={y} r="8" className="fill-amber-400" />
          </>
        )}
      </svg>

      <div className="mt-auto grid grid-cols-3 items-end gap-2 pt-4">
        <div>
          <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Sunrise size={14} aria-hidden="true" /> Sunrise
          </p>
          <p className="font-display text-xl font-bold">{formatTime(sunrise)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">Daylight</p>
          <p className="text-sm font-semibold text-accent">
            {formatDuration(set - rise)}
          </p>
        </div>
        <div className="text-end">
          <p className="flex items-center justify-end gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Sunset size={14} aria-hidden="true" /> Sunset
          </p>
          <p className="font-display text-xl font-bold">{formatTime(sunset)}</p>
        </div>
      </div>
    </GlassCard>
  );
}