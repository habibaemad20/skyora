import { CloudOff, RefreshCw } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const TIPS = [
  "Check that Wi-Fi or mobile data is on.",
  "Make sure a captive portal (hotel or café Wi-Fi) isn't blocking the connection.",
  "Wait a moment, then try again.",
];

export default function ErrorState({ message, onRetry }) {
  return (
    <div role="alert" className="mx-auto max-w-2xl py-6">
      <GlassCard className="p-8 text-center sm:p-12">
        <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-sky-100 dark:bg-indigo-500/20">
          <CloudOff size={44} strokeWidth={1.5} aria-hidden="true" className="text-sky-700 dark:text-indigo-300" />
        </span>

        <p className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Network interruption
        </p>
        <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
          Couldn&apos;t load the weather
        </h2>
        <p className="mx-auto mt-3 max-w-md text-slate-500 dark:text-slate-400">
          {message || "Check your connection and try again."}
        </p>

        <button
          onClick={onRetry}
          className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-sky-700 px-6 py-3
            font-semibold text-white shadow-lg shadow-sky-700/30 transition duration-300
            hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-sky-700 dark:bg-indigo-500 dark:shadow-indigo-500/30
            dark:focus-visible:outline-indigo-400"
        >
          <RefreshCw size={18} aria-hidden="true" /> Try again
        </button>

        <ol className="mx-auto mt-8 max-w-md space-y-3 text-start text-sm text-slate-600 dark:text-slate-300">
          {TIPS.map((tip, i) => (
            <li key={tip} className="flex gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sky-100 text-xs font-bold text-sky-800 dark:bg-indigo-500/20 dark:text-indigo-200">
                {i + 1}
              </span>
              {tip}
            </li>
          ))}
        </ol>
      </GlassCard>
    </div>
  );
}