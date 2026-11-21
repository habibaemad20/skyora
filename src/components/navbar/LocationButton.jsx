import { MapPin, Loader2, Check } from "lucide-react";

export default function LocationButton({ status, onClick }) {
  const loading = status === "loading";

  return (
    <button
      onClick={onClick}
      disabled={loading}
      aria-label="Use my location"
      className="flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-white/80 px-3
        text-sm font-semibold ring-1 ring-slate-900/10 transition duration-300 hover:bg-white
        focus-visible:outline-2 focus-visible:outline-brand disabled:cursor-wait
        dark:bg-white/10 dark:ring-white/10 dark:hover:bg-white/20"
    >
      {loading ? (
        <Loader2 size={16} aria-hidden="true" className="animate-spin text-accent" />
      ) : status === "success" ? (
        <Check size={16} aria-hidden="true" className="text-emerald-500" />
      ) : (
        <MapPin size={16} aria-hidden="true" className="text-rose-500" />
      )}
      <span className="hidden xl:inline">{loading ? "Locating..." : "Use my location"}</span>
    </button>
  );
}