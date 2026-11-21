import { useEffect, useId, useRef, useState } from "react";
import { Search, MapPin, X, Loader2, SearchX, TriangleAlert } from "lucide-react";
import { useCitySearch } from "../../hooks/useCitySearch";
import { cityLabel } from "../../utils/cities";

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0); 
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const listId = useId();

  const { status, results, retry } = useCitySearch(query);
  const showPanel = open && status !== "idle";
  const showResults = showPanel && status === "results";

  useEffect(() => {
    const onMouseDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      const tag = document.activeElement?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const select = (city) => {
    onSelect(city);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && results.length) {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp" && results.length) {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && showResults && results[active]) {
      e.preventDefault();
      select(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <label className="relative block">
        <span className="sr-only">Search for a city</span>
        <Search
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={showResults ? listId : undefined}
          aria-activedescendant={showResults ? `${listId}-${active}` : undefined}
          aria-autocomplete="list"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a city..."
          className="h-11 w-full rounded-full bg-white/80 ps-11 pe-12 text-sm
            ring-1 ring-slate-900/10 outline-none transition duration-300
            placeholder:text-slate-400 hover:bg-white focus:bg-white
            focus:ring-2 focus:ring-brand
            dark:bg-white/10 dark:ring-white/10 dark:hover:bg-white/15
            dark:focus:bg-white/15"
        />

        {/*  */}
        <span className="absolute end-3 top-1/2 -translate-y-1/2">
          {status === "loading" ? (
            <Loader2 size={16} aria-hidden="true" className="animate-spin text-accent" />
          ) : query ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="grid h-6 w-6 cursor-pointer place-items-center rounded-full text-slate-500 hover:bg-slate-900/10 dark:text-slate-300 dark:hover:bg-white/10"
            >
              <X size={14} />
            </button>
          ) : (
            <kbd className="pointer-events-none hidden rounded bg-slate-900/5 px-1.5 py-0.5 text-[11px] font-semibold text-slate-500 lg:block dark:bg-white/10 dark:text-slate-400">
              /
            </kbd>
          )}
        </span>
      </label>

      {showPanel && (
        <div className="absolute start-0 top-full z-40 mt-2 w-full overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 dark:bg-slate-900 dark:ring-white/10">
          {status === "loading" && (
            <p role="status" className="flex items-center gap-3 px-4 py-4 text-sm text-slate-500 dark:text-slate-400">
              <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Searching...
            </p>
          )}

          {status === "empty" && (
            <div className="px-4 py-6 text-center">
              <SearchX size={28} className="mx-auto text-slate-400" aria-hidden="true" />
              <p className="mt-2 text-sm font-semibold">No cities found for “{query.trim()}”</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Check the spelling or try a nearby city
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="px-4 py-6 text-center">
              <TriangleAlert size={28} className="mx-auto text-amber-500" aria-hidden="true" />
              <p className="mt-2 text-sm font-semibold">Search is unavailable right now</p>
              <button
                onClick={retry}
                className="mt-2 cursor-pointer text-sm font-semibold text-accent hover:underline"
              >
                Retry
              </button>
            </div>
          )}

          {status === "results" && (
            <>
              <ul id={listId} role="listbox" aria-label="City suggestions" className="p-2">
                {results.map((city, i) => (
                  <li
                    key={city.id ?? `${city.latitude},${city.longitude}`}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => select(city)}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                      i === active ? "bg-brand/10 dark:bg-white/10" : ""
                    }`}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-900/5 dark:bg-white/10">
                      <MapPin size={16} className="text-accent" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate font-semibold">{city.name}</span>
                        {city.country_code && (
                          <span className="rounded bg-slate-900/5 px-1.5 text-[10px] font-bold text-slate-500 dark:bg-white/10 dark:text-slate-400">
                            {city.country_code}
                          </span>
                        )}
                      </span>
                      <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                        {cityLabel(city)}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="hidden border-t border-slate-900/5 px-4 py-2 text-xs text-slate-500 md:block dark:border-white/10 dark:text-slate-400">
                ↑↓ navigate · Enter select · Esc close
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}