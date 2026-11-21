import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Palette, Star, WifiOff } from "lucide-react";
import Logo from "../components/navbar/Logo";
import ThemeToggle from "../components/navbar/ThemeToggle";
import SkyBackground from "../components/ui/SkyBackground";
import GlassCard from "../components/ui/GlassCard";
import LiveDemo from "../components/landing/LiveDemo";

const FEATURES = [
  { Icon: Globe, title: "Any city, worldwide", text: "Search any city and get a real 7-day forecast with an hour-by-hour outlook." },
  { Icon: Palette, title: "Colors that follow the sky", text: "The whole interface shifts with the weather: sunny, rainy, stormy, snowy or night." },
  { Icon: Star, title: "Your cities, saved", text: "Pin your favorites and jump between them. Everything is stored in your browser." },
  { Icon: WifiOff, title: "Works offline", text: "Lost your connection? SKYORA shows the last forecast it saved for that city." },
];

export default function LandingPage() {
  useEffect(() => {
    document.title = "SKYORA · Know the sky before you step out";
  }, []);

  return (
    <div className="min-h-screen font-sans text-slate-800 transition-colors duration-500 dark:text-slate-100">
      <SkyBackground />

      <header className="sticky top-0 z-30 border-b border-white/30 bg-white/30 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/30">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <Logo />
          <nav aria-label="Page sections" className="ms-6 hidden gap-6 text-sm font-semibold sm:flex">
            <a href="#features" className="hover:text-accent">Features</a>
            <a href="#try" className="hover:text-accent">Try it</a>
          </nav>
          <div className="ms-auto flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/app"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-900"
            >
              Open app
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 pb-10 pt-16 text-center sm:pt-24">
          <p className="mx-auto w-fit rounded-full bg-white/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest backdrop-blur dark:bg-white/10">
            Live forecasts · Powered by Open-Meteo
          </p>

          <h1 className="mt-6 font-display text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl">
            The sky,{" "}
            <span className="mx-1 inline-block -rotate-1 rounded-2xl bg-linear-to-r from-brand to-brand-2 px-4 pb-1 text-white shadow-xl shadow-brand/30">
              beautifully
            </span>{" "}
            understood.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-800 dark:text-slate-300">
            Accurate forecasts in an interface that actually feels like the weather outside. Know the sky before you step out.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/app"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 font-semibold text-white shadow-xl transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-900"
            >
              Open the app <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              href="#try"
              className="rounded-full bg-white/60 px-7 py-3.5 font-semibold backdrop-blur transition hover:bg-white/80 dark:bg-white/10 dark:hover:bg-white/20"
            >
              Try it live
            </a>
          </div>
        </section>

        {/* التجربة الحية */}
        <section id="try" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-10">
          <LiveDemo />
        </section>

        {/* المميزات */}
        <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16">
          <h2 className="text-center font-display text-3xl font-extrabold sm:text-5xl">
            Built to be checked every morning
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ Icon, title, text }) => (
              <li key={title}>
                <GlassCard className="h-full">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br from-brand to-brand-2 text-white shadow-lg shadow-brand/30">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-400">{text}</p>
                </GlassCard>
              </li>
            ))}
          </ul>
        </section>

        {/* الدعوة للتجربة */}
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="rounded-3xl bg-linear-to-br from-brand to-brand-2 p-10 text-center text-white shadow-2xl shadow-brand/40 sm:p-14">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Ready to check the sky?</h2>
            <p className="mx-auto mt-3 max-w-md text-white/85">Free to use. No account needed.</p>
            <Link
              to="/app"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-slate-900 transition hover:-translate-y-0.5"
            >
              Open SKYORA <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/50 px-6 py-4 text-sm text-slate-700 backdrop-blur-xl dark:bg-white/5 dark:text-slate-400">
          <p>
            <span className="font-bold text-accent">SKYORA</span> · Weather data by{" "}
            <a href="https://open-meteo.com/" target="_blank" rel="noreferrer" className="underline">
              Open-Meteo
            </a>
          </p>
          <p className="italic">Know the sky before you step out.</p>
        </div>
      </footer>
    </div>
  );
}