export default function UnitToggle({ units, onChange }) {
  const options = [
    { value: "metric", label: "°C" },
    { value: "imperial", label: "°F" },
  ];

  return (
    <div
      role="group"
      aria-label="Temperature unit"
      className="flex h-10 shrink-0 rounded-full bg-white/80 p-1 ring-1 ring-slate-900/10
        dark:bg-white/10 dark:ring-white/10"
    >
      {options.map((o) => {
        const active = units === o.value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            aria-pressed={active}
            className={`min-w-10 cursor-pointer rounded-full px-3 text-sm font-semibold
              transition duration-300 focus-visible:outline-2 focus-visible:outline-sky-700
              dark:focus-visible:outline-indigo-400
              ${
                active
                  ? "bg-sky-700 text-white shadow dark:bg-indigo-500"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}