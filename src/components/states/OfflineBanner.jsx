import { WifiOff, RefreshCw } from "lucide-react";

const formatSaved = (ts) =>
  new Date(ts).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

export default function OfflineBanner({ online, savedAt, onRetry }) {
  return (
    <div
      role="status"
      className="flex flex-wrap items-center gap-3 rounded-2xl bg-orange-100 px-5 py-3 text-sm text-orange-900
        dark:bg-orange-500/15 dark:text-orange-200"
    >
      <WifiOff size={20} aria-hidden="true" className="shrink-0" />
      <p className="min-w-0 flex-1">
        <strong>{online ? "Couldn't refresh." : "You're offline."}</strong>{" "}
        {savedAt
          ? `Showing your last saved forecast (${formatSaved(savedAt)}).`
          : "Data may be out of date until you're back online."}
      </p>
      <button
        onClick={onRetry}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-orange-700 px-4 py-1.5
          text-xs font-bold text-white transition hover:brightness-110
          dark:bg-orange-500 dark:text-slate-950"
      >
        <RefreshCw size={14} aria-hidden="true" /> Reconnect
      </button>
    </div>
  );
}