import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Sun, Moon, Monitor, Trash2, RotateCcw, Eraser } from "lucide-react";
import GlassCard from "../components/ui/GlassCard";
import SegmentedControl from "../components/settings/SegmentedControl";
import { useSettings } from "../context/SettingsContext";
import { useTheme } from "../context/ThemeContext";
import { formatTemp, tempUnit, formatWind, windUnit, formatPressure, formatTime } from "../utils/formatters";

const THEMES = [
  { value: "light", label: "Light", desc: "Bright and clean", Icon: Sun },
  { value: "dark", label: "Dark", desc: "Easy on the eyes at night", Icon: Moon },
  { value: "system", label: "System", desc: "Match your device", Icon: Monitor },
];

const btn = "inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300";
const neutral = `${btn} bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/10 dark:hover:bg-white/20`;
const danger = `${btn} bg-rose-500/15 text-rose-700 hover:bg-rose-500/25 dark:text-rose-300`;

function Section({ title, desc, children }) {
  return (
    <GlassCard className="space-y-5 p-6 sm:p-8">
      <div>
        <h2 className="font-display text-xl font-bold">{title}</h2>
        {desc && <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">{desc}</p>}
      </div>
      {children}
    </GlassCard>
  );
}

function Row({ title, desc, children }) {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-900/10 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-slate-700 dark:text-slate-400">{desc}</p>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { settings, update, reset } = useSettings();
  const { preference, setPreference } = useTheme();
  // الـ Layout بيبعتلنا الدوال دي عشان نقدر نمسح البيانات المحفوظة
  const { setFavorites, setRecent } = useOutletContext();
  const [notice, setNotice] = useState("");

  const clearRecent = () => {
    setRecent([]);
    setNotice("Recent searches cleared.");
  };
  const clearFavorites = () => {
    if (window.confirm("Remove all saved cities?")) {
      setFavorites([]);
      setNotice("Saved cities removed.");
    }
  };
  const clearCache = () => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("skyora-weather-"))
      .forEach((k) => localStorage.removeItem(k));
    setNotice("Saved offline forecasts cleared.");
  };
  const resetSettings = () => {
    reset();
    setPreference("system");
    setNotice("Settings reset to defaults.");
  };

  // مثال حي بيوضّح أثر الإعدادات
  const preview = [
    ["Temperature", `${formatTemp(28, settings.units)}${tempUnit(settings.units)}`],
    ["Wind", `${formatWind(12, settings.windUnit)} ${windUnit(settings.windUnit)}`],
    ["Pressure", `${formatPressure(1014, settings.pressureUnit)} ${settings.pressureUnit}`],
    ["Sunset", formatTime("2026-11-15T16:50", settings.timeFormat)],
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Settings</h1>
        <p className="mt-1 text-slate-700 dark:text-slate-300">Changes are saved automatically on this device.</p>
      </div>

      <Section title="Appearance" desc="Pick how SKYORA looks. The sky behind the page always follows the real weather.">
        <div role="radiogroup" aria-label="Theme" className="grid gap-3 sm:grid-cols-3">
          {THEMES.map(({ value, label, desc, Icon }) => {
            const active = preference === value;
            return (
              <button
                key={value}
                role="radio"
                aria-checked={active}
                onClick={() => setPreference(value)}
                className={`cursor-pointer rounded-2xl border-2 p-4 text-start transition duration-300
                  focus-visible:outline-2 focus-visible:outline-brand ${
                    active
                      ? "border-brand bg-brand/10"
                      : "border-transparent bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/5 dark:hover:bg-white/10"
                  }`}
              >
                <Icon size={22} aria-hidden="true" className={active ? "text-accent" : ""} />
                <p className="mt-3 font-semibold">{label}</p>
                <p className="text-xs text-slate-700 dark:text-slate-400">{desc}</p>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Units & format" desc="Choose how measurements are shown across the whole app.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {preview.map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-brand/10 p-4">
              <p className="text-xs text-slate-700 dark:text-slate-400">{label}</p>
              <p className="mt-1 font-display text-lg font-bold">{value}</p>
            </div>
          ))}
        </div>

        <Row title="Temperature" desc="Used for every temperature in the app.">
          <SegmentedControl label="Temperature unit" value={settings.units} onChange={(v) => update({ units: v })}
            options={[{ value: "metric", label: "°C" }, { value: "imperial", label: "°F" }]} />
        </Row>
        <Row title="Wind speed" desc="Wind and gusts.">
          <SegmentedControl label="Wind unit" value={settings.windUnit} onChange={(v) => update({ windUnit: v })}
            options={[
              { value: "kmh", label: "km/h" }, { value: "ms", label: "m/s" },
              { value: "mph", label: "mph" }, { value: "kn", label: "knots" },
            ]} />
        </Row>
        <Row title="Pressure" desc="Sea-level barometric pressure.">
          <SegmentedControl label="Pressure unit" value={settings.pressureUnit} onChange={(v) => update({ pressureUnit: v })}
            options={[{ value: "hPa", label: "hPa" }, { value: "inHg", label: "inHg" }]} />
        </Row>
        <Row title="Time format" desc="Sunrise, sunset and the hourly outlook.">
          <SegmentedControl label="Time format" value={settings.timeFormat} onChange={(v) => update({ timeFormat: v })}
            options={[{ value: "12h", label: "12-hour" }, { value: "24h", label: "24-hour" }]} />
        </Row>
      </Section>

      <Section title="Data & privacy" desc="Everything is stored in your browser. Nothing is sent to a server.">
        <Row title="Recent searches" desc="The quick-access chips under the navbar.">
          <button onClick={clearRecent} className={neutral}><Eraser size={16} aria-hidden="true" /> Clear</button>
        </Row>
        <Row title="Offline forecasts" desc="Saved copies shown when you're offline.">
          <button onClick={clearCache} className={neutral}><Eraser size={16} aria-hidden="true" /> Clear</button>
        </Row>
        <Row title="Saved cities" desc="Your favorites list.">
          <button onClick={clearFavorites} className={danger}><Trash2 size={16} aria-hidden="true" /> Remove all</button>
        </Row>
        <Row title="Reset settings" desc="Back to the default units, format and theme.">
          <button onClick={resetSettings} className={neutral}><RotateCcw size={16} aria-hidden="true" /> Reset</button>
        </Row>

        {notice && (
          <p role="status" className="rounded-xl bg-brand/10 px-4 py-3 text-sm font-medium">{notice}</p>
        )}
      </Section>
    </div>
  );
}