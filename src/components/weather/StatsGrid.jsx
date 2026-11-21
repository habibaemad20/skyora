import { Droplets, Wind, Sun, CloudRain } from "lucide-react";
import StatCard from "./StatCard";
import AnimatedNumber from "../ui/AnimatedNumber";
import { useSettings } from "../../context/SettingsContext";
import {
  formatTemp, formatWind, windUnit, degToCompass,
  humidityLabel, windLabel, uvLabel, rainLabel,
} from "../../utils/formatters";

// رقم كبير + وحدة صغيرة. animate=false للأرقام اللي فيها كسور (زي الرياح بـ m/s)
function Big({ value, unit, animate = true }) {
  return (
    <p className="font-display text-4xl font-bold sm:text-5xl">
      {animate ? <AnimatedNumber value={value} /> : value}
      <span className="ms-1 text-xl font-medium text-slate-500 dark:text-slate-400">{unit}</span>
    </p>
  );
}

// العرض ديناميكي فبنستخدم style هنا بس
function Bar({ percent }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
      <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${percent}%` }} />
    </div>
  );
}

const UV_COLORS = ["bg-slate-400", "bg-slate-500", "bg-amber-500", "bg-rose-500"];

export default function StatsGrid({ weather, units }) {
  const { settings } = useSettings();
  const { current, daily } = weather;
  const uv = Math.round(daily.uv_index_max[0]);
  const uvLevel = uv < 3 ? 0 : uv < 6 ? 1 : uv < 8 ? 2 : 3;
  const rain = daily.precipitation_probability_max[0];
  const wu = settings.windUnit;

  return (
    <div className="grid h-full auto-rows-fr grid-cols-2 gap-4 lg:gap-6">
      <StatCard icon={Droplets} label="Humidity" badge={humidityLabel(current.relative_humidity_2m)}>
        <div>
          <Big value={current.relative_humidity_2m} unit="%" />
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Dew point is {formatTemp(current.dew_point_2m, units)}° right now
          </p>
        </div>
        <Bar percent={current.relative_humidity_2m} />
      </StatCard>

      <StatCard icon={Wind} label="Wind" badge={windLabel(Math.round(current.wind_speed_10m))}>
        <div>
          <Big value={formatWind(current.wind_speed_10m, wu)} unit={windUnit(wu)} animate={false} />
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {degToCompass(current.wind_direction_10m)} · Gusts up to {formatWind(current.wind_gusts_10m, wu)} {windUnit(wu)}
          </p>
        </div>
      </StatCard>

      <StatCard icon={Sun} label="UV Index" badge={uvLabel(uv)}>
        <div>
          <Big value={uv} unit="of 11" />
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {uv >= 6 ? "Wear sunglasses & SPF 30+" : "Low risk for most people"}
          </p>
        </div>
        <div className="flex gap-1" aria-hidden="true">
          {UV_COLORS.map((color, i) => (
            <div key={color} className={`h-2 flex-1 rounded-full ${i <= uvLevel ? color : "bg-slate-200 dark:bg-white/10"}`} />
          ))}
        </div>
      </StatCard>

      <StatCard icon={CloudRain} label="Rain chance" badge={rainLabel(rain)}>
        <div>
          <Big value={rain} unit="%" />
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Chance of rain today</p>
        </div>
        <Bar percent={rain} />
      </StatCard>
    </div>
  );
}