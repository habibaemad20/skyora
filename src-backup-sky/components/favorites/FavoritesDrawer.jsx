import { useEffect, useRef } from "react";
import { X, Trash2, BookmarkPlus, Star, ShieldCheck } from "lucide-react";
import { useFavoritesWeather } from "../../hooks/useFavoritesWeather";
import { getWeather } from "../../utils/weatherCodes";
import { formatTemp, tempUnit, formatWind, windUnit } from "../../utils/formatters";
import { cityKey, cityLabel } from "../../utils/cities";

export default function FavoritesDrawer({
  open, onClose, favorites, activeKey, units, onSelect, onRemove, onAddCurrent, canAdd,
}) {
  const closeRef = useRef(null);
  const weather = useFavoritesWeather(favorites, open);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  // Esc يقفله
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {/**/}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Saved cities"
        aria-hidden={!open}
        className={`fixed inset-y-0 end-0 z-50 flex w-full max-w-sm flex-col bg-slate-50 shadow-2xl
          transition-[transform,visibility] duration-300 dark:bg-slate-900
          ${open ? "visible translate-x-0" : "invisible translate-x-full"}`}
      >
        <header className="flex items-center justify-between gap-3 border-b border-slate-900/10 p-5 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand/15">
              <Star size={18} aria-hidden="true" className="text-accent" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold">Saved cities</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {favorites.length} {favorites.length === 1 ? "location" : "locations"} saved
              </p>
            </div>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close saved cities"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-slate-900/5 transition hover:bg-slate-900/10 dark:bg-white/10 dark:hover:bg-white/20"
          >
            <X size={18} />
          </button>
        </header>

        <ul className="flex-1 space-y-3 overflow-y-auto p-5">
          {favorites.length === 0 && (
            <li className="py-12 text-center text-slate-500 dark:text-slate-400">
              <Star size={36} strokeWidth={1.5} aria-hidden="true" className="mx-auto mb-3" />
              <p className="font-semibold">No saved cities yet</p>
              <p className="mt-1 text-sm">Tap the star on any city to save it here.</p>
            </li>
          )}

          {favorites.map((f) => {
            const key = cityKey(f);
            const w = weather[key];
            const info = w ? getWeather(w.code, w.isDay) : null;
            const active = key === activeKey;

            return (
              <li key={key} className="relative">
                <button
                  onClick={() => onSelect(f)}
                  className={`block w-full cursor-pointer rounded-3xl border p-5 text-start shadow-lg shadow-slate-900/5
                    transition duration-300 hover:-translate-y-0.5 focus-visible:outline-2
                    focus-visible:outline-brand dark:shadow-black/30
                    ${
                      active
                        ? "border-brand bg-brand/10 dark:bg-white/10"
                        : "border-white bg-white dark:border-white/10 dark:bg-white/5"
                    }`}
                >
                  <span className="block pe-9 font-display text-lg font-bold">{f.name}</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">{cityLabel(f)}</span>

                  {w && info ? (
                    <>
                      <span className="mt-3 flex items-center justify-between">
                        <span className="font-display text-5xl font-semibold">
                          {formatTemp(w.temp, units)}
                          <span className="text-xl text-slate-500 dark:text-slate-400">{tempUnit(units)}</span>
                        </span>
                        <span className="flex flex-col items-end gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <info.Icon size={32} strokeWidth={1.5} aria-hidden="true" className={info.color} />
                          {info.label}
                        </span>
                      </span>
                      <span className="mt-3 flex justify-between rounded-xl bg-slate-900/5 px-3 py-2 text-xs dark:bg-white/5">
                        <span>H: {formatTemp(w.max, units)}° · L: {formatTemp(w.min, units)}°</span>
                        <span>
                          {formatWind(w.wind, units)} {windUnit(units)} · {w.humidity}%
                        </span>
                      </span>
                    </>
                  ) : (
                    <span className="mt-3 block h-16 animate-pulse rounded-xl bg-slate-900/10 dark:bg-white/10" />
                  )}
                </button>

                {/* زرار الحذف برا الزرار الكبير (مينفعش زرار جوه زرار) */}
                <button
                  onClick={() => onRemove(f)}
                  aria-label={`Remove ${f.name} from favorites`}
                  className="absolute end-3 top-3 grid h-8 w-8 cursor-pointer place-items-center rounded-full
                    text-slate-400 transition hover:bg-rose-100 hover:text-rose-600
                    dark:hover:bg-rose-500/20 dark:hover:text-rose-300"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            );
          })}
        </ul>

        <footer className="space-y-3 border-t border-slate-900/10 p-5 dark:border-white/10">
          {canAdd && (
            <button
              onClick={onAddCurrent}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand py-3
                font-semibold text-white shadow-lg shadow-brand/30 transition hover:brightness-110
               "
            >
              <BookmarkPlus size={18} aria-hidden="true" /> Add current city to favorites
            </button>
          )}
          <p className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck size={14} aria-hidden="true" /> Saved in your browser · No account needed
          </p>
        </footer>
      </aside>
    </>
  );
}