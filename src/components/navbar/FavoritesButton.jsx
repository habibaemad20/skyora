import { Star } from "lucide-react";

export default function FavoritesButton({ count, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Open favorites (${count} saved)`}
      className="relative grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full
        bg-white/80 ring-1 ring-slate-900/10 transition duration-300 hover:bg-white
        focus-visible:outline-2 focus-visible:outline-brand
        dark:bg-white/10 dark:ring-white/10 dark:hover:bg-white/20"
    >
      <Star size={18} className={count > 0 ? "fill-amber-400 text-amber-400" : "text-slate-600 dark:text-slate-300"} />
      {count > 0 && (
        <span className="absolute -end-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}