import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Palette, Star, WifiOff } from "lucide-react";
import Logo from "../components/navbar/Logo";
import SkyScene from "../components/landing/SkyScene";
import SkyControls from "../components/landing/SkyControls";
import LiveDemo from "../components/landing/LiveDemo";
import { useTheme } from "../context/ThemeContext";
import { isSkyDark } from "../utils/sky";
import Reveal from "../components/ui/Reveal";
const FEATURES = [
  { Icon: Globe, title: "Any city, worldwide", text: "Search any city for a real 7-day forecast and an hour-by-hour outlook." },
  { Icon: Palette, title: "Colors that follow the sky", text: "The app shifts with the weather: sunny, rainy, stormy, snowy or night." },
  { Icon: Star, title: "Your cities, saved", text: "Pin your favorites and jump between them. Everything stays in your browser." },
  { Icon: WifiOff, title: "Works offline", text: "Lost your connection? SKYORA shows the last forecast it saved for that city." },
];

const primary =
  "inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5";
const glass =
  "rounded-3xl border border-white/40 bg-white/60 shadow-xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/45";
const currentHour = () => {
  const d = new Date();
  return Math.round((d.getHours() + d.getMinutes() / 60) * 2) / 2;
};
export default function LandingPage() {
  const { setOverride } = useTheme();
  const [weather, setWeather] = useState("clear");
  const [hour, setHour] = useState(currentHour);
  const dark = isSkyDark(hour, weather);

  useEffect(() => {
    document.title = "SKYORA · Know the sky before you step out";
  }, []);

  useLayoutEffect(() => {
    setOverride(dark ? "dark" : "light");
    return () => setOverride(null);
  }, [dark, setOverride]);
  return (
    <div className="min-h-screen pb-44 font-sans text-slate-900 transition-colors duration-500 dark:text-slate-100 sm:pb-36">
      <SkyScene weather={weather} hour={hour} dark={dark} />

      <header className="sticky top-0 z-30 border-b border-white/30 bg-white/30 backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-slate-950/30">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <Logo />
          <nav aria-label="Page sections" className="ms-6 hidden gap-6 text-sm font-semibold sm:flex">
            <a href="#try" className="text-slate-800 hover:underline dark:text-slate-200">Try it</a>
            <a href="#features" className="text-slate-800 hover:underline dark:text-slate-200">Features</a>
          </nav>
          <Link to="/app" className="ms-auto rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5">
            Open app
          </Link>
        </div>
      </header>

      <main>
        <section className="stagger mx-auto max-w-4xl px-4 pb-10 pt-16 text-center sm:pt-24">
          <p className="mx-auto w-fit rounded-full border border-slate-900/15 bg-white/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur dark:border-white/20 dark:bg-white/10">
            Live forecasts ·
          </p>

          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
            The sky,{" "}
            <span className="underline decoration-amber-400 decoration-4 underline-offset-8">beautifully</span>{" "}
            understood.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-800 dark:text-slate-200">
            Accurate forecasts in an interface that feels like the weather outside. Know the sky before you step out.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/app" className={primary}>
              Open the app <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href="#try" className="rounded-full border border-slate-900/20 bg-white/40 px-7 py-3.5 font-semibold backdrop-blur transition hover:bg-white/60 dark:border-white/25 dark:bg-white/10 dark:hover:bg-white/20">
              Try it live
            </a>
          </div>

          <p className="mt-10 text-sm font-medium text-slate-800 dark:text-slate-200">
            ↓ Use the controls at the bottom: change the weather and drag the time.
          </p>
        </section>

        <section id="try" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-16">
         <Reveal><LiveDemo /></Reveal>
        </section>

        <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16">
         <Reveal> <div className={`${glass} grid gap-10 p-6 sm:p-10 md:grid-cols-5`}>
            <div className="md:col-span-2">
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Built to be checked every morning</h2>
              <p className="mt-4 text-slate-700 dark:text-slate-300">Everything you need, nothing you don&apos;t.</p>
            </div>
            <ul className="divide-y divide-slate-900/10 dark:divide-white/10 md:col-span-3">
              {FEATURES.map(({ Icon, title, text }) => (
                <li key={title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-900/10 dark:bg-white/10">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{title}</h3>
                    <p className="mt-1 text-slate-700 dark:text-slate-300">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div></Reveal>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-16">
         <Reveal> <div className="rounded-3xl border border-white/40 bg-white/50 p-10 text-center text-slate-900 shadow-xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-700/40 dark:text-white sm:p-14">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Ready to check the sky?</h2>
            <p className="mx-auto mt-3 max-w-md text-slate-700 dark:text-slate-300">Free to use. No account needed.</p>
            <Link to="/app" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-bold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5">
              Open SKYORA <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div></Reveal>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-4">
        <div className={`${glass} flex flex-wrap items-center justify-between gap-2 px-6 py-4 text-sm text-slate-800 dark:text-slate-300`}>
          <p>
            <span className="font-bold">SKYORA</span> ·maded by{" "}
            <a href="linkedin.com/in/habiba-emad-0a6505357" target="_blank" rel="noreferrer" className="underline">Habiba Emad</a>
          </p>
          <p className="italic">Know the sky before you step out.</p>
        </div>
      </footer>

      <SkyControls weather={weather} hour={hour} onWeather={setWeather} onHour={setHour} />
    </div>
  );
}