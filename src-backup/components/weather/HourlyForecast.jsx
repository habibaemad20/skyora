import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import GlassCard from "../ui/GlassCard";
import { getWeather } from "../../utils/weatherCodes";
import { formatTemp, tempUnit } from "../../utils/formatters";

const hourLabel = (h) => `${h % 12 || 12} ${h >= 12 ? "PM" : "AM"}`;

function ChartTip({ active, payload, unit }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-lg dark:bg-white dark:text-slate-900">
      {payload[0].payload.label} · {payload[0].value}
      {unit}
    </div>
  );
}
const toMin = (iso) => Number(iso.slice(11, 13)) * 60 + Number(iso.slice(14, 16));

function isDaytime(iso, daily) {
  const d = daily.time.indexOf(iso.slice(0, 10));
  if (d === -1) return true;
  const m = toMin(iso);
  return m >= toMin(daily.sunrise[d]) && m < toMin(daily.sunset[d]);
}
export default function HourlyForecast({ weather, units }) {
  const { current, hourly } = weather;
  const [mode, setMode] = useState("temp"); // "temp" | "rain"

  const start = Math.max(
    0,
    hourly.time.findIndex((t) => t.slice(0, 13) === current.time.slice(0, 13))
  );

  const hours = hourly.time.slice(start, start + 24).map((t, i) => {
    const h = Number(t.slice(11, 13));
    return {
      label: i === 0 ? "Now" : hourLabel(h),
      temp: formatTemp(hourly.temperature_2m[start + i], units),
      rain: hourly.precipitation_probability[start + i],
      code: hourly.weather_code[start + i],
           isDay: isDaytime(t, weather.daily),
    };
  });

  const isTemp = mode === "temp";
  const unit = isTemp ? tempUnit(units) : "%";

  return (
    <GlassCard>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-bold">Hourly outlook</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Next 24 hours</p>
        </div>

        <div className="flex rounded-full bg-slate-900/5 p-1 dark:bg-white/10" role="group" aria-label="Chart type">
          {[
            ["temp", "Temperature"],
            ["rain", "Rain chance"],
          ].map(([value, text]) => (
            <button
              key={value}
              onClick={() => setMode(value)}
              aria-pressed={mode === value}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold transition duration-300 ${
                mode === value
                  ? "bg-sky-700 text-white shadow dark:bg-indigo-500"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              }`}
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* */}
      <div className="mt-4 h-52 w-full text-sky-700 dark:text-indigo-400">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={hours} margin={{ top: 10, right: 12, left: 12, bottom: 0 }}>
            <defs>
              <linearGradient id="hourlyFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity={0.35} />
                <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label" interval={3} tickLine={false} axisLine={false}
              tick={{ fontSize: 12, fill: "#94a3b8" }}
            />
            <YAxis hide domain={isTemp ? ["dataMin - 2", "dataMax + 2"] : [0, 100]} />
            <Tooltip content={<ChartTip unit={unit} />} />
            <Area
              type="monotone" dataKey={mode} stroke="currentColor" strokeWidth={3}
              fill="url(#hourlyFill)" dot={false} activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* شريط الساعات */}
      <ul className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {hours.map((h, i) => {
          const { Icon, color } = getWeather(h.code, h.isDay);
          const now = i === 0;
          return (
            <li
              key={i}
              className={`flex min-w-[76px] shrink-0 flex-col items-center gap-2 rounded-2xl px-3 py-4 transition duration-300 ${
                now
                  ? "bg-sky-700 text-white shadow-lg shadow-sky-700/30 dark:bg-indigo-500 dark:shadow-indigo-500/30"
                  : "bg-slate-900/5 dark:bg-white/5"
              }`}
            >
              <span className={`text-xs font-medium ${now ? "text-white/80" : "text-slate-500 dark:text-slate-400"}`}>
                {h.label}
              </span>
              <Icon size={22} aria-hidden="true" className={now ? "text-white" : color} />
              <span className="font-display text-lg font-bold">{h.temp}°</span>
              <span className={`text-xs ${now ? "text-white/80" : "text-slate-500 dark:text-slate-400"}`}>
                {h.rain}%
              </span>
            </li>
          );
        })}
      </ul>
    </GlassCard>
  );
}