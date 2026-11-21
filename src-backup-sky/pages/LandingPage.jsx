import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Palette, Star, WifiOff } from "lucide-react";
import Logo from "../components/navbar/Logo";
import ThemeToggle from "../components/navbar/ThemeToggle";
import SkyScene from "../components/landing/SkyScene";
import LiveDemo from "../components/landing/LiveDemo";

const FEATURES = [
  { Icon: Globe, title: "Any city, worldwide", text: "Search any city for a real 7-day forecast and an hour-by-hour outlook." },
  { Icon: Palette, title: "Colors that follow the sky", text: "The app shifts with the weather: sunny, rainy, stormy, snowy or night." },
  { Icon: Star, title: "Your cities, saved", text: "Pin your favorites and jump between them. Everything stays in your browser." },
  { Icon: WifiOff, title: "Works offline", text: "Lost your connection? SKYORA shows the last forecast it saved for that city." },
];

const primary =
  "inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-900";

export default function LandingPage() {
  useEffect(() => {
    document.title = "SKYORA · Know the sky before you step out";
  }, []);

  return (
    <div className="min-h-screen font-sans text-slate-900 transition-colors duration-500 dark:text-slate-100">
       <div aria-hidden="true" className="landing-bg fixed inset-0 -z-10" />
      <header className="sticky top-0 z-30 border-b border-slate-900/5 bg-white/40 backdrop-blur-xl dark:border-white/10 dark:bg-[#070b18]/50">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <Logo />
          <nav aria-label="Page sections" className="ms-6 hidden gap-6 text-sm font-semibold sm:flex">
            <a href="#try" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Try it</a>
            <a href="#features" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Features</a>
          </nav>
          <div className="ms-auto flex items-center gap-3">
            <ThemeToggle />
            <Link to="/app" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-900">
              Open app
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-4xl px-4 pb-10 pt-14 text-center sm:pt-20">
          <p className="mx-auto w-fit rounded-full border border-slate-900/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-600 dark:border-white/15 dark:text-slate-400">
            Live forecasts · Powered by Open-Meteo
          </p>

          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
            The sky,{" "}
            <span className="bg-linear-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent dark:from-sky-400 dark:to-indigo-400">
              beautifully
            </span>{" "}
            understood.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Accurate forecasts in an interface that feels like the weather outside. Know the sky before you step out.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/app" className={primary}>
              Open the app <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href="#try" className="rounded-full border border-slate-900/15 px-7 py-3.5 font-semibold transition hover:bg-slate-900/5 dark:border-white/20 dark:hover:bg-white/10">
              Try it live
            </a>
          </div>
        </section>

        {/* مشهد السماء */}
        <section aria-label="Sky preview" className="mx-auto max-w-6xl px-4">
          <SkyScene />
          <p className="mt-3 text-center text-sm text-slate-600 dark:text-slate-400">
            Pick a weather and drag the time. This is how SKYORA feels, for any sky.
          </p>
        </section>

        <section id="try" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-20">
          <LiveDemo />
        </section>

        <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-20">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <h2 className="font-display text-3xl font-extrabold sm:text-5xl">Built to be checked every morning</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">Everything you need, nothing you don&apos;t.</p>
            </div>
            <ul className="divide-y divide-slate-900/10 dark:divide-white/10 md:col-span-3">
              {FEATURES.map(({ Icon, title, text }) => (
                <li key={title} className="flex gap-4 py-6 first:pt-0">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-900/5 dark:bg-white/10">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{title}</h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="rounded-3xl bg-slate-900 p-10 text-center text-white dark:bg-white/5 dark:ring-1 dark:ring-white/10 sm:p-14">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Ready to check the sky?</h2>
            <p className="mx-auto mt-3 max-w-md text-white/75">Free to use. No account needed.</p>
            <Link to="/app" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-slate-900 transition hover:-translate-y-0.5">
              Open SKYORA <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-900/10 pt-6 text-sm text-slate-600 dark:border-white/10 dark:text-slate-400">
          <p>
            <span className="font-bold text-slate-900 dark:text-white">SKYORA</span> · Weather data by{" "}
            <a href="https://open-meteo.com/" target="_blank" rel="noreferrer" className="underline">Open-Meteo</a>
          </p>
          <p className="italic">Know the sky before you step out.</p>
        </div>
      </footer>
    </div>
  );
}