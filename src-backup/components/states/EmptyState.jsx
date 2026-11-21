import { CloudSun } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import { SUGGESTED_CITIES } from "../../data/suggestedCities";

export default function EmptyState({ onSelect }) {
  return (
    <div className="mx-auto max-w-4xl space-y-10 py-6">
      <GlassCard className="p-8 text-center sm:p-14">
        <CloudSun
          size={88}
          strokeWidth={1.25}
          aria-hidden="true"
          className="mx-auto animate-float text-sky-600 dark:text-indigo-300"
        />
        <p className="mx-auto mt-6 w-fit rounded-full bg-sky-100 px-4 py-1.5 text-xs font-bold text-sky-800 dark:bg-indigo-500/20 dark:text-indigo-200">
          Welcome to SKYORA · Know the sky before you step out
        </p>
        <h2 className="mt-5 font-display text-5xl font-extrabold sm:text-6xl">Where to?</h2>
        <p className="mx-auto mt-4 max-w-md text-slate-500 dark:text-slate-400">
          Search for any city in the world to see its forecast. Press{" "}
          <kbd className="rounded bg-slate-900/10 px-1.5 py-0.5 text-sm font-semibold dark:bg-white/10">/</kbd>{" "}
          to jump to the search bar.
        </p>
      </GlassCard>

      <section aria-labelledby="suggested-title">
        <h3 id="suggested-title" className="mb-4 font-display text-xl font-bold">
          Popular cities
        </h3>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {SUGGESTED_CITIES.map((c) => (
            <li key={c.name}>
              <button
                onClick={() => onSelect(c)}
                className="w-full cursor-pointer rounded-3xl border border-white/70 bg-white/60 p-5 text-start
                  shadow-xl shadow-slate-900/5 backdrop-blur-xl transition duration-300
                  hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-sky-700
                  dark:border-white/10 dark:bg-white/5 dark:shadow-black/30
                  dark:focus-visible:outline-indigo-400"
              >
                <span className="block font-display text-xl font-bold">{c.name}</span>
                <span className="block text-sm text-slate-500 dark:text-slate-400">{c.country}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}