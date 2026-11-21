export default function SegmentedControl({ label, options, value, onChange }) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex flex-wrap gap-1 rounded-full bg-slate-900/5 p-1 dark:bg-white/10">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition duration-300
              focus-visible:outline-2 focus-visible:outline-brand ${
                active
                  ? "bg-brand text-white shadow"
                  : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}